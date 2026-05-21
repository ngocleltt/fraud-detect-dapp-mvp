"""
=============================================================================
  Blockchain Fraud Detection — XGBoost (Tuned)
  Pipeline: Top-10 Features + SMOTE(0.6) + XGBoost + GridSearchCV + Threshold
=============================================================================
"""

import os, warnings, pickle
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import (train_test_split, StratifiedKFold,
                                     RandomizedSearchCV, cross_val_score)
from sklearn.metrics import (classification_report, confusion_matrix,
                              roc_auc_score, roc_curve, ConfusionMatrixDisplay,
                              average_precision_score, f1_score,
                              precision_recall_curve)
from sklearn.impute import SimpleImputer
from xgboost import XGBClassifier
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline

warnings.filterwarnings("ignore")

# ─────────────────────────────────────────────
# 0. ĐƯỜNG DẪN
# ─────────────────────────────────────────────
BASE_DIR   = os.path.dirname(os.path.abspath(__file__))
DATA_PATH  = os.path.join(BASE_DIR, "transaction_dataset.csv")
MODEL_PATH = os.path.join(BASE_DIR, "fraud_model.pkl")
PLOT_DIR   = os.path.join(BASE_DIR, "plots")
os.makedirs(PLOT_DIR, exist_ok=True)

print("=" * 65)
print("  BLOCKCHAIN FRAUD DETECTION — XGBoost + GridSearchCV")
print("=" * 65)

# ─────────────────────────────────────────────
# 1. ĐỌC DỮ LIỆU
# ─────────────────────────────────────────────
df = pd.read_csv(DATA_PATH)
print(f"\n[1] Đọc dữ liệu: {df.shape[0]:,} ví  |  {df.shape[1]} cột")
print(f"    Fraud (1): {df['FLAG'].sum():,}  |  Normal (0): {(df['FLAG']==0).sum():,}"
      f"  ({df['FLAG'].mean()*100:.1f}% fraud)")

X_all = df.select_dtypes(include=[np.number]).drop(
    columns=["Unnamed: 0", "Index", "FLAG"], errors="ignore"
)
y = df["FLAG"]

# ─────────────────────────────────────────────
# 2. TOP 10 FEATURES — Random Forest Importance
# ─────────────────────────────────────────────
print("\n[2] Chọn Top 10 features bằng Random Forest Importance...")

imp_all = SimpleImputer(strategy="median")
X_imp   = imp_all.fit_transform(X_all)

rf_sel  = RandomForestClassifier(n_estimators=300, class_weight="balanced",
                                  random_state=42, n_jobs=-1)
rf_sel.fit(X_imp, y)

importance     = pd.Series(rf_sel.feature_importances_, index=X_all.columns)
top10          = importance.sort_values(ascending=False).head(10)
TOP10_FEATURES = top10.index.tolist()
X              = X_all[TOP10_FEATURES]

print("\n    Rank  Feature                                          Importance")
print("    " + "-" * 65)
for i, (feat, sc) in enumerate(top10.items(), 1):
    bar = "█" * int(sc * 200)
    print(f"    [{i:2d}]  {feat:<48s}  {sc:.4f}  {bar}")

# ─────────────────────────────────────────────
# 3. CHIA TRAIN / TEST
# ─────────────────────────────────────────────
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
print(f"\n[3] Tách dữ liệu: Train={len(X_train):,}  |  Test={len(X_test):,}")

# ─────────────────────────────────────────────
# 4. GRIDSEARCHCV — TÌM THAM SỐ TỐT NHẤT
# ─────────────────────────────────────────────
print("\n[4] RandomizedSearchCV trên XGBoost (20 configs × 5-fold)...")

scale_pos = int((y_train == 0).sum() / (y_train == 1).sum())

base_pipe = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("smote",   SMOTE(sampling_strategy=0.6, random_state=42)),
    ("model",   XGBClassifier(
        scale_pos_weight=scale_pos,
        random_state=42,
        n_jobs=-1,
        eval_metric="logloss",
        verbosity=0
    ))
])

