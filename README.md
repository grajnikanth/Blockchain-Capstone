# Udacity Blockchain Capstone - Real Estate NFT Tokens
In this project I worked on creating a decentralized House Listing Service. The service seeks to eliminate title fraud using Blockchain. This is done by building immutable digital records and using Blockchain for transparent transactions. This will help to remove the title insurance to mitigate fraud which typically needs to be purchased by the owner in current paper based real estate transactions.

In this project I minted my own tokens to represent title to the properties I own. Before I mint a token, I provide proof that I own the property. I used zk-SNARKs to create a verification system which can prove I have title to the property without revealing specific information on the property. This was done using the Zokrates toolbox https://zokrates.github.io/

Once the token has been verified I placed it on a blockchain market place (OpenSea) for others to purchase.

Once the token has been verified I minted 10 NFT tokens and deployed it on Rinkeby Network. Then I uploaded 5 of these tokens to blockchain market place (OpenSea - Rinkeby) for others to purchase https://rinkeby.opensea.io/. Then I proceeded to sell the tokens. To show that this works I bought these NFT tokens using a different account on OpenSea. 

## Install
This repository contains Smart Contract code in Solidity (using Truffle), tests (also using Truffle) and zk-Snarks generated proofs and verifier contract.

To install, download or clone the repo, then:

npm install

Start Ganache by using

ganache-cli

In a separate terminal window,from inside the directory eth-contracts/ Compile smart contracts:

truffle compile

This will create the smart contract artifacts in folder build\contracts.

Then compile and deploy with truffle.
To deploy to local ganache blockchain use

truffle migrate

To deploy to Rinkeby testnet use

truffle migrate --reset --network rinkeby

## Testing
To run truffle tests from inside the directory eth-contracts/:

truffle test ./test/TestERC721Mintable.js
truffle test ./test/TestSquareVerifier.js
truffle test ./test/TestSolnSquareVerifier.js

## Deployment
1. Create an account in Infura
2. Create a project in Infura and get the Address for deploying in Rinkeby test network
3. Copy the endpoint address and update the Rinkeby network information with the mnemonic and endpoint address in Truffle.js file
4. Fund the metamask wallet by posting a tweet in https://faucet.rinkeby.io. The post should have the address “ Requesting faucet funds into ……. On the Rinkeby Ethereum test network” Then copy the tweet in the above website and click Give me Ether.
5. Then deploy it using: truffle migrate --reset --network rinkeby. 

## Create ZK-Snarks Proof using Zokrates
1. Install Docker Community Edition here (https://docs.docker.com/install/). Virtualization should be enabled for Docker to work.

2. Run Zokrates docker container : docker run -v :/home/zokrates/code -ti zokrates/zokrates:0.3.0 /bin/bash

3. Change directory cd code/zokrates/code/square/

4. Compile the program written in ZoKrates DSL /path/to/zokrates compile -i square.code

5. Generate the Trusted Setup Now take the 'flattened' code, which is a circuit and go through a 'trusted setup' Repeat this process, every-time the program.code changes Two keys are generated - 'proving.key' and 'verification.key'

/path/to/zokrates setup

6. Compute Witness Having gone through the 'trusted setup' let's compute our 'witness' who knows the answer and it generates a witness file with computation steps

/path/to/zokrates compute-witness -a 3 9

7. Generate Proof Next step is to 'generate our proof' based on the above 'witness'. A proof.json file is generated in this step
/path/to/zokrates generate-proof

8. Export Verifier Last but never the least, let's generate our 'verifier' smart contract
path/to/zokrates export-verifier

9. Copy the verifier.sol file to the /eth-contracts/contracts/ folder.

## Minting Tokens
1. Mint 10 tokens using Myetherwallet (MEW) contract interaction website https://www.myetherwallet.com/interface/interact-with-contract using Metamask wallet.

2. Copy and paste the contract address deployed to rinkeby.

3. Copy and past the ABI from artifacts located in the /build/contracts/SolnSquareVerifier.json file onto MEW website.

3. Select the mint function associated with the contract RealEstateERC721Token to mint 10 tokens.

## OpenSea Marketplace 
1. On rinkeby OpenSea market place create storefront and import token using the "add an existing contract" button using the rinkeby deployed contract address. https://rinkeby.opensea.io/


## Project Contract Addresses and Links
1. contract address(SolnSquareVerifier): 0xb603Bfa595D125299b11F01A68A805F50698B332
    https://rinkeby.etherscan.io/address/0xb603Bfa595D125299b11F01A68A805F50698B332
    https://rinkeby.etherscan.io/address/0x653f83723da88edfce875573900fe398e40f1ee1
    https://rinkeby.etherscan.io/address/0xbe67a7afba64de1dab71b55f5c67acba68b6fa76
2. contract address(SquareVerifier): 0xd29bF0cFe162c991b735FdE27405777D2ed536bA
    https://rinkeby.etherscan.io/address/0xd29bF0cFe162c991b735FdE27405777D2ed536bA
3. The contract ABIs are located in the corresponding .json files under the folder build/contracts


# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
