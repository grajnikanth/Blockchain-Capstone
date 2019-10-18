// migrating the appropriate contracts
var SquareVerifier = artifacts.require("./SquareVerifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function(deployer) {

  //first deploy the SquareVerifier contract and then use it's address to deploy SolnSquareVerifier
  // all the rest of the contracts are inherited by SolnSquareVerifier contract indirectly
  deployer.deploy(SquareVerifier)
  .then(() => {
    
    return deployer.deploy(SolnSquareVerifier, SquareVerifier.address);

  })
};

