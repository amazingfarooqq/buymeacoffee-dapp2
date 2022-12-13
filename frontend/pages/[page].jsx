import Link from 'next/link'
import React, { useContext, useMemo } from 'react'
import { useRouter } from "next/router"
import { useEffect } from 'react';
import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { coffeeContractAddress, coffeeContractjson } from '../smartContractData/coffeeContract';
import { IntegrationWallets } from '../components/Wallet/IntegratedWallets';
import { ethers } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { useContextAPI } from '../lib/contextapi';
import MessageBox from '../components/MessgeBox/MessageBox';
import { getData, updateCoffeePrice , buyCoffee} from '../lib/polybasesdk';
import { Polybase } from '@polybase/client';

export async function getServerSideProps(context) {

    const getdata = await getData()
    
    for(let i = 0; i < getdata?.length; i++){
      const pagename = getdata[i].pagename

      if(pagename == context.query.page){
          const pagename = getdata[i].pagename
          const memberaddress = getdata[i].memberaddress
          const coffeePrice = getdata[i].coffeePrice
          const contributers = getdata[i].contributers;

          return { props: { page: context.query.page ,pagename, memberaddress , coffeePrice, contributers } };
      }
    }
    return { props: { page: context.query.page } };
  }

const page = (props) => {


    const {pagename,coffeePrice,memberaddress , contributers} = props

    const [page, setPage] = useState({ pagename,coffeePrice,memberaddress , contributers })

    const {active , account, library} = useWeb3React()
    const {message, setMessage} = useContextAPI()

  
      const [inputValues, setInputValues] = useState({
        username:"",
        usermessage: "",
        coffees: "1"
      })


      const handleOnChange = async (e) => {
        const {name, value} = e.target

        setInputValues({
            ...inputValues,
            [name]:value
        })
      }

    const buyCoffeeFunc = async () => {
        const {username, usermessage, coffees} = inputValues

        if(!username || !usermessage || !coffees){
            setMessage({message: "invalid inputs", isMessage: true, color: "danger"});

            return
        }else {
            try {
                // const signer = library?.getSigner(account)
                // const coffeeCon = new ethers.Contract(coffeeContractAddress, coffeeContractjson.abi, signer);

                // const coffee = "0.001"
                // await coffeeCon?.buyCoffee(page.pagename, page.coffeePrice, 1, {value: page.coffeePrice})
                // pagename: string, name: string, message: string, coffees: number,contributerAddress:string

                const id = pagename+contributers.length+1
                const {status, message } = await buyCoffee(id.toString(), pagename, username, usermessage, coffees, account , page,setPage)
                    if(status){
                        setMessage({message: message,  isMessage: true, color: "success"});
                    }else {
                        setMessage({message: message,  isMessage: true, color: "danger"});
                    }
            } catch (error) {
                console.log(error);
                setMessage({message: error.reason || error.message, isMessage: true, color: "danger"});
            }
        }
    }


  return (
    <div className='container'>
        {message?.isMessage &&
        <div className="container-fluid" style={{ position: 'fixed', top: '50px', right: '20px', zIndex: '111111', width: "300px" }}>
            <MessageBox message={message} setMessage={setMessage} value={0}/>
        </div>
        }
        <div className="row mt-5 px-xl-5 mx-xl-5">
            
            <div className="col-lg-12 p-4 bg-light border rounded text-start">
                <div className=' '>
                <h1>{page?.pagename || '.....'}</h1>
                <p>Total Contributors: {contributers.length}</p>
                <p>{page?.pagename ? `${page?.memberaddress?.slice(0,4)}...${page?.memberaddress?.slice(-4)}` : "Ox00.0000"} </p>


                {!page.pagename &&
                    <button className="btn btn-danger m-1 px-4 rounded-pill fs-5">No Member found with <b>{props.page}</b> </button>
                }

                {page.pagename &&
                    <button className="btn btn-danger m-1 px-4 rounded-pill fs-5">Price of 1 coffee  <b>{(page.coffeePrice) } ether</b> </button>
                }
                <Link href="/" className='btn btn-primary m-1 px-4 rounded-pill fs-5'>Go Back to home</Link>

                <button className="btn btn-danger m-1 px-4 rounded-pill fs-5" onClick={() => updateCoffeePrice(page.pagename, "0.0001")}>Update Coffee</button>

                </div>
             </div>


            <div className="col-lg-8 mt-3 p-4 bg-light border rounded">
            {!page.contributers && "No page with this name"}
            {page?.contributers?.length < 1 && <h3 className='p-4'>If someone contribute, they will showup here..</h3>}
            {page?.contributers?.map(item => {
                return <div key={item.id} className='py-3 px-3 rounded mt-4' style={{background: "white"}}> 
                    <div className="row">
                        <div className="col-4" style={{width: 90}}>
                          <img src="https://cdn.buymeacoffee.com/uploads/profile_pictures/default/FF813F/AH.png" width={100} alt="" className='img-fluid'/> 

                        </div>
                        <div className="col"style={{display: "flex" , alignItems: "center"}}>
                            <div className="row">
                                <div className="col-12">
                                <span><b >{item.contributername}</b>  bought {item.contributercoffees} coffee's</span>
                                </div>
                                <div className="col-12">
                                <button className='btn p-0 m-0'>{item.contributerAddress?.slice(0,3)}...{item.contributerAddress?.slice(-3)}</button>
                                </div>
                            </div>

                        </div>
                    </div>
                            <div className="row mt-2">
                                <div className="col-12">{item.contributermessage}</div>
                            </div>
                    
                    
                </div>
            })}
            </div>
            <div className="col-lg-4 mt-3 p-4 py-0">
                <div className="row p-4 bg-light rounded border">
                    <p className='fs-5'>Buy <b>{page?.pagename}</b>  a coffee.</p>
                    <input name="username" onChange={handleOnChange}  type="text"className="form-control fs-5 p-2  m-0 border"ria-label="Amount (to the nearest dollar)" placeholder='Your name'/>
                    <textarea name="usermessage" onChange={handleOnChange} type="text"className="form-control fs-5 py-2 my-2  m-0 border"  aria-label="Amount (to the nearest dollar)" placeholder='Message' style={{height: "100px"}}/>
                    {active ?
                    <button className="btn btn-warning rounded-pill fs-5 w-100 mt-2" onClick={() => buyCoffeeFunc()}>Buy Coffee</button>
                    :
                    <IntegrationWallets btnName="Buy Coffee" />    
                }
                </div>                    
            </div>

        </div>
    </div>
  )
}

export default page