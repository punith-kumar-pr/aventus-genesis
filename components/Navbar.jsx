import React, { useContext } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './';
import { useStateContext } from '../context/StateContext';
import { TransactionContext } from "../context/TransactionContext";
const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const { connectWallet, currentAccount } = useContext(TransactionContext)

  console.log("nav bar", currentAccount)
  return (
    <>
      <div className="navbar-container">
        <p className="logo">
          <Link href="/">JSM Headphones</Link>
        </p>

        <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
        {showCart && <Cart />}
      </div>
      {!currentAccount && (
        <button type="button" onClick={connectWallet}>
          Connect Wallet
        </button>
      )
    }
    <p>Connected wallet: {currentAccount}</p>
    </>

  )
}

export default Navbar