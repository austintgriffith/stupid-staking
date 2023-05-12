//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";


contract StupidStaker  {

    mapping(address => uint64) public whenStaked;
    
    function stake() public payable {
        require(msg.value == 0.01 ether, "You need to stake exactly 0.01 ether");
        require(whenStaked[msg.sender] == 0, "You have already staked");
        whenStaked[msg.sender] = uint64(block.timestamp);
    }

    function timeStaked(address staker) public view returns (uint64) {
        return uint64(block.timestamp)-whenStaked[staker];
    }

    function withdraw() public {
        require(whenStaked[msg.sender] > 0, "You have not staked yet");
        require(timeStaked(msg.sender) > 30 seconds, "You need to wait at least 30 seconds");
        

        uint256 totalPayback = 0.01 ether;
        if(prizePool >= 0.001 ether){
            totalPayback += 0.001 ether;
            prizePool -= 0.001 ether;
        }
        
        payable(msg.sender).transfer(totalPayback);
        whenStaked[msg.sender] = 0;
    }

    uint256 public prizePool = 0;
    /**
     * Function that allows the contract to receive ETH
     */


    receive() external payable {
        prizePool += msg.value;
    }

}