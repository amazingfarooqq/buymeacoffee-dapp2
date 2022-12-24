const { ethers, waffle} = require("hardhat");

  describe("CoffeContract", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    // Contracts are deployed using the first signer/account by default

    let owner , a1 , a2 , pageContract;
    describe("tests", async function () {
        it("deploy", async function () {
            [owner, a1 , a2] = await ethers.getSigners();
        
            let DonaterNFTFactory = await ethers.getContractFactory("DonaterNFT");
            pageContract = await DonaterNFTFactory.deploy();
        });
        it("Register page1", async function () {

          let mint = await pageContract.connect(a1).mintPageNFT( "farooq", "this");
          await mint.wait()



          // let getpage = await pageContract.pageHolderAttributes(1)
          // console.log({getpage});

          console.log('check balance a2' , await waffle.provider.getBalance(a2.address)); // 10000000000000000000000
          let buycoffee = await pageContract.connect(a2).donateToPage(1, 1, "ahmed", "amazing page",{value: "9999999999999999999999"});
          await buycoffee.wait()
          console.log('check balance a2' , await waffle.provider.getBalance(a2.address));


          let withDraw = await pageContract.connect(a1).WithdrawAmount(1);
          await withDraw.wait()



        });
    });

  
  });
  ""
  