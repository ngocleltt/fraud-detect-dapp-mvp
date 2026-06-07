// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CidStorage {
    string public cid;
    uint256 public count;

    event CidUpdated(string newCid, address indexed updatedBy, uint256 newCount);

    // Bất kỳ ai cũng có thể gọi (không kiểm soát)
    function setCid(string memory _newCid) public {
        cid = _newCid;
        count = count + 1;
        emit CidUpdated(_newCid, msg.sender, count);
    }

    // Hàm đọc (view)
    function getCid() public view returns (string memory) {
        return cid;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}