import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAccount, useDisconnect, useSwitchNetwork, useBalance } from "wagmi";
import Web3 from "web3";
// import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

function  Status(props) {
 
    const [toAddress,setToAddress]=useState();
    // const [progressPercent,setProgressPersent]=useState(33);
    console.log(props)

    const selectData=props?.selectData;
    const newData=props?.newData;
    const deschainId=props?.deschainId;
    const tokenvalue=props?.tokenvalue;
    const initialchainData=props?.initialchainData
    const destinationchainData=props?.destinationchainData
    const targettokenvalue=props?.targettokenvalue
    const txHash=props?.txHash
    const { address, isConnected, isConnecting, isDisconnected } = useAccount();
    const txScan=initialchainData?.explorer?.tx
    const txScanTo=destinationchainData?.explorer?.tx
    
    
    
   
   
   

    // setInterval(transactionHash, 10000);

    

  return (
    <Modal className=" swap-multi Status"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
      
 
 
  {/* <div className="modal-body"> */}
  <div className="swap-body ">
  {/* <p class="swap-review">Please review and confirm the details</p> */}
  <div className="swap-from">
    <div className="box1form">
      <h3>From</h3>
      <ul>
        <li>
          <img src={initialchainData?.logoUrl} alt="" />
          <span>{initialchainData?.name}</span>
        </li>
        <li>
          <small>
            -{tokenvalue} {selectData?.symbol}
              <img src="img/fox.png" alt="" />
          </small>
        </li>
      </ul>
      <ul>
        <li>
          <span>Tx hash</span>
        </li>
        <li>
          <small>
            <a href={`${txScan}${txHash}`} target="_blank">
            {txHash?.slice(0, 7) + "..." + txHash?.slice(-7)}
            </a>
         
          <a onClick={() =>  navigator.clipboard.writeText(`${txHash}`)}>
          <img src="img/copy.png" alt="" />
          </a>
           
          </small>
        </li>
      </ul>
      <ul>
        <li>
          <span>Receive</span>
        </li>
        <li>
          <small>
          {address?.slice(0, 7) + "..." + address?.slice(-7)}
          
          <a onClick={() =>  navigator.clipboard.writeText(`${address}`)}>
          <img src="img/copy.png" alt="" />
          </a>
          </small>
        </li>
      </ul>
    </div>
    <div className="box1form">
      <h3>To</h3>
      <ul>
        <li>
          <img src={destinationchainData?.logoUrl} alt="" />
          <span>{destinationchainData?.name}</span>
        </li>
        <li>
          <small>+{targettokenvalue}  {newData?.symbol}</small>
        </li>
      </ul>
      <ul>
        <li>
          <span>Tx hash</span>
        </li>
        <li>
          <small>
            <a href={`${txScanTo}${txHash}`} target="_blank"> 
            {txHash?.slice(0, 7) + "..." + txHash?.slice(-7)}
            </a>
         
          <a onClick={() =>  navigator.clipboard.writeText(`${txHash}`)}>
          <img src="img/copy.png" alt="" />
          </a>
          </small>
        </li>
      </ul>
      <ul>
        <li>
          <span>Receive</span>
        </li>
        <li>
          <small>
          {address?.slice(0, 7) + "..." + address?.slice(-7)} 
          
          <a onClick={() =>  navigator.clipboard.writeText(`${address}`)}>
          <img src="img/copy.png" alt="" />
          </a>
          </small>
        </li>
      </ul>
    </div>
  </div>
</div>

        {/* </div> */}
  


      </Modal.Body>
      <Modal.Footer id="swap-footer">
      <ProgressBar
        percent={props.progress}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
      >
        <Step transition="scale">
          {({ accomplished }) => (
            
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="25"
              src="/logo-ftr.png"
            /> 
            
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="25"
              src="/logo-ftr.png"
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="25"
              src="/logo-ftr.png"
            />
            
            
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="25"
              src="/logo-ftr.png"
            />
          )}
        
        </Step>
      </ProgressBar>
     <p className="txDetail">
     You can Check your transaction detail here
     <a href={`https://scanapi.multichain.org/v3/tx/${txHash}`} target="_blank">Transaction</a>
     </p>
     
     
      </Modal.Footer>
    </Modal>
  );
}
export default Status;

