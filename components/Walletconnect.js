import React from "react";
import { useState, useEffect ,useRef} from "react";
import { useAccount, useDisconnect, useSwitchNetwork, useBalance } from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Coinlist from "../components/Coinlist";
import DestinationCoinList from '../components/DestinationCoinList'
import InitialChain from "./InitialChains";
import Swap from "./Swap";
import { useRouter } from "next/router";
import DestinationChain from "./DestinationChain";
import Web3 from "web3";
import CustomWallets from "./CustomWallets";
import BitCoin from "./BitCoin";

function Walletconnect() {
  const [coinitems, setCoinitem] = useState();
  const [solAdress, setSolAddres] = useState();
  const [walletAddress,setWalletAddress]=useState();
  const [modalShow, setModalShow] = React.useState(false);
  const [swapModalShow, setSwapModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const [showInitialChain, setShowInitialChain] = React.useState(false);
  const [showDestinationChain, setShowDestinationChain] = React.useState(false);
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const [isDisplay, setIsDisplay] = useState(false);
  const [selectData, setSelectData] = useState();
  const [initialchainData, setInitialChainData] = useState(null);
  const [isinitialchainData, setIsInitialChainData] = useState(null);
  const [destinationchainData, setDestinationchainData] = useState();
  const [destinationcoinData, setDestinationcoinData] = useState();
  const [chainId, setChainId] = useState();
  const [deschainId, setDesChainId] = useState();
  const [showCustomWallet, setShowCustomWallet] = useState();
  const [customWalletName, setCustomWalletName] = useState();
  const [tokenvalue, setTokenValue] = useState(0);
  const [targettokenvalue, setTargetTokenValue] = useState(0);
  const [walletBalance,setWalletBalance]=useState(0.0)
  const [destChainss,setDestChains]=useState()
  const [newData,setNewData1]=useState();
  const [toAddresss,setToAddress]=useState()
  const [destToken,setDestToken]=useState();
  const [alertColor,setAlertColor]=useState()
  const [isDisabled,setIsDisabled]=useState(true);
  const [bitCoinModalShow,setBitCoinModalShow]=useState(false)
  const [isValidAddress,setIsValidAddress]=useState(true);
 
  
  async function connecttowallet() {
    if (initialchainData?.name == "Solana") {
      if (window.phantom) {
        await window.solana.connect();
        const publicKey = await window.solana.publicKey;
        const walletAddress = publicKey?.toBase58();
        // console.log(walletAddress,"hhhhhhhhhh")
        setSolAddres(walletAddress);
        setWalletAddress(walletAddress)
        // var chainI="SOL_TEST"
        // localStorage.setItem("chainid",chainI)
        // setChainId(chainI)
      } else {
        window.open("https://phantom.app/", "_blank");
      }
    }
  }

  async function connecttowallet1() {
    if (customWalletName == "Martian") {
      const { address } = await window.martian.connect();

      // const walletAddress = publicKey?.toBase58();
      // console.log(address, "hhhhhhhhhh.........lllllllll");
      setSolAddres(address);
      setWalletAddress(address)
      setShowCustomWallet(false);
    } else {
      // window.open("https://martian.app/", "_blank");
    }
  }
  async function connecttowallet12() {
    if (customWalletName == "Pontem") {
      // console.log("hello Aptos....................................");
      const { address } = await window.pontem.connect();

      // const walletAddress = publicKey?.toBase58();
      // console.log(address, "hhhhhhhhhh.........lllllllll");
      setSolAddres(address);
      setWalletAddress(address)
      setShowCustomWallet(false);
    } else {
      // window.open("https://martian.app/", "_blank");
    }
  }

  console.log(destinationcoinData,"bbbbbbbbbbbbbbbbbbbbbbbb")

  async function chainId1() {
    if (initialchainData) {
      const chainI = initialchainData?.ChainId
      localStorage.setItem("chainid", chainI);
      setChainId(chainI);
    
  } else {
    console.log("Invalid ChainId");
  }
  }
 

 
  async function chainId2() {
   
    const chainII=destinationchainData?.ChainId
    setDesChainId(chainII);
  }

  async function switchNetwork() {
    if (initialchainData?.name != "Solana") {
      if (window.ethereum) {
        ethereum.request({
          method: "eth_requestAccounts",
        })
       
        console.log("hhhhhggggg");
        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: `0x${Number(chainId).toString(16)}` }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: `0x${Number(chainId).toString(16)}`,
                    chainName: `${initialchainData?.name}`,
                    rpcUrls: [`${initialchainData?.rpc}`],
                    nativeCurrency: {
                      symbol: `${initialchainData?.symbol}`,
                      decimals: 18,
                    },
                    iconUrls: [`${initialchainData?.logoUrl}`],
                  },
                ],
              });
            } catch (addError) {
              console.log("invalid network" + addError);
            }
          }
          console.log("Invalid Chain");
        }
      } else {
        console.log("network not switched");
      }
    } else {
      console.log("Connect to wallet");
    }
  }
  useEffect(() => {
    if (initialchainData?.name == "Solana") {
      connecttowallet();
    }
    chainId1();
  }, [initialchainData]);
  useEffect(() => {
    chainId2();
  }, [destinationchainData,selectData]);
  
 

  useEffect(() => {
    if (initialchainData?.name == "Aptos ") {
      // connecttowallet1();
      setShowCustomWallet(true);
    }
  }, [initialchainData]);
 

  useEffect(() => {
    if (customWalletName == "Pontem") {
      connecttowallet12();
    }
    connecttowallet1();
  }, [customWalletName]);

  useEffect(() => {
    switchNetwork();
  }, [chainId]);

  useEffect(() => {
    const initialchain = localStorage.getItem("initialchain");
    setInitialChainData(JSON.parse(initialchain));
  }, [isinitialchainData]);

  useEffect(() => {
    setWalletAddress(address);
  }, [chainId]);


  console.log( chainId,"connected................>");
  async function targetTokenValue() {
   const value1= (tokenvalue * (destToken?.SwapFeeRatePerMillion)) / 100;
   const fee1=tokenvalue*process.env.NEXT_PUBLIC_FEE_PERCENT/100;
   const fee2=Number(destToken?.MinimumSwap)*process.env.NEXT_PUBLIC_FEE_PERCENT/100
   if(tokenvalue>=Number(destToken?.MinimumSwap)+fee2){
    if(value1<Number(destToken?.MinimumSwapFee)){
      setTargetTokenValue(tokenvalue-Number(destToken?.MinimumSwapFee)-fee1);
      setIsDisabled(false)
  
     }else {
      setTargetTokenValue((tokenvalue-value1)-fee1);
      setIsDisabled(false)
     }
   }else{
    setTargetTokenValue(0);
    setIsDisabled(true);
   }
   
    // const value = tokenvalue - (tokenvalue * 0.1) / 100;
    
  }
  async function destChains(){
    const data=selectData?.destChains
    if(data){
      const obj = Object.keys(data);
      setDestChains(obj)
      // console.log(obj,"llllllllll")
    }
   
    
  }
  async function destTokenData(){
    if(deschainId !=null){
      const obj = selectData?.destChains[deschainId]
      if(obj){
        var Token = Object.values(obj);
        setDestToken(Token[0]);
        // console.log(Token[0],"ddddddddddestination");
      }
      
    }
  }

 
  

  useEffect(() => {
    destTokenData()
    destChains()
    setDestinationcoinData(selectData);
  }, [selectData]);

  useEffect(() => {
    if(address){
      setToAddress(address);
    }
    
  }, []);

  useEffect(() => {
    destTokenData();
  }, [selectData,deschainId]);

  useEffect(() => {
    targetTokenValue();
  }, [tokenvalue]);
  

  async function handleChange(e) {
    const token_value = e.target.value;
     if(token_value<Number(destToken?.MinimumSwap)+ Number(destToken?.MinimumSwap)*(process.env.NEXT_PUBLIC_FEE_PERCENT/100)){
      setAlertColor('red')
      setIsDisabled(true);
     }
     else {
      setAlertColor('white')
     }
     if(token_value==0 || token_value==null){
      setAlertColor('white')
     }
    setTokenValue(token_value);
  }

  async function tokenBalance(){
    var abi1 = [
     
      
      {
        "constant":true,
        "inputs":[{"name":"_owner","type":"address"}],
        "name":"balanceOf",
        "outputs":[{"name":"balance","type":"uint256"}],
        "type":"function"
      },
      // decimals
      {
        "constant":true,
        "inputs":[],
        "name":"decimals",
        "outputs":[{"name":"","type":"uint8"}],
        "type":"function"
      }
    ];
    const web3 = new Web3(Web3.givenProvider);
    const anyToken = selectData?.address;
    const walletAddress=address;
    console.log("bbbbbbbalance",selectData)
    
   if(selectData?.tokenType=='NATIVE') {
    let dat = await web3.eth.getBalance(address)
    console.log("bbbbbbbalance",dat)
    let bal =(dat/Math.pow(10, 18))
    console.log(bal,"balance...................balance")
    setWalletBalance(bal)
   }
    else if(selectData?.tokenType=='TOKEN' && address && anyToken){
      const tokenContract= new web3.eth.Contract(abi1,anyToken)
        let result = await tokenContract.methods.balanceOf(walletAddress).call();
        const decimals = await tokenContract.methods.decimals().call();
        
       const balance= result/Math.pow(10, decimals)
       console.log(balance,"balance...................")
        setWalletBalance(balance)
     
     
    }else{
      console.log("kkkkkkkkkk")
    }
    
  }

  useEffect(() => {
    tokenBalance();
  }, [selectData,chainId,address]);

  async function toAddress(e){
   const Address=e.target.value
   setToAddress(Address)
   console.log(Address,"bbbbbbb");
  }

  useEffect(() => {
    const web3 = new Web3("https://mainnet.infura.io/v3/c8fb3111e62c4b40867156ac3c3cbef4");
    if(initialchainData?.name == "Bitcoin" && toAddresss){
      const isValid=web3.utils.isAddress(toAddresss)
      console.log(isValid,"nnnnnnnnnn");
      setIsValidAddress(isValid)
      setIsDisplay(true)
    }
  }, [toAddresss]);

  useEffect(() => {
   
    if(initialchainData?.name == "Bitcoin"){
      setIsDisplay(true)
    }else{
      setIsDisplay(false)
    }
  }, [initialchainData]);

  return (
    <>
      <nav className="navbar bg-body-tertiary fixed-top" id="side-dash">
        <div className="container">
          <a className="navbar-brand" href="index.html">
            <img src="img/logo.png" alt="" />{" "}
          </a>
          <div className="flex-right-nav">
            <li className="nav-item">
              <a className="nav-link active respons" href="#">
                <span>
                  <img src="img/reward.png" alt="" />
                </span>
                Router
              </a>
            </li>
            <div className="flags">
              <a
                href="#"
                className="trade-button respons"
                id="fstId"
                onClick={() => setShowInitialChain(true)}
              >
                <span>
                  <img
                    className="fst"
                    id="fstSpan"
                    src={initialchainData?.logoUrl}
                    alt=""
                  />
                </span>
                {initialchainData?.name}
              </a>
              <InitialChain
                setIsInitialChainData={setIsInitialChainData}
                show={showInitialChain}
                onHide={() => setShowInitialChain(false)}
                id="fstId"
              />
              {initialchainData?.name == "Solana"? (
                solAdress ? (
                  <p className="trade-button" id="tradePara">
                    {solAdress?.slice(0, 5) + "..." + solAdress?.slice(-4)}
                  </p>
                ) : (
                  <a
                    href="#"
                    className="trade-button"
                    onClick={connecttowallet}
                  >
                    Connect to a wallet
                  </a>
                )
              ) : initialchainData?.name == "Bitcoin"? (
                <a
                href="#"
                className="trade-button respons"
                id="fstId1"
               
              >
                BTC
                <span>
                  <img
                    className="fst12"
                    id="fstSpan1"
                    src={initialchainData?.logoUrl}
                    alt=""
                  />
                </span>
                
              </a>
                
              ):(
                // <a href="#" className="trade-button1">
                <ConnectButton chainStatus="none" 
                showBalance={false}
                />
                // {/* </a> */}
              )}
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>
          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel" />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#">
                    <span /> Router
                  </a>
                </li>
                <li>
                  <a href="#" className="trade-buttonside">
                    <span>
                      <img src="img/ETH.cec4ef9a.svg" alt="" />
                    </span>
                    Ethereum
                  </a>
                </li>
              </ul>
            </div>
            {/* <form class="d-flex mt-3" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form> */}
          </div>
        </div>
      </nav>

      {/*First */}
      <section className="crosschain">
        <div className="container">
          <div className="innersmall">
            <div className="head-chain">
              <h2>Crosschain</h2>
            </div>
            <div className="currency" style={{border: `1px solid ${alertColor}`}}>
              <div className="head-currency">
                <ul>
                  <li>From</li>
                  <li>
                    Balance: {(walletBalance.toString()).substring(0,7)}
                  </li>
                </ul>
              </div>
              <div className="bottom">
                <div className="input-group ">
                  <input
                    onChange={(e) =>handleChange(e)}
                    type="number"
                    className="form-control"
                    placeholder={0.00}
                    defaultValue={0.0}
                    aria-label="text"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div className="right">
                  <a
                    href="#"
                    className="btn-next"
                    onClick={() => setModalShow(true)}
                  >
                    <h6>
                      <img className="fst" src={selectData?.logoUrl} alt="" />
                      <p>
                        {" "}
                        {selectData?.symbol}
                        <br />
                        <span>{selectData?.name}</span>
                      </p>
                    </h6>
                    <small>
                      <img src="img/Icon ionic-ios-arrow-down.png" alt="" />
                    </small>
                  </a>
                  <Coinlist
                    setSelectData={setSelectData}
                    chainId={chainId}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />

                  <a
                    href="#"
                    className="btn-next"
                    onClick={() => setShowInitialChain(true)}
                  >
                    <h6>
                      <img
                        className="fst"
                        src={initialchainData?.logoUrl}
                        alt=""
                      />
                      <p>
                        {" "}
                        {initialchainData?.name}
                        <br />
                        <span>
                          {initialchainData?.networkType.toLowerCase()}
                        </span>
                      </p>
                    </h6>
                    <small>
                      <img src="img/Icon ionic-ios-arrow-down.png" alt="" />
                    </small>
                  </a>
                </div>
              </div>
            </div>
            <div className="wallet-icons">
              <ul>
                <li />
                <li>
                  <a href="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={25}
                      height={25}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#6e6e6e"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1={12} y1={5} x2={12} y2={19} />
                      <polyline points="19 12 12 19 5 12" />
                    </svg>
                  </a>
                </li>
                <li>
                  {isDisplay ? (
                    <a href="#" onClick={() => setIsDisplay(false)}>
                      <span> -Send To</span>
                    </a>
                  ) : (
                    <a href="#" onClick={() => setIsDisplay(true)}>
                      <span> +Send To</span>
                    </a>
                  )}
                </li>
              </ul>
            </div>
            {/* doble */}
            <div className="currency">
              <div className="head-currency">
                <ul>
                  <li>From</li>
                  <li>Balance: -</li>
                </ul>
              </div>
              <div className="bottom">
                <div className="input-group ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={targettokenvalue}
                    aria-label="text"
                    aria-describedby="basic-addon1"
                    readonly='true'
                  />
                </div>
                <div className="right">
                  <a
                    href="#"
                    className="btn-next"
                    
                  >
                    <h6>
                      <img className="fst" src={selectData?.logoUrl} alt="" />

                      <p>
                        {" "}
                        {destToken?.symbol}
                        <br />
                        <span>{destToken?.name}</span>
                      </p>
                    </h6>
                    <small>
                      <img src="img/Icon ionic-ios-arrow-down.png" alt="" />
                    </small>
                  </a>
                  <DestinationCoinList
                    setSelectData={setSelectData}
                   
                    setNewData1={setNewData1}
                    destinationcoinData={destinationcoinData}
                    deschainId={deschainId}
                    show={modalShow1}
                    onHide={() => setModalShow1(false)}
                  />

                  <a
                    href="#"
                    className="btn-next"
                    onClick={() => setShowDestinationChain(true)}
                  >
                    <h6>
                      <img
                        className="fst"
                        src={destinationchainData?.logoUrl}
                        alt=""
                      />
                      <p>
                        {" "}
                        {destinationchainData?.name}
                        <br />
                        <span>
                          {destinationchainData?.networkType.toLowerCase()}
                        </span>
                      </p>
                    </h6>
                    <small>
                      <img src="img/Icon ionic-ios-arrow-down.png" alt="" />
                    </small>
                  </a>
                  <DestinationChain
                    setDestinationchainData={setDestinationchainData}
                    destChainss={destChainss}
                    show={showDestinationChain}
                    onHide={() => setShowDestinationChain(false)}
                  />
                </div>
              </div>
            </div>
            {isDisplay ? (
              <div className="currency" id="field">
                <div className="head-currency">
                  <ul>
                    <li>
                      Recipient ( Please do NOT send funds to exchange wallet or
                      custodial wallet. )
                    </li>
                    {!isValidAddress?
                    <h7 style={{color:"red"}}>Invalid Address</h7>:null}
                  </ul>
                </div>
                <div className="bottom">
                  <div className="input-group ">
                    <input
                      onChange={toAddress}
                      type="text"
                      className="form-control"
                      placeholder="Wallet-address"
                      aria-label="wallet-address"
                      aria-describedby="basic-addon1"
                      defaultValue={address}
                    />
                  </div>
                </div>
              </div>
            ) : null}
            {alertColor=='red'?
            <div className="MiniMuM-BaL-warning">
              <p style={{color:'red', fontWeight:'bold'}}>
                Entered Amount is Lower than Minimum Swap Amount.
              </p>

            </div>:null}
            <div className="listing">
              <div className="head-list">
                <img src="img/bulb.svg" alt="" />
                <h6>Reminder:</h6>
              </div>
              <ul>
                {destToken?.MaximumSwapFee==destToken?.MinimumSwapFee?
                <li>
                  Crosschain Fee is {destToken?.SwapFeeRatePerMillion}%, Gas fee {destToken?.MaximumSwapFee} {selectData?.symbol} for your cross-chain transaction on destination chain
                </li>: <li>
                  Crosschain Fee is {destToken?.SwapFeeRatePerMillion}%, Minimum Crosschain Fee is {destToken?.MinimumSwapFee} {selectData?.symbol}, Maximum Crosschain Fee is {destToken?.MaximumSwapFee} {selectData?.symbol}
                </li>}
                <li>Minimum Crosschain Amount is {Number(destToken?.MinimumSwap)+Number(destToken?.MinimumSwap)*(process.env.NEXT_PUBLIC_FEE_PERCENT/100)} {selectData?.symbol}</li>
                <li>Maximum Crosschain Amount is {destToken?.MaximumSwap} {selectData?.symbol}</li>
                <li>Estimated Time of Crosschain Arrival is 10-30 min</li>
                <li>
                  Crosschain amount larger than {(destToken?.MaximumSwap)/5} {selectData?.symbol} could take up to
                  12 hours
                </li>
              </ul>
            </div>
            <div className="btn-connect">
              {initialchainData?.name == "Bitcoin"?
              <button href="#" className="custom-wallet" disabled={isDisabled} onClick={()=>setBitCoinModalShow(true)}>
                Swap
              </button>:<button href="#" className="custom-wallet" disabled={isDisabled} onClick={()=>setSwapModalShow(true)}>
                Swap
              </button>}
            </div>
          </div>
        </div>
        <CustomWallets
          setCustomWalletName={setCustomWalletName}
          show={showCustomWallet}
          onHide={() => setShowCustomWallet(false)}
        />

         <Swap
         walletAddress={walletAddress}
         newData={newData}
         initialchainData={initialchainData}
         destinationchainData={destinationchainData}
         targettokenvalue={targettokenvalue}
          selectData={selectData}
          deschainId={deschainId}
          tokenvalue={tokenvalue}
          toAddresss={toAddresss}
          setSwapModalShow={setSwapModalShow}
          show={swapModalShow}
          onHide={() => setSwapModalShow(false)}
        />

        <BitCoin
          walletAddress={walletAddress}
          newData={newData}
          initialchainData={initialchainData}
          destinationchainData={destinationchainData}
          targettokenvalue={targettokenvalue}
           selectData={selectData}
           deschainId={deschainId}
           tokenvalue={tokenvalue}
           toAddresss={toAddresss}
           setShow={setBitCoinModalShow}
          show={bitCoinModalShow}
          onHide={() => setBitCoinModalShow(false)}
        />

      </section>
    </>
  );
}

export default Walletconnect;
