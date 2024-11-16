const { ethers } = require("hardhat");

async function Main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts to the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("UniswapCrossFlash");
  const token = await Token.deploy();

  console.log("Token address:", token.address);
}

Main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });