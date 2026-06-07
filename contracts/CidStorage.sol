// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CidStorage {
    // ============ Quyền truy cập ============
    address public owner;
    mapping(address => bool) public authorized;

    // ============ Dữ liệu chính ============
    string public cid;              // CID hiện tại (mới nhất)
    uint256 public count;           // tổng số lần ghi

    // ============ Lịch sử ============
    struct HistoryItem {
        string cid;
        uint256 timestamp;
        address modifiedBy;
        string reason;
    }
    HistoryItem[] public history;

    // ============ Giới hạn & Khóa ============
    uint256 public maxRecords;      // số lượng ghi tối đa (không tính lịch sử?)
    bool public locked;             // true: không ai ghi được

    // ============ Events ============
    event CidUpdated(string newCid, address indexed updatedBy, uint256 newCount, string reason);
    event AuthorizationChanged(address indexed account, bool isAuthorized);
    event MaxRecordsChanged(uint256 newMax);
    event ContractLocked(bool locked);
    event HistoryItemAdded(uint256 indexed index, string cid, address by, string reason);

    // ============ Modifiers ============
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyAuthorized() {
        require(msg.sender == owner || authorized[msg.sender], "Not authorized");
        _;
    }

    modifier notLocked() {
        require(!locked, "Contract is locked");
        _;
    }

    // ============ Constructor ============
    constructor(uint256 _maxRecords) {
        owner = msg.sender;
        authorized[owner] = true;
        maxRecords = _maxRecords;
        locked = false;
    }

    // ============ Quản lý quyền ============
    function addAuthorized(address _account) external onlyOwner {
        authorized[_account] = true;
        emit AuthorizationChanged(_account, true);
    }

    function removeAuthorized(address _account) external onlyOwner {
        authorized[_account] = false;
        emit AuthorizationChanged(_account, false);
    }

    // ============ Quản lý giới hạn & khóa ============
    function setMaxRecords(uint256 _newMax) external onlyOwner {
        maxRecords = _newMax;
        emit MaxRecordsChanged(_newMax);
    }

    function lock() external onlyOwner {
        locked = true;
        emit ContractLocked(true);
    }

    function unlock() external onlyOwner {
        locked = false;
        emit ContractLocked(false);
    }

    // ============ Ghi CID (có lý do) ============
    function setCid(string memory _newCid, string memory _reason) 
        public 
        onlyAuthorized 
        notLocked 
    {
        require(history.length < maxRecords, "Maximum number of records reached");
        require(bytes(_newCid).length > 0, "CID cannot be empty");

        // Lưu vào lịch sử
        history.push(HistoryItem({
            cid: _newCid,
            timestamp: block.timestamp,
            modifiedBy: msg.sender,
            reason: _reason
        }));

        // Cập nhật biến hiện tại
        cid = _newCid;
        count++;

        emit CidUpdated(_newCid, msg.sender, count, _reason);
        emit HistoryItemAdded(history.length - 1, _newCid, msg.sender, _reason);
    }

    // ============ Hàm đọc (view) ============
    function getCid() public view returns (string memory) {
        return cid;
    }

    function getCount() public view returns (uint256) {
        return count;
    }

    function getHistoryCount() public view returns (uint256) {
        return history.length;
    }

    function getHistoryItem(uint256 index) 
        public 
        view 
        returns (string memory cid, uint256 timestamp, address modifiedBy, string memory reason) 
    {
        require(index < history.length, "Index out of bounds");
        HistoryItem memory item = history[index];
        return (item.cid, item.timestamp, item.modifiedBy, item.reason);
    }

    // Lấy toàn bộ lịch sử (cẩn thận nếu số lượng lớn, nhưng với giới hạn maxRecords là an toàn)
    function getAllHistory() public view returns (HistoryItem[] memory) {
        return history;
    }
}