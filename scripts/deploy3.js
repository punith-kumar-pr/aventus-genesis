const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = hre.ethers.utils.parseEther("0.001");

  const Kirua = await hre.ethers.getContractFactory("Lock");
  const kirua = await Kirua.deploy(unlockTime, { value: lockedAmount });

  await kirua.deployed();

  console.log(
    `Lock with ${ethers.utils.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${kirua.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
