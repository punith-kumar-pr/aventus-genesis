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
    const [confirmState, setConfirmState] = useState(0)
    // const [orderNum, setOrderNum] = useState()

    

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

    

    
    const confirmPay = async () => {
        const transactionContract = getEthereumContract();
        // const acc = '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC';
        const amount = "0.00236";
        const gasLimit = 300000; // Specify the desired gas limit here
        const pay = await transactionContract.confirm_payment({
            value: ethers.utils.parseEther(amount),
            gasLimit: gasLimit
        });
        setPaymentState(1)
        console.log("confirm payment", pay)
        return pay;
      }
      
      const confirmDel = async () => {
        const gasLimit = 3000000;
        const transactionContract = getEthereumContract();
        const del = await transactionContract.confirm_Delivery({gasLimit: gasLimit})
        setConfirmState(1)
        console.log("confirm delivery", del)
        return del
      }
      
      const confirmRet = async () => {
        const gasLimit = 3000000;
        const transactionContract = getEthereumContract();
        const ret = await transactionContract.ReturnPayment({gasLimit: gasLimit});
        setConfirmState(1)
        console.log("confirm delivery", ret)
        return ret
      }


    useEffect(() => {
        checkIfWalletIsConnect();
        // checkIfTransactionsExists();
    }, [])

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, confirmPay, confirmDel, confirmRet, paymentState, confirmState}}>
            {children}
        </TransactionContext.Provider>
    )
}