import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { QRCodeSVG } from "qrcode.react";
import Status from "./Status";

function BitCoin(props) {
    const toAddress=props?.toAddresss;
    const deschainId=props?.deschainId;
    const  tokenvalue=props?.tokenvalue;
    const [depositAddress,setDepositAddress]=useState()
    const [txHash,setTxHash]=useState()
    const [statusModalShow,setStatusModalShow]=useState()
  // const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const [ progress,setProgress]= useState(0);
  const selectData=props?.selectData;
  const newData=props?.newData;
  const initialchainData=props?.initialchainData
  const destinationchainData=props?.destinationchainData
  const targettokenvalue=props?.targettokenvalue
  const setSwapModalShow=props?.setSwapModalShow
  const walletAddress=props?.walletAddress
  const [isLoading,setIsLoading]=useState(false);

  // const handleClose = () => props?.setShow(false)

  console.log(props)

    async function getDepositAddress(){
        try{
            const response=await axios.post("api/bitCoin",{address:toAddress,chainId:deschainId})
            console.log(response?.data.data.info.P2shAddress)
            setDepositAddress(response?.data.data.info.P2shAddress)

        }catch(err){
            console.log("something went wrong",err)
        }
    }
    useEffect(() => {
       if(toAddress){
        getDepositAddress()
       }
    }, [toAddress,deschainId])
    
    async function seeStatus(){
      if(txHash){
        console.log("jjjjjjjjj");
          setStatusModalShow(true)
        setInterval(function(){transactionHash(txHash)}, 5000);
      }

    }
     console.log(txHash,"kkkkkkkkkkk")

    async function transactionHash(hash){
      try{
      const response = await axios.get(`https://scanapi.multichain.org/v3/tx/${hash}`)
      let status = (response.data.info.status)    
      if(status==0){
              setProgress(33)
            }else if(status==8){
              setProgress(66)
            }else if(status==9){
              setProgress(66)
            }else if(status==10){
              setProgress(99)
            }else{
              setProgress(0)
            }
    }catch(err){
      console.log(err)
    }
     
    }
  

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cross-chain Router
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section>
          <div className="container">
            <div className="row justify-content-center">
              <form className="input-sec input-top p-0" id="bar-top">
                <div className="input-line iptset-line" id="index-line" />
                <div className="token-head1">
                  <div className="rapper-between" id="token-form-padding">
                    <div className="arrWithHeading">
                      
                      <h6>
                        Please Use Bitcoin wallet to transfer BTC coin to
                        deposite Address{" "}
                      </h6>
                    </div>
                    <h5 className="hide-text">Value: {tokenvalue}</h5>
                  </div>

                  {/* <h5 className="hide-text"></h5> */}

                  
                </div>

                <div className="token-parts1">
                  <div className="arrWithHeading1">
                    {/* <h5 style={{ cursor: "pointer" }}>
                        <i className="bi bi-chevron-left" id="back-btn-icon" />
                      </h5> */}
                    <h6> Deposite Address:</h6>
                  </div>
                  <h5>{depositAddress}</h5>
                  <div className="bitCoinQR">
                    <QRCodeSVG
                      value={depositAddress}
                      includeMargin="true"
                      size="200"
                    />
                  </div>
                  <div className="hashBItcOiN">
                    <h6>
                        Hash:
                    </h6>
                    <input className="bitInPut-TX" placeholder="Hash" onChange={(e)=>setTxHash(e.target.value)}>
                    
                    </input>
                    <h6 className="DiScRiPtIoN-MAttS">
                    Please input the BTC deposit transaction hash, and click confirm to check the bridge status.
                    </h6>
                </div>
                </div>
               
              </form>
              
            </div>
          </div>
          <Status
           newData={newData}
           initialchainData={initialchainData}
           destinationchainData={destinationchainData}
           targettokenvalue={targettokenvalue}
            selectData={selectData}
            deschainId={deschainId}
            progress={progress}
            tokenvalue={tokenvalue}
            txHash={txHash}
            show={statusModalShow}
            onHide={() => setStatusModalShow(false)}
          
        />
        </section>
      </Modal.Body>
      <Modal.Footer id="swap-footer">
        
        <button type="button" class="btn btn-primary swap-submit" onClick={seeStatus} >Confirm</button>
        
      
      </Modal.Footer>
    </Modal>
  );
}
export default BitCoin;
