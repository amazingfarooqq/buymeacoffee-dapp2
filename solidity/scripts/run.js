const fs = require("fs");

const main = async () => {
    
    
    const DonaterNFTFactory = await hre.ethers.getContractFactory('DonaterNFT');
    const pageContract = await DonaterNFTFactory.deploy();
    
    await pageContract.deployed(); 
    console.log("pageContract deployed to:", pageContract.address);
    
    
    const contractArtifactPageContract = artifacts.readArtifactSync("DonaterNFT");
    fs.writeFileSync('../frontend/smartContractData/coffeeContract.js', `
     export const pageContractAddress = "${pageContract.address}"
     export const pageContractjson = ${JSON.stringify(contractArtifactPageContract, null, 2)}
     `)


    // await pageContract.mintPageNFT(process.env.PUBLIC_KEY, "haider", "https://avatars.githubusercontent.com/u/75162162?v=4")
    // await pageContract.donateToPage(1, 1, 'ahmed', "Amazing page")
    // donateToPage(uint _coffees, uint _pageid,string memory _contributername, string memory _contributermessage)
    // await pageContract.mintDonaterNFT(process.env.PUBLIC_KEY, "hazique", "https://avatars.githubusercontent.com/u/75162162?v=4")
   
    console.log('done minting');
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
    