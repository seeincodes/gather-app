// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Staking {
    struct Stake {
        uint256 amount;
        uint256 timestamp;
    }
    mapping(address => Stake) public stakes;
    IERC20 public xdcToken;

    event Staked(address indexed user, uint256 amount, uint256 timestamp);

    constructor(address _xdcToken) {
        xdcToken = IERC20(_xdcToken);
    }

    function stake(uint256 _amount) public {
        require(_amount > 0, "Staking amount must be greater than 0");
        require(xdcToken.transferFrom(msg.sender, address(this), _amount), "Failed to transfer tokens for staking");

        if (stakes[msg.sender].timestamp > 0) {
            stakes[msg.sender].amount += _amount;
        } else {
            stakes[msg.sender] = Stake(_amount, block.timestamp);
        }

        emit Staked(msg.sender, _amount, block.timestamp);
    }

    function withdraw() public {
        require(stakes[msg.sender].amount > 0, "No staked amount");
        require(block.timestamp > stakes[msg.sender].timestamp + 30 days, "Cannot withdraw within 30 days of staking");

        uint256 amount = stakes[msg.sender].amount;
        stakes[msg.sender] = Stake(0, 0);

        require(xdcToken.transfer(msg.sender, amount), "Failed to transfer staked tokens back to user");

        // add code to distribute rewards here
    }
}
