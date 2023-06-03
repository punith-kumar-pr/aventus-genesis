// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.0 <0.9.0;

contract EscrowSol {

    address public funder;

    address public beneficiary;


    function fund(address counterpart) public payable {
        beneficiary = counterpart;
        funder = msg.sender;
    }

    function release() public payable {
        if (msg.sender==funder){
            
            payable(beneficiary).transfer(address(this).balance);
        }
    }

    function revertPayment() public payable {
        if (msg.sender==funder){

            payable(msg.sender).transfer(address(this).balance);
        }
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}