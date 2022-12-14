  
  describe("CoffeContract", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    // Contracts are deployed using the first signer/account by default

    let owner , a1 , a2 , pageContract;
    describe("tests", async function () {
        it("deploy", async function () {
            [owner, a1 , a2] = await ethers.getSigners();
        
            let PageNFTFactory = await ethers.getContractFactory("PageNFT");
            pageContract = await PageNFTFactory.deploy();
        });
        it("Register page1", async function () {
          let mint = await pageContract.mintPageNFT(a1.address, "farooq", "this");
          await mint.wait()

          let pageHolderAttributes = await pageContract.pageHolderAttributes("1");

          console.log('pageHolderAttributes' , pageHolderAttributes);
        });
        it("Register page1", async function () {


        });
    });

  
  });
  ""