import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { formatEther, parseEther } from 'ethers/lib/utils'
import React, { useState } from 'react'
import { useContextAPI } from '../../lib/contextapi'
import { pageContractAddress, pageContractjson } from '../../smartContractData/coffeeContract'
import { IntegrationWallets } from '../Wallet/IntegratedWallets'

const PageExist = ({page , setPage}) => {

    const {active , account, library} = useWeb3React()
    const {message, setMessage} = useContextAPI()
    const [isLoading, setIsLoading] = useState(false)

  
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
                setIsLoading(true)
                const signer = library?.getSigner(account)
                const pageCon = new ethers.Contract(pageContractAddress, pageContractjson.abi, signer);
                const tx = await pageCon.donateToPage(coffees, page.pagenametopageidString,username, usermessage, {value: parseEther("0.001")})
                await tx.wait()

                setPage({
                    ...page,
                    contributers: [
                        ...page.contributers,
                        {
                            contributerid: page.pagenametopageidString, 
                            contributername: username, 
                            contributermessage: usermessage,
                            contributedcoffees:  coffees, 
                            contributedtopage: page.pagename, 
                            contributerAddress: account
                        }
                    ]
                })
                setIsLoading(false)

            } catch (error) {
                console.log(error);
                setIsLoading(false)

                setMessage({message: error.reason || error.message, isMessage: true, color: "danger"});
            }
        }
    }


    const updateCoffeePrice = async () => {
        
    }

    const [isWithDrawing, setIsWithDrawing] = useState(false)
    const withDraw = async () => {
        try {
        setIsWithDrawing(true)
        const signer = library?.getSigner(account)
        const pageCon = new ethers.Contract(pageContractAddress, pageContractjson.abi, signer);
        const tx = await pageCon.WithdrawAmount(page.pagenametopageidString)
        await tx.wait()
        
        setIsWithDrawing(false)

    } catch (error) {
        console.log(error);
        setIsWithDrawing(false)

        setMessage({message: error.reason || error.message, isMessage: true, color: "danger"});
    }
    }

    
  return (
        <div className='container'>
        <div className="row mt-5 px-xl-5 mx-xl-5  justify-content-center">
                    <div className="col-lg-12 p-4 bg-light  rounded text-start">
                        <div className=' '>
                        <h1>{page?.pagename}</h1>
                        <p>Total Contributors: {page.contributers?.length}</p>
                        <p>{`${page?.memberaddress?.slice(0,4)}...${page?.memberaddress?.slice(-4)}`} </p>

                        <div className="m-0 p-0 rounded">Price of 1 coffee  <b>{(page.donatePrice) } ether</b> </div>
                        <br />

                       
                        {page.memberaddress == account &&
                        <>
                        {isWithDrawing ? 
                        <button className="btn btn-primary m-1 mx-0 px-4 rounded fs-5 disabled">Processing.. </button>
                            :
                        <button className="btn btn-primary m-1 mx-0 px-4 rounded fs-5" onClick={withDraw}>Withdraw <b>{(page.totalamounttowithdraw) } ether</b> </button>

                        }
                        <br />
                        {/* <button className="btn btn-primary m-1 mx-0 px-4 rounded fs-5" onClick={() => updateCoffeePrice(page.pagename, "0.0001")}>Update Coffee</button> */}
                        </>
                        }

                        </div>
                    </div>


                    <div className="col-lg-8 mt-3 p-4 bg-light border rounded">
                    {!page.pagenameExists && "No page with this name"}
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
                                        <span><b >{item.contributername}</b>  bought {item.contributedcoffees} coffee</span>
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
                            {active ? isLoading ?  <button className="btn btn-warning rounded-pill fs-5 w-100 mt-2" disabled={true}>Buying...</button> :
                            <button className="btn btn-warning rounded-pill fs-5 w-100 mt-2" onClick={() => buyCoffeeFunc()}>Buy Coffee</button>
                            :  <IntegrationWallets btnName="Buy Coffee" />    
                        }
                        </div>                    
                    </div>
                </div>
    </div>
  )
}

export default PageExist