
var SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
var SquareVerifier = artifacts.require('SquareVerifier');
var Proof = require('../../zokrates/code/square/proof.json');

console.log('Printing values stored in proof.json');
console.log(Proof);
console.log('Proof.proof');
console.log(Proof.proof);
console.log('Proof.inputs');
console.log(Proof.inputs);

contract('TestSolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];
    const account_five = accounts[4];
    const account_six = accounts[5];

    describe('Solutions Verification and Minting', function () {
        beforeEach(async function () { 
            this.squareVerifier = await SquareVerifier.new({from: account_one});
            this.solnSquareVerifier = await SolnSquareVerifier.new(this.squareVerifier.address, {from: account_one});
        });
    
        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('Should be able to add new solution for contract - SolnSquareVerifier', async function () { 
           
           let result = await this.solnSquareVerifier.testAddSolutions(account_two, 1, Proof.proof.a,
                        Proof.proof.b, Proof.proof.c, Proof.inputs, {from: account_one});
            console.log('Verified the solution and added solution to the database - below is the event for the same');
            // Looking for if event AddedSolution was emitted
            console.log(result.logs[0]);

            assert.equal(result.logs[0].args.tokenId, 1, 'TokenId should be = 1 - Incorrect');
            assert.equal(result.logs[0].args.to, account_two, 'to address should be account_two - Incorrect');
            
        });

        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('Should be able to mint token once Verifier.sol returns true - SolnSquareVerifier', async function () { 
            
            let result = await this.solnSquareVerifier.mint(account_two, 1, Proof.proof.a,
                         Proof.proof.b, Proof.proof.c, Proof.inputs);
            console.log('Verified the solution and minted tokenId = 1');
            // Looking for if event AddedSolution was emitted
            console.log(result.logs);
            assert.equal(result.logs[0].args.tokenId, 1, 'TokenId should be = 1 - Incorrect');
            console.log('Account_two address is ');
            console.log(account_two);
            assert.equal(result.logs[0].args.to, account_two, 'to address should be account_two - Incorrect');

            //verify that account_two was assigned the tokens minted above
            let balance_two = await this.solnSquareVerifier.balanceOf.call(account_two);
            console.log('Balance of account_two = '+balance_two);
            assert.equal(balance_two.toNumber(),1,"Account_two balance of tokens is accurate");
             
        });

    });
});


