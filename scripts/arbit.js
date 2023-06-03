const { ethers } = require("hardhat");

async function main() {
  // Deploying the Arbit contract
  const Arbit = await ethers.getContractFactory("Arbit");
  const buyerAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; // Replace with the actual buyer's address
  const sellerAddress = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"; // Replace with the actual seller's address
  const arbiterAddress = "0x90F79bf6EB2c4f870365E785982E1f101E93b906";
  const arbit = await Arbit.deploy(buyerAddress, sellerAddress, arbiterAddress);
  await arbit.deployed();

  console.log("Arbit contract deployed to:", arbit.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
