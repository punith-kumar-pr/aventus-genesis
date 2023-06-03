const { ethers } = require("hardhat");

async function main() {
  // Deploy OrderEscrow contract
  const New = await ethers.getContractFactory("New");
  // const buyer = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; // Replace with buyer's address
  // const seller = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"; // Replace with seller's address
  const buyer = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  const seller = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
  const newx = await New.deploy(buyer, seller);

  await newx.deployed();

  console.log("OrderEscrow contract deployed to:", newx.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
