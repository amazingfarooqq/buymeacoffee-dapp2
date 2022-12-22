import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import Link from 'next/link'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { pageContractAddress, pageContractjson } from '../../smartContractData/coffeeContract'
import { IntegrationWallets } from '../Wallet/IntegratedWallets'

const Header = () => {
    const {active , account, library} = useWeb3React()

    const [member, setMember] = useState({membername:""})

    console.log('member',member); 
    const fetch = async () => {
        if(active){
            const signer = library?.getSigner(account)
            const pageCon = new ethers.Contract(pageContractAddress, pageContractjson.abi, signer)
            const addresstopagename = await pageCon.addresstopagename(account)
            setMember({membername: addresstopagename})

        }
    }

    useEffect(() => {
        fetch()
    },[account])
  return (
    <div className='container mt-3 mb-5 '>
        <div className="row justify-content-center">
            <div className="col-11 col-md-10 rounded-pill py-2" style={{background: "white"}}>
                <div className="row">
                    <div className="col-4">
                        <img width={50} src="https://cdn.buymeacoffee.com/uploads/profile_pictures/default/FF813F/AH.png" alt="" />
                    </div>
                    <div className="col text-end">
                    <Link href="/" className="btn m-1 rounded-pill">
                        Home
                      </Link>
                        {active ?
                        <Link href={member.membername ? '/'+member.membername : "/"} className="btn btn-warning m-1 rounded-pill">
                        {account.slice(0,4)}...{account.slice(-4)}
                      </Link>
                        :    
                        <IntegrationWallets btnName="connect wallet" />
                    }
                    </div>

                </div>
                <div>
                </div>
                </div>
            </div>

        </div>
  )
}

export default Header