// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

contract Final{

	// Declaring the state variables
	address payable public buyer;
	address payable public seller;
	address payable public arbiter;
	
	// Defining a enumerator 'State'
	enum State{
		
		// Following are the data members
		awate_payment, awate_delivery, complete
	}

	// Declaring the object of the enumerator
	State public state;
	
	// Defining function modifier 'instate'
	modifier instate(State expected_state){
		
		require(state == expected_state);
		_;
	}

	// Defining function modifier 'onlyBuyer'
	modifier onlyBuyer(){
		require(msg.sender == buyer ||
				msg.sender == arbiter);
		_;
	}

	// Defining function modifier 'onlySeller'
	modifier onlySeller(){
		require(msg.sender == seller);
		_;
	}
	
	// Defining a constructor
	constructor(address payable _buyer,
				address payable _sender){
		
		// Assigning the values of the
		// state variables
		arbiter = payable(msg.sender);
		buyer = _buyer;
		seller = _sender;
		state = State.awate_payment;
	}
	
	// Defining function to confirm payment
	function confirm_payment() onlyBuyer instate(
		State.awate_payment) public payable{
		state = State.awate_delivery;
	}
	
	// Defining function to confirm delivery
	function confirm_Delivery() onlyBuyer instate(
		State.awate_delivery) public{
		seller.transfer(address(this).balance);
		// state = State.complete;
        state = State.awate_payment;
	}

	// Defining function to return payment
	function ReturnPayment() onlyBuyer instate(
		State.awate_delivery)public{
		// buyer.transfer(address(this).balance);
		payable(msg.sender).transfer(address(this).balance);
        state = State.awate_payment;
	}
}
