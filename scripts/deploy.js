const hre = require("hardhat");

async function main() {
  const CidStorage = await hre.ethers.getContractFactory("CidStorage");
  const cidStorage = await CidStorage.deploy();

  await cidStorage.waitForDeployment();
  console.log("Deployed to:", await cidStorage.getAddress());
}

main().catch(console.error);