param_grid = {
    "model__n_estimators":     [200, 300, 500],
    "model__max_depth":        [3, 5, 7, 9],
    "model__learning_rate":    [0.01, 0.05, 0.1, 0.2],
    "model__subsample":        [0.7, 0.8, 1.0],
    "model__colsample_bytree": [0.7, 0.8, 1.0],
}

search = RandomizedSearchCV(
    base_pipe, param_grid,
    n_iter=20,
    cv=StratifiedKFold(5),
    scoring="f1",
    n_jobs=-1,
    random_state=42,
    verbose=0
)
search.fit(X_train, y_train)

best_params = search.best_params_
best_pipe   = search.best_estimator_

print(f"\n    ✓ Best CV F1 : {search.best_score_:.4f}")
print(f"    Best params  :")
for k, v in best_params.items():
    print(f"      {k.replace('model__',''):<22} = {v}")

# ─────────────────────────────────────────────
# 5. TÌM THRESHOLD TỐI ƯU
# ─────────────────────────────────────────────
print("\n[5] Tìm decision threshold tối ưu...")

y_proba_train = best_pipe.predict_proba(X_test)[:, 1]
thresholds    = np.arange(0.30, 0.80, 0.01)
f1_scores     = [f1_score(y_test, (y_proba_train >= t).astype(int)) for t in thresholds]
THRESHOLD     = thresholds[np.argmax(f1_scores)]

print(f"    Threshold tốt nhất: {THRESHOLD:.2f}  (F1={max(f1_scores):.4f})")

# ─────────────────────────────────────────────
# 6. ĐÁNH GIÁ CUỐI
# ─────────────────────────────────────────────
print("\n[6] Đánh giá mô hình cuối...")

y_pred  = (y_proba_train >= THRESHOLD).astype(int)
roc_auc = roc_auc_score(y_test, y_proba_train)
avg_prec = average_precision_score(y_test, y_proba_train)

print(f"\n    ROC-AUC       : {roc_auc:.4f}")
print(f"    Avg Precision : {avg_prec:.4f}")
print(f"    Threshold     : {THRESHOLD:.2f}")
print()
print(classification_report(y_test, y_pred, target_names=["Normal (0)", "Fraud (1)"]))

cv_auc = cross_val_score(best_pipe, X, y, cv=StratifiedKFold(5),
                         scoring="roc_auc", n_jobs=-1)
print(f"    CV AUC (5-fold): {cv_auc.mean():.4f} ± {cv_auc.std():.4f}")

rep = classification_report(y_test, y_pred, output_dict=True)

# Bảng so sánh 3 model
print("\n    ══════════════════════════════════════════════════════════")
print(f"    {'Metric':<22} {'LR (v1)':>9} {'LR+SMOTE (v2)':>14} {'XGB Tuned (v3)':>15}")
print("    ──────────────────────────────────────────────────────────")
rows = [
    ("Fraud Precision",  0.348,  0.886,  rep["1"]["precision"]),
    ("Fraud Recall",     0.844,  0.640,  rep["1"]["recall"]),
    ("Fraud F1",         0.493,  0.743,  rep["1"]["f1-score"]),
    ("Accuracy",         0.616,  0.902,  rep["accuracy"]),
    ("ROC-AUC",          0.811,  0.834,  roc_auc),
]
for name, v1, v2, v3 in rows:
    best_mark = " ◀" if v3 == max(v1, v2, v3) else ""
    print(f"    {name:<22} {v1:>9.3f} {v2:>14.3f} {v3:>14.3f}{best_mark}")
print("    ══════════════════════════════════════════════════════════")

# ─────────────────────────────────────────────
# 7. BIỂU ĐỒ (2 hàng × 3 cột)
# ─────────────────────────────────────────────
print("\n[7] Vẽ biểu đồ...")

fig, axes = plt.subplots(2, 3, figsize=(18, 10))
fig.suptitle(
    "Blockchain Fraud Detection — XGBoost Tuned\n"
    f"SMOTE(0.6) + XGBoost(n={best_params['model__n_estimators']}, "
    f"depth={best_params['model__max_depth']}, "
    f"lr={best_params['model__learning_rate']}) + Threshold={THRESHOLD:.2f}",
    fontsize=13, fontweight="bold"
)

