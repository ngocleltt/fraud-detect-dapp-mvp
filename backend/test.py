import json
import hashlib
import base64

def generate_fake_cid(user_id):
    """Tạo một CID giả dạng Qm... dựa trên user_id (ổn định, không cần upload thật)"""
    h = hashlib.sha256(user_id.encode()).digest()
    # Lấy 20 byte đầu, mã hóa base32 (IPFS CIDv0 dùng base58, nhưng dùng base32 cho đơn giản)
    # Ở đây tạo chuỗi Qm... giả:
    b32 = base64.b32encode(h[:16]).decode().lower().rstrip('=')
    return f"Qm{b32[:46]}"

file_path = "dataset.json"
with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

for user in data["users"]:
    if "ipfs_cid" not in user:
        user["ipfs_cid"] = generate_fake_cid(user["user_id"])

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Đã thêm ipfs_cid cho {len(data['users'])} user.")