require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  // networks: {
  //   sepolia: {
  //     url: 'https://eth-sepolia.g.alchemy.com/v2/FptvlY2QcvGVRxbdAgm6tdvuHGvKezCj',
  //     account: ['7cd2573067cba6b647f40e54f4d71351a80e0d0d1a6f75a516cf573fdadb1259']
  //   }
  // }
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/FptvlY2QcvGVRxbdAgm6tdvuHGvKezCj", // Replace with the actual RPC URL
      accounts: ["7cd2573067cba6b647f40e54f4d71351a80e0d0d1a6f75a516cf573fdadb1259"], // Replace with your mnemonic phrase
      // chainId: 11155111 // Replace with the actual network ID
    },
  },
};
