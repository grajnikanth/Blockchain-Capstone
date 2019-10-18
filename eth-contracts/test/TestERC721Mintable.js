//Testing the RealEstateERC721Token contract
var ERC721MintableComplete = artifacts.require('RealEstateERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];
    const account_five = accounts[4];
    const account_six = accounts[5];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
            
           // console.log(this.contract.events);
            

           // let ownerChangeEvents = this.contract.OwnerChanged({fromBlock: 0});
           //  console.log(ownerChangeEvents);

     //       this.contract.Transfer({fromBlock: 0}, function(error, event){ console.log(event); })
     /*       .on('data', function(event){
                console.log(event); // same results as the optional callback above
            })
            .on('changed', function(event){
                // remove event from local database
            })
            .on('error', console.error);
            */

         //  this.contract.OwnerChanged({fromBlock: 0}, function(error, event){ console.log(event); })

            // console.log(this.contract);
            // TODO: mint multiple tokens
            let result = await this.contract.mint(account_two,1,{from:account_one});
           // console.log(result.logs[0]);
            //console.log('Was able to mint the first token: '+result);
            await this.contract.mint(account_three,2,{from:account_one});
            await this.contract.mint(account_four,3,{from:account_one});
            await this.contract.mint(account_five,4,{from:account_one});


            
        })

        

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply.call();
            console.log('Total Supply so far = '+totalSupply);
            assert.equal(totalSupply.toNumber(), 4, "Total Supply reported by contract is not correct");
            
        })

        it('should get token balance', async function () { 
            let balance_two = await this.contract.balanceOf.call(account_two);
            console.log('Balance of account_two = '+balance_two);
            assert.equal(balance_two.toNumber(),1,"Account_two balance of tokens is accurate");
            
            let balance_three = await this.contract.balanceOf.call(account_three);
            console.log('Balance of account_two = '+balance_three);
            assert.equal(balance_three.toNumber(),1,"Account_two balance of tokens is accurate");
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURISet_one = 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1';
            let tokenURI_one = await this.contract.tokenURI.call(1);
            console.log('Base tokenURI at tokenId = 1 is '+tokenURI_one);
            assert.equal(tokenURI_one, tokenURISet_one,'TokenId = 1 URI does not match');  

            let tokenURISet_two = 'https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/2';
            let tokenURI_two = await this.contract.tokenURI.call(2);
            console.log('Base tokenURI at tokenId = 2 is '+tokenURI_two);
            assert.equal(tokenURI_two, tokenURISet_two,'TokenId = 2 URI does not match'); 
        })

        it('should transfer token from one owner to another', async function () { 
            let tokenTransfer = await this.contract.transferFrom(account_two, account_six, 1, {from: account_two});
            // console.log('Printing the event information for token transfer');
            // console.log(tokenTransfer.logs[0]);
            let tokenOwner = await this.contract.ownerOf.call(1);
            console.log('Account_six address is '+account_six);
            console.log('TokenId = 1 new owner is '+tokenOwner);
            assert.equal(tokenOwner, account_six, 'Token id = 1 transfer did not occur correctly');

            //check balance of account_two which should be 0 now that transfer has occured
            let balance_two = await this.contract.balanceOf.call(account_two);
            console.log('Balance of account_two = '+balance_two);
            assert.equal(balance_two,0,'Balance of account_two is not zore - incorrect');

        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            
            let accessDenied = false;
            try {
                let result = await this.contract.mint(account_two,1,{from:account_two});
            }
            catch(e) {
              accessDenied = true;
            }
            console.log('Boolean accessDenied value = '+accessDenied);
            assert.equal(accessDenied, true, "Account_two is not owner but was able to mint tokens - Incorrect");
            
        })

        it('should return contract owner', async function () { 
            let result = await this.contract.getOwner.call();
            console.log('Account_one address is '+account_one);
            console.log('Contract Owner address is '+result);
            assert.equal(result, account_one, 'Owner of the account is not acount_one - Incorrect');
        })

    });
})