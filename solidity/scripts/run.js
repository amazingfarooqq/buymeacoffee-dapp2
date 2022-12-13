const fs = require("fs");

const main = async () => {

      const coffeeContractFactory = await hre.ethers.getContractFactory('CoffeContract');
      const coffeeContract = await coffeeContractFactory.deploy();
    
      await coffeeContract.deployed(); 
    
     console.log("Coffee Contract deployed to:", coffeeContract.address);

     const contractArtifactCoffeContract = artifacts.readArtifactSync("CoffeContract");

     fs.writeFileSync('../frontend/smartContractData/coffeeContract.js', `
     export const coffeeContractAddress = "${coffeeContract.address}"
     export const coffeeContractjson = ${JSON.stringify(contractArtifactCoffeContract, null, 2)}
     `)
   
    };
    
    const runMain = async () => {
      try {
        await main();
        process.exit(0);
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
    };
    
    runMain();
    