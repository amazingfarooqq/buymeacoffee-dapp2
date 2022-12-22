import Head from 'next/head'
import Link from 'next/link'
import { useWeb3React } from '@web3-react/core'
import { useState } from 'react'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useContextAPI } from '../../lib/contextapi'
import MessageBox from '../MessgeBox/MessageBox'
import { IntegrationWallets } from '../Wallet/IntegratedWallets'
import { imagescollection } from '../../lib/imagescollection'

export default function HomePage() {
  const {message , setMessage, members, setMembers} = useContextAPI()
  const {account , active , library} = useWeb3React()
  const router = useRouter()

  const [pageName, setpageName] = useState('')
  const [nftimag, setNftimag] = useState('')

  const [Loading, setLoading] = useState(false)
  const [actionMessage, setActionMessage] = useState({message: "", href:""})

  const registerPage = async () => {

    if(!pageName){
      setMessage({message: "invalid page name" , isMessage: true, color: "danger"})
      return
    }
    try {
      setLoading(true)
      setActionMessage({message: "Comfirming transaction, please wait..", href:""})
      const signer = library?.getSigner(account)
      const pageCon = new ethers.Contract(pageContractAddress, pageContractjson.abi, signer);

      const totalPageNfts = await pageCon.totalPageNfts()
      const pageidstring = totalPageNfts.toString()

      const tx = await pageCon.mintPageNFT(account, pageName, nftimag)
      await tx.wait()

      setActionMessage({message: "Redirecting please wait", href:""})

      router.push(pageName)


      setMembers({Loading: false, data: [
        ...members.data,
        {
          pageid: pageidstring,
          pagename: pageName,
          memberaddress: account,
          donatePrice: '0.001',
          imageURI: _imgUrl,
          totaldonater: 0
        }
      ]})
        setLoading(false)

    } catch (error) {
      console.log(error.reason);
      const href2 = error.reason?.split(":")[1]
      if(href2 == ' Address already Exists over'){
        const href3 = error.reason?.split(":")[2]
        setActionMessage({message: error.reason || error.message, href:href3})
        setMessage({message: error.reason || error.message, isMessage: true, color: "danger"})
        setLoading(false)
      }else {
        setActionMessage({message: error.reason || error.message, href:""})
        setMessage({message: error.reason || error.message, isMessage: true, color: "danger"})
        setLoading(false)
      }

    }
  }


  const generateRandomImage = () => {
    const randomnum = Math.floor(Math.random() * imagescollection.length)
    const image = imagescollection[randomnum]
    setNftimag(image)
  }

  useEffect(() => {
    const randomnum = Math.floor(Math.random() * imagescollection.length)
    const image = imagescollection[randomnum]
    setNftimag(image)
  },[])

  return (
    <div className='bg-light' style={{minHeight: "100vh"}}>
      <Head>
        <title>Buymeacoffee</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {message?.isMessage &&
       <div className="container-fluid" style={{ position: 'fixed', top: '50px', right: '20px', zIndex: '111111', width: "300px" }}>
         <MessageBox message={message} setMessage={setMessage} value={0}/>
       </div>
      }


      <div className="container text-center ">
        <div className="row justify-content-center">

          <div className="col-11 col-md-8">
            <div className="row justify-content-center">
              <div className="col-12 mt-5">
              <h1 style={{fontSize: "64px"}} className="fw-bold">A supporter is worth a thousand followers.</h1> 
              <p style={{fontSize: "22px"}} className="px-5">Accept donations in Crypto. Start a membership. Sell anything you like. Its easier than you think.</p>
              </div>
              <div style={{position: "relative"}}>
              <img style={{width: "300px"}} src={nftimag} alt="img" />
              <button style={{position: "absolute", top:"50px",right: "30px"}} className="btn" onClick={generateRandomImage}>change avatar</button>
              </div>
              <br />
              <div className="col-10 p-2 rounded-pill border" style={{background: "white"}}>
                    <div className="input-group">
                      <div className="input-group-prepend border-none">
                        <span className="input-group-text  fs-4" style={{border: "0px solid black",background: "white"}}>buymeacoffee.com/</span>
                      </div>
                      <input type="text" value={pageName} onChange={(e) => setpageName(e.target.value)} className="form-control fs-4  p-0 m-0" style={{border: "0px solid black"}} placeholder="yourname" aria-label="Amount (to the nearest dollar)" />
                      <div className="input-group-append">

                      {active ?
                        <button className="btn btn-warning m-1 px-4 rounded-pill fs-5 fw-bold" disabled={Loading} onClick={registerPage}>{Loading?"Processing.." : "Get it"}</button> :
                        <IntegrationWallets btnName="Get it" />
                        }
                      </div>
                    </div>

              </div>

              <div className="col-12 mt-2">
                {actionMessage.message ? <div>
                {actionMessage.message} {"\n"}
                {actionMessage.href &&<Link href={actionMessage.href}>click here</Link> }
                
              </div> : 'It is free, and takes less than a minute.'}</div>

               
               
            </div>
          </div>
       
        </div>


      </div>


      <div className="mt-5" style={{backgroundColor: "rgba(255,252,230,1)"}}>
        <div className="container">
            <div className="row text-center py-5 justify-content-center">
          <div className="col-md-8">
          <h5 style={{opacity: "0.8"}}>DONATIONS WITH CRYPTO</h5>
          <div className='px-4'>
          <h1 style={{fontSize: "50px"}} className="fw-bold mx-md-5">Give your audience an easy way to say thanks.</h1>

          </div>

          <p style={{fontSize: "22px"}}>Buy Me a Coffee makes supporting fun and easy. In just a couple of taps, your fans can make the payment (buy you a coffee) in crypto and leave a message. They don’t even have to create an account.</p>
          <img src="https://cdn.buymeacoffee.com/assets/homepage/onetime-support-new.png" className='w-100' alt="" />
          </div>
            </div>


            <div className="row text-center py-5 justify-content-center">
                <div className="col-md-8">
                    <h5 style={{opacity: "0.8"}}>MEMBERSHIPS</h5>
                    <div className='px-4'>
                      <h1 style={{fontSize: "50px"}} className="fw-bold mx-md-5">These content creator are already wit us.</h1>
                    </div>
                    <p style={{fontSize: "22px"}}>Earn a recurring income by accepting monthly or yearly membership. Share exclusive content, or just give them a way to support your work on an ongoing basis.</p>
                    <div className="row text-start justify-content-center p-0">
                        <div className="col-12 text-center">
                          <br />
                          {members.isLoading && (
                            <>
                            <p>Please wait until we load members..</p>
                            <div className="spinner-border text-center" role="status">
                              <span className="visually-hidden">isLoading...</span>
                            </div> 
                            </>
                          )}
                          {!members.isLoading && members.data?.length < 1 && (
                            'no member'
                          )} 
                        </div>
                    </div> 
                 </div>
               {members.data?.map(item => {
                return (
                  <div key={item.pagename} className="col-lg-4 text-start mt-3" style={{width: "500px"}}>
                            <div className="d-flex text-black mt-1 bg-light p-4 rounded" style={{boxShadow: "0px 0px 2px gray"}}>
                              <div className="flex-shrink-0">
                                <img src={item.imageURI} alt="Generic placeholder image" className="img-fluid" style={{width: '180px', borderRadius: '10px'}} />
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h5 className="mb-1">{item.pagename}</h5>
                                <p className="mb-2 pb-1" style={{color: '#2b2a2a'}}>{item.memberaddress.slice(0,4)}...{item.memberaddress.slice(-4)}t</p>
                                <div className="d-flex justify-content-start rounded-3 p-2 mb-2" style={{backgroundColor: '#efefef'}}>
                                  <div>
                                    <p className="small text-muted mb-1">Total Contributers</p>
                                    <p className="mb-0">{item.contributers?.length}</p>
                                  </div>
                                </div>
                                <div className="d-flex pt-1">
                                  <Link href={`/${item.pagename}`} className="btn btn-warning me-1 flex-grow-1">Visit page</Link>
                                  {/* <button type="button" className="btn btn-primary flex-grow-1">Follow</button> */}
                                </div>
                              </div>
                            </div>
                  </div>
                )
              })} 
        </div>

        </div>

      </div>

    </div>
  )
}
