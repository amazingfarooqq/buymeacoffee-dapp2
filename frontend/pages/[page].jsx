import Link from 'next/link'
import React, { useContext, useMemo } from 'react'
import { useRouter } from "next/router"
import { useEffect } from 'react';
import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { IntegrationWallets } from '../components/Wallet/IntegratedWallets';
import { ethers } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { useContextAPI } from '../lib/contextapi';
import MessageBox from '../components/MessgeBox/MessageBox';
import { getData, updateCoffeePrice , buyCoffee} from '../lib/polybasesdk';
import { Polybase } from '@polybase/client';
import { pageContractAddress, pageContractjson } from '../smartContractData/coffeeContract';
import { pagefunc } from '../lib/functions';
import PageLoading from '../components/Page/PageLoading';
import PageNotFound from '../components/Page/PageNotFound';
import PageExist from '../components/Page/PageExist';

export async function getServerSideProps(context) {
    
    // const RPC = 'https://goerli.infura.io/v3/3d319cf813f841eba0cfeb6ac6c7e01c'
    // const provider = new ethers.providers.JsonRpcProvider(RPC);
    // const pageCon = new ethers.Contract(pageContractAddress, pageContractjson.abi, provider);
    // const pagenameExists = await pageCon.pagenameExists(context.query.page);
    // console.log({pagenameExists});
    // if(pagenameExists){
    //     const pagenametopageid = await pageCon.pagenametopageid(context.query.page);
    //     const pagenametopageidString = pagenametopageid.toString()
    //     const pageHolderAttributes = await pageCon.pageHolderAttributes(pagenametopageidString);

    //     const pagename = pageHolderAttributes.pagename.toString()
    //     let donatePrice = pageHolderAttributes.perCoffeePrice
    //     donatePrice = formatEther(donatePrice).toString()
    //     const imageURI = pageHolderAttributes.imageURI.toString()
    //     const memberaddress = pageHolderAttributes.memberaddress.toString()
    //     const totaldonater = pageHolderAttributes.totaldonater.toString()
  
    //     const getcontributers = await pageCon.getContributers(pagenametopageidString)

    //     let contributers = []
    //     for(let j=0;j<getcontributers.length;j++){

    //         const contributerid = getcontributers[j].contributerid.toString();
    //         const contributername = getcontributers[j].contributername;
    //         const contributermessage = getcontributers[j].contributermessage;
    //         const contributedcoffees = getcontributers[j].coffees.toString();
    //         const contributedtopage = getcontributers[j].contributetopage.toString();
    //         const contributerAddress = getcontributers[j].contributeraddress;
    
    //         contributers.push({
    //             contributerid, contributername, contributermessage,contributedcoffees , contributedtopage, contributerAddress
    //         })
    //       }
          
    //       console.log({
    //         pagenametopageidString,pagename,donatePrice,imageURI,memberaddress,totaldonater,contributers
    //       })

    //       return { props: { pagenameExists , page: context.query.page ,pagenametopageidString,pagename,donatePrice,imageURI,memberaddress,totaldonater, contributers } };



    // }else {
    //     return { props: { pagenameExists , page: context.query.page } };
    // }

    return { props: { page: context.query.page } };


  }

const page = (props) => {

    const {message, setMessage} = useContextAPI()

    const [page, setPage] = useState({ loading: true,pagenametopageidString:"", pagenameExists:false, contributedcoffees:"", pagename:"",donatePrice:"",imageURI:"",memberaddress: "",totaldonater:"", contributers:[] })

    const fetch = async () => {
        
        const data = await pagefunc(props.page)
        const { loading, pagenametopageidString, pagenameExists, contributedcoffees, pagename,donatePrice,imageURI,memberaddress,totaldonater, contributers } = data.props

        setPage({ loading, pagenametopageidString, pagenameExists, contributedcoffees, pagename,donatePrice,imageURI,memberaddress,totaldonater, contributers })
    }

    useEffect(() => {
        fetch()
    },[])


  return (

        <>
        {message?.isMessage &&
        <div className="container-fluid" style={{ position: 'fixed', top: '50px', right: '20px', zIndex: '111111', width: "300px" }}>
            <MessageBox message={message} setMessage={setMessage} value={0}/>
        </div>}


            {page.loading &&
                <PageLoading />
            }

            {!page.loading && page.pagenameExists &&
              <PageExist page={page} setPage={setPage}/>
            }

            {!page.loading && !page.pagenameExists &&
                <PageNotFound membername={props.page}/>
            }
        </>
  )
}

export default page