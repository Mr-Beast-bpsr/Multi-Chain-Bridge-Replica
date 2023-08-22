import React,{useEffect,useState} from 'react'
import axios from 'axios'
function ExamplePage() {
     const [coindata,setCoindata]=useState([{}]);
     const [filterdata,setFilterdata]=useState()
  async function tokenlist(){
     try{
        const response=await axios.post("/api/examplepage");
        
        const data=response.data.data
        const obj=Object.values(data)
        setCoindata(obj)
        
        // console.log(obj,"nnnnnnnnnnnnnnnnnn")
     }
     catch(err){
       console.log(err)
     }

    }
    
    
    
  useEffect(() => {
    tokenlist();
  },[])
  console.log(coindata,"kkkkkkkkkkkkkkk");
  return (
    <>
    <nav className="navbar bg-body-tertiary fixed-top" id="side-dash">
      <div className="container">
        <a className="navbar-brand" href="index.html">
          <img src="img/logo.png" alt="" />{" "}
        </a>
        <div className="flex-right-nav">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              <span>
                <img src="img/reward.png" alt="" />
              </span>
              Router
            </a>
          </li>
          <div className="flags">
            <a href="#" className="trade-button">
              <span>
                <img src="img/ETH.cec4ef9a.svg" alt="" />
              </span>{" "}
              Ethereum
            </a>
            <a href="#" className="trade-button">
              Connect to a wallet
            </a>
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
                <a className="nav-link active" aria-current="page" href="#">
                  <span>
                    <img src="img/dashboard.png" alt="" />
                  </span>
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span>
                    <img src="img/deposit2.png" alt="" />
                  </span>{" "}
                  Latest Deposits
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span>
                    <img src="img/reward.png" alt="" />
                  </span>{" "}
                  Reward Infos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span>
                    <img src="img/team.png" alt="" />
                  </span>{" "}
                  My Team
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span>
                    <img src="img/free_icon_1.svg" alt="" />
                  </span>{" "}
                  Deposit Details
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span>
                    <img src="img/rule.png" alt="" />
                  </span>{" "}
                  Rules
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <span>
                    <img src="img/whitepaper.png" alt="" />
                  </span>
                  Whitepaper
                </a>
              </li>
            </ul>
            {/* <form class="d-flex mt-3" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form> */}
          </div>
        </div>
      </div>
    </nav>
    <section className="profile-sec ">
      <div className="container">
        <div className="row justify-content-center">
          <form className="input-sec input-top p-0" id="bar-top">
            <div className="input-line iptset-line" id="index-line" />
            <div className="token-head">
              <div className="rapper-between" id="token-form-padding">
                <link href="/" />
                <h5 style={{ cursor: "pointer" }}>
                  <i className="bi bi-chevron-left" id="back-btn-icon" />
                </h5>
                <h5> Select a token </h5>
                <h5 className="hide-text">1</h5>
              </div>
              <div className="input-group mb-1" id="search-bar">
                <span className="input-group-text" id="basic-addon1">
                  <i className="bi bi-search" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name or past address"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="token-ancher-head">
                <a className="ancher-style" href="">
                  <img className="eth-ancher-img" src="img/eth.webp" />
                  ETH
                </a>
                <a className="ancher-style" href="">
                  <img className="eth-ancher-img" src="img/welth.webp" />
                  WETH
                </a>
                <a className="ancher-style" href="">
                  <img className="eth-ancher-img" src="img/usdc.webp" />
                  USDC
                </a>
                <a className="ancher-style" href="">
                  <img className="eth-ancher-img" src="img/dai.webp" />
                  DAI
                </a>
                <a className="ancher-style" href="">
                  <img className="eth-ancher-img" src="img/usdt.webp" />
                  USDT
                </a>
                <a className="ancher-style" href="">
                  <img className="eth-ancher-img" src="img/wbtc.webp" />
                  WBTC
                </a>
                <a className="ancher-style" href="">
                  <img className="eth-ancher-img" src="img/1inch.webp" />
                  1INCH
                </a>
              </div>
            </div>
            <div className="token-parts">
              {coindata?.map((item,id)=>{
               return(
                <div className="parts-head">
                <div className="left-part">
                  <img src={item?.logoUrl} className="left-part-image" />
                  <div className="left-side-text">
                    <h5 className="left-text-eth">{item?.name}</h5>
                    <p className="grey-text">{item?.symbol}</p>
                  </div>
                </div>
                <div className="right-part">
                  <h5 className="right-text-eth">0</h5>
                  <p>
                    <i className="bi bi-pin-angle-fill" id="pin-dark-icon" />
                  </p>
                </div>
              </div>
               )

              })}
              
              <div className="parts-head">
                <div className="left-part">
                  <img src="img/dai.webp" className="left-part-image" />
                  <div className="left-side-text">
                    <h5 className="left-text-eth">Dai Stablecoin</h5>
                    <p className="grey-text">DAI</p>
                  </div>
                </div>
                <div className="right-part">
                  <h5 className="right-text-eth">0</h5>
                  <p>
                    <i className="bi bi-pin-angle-fill" id="pin-dark-icon" />
                  </p>
                </div>
              </div>
              <div className="parts-head">
                <div className="left-part">
                  <img src="img/usdt.webp" className="left-part-image" />
                  <div className="left-side-text">
                    <h5 className="left-text-eth">Tether USD</h5>
                    <p className="grey-text">USDT</p>
                  </div>
                </div>
                <div className="right-part">
                  <h5 className="right-text-eth">0</h5>
                  <p>
                    <i className="bi bi-pin-angle-fill" id="pin-dark-icon" />
                  </p>
                </div>
              </div>
              <div className="parts-head">
                <div className="left-part">
                  <img src="img/wbtc.webp" className="left-part-image" />
                  <div className="left-side-text">
                    <h5 className="left-text-eth">Wrapped BTC</h5>
                    <p className="grey-text">WETH</p>
                  </div>
                </div>
                <div className="right-part">
                  <h5 className="right-text-eth">0</h5>
                  <p>
                    <i className="bi bi-pin-angle-fill" id="pin-dark-icon" />
                  </p>
                </div>
              </div>
              <div className="parts-head">
                <div className="left-part">
                  <img src="img/welth.webp" className="left-part-image" />
                  <div className="left-side-text">
                    <h5 className="left-text-eth">Wrapped Ether</h5>
                    <p className="grey-text">WETH</p>
                  </div>
                </div>
                <div className="right-part">
                  <h5 className="right-text-eth">0</h5>
                  <p>
                    <i className="bi bi-pin-angle-fill" id="pin-dark-icon" />
                  </p>
                </div>
              </div>
            </div>
            {/* 
          {/* <div class="wallet-byn-head">
    <button onClick={openConnectModal} type="button">
      Open Connect Modal
    </button>
       
            </div> * /} */}
            {/* {/* <a href="#about" class="get-started-btn scrollto" id="connect-btn"><i class="bi bi-wallet"></i> Connect wallet</a> * /} */}
          </form>
        </div>
      </div>
    </section>
  </>
  
  )
}

export default ExamplePage