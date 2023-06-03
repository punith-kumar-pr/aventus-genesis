import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';

import { contractAbi, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

// const { ethereum } = window;
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    // console.log(signer)
    const transactionContract = new ethers.Contract(contractAddress, contractAbi, signer);


    console.log({
        provider, signer,
        transactionContract
    })
    return transactionContract;
}



export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [paymentState, setPaymentState] = useState(0)
    const [orderNum, setOrderNum] = useState()

    

    // check for meta mask connection

    const checkIfWalletIsConnect = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                console.log(accounts[0])
                // getAllTransactions();
                const transactionContract = getEthereumContract();
                // console.log(transactionContract.orderCount)
                
                console.log(transactionContract)
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    {// const checkIfTransactionsExists = async () => {
        //     try {
        //       if (ethereum) {
        //         const transactionsContract = createEthereumContract();
        //         const currentTransactionCount = await transactionsContract.getTransactionCount();

        //         window.localStorage.setItem("transactionCount", currentTransactionCount);
        //       }
        //     } catch (error) {
        //       console.log(error);

        //       throw new Error("No ethereum object");
        //     }
        //   };
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            console.log(accounts[0])
            setCurrentAccount(accounts[0]);
            const transactionContract = getEthereumContract()
            console.log(transactionContract)

        } catch (error) {
            console.log(Error);

            throw new Error('No ethereum object');
        }
    }

    // const orderPayment =  async (
    //     itemIds,
    //     itemNames,
    //     itemCosts,
    //     deliveryAddress,
    //     paymentAmount
    // ) => {
    //     createOrder (itemIds,itemNames,itemCosts,deliveryAddress,paymentAmount)
    //     const transactionContract = getEthereumContract();
    //     confirmPayment(transactionContract.orderCount - 1)
    // }

    const createOrder = async (
        itemIds,
        itemNames,
        itemCosts,
        deliveryAddress,
        paymentAmount
    ) => {
    
        const transactionContract = getEthereumContract();
        try {
            console.log("Hi kirua")
            const order = await transactionContract.createOrder(
                itemIds,
                itemNames,
                itemCosts,
                deliveryAddress,
                paymentAmount
            );
            
            // const payment = await confirmPayment(transactionContract.orderCount - 1)
            console.log(typeof order)
            console.log("order count --->", transactionContract.getOrder(2))
            

            return order;
        } catch (error) {
            console.log(error);
            
            // console.log(order)
        }
    };

    const confirmPayment = async (orderNo) => {
        try {
            const transactionContract = getEthereumContract();

            const confirmedPayment = await transactionContract.confirmPayment(orderNo, {value : ethers.utils.parseEther('50').toString()} );
            setOrderNum(orderNo)
            setPaymentState(1)
            return confirmedPayment;
        } catch (error) {
            console.log(error);
        }
    };

    const revertPayment = async (orderNo) => {
        try {
            const transactionContract = getEthereumContract();
            const paymentReverted = await transactionContract.revertPayment(orderNo);
            return paymentReverted;
        } catch (error) {
            console.log(error);
        }
    };

    const confirmDelivery = async (orderNo) => {
        try {
            const transactionContract = getEthereumContract();
            const deliveryConfirmed = await transactionContract.confirmDelivery(orderNo);
            return deliveryConfirmed;
        } catch (error) {
            console.log(error);
        }
    };





    useEffect(() => {
        checkIfWalletIsConnect();
        // checkIfTransactionsExists();
    }, [])

    return (
        // <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading }}>
        //     {children}
        // </TransactionContext.Provider>
        <TransactionContext.Provider value={{ connectWallet, currentAccount, createOrder, confirmPayment, revertPayment, confirmDelivery, paymentState, orderNum }}>
            {children}
        </TransactionContext.Provider>
    )
}