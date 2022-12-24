import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { pageContractAddress, pageContractjson } from "../smartContractData/coffeeContract";

export const pagefunc = async (contextpage) => {
    const RPC = 'https://goerli.infura.io/v3/3d319cf813f841eba0cfeb6ac6c7e01c'
    const provider = new ethers.providers.JsonRpcProvider(RPC);
    const pageCon = new ethers.Contract(pageContractAddress, pageContractjson.abi, provider);
    const pagenameExists = await pageCon.pagenameExists(contextpage);
    if(pagenameExists){
        const pagenametopageid = await pageCon.pagenametopageid(contextpage);
        const pagenametopageidString = pagenametopageid.toString()
        const pageHolderAttributes = await pageCon.pageHolderAttributes(pagenametopageidString);

        const pagename = pageHolderAttributes.pagename.toString()
        let donatePrice = pageHolderAttributes.perCoffeePrice
        donatePrice = formatEther(donatePrice).toString()
        const imageURI = pageHolderAttributes.imageURI.toString()
        const memberaddress = pageHolderAttributes.memberaddress.toString()
        const totaldonater = pageHolderAttributes.totaldonater.toString()
  
        const getcontributers = await pageCon.getContributers(pagenametopageidString)
        let totalamounttowithdraw = await pageCon.totalAmountForMemberToWithdraw(memberaddress)

        totalamounttowithdraw = formatEther(totalamounttowithdraw)

        let contributers = []
        for(let j=0;j<getcontributers.length;j++){

            const contributerid = getcontributers[j].contributerid.toString();
            const contributername = getcontributers[j].contributername;
            const contributermessage = getcontributers[j].contributermessage;
            const contributedcoffees = getcontributers[j].coffees.toString();
            const contributedtopage = getcontributers[j].contributetopage.toString();
            const contributerAddress = getcontributers[j].contributeraddress;
    
            contributers.push({
                contributerid, contributername, contributermessage,contributedcoffees , contributedtopage, contributerAddress
            })
          }
          
          return { props: { loading: false, pagenameExists , page: contextpage ,pagenametopageidString,pagename,donatePrice,imageURI,memberaddress,totaldonater, contributers, totalamounttowithdraw} };
        }else {
           return { props: { loading: false, pagenameExists , page: contextpage } };
        }

}