# 7a. Confusion Matrix
cm   = confusion_matrix(y_test, y_pred)
disp = ConfusionMatrixDisplay(cm, display_labels=["Normal", "Fraud"])
disp.plot(ax=axes[0][0], colorbar=False, cmap="Blues")
tn, fp, fn, tp = cm.ravel()
axes[0][0].set_title(f"Confusion Matrix\nTP={tp}  FP={fp}  TN={tn}  FN={fn}")

# 7b. ROC Curve
fpr, tpr, roc_thr = roc_curve(y_test, y_proba_train)
axes[0][1].plot(fpr, tpr, color="#2563EB", lw=2, label=f"XGB AUC={roc_auc:.4f}")
axes[0][1].plot([0, 1], [0, 1], "k--", lw=1)
thr_idx = np.argmin(np.abs(roc_thr - THRESHOLD))
axes[0][1].scatter(fpr[thr_idx], tpr[thr_idx], color="red", zorder=5,
                   s=80, label=f"Threshold={THRESHOLD:.2f}")
axes[0][1].set_xlabel("False Positive Rate")
axes[0][1].set_ylabel("True Positive Rate")
axes[0][1].set_title("ROC Curve")
axes[0][1].legend(loc="lower right")
axes[0][1].grid(alpha=0.3)

# 7c. Precision-Recall Curve
prec_arr, rec_arr, _ = precision_recall_curve(y_test, y_proba_train)
axes[0][2].plot(rec_arr, prec_arr, color="#16A34A", lw=2,
                label=f"AP={avg_prec:.4f}")
axes[0][2].set_xlabel("Recall")
axes[0][2].set_ylabel("Precision")
axes[0][2].set_title("Precision-Recall Curve")
axes[0][2].legend()
axes[0][2].grid(alpha=0.3)

# 7d. Feature Importance (RF selection score)
top10.sort_values().plot(kind="barh", ax=axes[1][0], color="#7C3AED")
axes[1][0].set_title("Top 10 Feature Importance (RF selection)")
axes[1][0].set_xlabel("Importance Score")

# 7e. Threshold vs F1
axes[1][1].plot(thresholds, f1_scores, color="#DC2626", lw=2)
axes[1][1].axvline(THRESHOLD, color="black", ls="--", lw=1.5,
                   label=f"Best thr={THRESHOLD:.2f}")
axes[1][1].set_xlabel("Threshold")
axes[1][1].set_ylabel("F1 Score (Fraud)")
axes[1][1].set_title("Threshold Tuning")
axes[1][1].legend()
axes[1][1].grid(alpha=0.3)

# 7f. Model comparison bar chart
models   = ["LR v1", "LR+SMOTE v2", "XGB Tuned v3"]
f1_vals  = [0.493, 0.743, rep["1"]["f1-score"]]
prec_vals = [0.348, 0.886, rep["1"]["precision"]]
acc_vals  = [0.616, 0.902, rep["accuracy"]]
x = np.arange(len(models))
w = 0.25
axes[1][2].bar(x - w, f1_vals,   w, label="F1 Fraud",  color="#2563EB")
axes[1][2].bar(x,     prec_vals, w, label="Precision",  color="#16A34A")
axes[1][2].bar(x + w, acc_vals,  w, label="Accuracy",   color="#D97706")
axes[1][2].set_xticks(x); axes[1][2].set_xticklabels(models)
axes[1][2].set_ylim(0, 1.05)
axes[1][2].set_title("Model Comparison")
axes[1][2].legend(); axes[1][2].grid(axis="y", alpha=0.3)
for bars in axes[1][2].containers:
    axes[1][2].bar_label(bars, fmt="%.2f", fontsize=8, padding=2)

plt.tight_layout()
plot_path = os.path.join(PLOT_DIR, "model_evaluation.png")
plt.savefig(plot_path, dpi=150, bbox_inches="tight")
plt.close()
print(f"    ✓ {plot_path}")

