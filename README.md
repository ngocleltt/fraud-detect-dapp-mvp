# fraud-detect-dapp-mvp
An AI-powered DApp MVP for detecting suspicious behavior and anomalies in blockchain networks based on transaction analysis.

Tema : Разработка системы выявления подозрительного поведения пользователей в блокчейн-сетях на основе анализа транзакций с использованием методов искусственного интеллекта.
DApp phát hiện ví gian lận sử dụng mô hình lưu trữ lai (Hybrid Storage) và chấm điểm bằng AI (XGBoost). 

---



### Frontend

* **Auth Layer (Web3 UX):** user login (bằng địa chỉ ví ảo). Frontend lấy địa chỉ ví công khai (`0x...`) làm ID định danh.
* **Batch Mode Component:** Khi tải trang, Client-side gọi API lấy DB tĩnh từ Backend , render ra bảng Table chứa danh sách 15-20 users mẫu kèm nhãn trạng thái `SAFE` hoặc `SUSPICIOUS` có sẵn.
* **Real-time Form Component:** Cung cấp biểu mẫu (Form) để user tự nhập thông số giao dịch mới, sau đó đẩy data xuống API Backend bằng phương thức POST. Nếu kết quả trả về là ví bẩn, giao diện tự động update redflag.

### Backend

* Database gốc (`dataset.json`) chứa thông tin người dùng được upload lên **IPFS** để tối ưu hóa chi phí lưu trữ.
* Smart Contract Solidity (`DatasetRegistry.sol`) lưu trữ duy nhất chuỗi mã **CID** của file dữ liệu trên chuỗi. Khi DB thay đổi, Backend sẽ push file mới lên IPFS và ký giao dịch cập nhật CID mới lên Contract.
    
* **Core Logic Layer (AI + API):**
  * Mô hình AI (XGBoost) học dựa trên 10 chỉ số giao dịch.
  * FastAPI tiếp nhận dữ liệu giao dịch mới từ Frontend -> Tính toán lại các chỉ số đặc trưng -> Đẩy vào mô hình `model.pkl` chấm điểm real-time -> Trả kết quả trạng thái về cho Frontend, đồng thời kích hoạt luồng cập nhật dữ liệu lên IPFS và Blockchain.



* 10 features được chọn: 
`Total ERC20 tnxs`
`ERC20 uniq rec contract addr`
`ERC20 uniq rec token name`
`ERC20 uniq rec addr`
`Time Diff between first and last (Mins)`
`total ether received`
`Avg min between received tnx`
`avg val received` `total transactions (including tnx to create contract)` 
`Unique Received From Addresses`