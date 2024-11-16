require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      { version: "0.5.5" },
      { version: "0.6.6" },
      { version: "0.8.8" },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/wLkk9nE5kZ9x7iXZ15vBaxgjRkU9kzrp",
      },
    },
    testnet: {
      url: "https://eth-sepolia.g.alchemy.com/v2/ea53ckBxoMTtVgFyI449E7IP9-oeWxpv",
      chainId: 11155111,
      accounts: [
        "",
      ],
    },
    mainnet: {
      url: "https://eth-mainnet.g.alchemy.com/v2/wLkk9nE5kZ9x7iXZ15vBaxgjRkU9kzrp",
      chainId: 1,
      accounts : [
        " ",
      ]
    },
  },

  mocha: {
    // Specify ESM loader for Mocha
    // This will enable the use of ES Modules in your tests
    // You can also set other Mocha options here if needed
    require: 'esm',
  },
};