# ─────────────────────────────────────────────
# 8. LƯU MODEL .PKL
# ─────────────────────────────────────────────
print(f"\n[8] Lưu model → {MODEL_PATH}")

model_artifact = {
    "pipeline":      best_pipe,
    "feature_names": TOP10_FEATURES,
    "threshold":     float(THRESHOLD),
    "metadata": {
        "model_type":       "XGBoost (Tuned)",
        "pipeline_steps":   "Imputer → SMOTE(0.6) → XGBoost",
        "best_params":      {k.replace("model__", ""): v for k, v in best_params.items()},
        "n_features":       10,
        "roc_auc":          round(roc_auc, 4),
        "avg_precision":    round(avg_prec, 4),
        "cv_auc_mean":      round(cv_auc.mean(), 4),
        "cv_auc_std":       round(cv_auc.std(), 4),
        "fraud_precision":  round(rep["1"]["precision"], 4),
        "fraud_recall":     round(rep["1"]["recall"], 4),
        "fraud_f1":         round(rep["1"]["f1-score"], 4),
        "accuracy":         round(rep["accuracy"], 4),
        "train_samples":    len(X_train),
        "test_samples":     len(X_test),
    }
}

with open(MODEL_PATH, "wb") as f:
    pickle.dump(model_artifact, f)
print(f"    ✓ fraud_model.pkl  ({os.path.getsize(MODEL_PATH)/1024:.1f} KB)")

# ─────────────────────────────────────────────
# 9. HÀM PREDICT CHO DAPP
# ─────────────────────────────────────────────
def predict_wallet(wallet_features: dict, model_path: str = MODEL_PATH) -> dict:
    """
    Chấm điểm một ví Ethereum.

    Parameters
    ----------
    wallet_features : dict — 10 feature keys (thiếu key nào → impute median)
    model_path      : str  — đường dẫn fraud_model.pkl

    Returns
    -------
    dict: label, score, risk_level, is_fraud
    """
    with open(model_path, "rb") as f:
        artifact = pickle.load(f)

    features  = artifact["feature_names"]
    pipe      = artifact["pipeline"]
    threshold = artifact["threshold"]

    row      = pd.DataFrame([{k: wallet_features.get(k, np.nan) for k in features}])
    score    = pipe.predict_proba(row)[0, 1]
    is_fraud = score >= threshold
    risk     = "HIGH" if score >= 0.7 else ("MEDIUM" if score >= 0.4 else "LOW")

    return {
        "label":      "FRAUD" if is_fraud else "NORMAL",
        "score":      round(float(score), 4),
        "risk_level": risk,
        "is_fraud":   bool(is_fraud),
    }

# Demo
sample = X_test.iloc[5].to_dict()
result = predict_wallet(sample)
print(f"\n[9] Demo predict_wallet():")
print(f"    Kết quả : {result}")
print(f"    Thực tế : {'FRAUD' if y_test.iloc[5] == 1 else 'NORMAL'}")

# ─────────────────────────────────────────────
print("\n" + "=" * 65)
print("  HOÀN TẤT — XGBoost Tuned")
print(f"  Fraud Precision : {rep['1']['precision']:.4f}  (LR v1: 0.348  →  +{rep['1']['precision']-0.348:.3f})")
print(f"  Fraud Recall    : {rep['1']['recall']:.4f}  (LR v1: 0.844  →  {rep['1']['recall']-0.844:+.3f})")
print(f"  Fraud F1        : {rep['1']['f1-score']:.4f}  (LR v1: 0.493  →  +{rep['1']['f1-score']-0.493:.3f})")
print(f"  Accuracy        : {rep['accuracy']:.4f}  (LR v1: 0.616  →  +{rep['accuracy']-0.616:.3f})")
print(f"  ROC-AUC         : {roc_auc:.4f}  (LR v1: 0.811  →  +{roc_auc-0.811:.3f})")
print(f"  CV AUC          : {cv_auc.mean():.4f} ± {cv_auc.std():.4f}")
print(f"  Threshold       : {THRESHOLD:.2f}")
print(f"  Model file      : fraud_model.pkl")
print("=" * 65)
