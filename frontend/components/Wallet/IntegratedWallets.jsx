import { useWeb3React } from "@web3-react/core";
import { useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useContextAPI } from "../../lib/contextapi";
import {Injected,WalletConnect } from "./Connectors";



export function IntegrationWallets({btnName}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {setSigner , setMessage} = useContextAPI()
  const { active, activate , library , account } = useWeb3React();

  useMemo(() => {
    if (library !== undefined) {
      setSigner(library.getSigner(account))
    }
  }, [library, account])


  async function conToMetaMask() {
    if (typeof window.ethereum == "undefined") {
      setMessage({message: "MetaMask is Not installed!", color: "danger" , isMessage: true})
    }else {
      try {
        await activate(Injected);
        window.ethereum.request({ method: "net_version" }).then((chainID) => {
          if(chainID == 5){
            setMessage({message: "Wallet Connected", color: "success" , isMessage: true})
          }else {
            setMessage({message: "Change Network", color: "danger" , isMessage: true})
            
          }
        });

        setShow(false)
      } catch (error) {
        console.error('error');
        setShow(false)
        setMessage({message: error.toString(), color: "danger" , isMessage: true})

      }
    }
  }
  return (
    <>

    {btnName == 'connect wallet' ?
      <button className="btn btn-outline-dark m-1 rounded-pill" onClick={handleShow}>
        {btnName}
      </button>:
      <button className="btn btn-warning m-1 px-4 rounded-pill fs-5 fw-bold" onClick={handleShow}>
      {btnName}
    </button>
    }


      <Modal show={show} onHide={handleClose} style={{ zIndex: "11111" }}>
        <Modal.Header closeButton>
          <Modal.Title>Connect Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">

            <div className={`wallet_btn row  py-3 mx-1 px-4 my-2`} onClick={conToMetaMask}>
              <div className="col text-start fs-5">MetaMask</div>
              <div className="col text-end">
                <img className={`wallet_img`}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
                  alt="Metamask"
                />
                <img />
              </div>
            </div>

            {/* <div
              className={`wallet_btn row  py-3 mx-1 px-4 my-2`}
              onClick={conToWalletConnect}
            >
              <div className="col text-start fs-5">Connect Wallet</div>
              <div className="col text-end">
                <img
                  className={`wallet_img`}
                  src="https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png"
                  alt="Connect"
                />
              </div>
            </div> */}
      
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}