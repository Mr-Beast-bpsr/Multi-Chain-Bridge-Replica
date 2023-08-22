import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function Coinlist(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [coindata, setCoindata] = useState();
  const [searchedData, setSearchedData] = useState(null);
  const [staticData, setStaticData] = useState();
  const [inputData,setInputData]=useState(null)
  const [chainid1,setChainid1]=useState(1);
  const [newData,setNewData]=useState(false);
  const router = new useRouter();
  const dataFetchedRef = useRef(false);

 



  // console.log(props?.chainId,'chaind iddddddddddddd')
   const chainid=props?.chainId;
 
  async function tokenlist() {
    const chainid= localStorage.getItem("chainid")
  
    try {
      const response = await axios.post("/api/examplepage",{chainid});

      const data = response.data.data;
      const obj = Object.values(data);
      setCoindata(obj);
      props?.setSelectData(obj[0]);
      //  console.log(obj,"nnnnnnnnnnnnnnnnnn")
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
   
    tokenlist();

  },[chainid]);

  


  
  
  // console.log(coindata,"console...........>")

  async function coinitem(item) {
    props?.setSelectData(item);
    // console.log("-------------->",item)
    setModalShow(false);
    setSearchedData(null)
  }

  async function searchHandle(e) {
    const term = e.target.value.toLowerCase();
    setInputData(term)
    const filterData =  coindata?.filter((item) => {
      return (
        item?.name.toLowerCase().includes(inputData) ||
        item?.symbol.toLowerCase().includes(inputData)
      );
    });
    setSearchedData(filterData);
  }

  async function staticData1() {
    const filterData = coindata?.filter((item) => {
      return (
        item?.symbol == "UNI" ||
        item?.symbol == "ETH" ||
        item?.symbol == "WETH" ||
        item?.symbol == "USDC" ||
        item?.symbol == "DAI" ||
        item?.symbol == "USDT" ||
        item?.symbol == "WBTC" ||
        item?.symbol == "BUSD"
      );
    });
    setStaticData(filterData);
    // console.log(filterData, "jjjjjjjjj--------->");
  }
  useEffect(() => {
   
    staticData1();
  }, [coindata]);

  
  
// console.log(props?.chainId,"kkkkkkkkkkkkkkkkkk------------------>")
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered 
      backdrop="static"
    >
      <Modal.Header closeButton onClick={()=> setSearchedData(null)}>
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <section>
          <div className="container">
            <div className="row justify-content-center">
              <form className="input-sec input-top p-0" id="bar-top">
                <div className="input-line iptset-line" id="index-line" />
                <div className="token-head">
                <div className="rapper-between" id="token-form-padding">

<div className="arrWithHeading">
<h5 style={{ cursor: "pointer" }}>
  <i className="bi bi-chevron-left" id="back-btn-icon" />
</h5>
<h5> Select a Token </h5>
</div>
<h5 className="hide-text"></h5>
</div>
                  <div className="input-group mb-1" id="search-bar">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="bi bi-search" />
                    </span>
                    <input
                      onChange={searchHandle}
                      type="text"
                      className="form-control"
                      placeholder="Search by name or symbol"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  <div className="token-ancher-head">
                    {staticData?.map((item, id) => {
                      return (
                        <a onClick={props.onHide} key={id}>
                          <a
                            className="ancher-style"
                            href="#"
                            onClick={() => coinitem(item)}
                          >
                            <img
                              className="eth-ancher-img"
                              src={item?.logoUrl}
                            />
                            {item?.symbol}
                          </a>
                        </a>
                      );
                    })}
                  </div>
                </div>
                {!searchedData ? (
                  <div className="token-parts">
                    {coindata?.map((item, id) => {
                      return (
                        <a onClick={props.onHide} key={id}>
                          <a onClick={() => coinitem(item)}>
                            <div className="parts-head">
                              <div className="left-part">
                                <img
                                  src={item?.logoUrl}
                                  className="left-part-image"
                                />
                                <div className="left-side-text">
                                  <h5 className="left-text-eth">
                                    {item?.name}
                                  </h5>
                                  <p className="grey-text">{item?.symbol}</p>
                                </div>
                              </div>
                              <div className="right-part">
                                <h5 className="right-text-eth">0</h5>
                                <p>
                                  <i
                                    className="bi bi-pin-angle-fill"
                                    id="pin-dark-icon"
                                  />
                                </p>
                              </div>
                            </div>
                          </a>
                        </a>
                      );
                    })}
                  </div>
                ) : (
                  <div className="token-parts">
                    {searchedData?.map((item, id) => {
                      return (
                        <a onClick={props.onHide} key={id}>
                          <a onClick={() => coinitem(item)}>
                            <div className="parts-head">
                              <div className="left-part">
                                <img
                                  src={item?.logoUrl}
                                  className="left-part-image"
                                />
                                <div className="left-side-text">
                                  <h5 className="left-text-eth">
                                    {item?.name}
                                  </h5>
                                  <p className="grey-text">{item?.symbol}</p>
                                </div>
                              </div>
                              <div className="right-part">
                                <h5 className="right-text-eth">0</h5>
                                <p>
                                  <i
                                    className="bi bi-pin-angle-fill"
                                    id="pin-dark-icon"
                                  />
                                </p>
                              </div>
                            </div>
                          </a>
                        </a>
                      );
                    })}
                  </div>
                )}
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
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
}
export default Coinlist;
// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }

// render(<App />);
