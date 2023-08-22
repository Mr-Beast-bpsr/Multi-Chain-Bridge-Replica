import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { customChains } from "./CustomChains";
function DestinationChain(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [coindata, setCoindata] = useState([{}]);
  const [searchedData, setSearchedData] = useState();
  const [destinationChain,setDestinationChain]=useState();
  const router = new useRouter();
  const destChains=props?.destChainss;
  console.log(destChains,"bbbbbbbbbbbb");
    
  
  async function tokenlist() {

    let list=[];
    try {
      const response = await axios.post("/api/destinationChain");
      const data = response.data.data;
      // console.log(data,"data...........>")
      setDestinationChain(data)
      const matchedData= destChains?.map((item,id)=>{
        if(item=='SOL' || item=='XRP' || item=='NEAR' || item=='APT' || item=='ADA' || item=='SOL' ){
        return 
        }else{
          const data1= data[item];
          data1['ChainId']=item;
          return data1
        }
      
      });
      const destData=matchedData?.filter((item,id)=>{
        if(item){
          return item;
        }
      })
      // console.log(destData,"nnnnnnnnnnnMATCHED DAta")
      const obj = Object.values(destData);
      setCoindata(obj);
      props?.setDestinationchainData(obj[0]);
      
      

      // console.log(obj,"nnnnnnnnnnnnnnnnnn")
    } catch (err) {
      console.log(err);
    }
  }

  async function searchHandle(e) {
    const term = e.target.value.toLowerCase();
    const filterData = coindata?.filter((item) => {
      return (
        item?.name.toLowerCase().includes(term) ||
        item?.symbol.toLowerCase().includes(term)
      );
    });
    setSearchedData(filterData);
  }

  useEffect(() => {
    tokenlist();
  }, [destChains]);
  // console.log(coindata,"kkkkkkkkkkkkkkk");

  async function coinitem(item) {
    props?.setDestinationchainData(item);
    setModalShow(false);
    setSearchedData(null)
  }
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
                      <h5> Select a Chain </h5>
                    </div>
                    <h5 className="hide-text"></h5>
                  </div>
                  <div className="input-group mb-1" id="search-bar">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="bi bi-search" />
                    </span>
                    <input
                      type="text"
                      onChange={searchHandle}
                      className="form-control"
                      placeholder="Search by name or symbol"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  <div className="token-ancher-head"></div>
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
                                    {"  " + item?.networkType?.toLowerCase()}
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
                                    {"  " + item?.networkType?.toLowerCase()}
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
export default DestinationChain;
