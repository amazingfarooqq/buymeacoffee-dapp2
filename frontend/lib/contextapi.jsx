import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { coffeeContractAddress, coffeeContractjson } from "../smartContractData/coffeeContract";
import { getData } from "./polybasesdk";
import { createCollection } from "./createSchema";

const ContextAPI = createContext({});

export const useContextAPI = () => useContext(ContextAPI);

export const ContextAPIProvider = ({ children }) => {
  const { library, active, account } = useWeb3React();

  const [signer, setSigner] = useState(null);

  const [message, setMessage] = useState({ message: "", color: "", isMessage: false })

  const [members, setMembers] = useState([])

  useEffect(() => {
        fetchData();
  }, []);

  async function fetchData() {
    const membersdata = await getData()
    // createCollection(pvt, 'gggg').then(console.log)
    // .catch(console.error)

  
    setMembers(membersdata)
  }

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