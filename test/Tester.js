const { expect, assert } = require("chai");
const { ethers, waffle } = require("hardhat");
const { impersonateFundErc20 } = require("../utils/utilities");

const {
  abi,
} = require("../artifacts/contracts/interfaces/IERC20.sol/IERC20.json");

const provider = waffle.provider;

describe("FlashSwap  Contract", () => {
  let FLASHSWAP, BORROW_AMOUNT, FUND_AMOUNT, InitialFundingHuman, txArbitrage;

  const DECIMALS = 6;
  const USDC_WHALE = "0xf89d7b9c864f589bbf53a82105107622b35eaa40";
  const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const LINK = "0x514910771AF9Ca656af840dff83E8264EcF986CA";

  const BASE_TOKEN_ADDRESS = USDC;

  const tokenBase = new ethers.Contract(BASE_TOKEN_ADDRESS, abi, provider);

  beforeEach(async () => {
    // get the owner as signer
    [owner] = await ethers.getSigners();

    // ensure the WHALE has a balance
    const whale_balance = await provider.getBalance(USDC_WHALE);
    expect(whale_balance).not.equal("0");

    // deploy smart contract
    const FlashSwap = await ethers.getContractFactory("UniswapCrossFlash");
    FLASHSWAP = await FlashSwap.deploy();
    await FLASHSWAP.deployed();

    // configure our borrow
    const borrowAmountHuman = "1";
    BORROW_AMOUNT = ethers.utils.parseUnits(borrowAmountHuman, DECIMALS);

    // configure funding - FOR TESTING ONLY
    InitialFundingHuman = "0";
    FUND_AMOUNT = ethers.utils.parseUnits(InitialFundingHuman, DECIMALS);

    // fund our contract - FOR TESTING ONLY
    await impersonateFundErc20(
      tokenBase,
      USDC_WHALE,
      FLASHSWAP.address,
      InitialFundingHuman,
      DECIMALS
    );
  });

  describe("Arbitrage Execution", () => {
    it("ensure the contract is funded", async () => {
      const FlashSwapBalance = await FLASHSWAP.getBalanceOfToken(
        BASE_TOKEN_ADDRESS
      );

      const FlashSwapBalanceHuman = ethers.utils.formatUnits(
        FlashSwapBalance,
        DECIMALS
      );

      expect(Number(FlashSwapBalanceHuman)).to.equal(
        Number(InitialFundingHuman)
      );
    });

    it("executes the arbitrage", async () => {
      txArbitrage = await FLASHSWAP.startArbitrage(
        BASE_TOKEN_ADDRESS,
        BORROW_AMOUNT
      );

      assert(txArbitrage);

      // print the balances
      const contractBalanceUSDC = await FLASHSWAP.getBalanceOfToken(USDC);
      const formattedBalUSDC = Number(
        ethers.utils.formatUnits(contractBalanceUSDC, DECIMALS)
      );

      console.log("Balance of BUSD: " + formattedBalUSDC);

      const contractBalanceLINK = await FLASHSWAP.getBalanceOfToken(LINK);
      formattedBalLINK = Number(
        ethers.utils.formatUnits(contractBalanceLINK, DECIMALS)
      );

      console.log("Balance of LINK: " + formattedBalLINK);
    });

    it("provides gas output", async () => {
      const txReceipt = await provider.getTransactionReceipt(txArbitrage.hash);
      const effGsaPrice = txReceipt.effectiveGasPrice;
      const txGasUsed = txReceipt.gasUsed;
      const gasUsedETH = effGsaPrice * txGasUsed;
      console.log(
        "Total Gas USD: " +
          ethers.utils.formatEther(gasUsedETH.toString()) * 2239
      );
      expect(gasUsedETH).not.equal(0);
    });
  });
});

// nvm install 18.14.1
