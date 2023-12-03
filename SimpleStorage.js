const ethers = require('ethers');

// Replace with your Infura API key and the wallet address with Ether for contract deployment
const infuraApiKey = 'YourInfuraApiKey';
const deployerWalletPrivateKey = 'YourPrivateKey';

// Simple Solidity smart contract
const simpleContractSource = `
  pragma solidity ^0.8.0;

  contract SimpleStorage {
      uint256 private value;

      function setValue(uint256 _value) public {
          value = _value;
      }

      function getValue() public view returns (uint256) {
          return value;
      }
  }
`;

async function deployContract() {
    try {
        // Connect to the Ethereum network using Infura
        const provider = new ethers.providers.InfuraProvider('ropsten', infuraApiKey);

        // Create a wallet for deploying the contract
        const deployerWallet = new ethers.Wallet(deployerWalletPrivateKey, provider);

        // Compile the Solidity code
        const simpleContractFactory = new ethers.ContractFactory(simpleContractSource, simpleContractSource, deployerWallet);

        // Deploy the contract
        const simpleContract = await simpleContractFactory.deploy();

        // Wait for transaction confirmation
        await simpleContract.deployed();

        console.log('Contract deployed to address:', simpleContract.address);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

deployContract();
