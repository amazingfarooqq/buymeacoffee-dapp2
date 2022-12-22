import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { coffeeContractAddress, coffeeContractjson, pageContractAddress, pageContractjson } from "../smartContractData/coffeeContract";
import { getData } from "./polybasesdk";
import { createCollection } from "./createSchema";
import { formatEther, parseEther } from 'ethers/lib/utils';

const ContextAPI = createContext({});

export const useContextAPI = () => useContext(ContextAPI);

export const ContextAPIProvider = ({ children }) => {
  const { library, active, account } = useWeb3React();

  const [signer, setSigner] = useState(null);

  const [message, setMessage] = useState({ message: "", color: "", isMessage: false })

  const [members, setMembers] = useState({isLoading: true, data: []})

  useEffect(() => {
        // fetchData();
  }, []);

  async function fetchData() {
    const membersdata = await getData()
    // createCollection(pvt, 'gggg').then(console.log)
    // .catch(console.error)

  
    setMembers(membersdata)
  }

  const fetchContract = async () => {
    const RPC = 'https://goerli.infura.io/v3/3d319cf813f841eba0cfeb6ac6c7e01c'
    const provider = new ethers.providers.JsonRpcProvider(RPC);
    const pageCon = new ethers.Contract(pageContractAddress, pageContractjson.abi, provider);
    const totalPageNfts = await pageCon.totalPageNfts()

    let data = [];
    for(let i=1; i<totalPageNfts ;i++){
      const pagenft = await pageCon.pageHolderAttributes(i)

      const pageid = i;
      const pagename = pagenft.pagename.toString()
      let donatePrice = pagenft.perCoffeePrice
      donatePrice = formatEther(donatePrice).toString()
      const imageURI = pagenft.imageURI.toString()
      const memberaddress = pagenft.memberaddress.toString()
      const totaldonater = pagenft.totaldonater.toString()

      const getcontributers = await pageCon.getContributers(i)

      data.push({
        pageid,pagename,donatePrice,imageURI,memberaddress,totaldonater,contributers: getcontributers
      })

    }

    setMembers({isLoading: false, data: data})

  }

  useMemo(() => {
    fetchContract()
  },[])

  useMemo(() => {
    if (library !== undefined) {
      setSigner(library?.getSigner(account));
    }
  }, [account]);


  return (
    <ContextAPI.Provider
      value={{
        signer, setSigner, message, setMessage, members, setMembers
      }}
    >
      {children}
    </ContextAPI.Provider>
  );
};