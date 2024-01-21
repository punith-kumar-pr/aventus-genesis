const { ethers } = require("hardhat");

async function main() {
  // Deploy OrderEscrow contract
  const Final = await ethers.getContractFactory("contracts/final-v.sol:Final");
  // const buyer = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; // Replace with buyer's address
  // const seller = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"; // Replace with seller's address
  // buyer is account 2, seller is account 7, and arbiter is deployed account i.e. account 1   
  const buyer = "0xc3eF3F5ef2fb8A80aad04d8C99113CeFF974e4c1"
  const seller = "0xb2EfE5E7eaFFbEe2Cb2aaf64f5BE79e7b6ac5D54"
  const final = await Final.deploy(buyer, seller);

  await final.deployed();

  console.log("Final contract deployed to:", final.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });