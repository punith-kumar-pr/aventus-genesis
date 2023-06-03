// SPDX-License-Identifier: UNLICENsED
pragma solidity >=0.4.22 <0.9.0;

contract Arbit {
    // Declaring the state variables
    address payable public buyer;
    address payable public seller;
    address payable public arbiter;

    // Defining an enumerator 'State'
    enum State {
        awate_payment,
        awate_delivery,
        complete
    }

    // Declaring the object of the enumerator
    State public state;

    // Defining function modifier 'instate'
    modifier instate(State expected_state) {
        require(state == expected_state);
        _;
    }

    // Defining function modifier 'onlyBuyer'
    modifier onlyBuyer() {
        require(msg.sender == buyer || msg.sender == arbiter);
        _;
    }

    // Defining function modifier 'onlySeller'
    modifier onlySeller() {
        require(msg.sender == seller);
        _;
    }

    // Defining a constructor
    constructor(address payable _buyer, address payable _seller, address payable _arbiter) {
        arbiter = _arbiter;
        buyer = _buyer;
        seller = _seller;
        state = State.awate_payment;
    }

    // Defining function to confirm payment with amount parameter
    function confirm_payment(uint _amount) onlyBuyer instate(State.awate_payment) public payable {
        require(msg.value == _amount, "Invalid payment amount"); // Check if the sent amount matches the expected amount
        state = State.awate_delivery;
    }

    function confirm_Delivery() onlyBuyer instate(
		State.awate_delivery) public{
		seller.transfer(address(this).balance);
		state = State.complete;
	}

	// Defining function to return payment
	function ReturnPayment() onlySeller instate(
		State.awate_delivery)public{
		buyer.transfer(address(this).balance);
	}
}

