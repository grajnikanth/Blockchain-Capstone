# Udacity Blockchain Capstone - Real Estate NFT Tokens
In this project I am minting my own tokens to represent my title to real estate properties I own. To provide proof that I own these properties, I used zk-SNARKs to create a verification system which can prove I have title to the property without revealing that specific information on the property. This was done using the Zokrates toolbox https://zokrates.github.io/

Once the token has been verified I minted 10 NFT tokens and deployed it on Rinkeby Network. Then I uploaded 5 of these tokens to blockchain market place (OpenSea - Rinkeby) for others to purchase https://rinkeby.opensea.io/. Then I proceeded to sell the tokens and bought them using a different account. 

## Install
This repository contains Smart Contract code in Solidity (using Truffle), tests (also using Truffle) and zk-Snarks generated proofs and verifier contract.

To install, download or clone the repo, then:

npm install

Start Ganache like below .
ganache-cli

In a separate terminal window,from inside the directory eth-contracts/ Compile smart contracts:

truffle compile

This will create the smart contract artifacts in folder build\contracts.

Then compile and deploy with truffle.
To deploy to local ganache blockchain use
truffle migrate

To deploy to Rinkeby testnet use
truffle migrate --reset --network rinkeby


# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
