// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CidStorage {
    string public cid;

    event CidUpdated(string newCid, address indexed updatedBy);

    function setCid(string memory _newCid) public {
        cid = _newCid;
        emit CidUpdated(_newCid, msg.sender);
    }
}