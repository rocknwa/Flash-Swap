 
# Flash-Swap

This project demonstrates a Hardhat use case. It comes with a contract, a test for that contract, and a script that deploys that contract.

## Overview

Flash-Swap is a smart contract developed using Solidity and Hardhat. It implements a cross-protocol triangular arbitrage trading strategy between Uniswap and Sushiswap. The contract allows users to fund the contract, check token balances, place trades, and initiate triangular arbitrage by leveraging flash loans.

## Features

- **Flash Loan Arbitrage**: Executes triangular arbitrage trades between Uniswap and Sushiswap to exploit price differences.
- **Fund Contract**: Allows users to fund the contract with any ERC20 token.
- **Balance Check**: Provides a public view of the contract's token balance.
- **Trade Execution**: Facilitates token swaps using Uniswap and Sushiswap routers.
- **Profitability Check**: Ensures trades are profitable before executing them.

## Technologies Used

- **Solidity**: For writing the smart contract.
- **Hardhat**: For testing, deploying, and debugging the smart contract.
- **Uniswap and Sushiswap Interfaces**: For interacting with the decentralized exchanges.

## Getting Started

### Prerequisites

- Node.js version 18.14.1
- npm or yarn
- Hardhat

### Installation

Clone the repository and install the dependencies:

```shell
git clone https://github.com/rocknwa/Flash-Swap.git
cd Flash-Swap
npm install
```

### Running the Project

Compile the smart contract:

```shell
npx hardhat compile
```

Run the tests:

```shell
npx hardhat test
```

Deploy the contract:

```shell
npx hardhat run scripts/deploy.js
```

### Example Usage

To start an arbitrage trade, you can call the `startArbitrage` function with the token you want to borrow and the amount:

```solidity
startArbitrage(tokenAddress, amount);
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.
 

## Contact

For any inquiries or support, please contact therock ani at anitherock44@gmail.com.

---
