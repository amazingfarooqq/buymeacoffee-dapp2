
describe("Lock", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
  
      let lottery, sigmantarian, pool, sigmantarianToken
      let owner, addr1, addr2, addr3, addr4, addr5, addr6, addr7
    
      it("deploy smart lottery", async function () {
        ;[owner, addr1, addr2, addr3, addr4, addr5, addr6, addr7] = await ethers.getSigners()
    
        const Lottery = await ethers.getContractFactory("Lottery")
        lottery = await Lottery.deploy()
  
  
        await lottery.connect(addr1).buyTicket(1, {value: "5000000000000000"} );
        await lottery.connect(addr2).buyTicket(2, {value: "5000000000000000"} );
        await lottery.connect(addr3).buyTicket(3, {value: "5000000000000000"} );
        
        // await lottery.sendReward();
        

        await lottery.sendRewardAfter5days();

        
  
  
    
      })
  
  });