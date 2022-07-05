// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract TestContract {
    uint256 internal total;

    function setTotal(uint256 value) external {
        total = value;
    }

    function increaseTotal(uint256 value) external {
        total += value;
    }

    function decreaseTotal(uint256 value) external {
        total -= value;
    }

    function getTotal() external view returns (uint256) {
        return total;
    }
}
