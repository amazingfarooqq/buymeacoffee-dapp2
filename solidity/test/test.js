  
  describe("CoffeContract", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    // Contracts are deployed using the first signer/account by default

    let owner , a1 , a2 , coffeeContract;
    describe("tests", async function () {
        it("deploy", async function () {
            [owner, a1 , a2] = await ethers.getSigners();
        
            let CoffeeContractFactory = await ethers.getContractFactory("CoffeContract");
            coffeeContract = await CoffeeContractFactory.deploy();
        });
        it("Register page1", async function () {
          let RegisterDomain1 = await coffeeContract.RegisterPage("farooq");

          await RegisterDomain1.wait()


        });
        it("Register page1", async function () {
          let RegisterDomain2 = await coffeeContract.RegisterPage("farooq");
          await RegisterDomain2.wait()


        });
    });

  
  });
  ""