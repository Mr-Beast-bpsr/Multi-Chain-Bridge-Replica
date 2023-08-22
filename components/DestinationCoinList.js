import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";

function DestinationCoinList(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [coindata, setCoindata] = useState();
  const [searchedData, setSearchedData] = useState();
  const [staticData, setStaticData] = useState();
  const [chainid1, setChainid1] = useState(1);
  const [newData, setNewData] = useState();
  const router = new useRouter();
  const dataFetchedRef = useRef(false);

  // console.log(props?.destinationcoinData,'data iddddddddddddd')
  // console.log(props?.deschainId,'chaind iddddddddddddd')
  const deschainId = props?.deschainId;
  const selectData = props?.selectData;

  useEffect(() => {
    if (deschainId) {
      const obj = props?.destinationcoinData?.destChains[deschainId];
      if (obj) {
        var Token = Object.values(obj);
        setNewData(Token[0]);
        props?.setNewData1(Token[0]);
        // console.log(Token,"ddddddddddestination");
      }
    }
  }, [deschainId,props?.destinationcoinData]);

  // console.log(coindata,"console...........>")

  async function coinitem(item) {
    props?.setSelectData(item);
    // console.log("-------------->",item)
    setModalShow(false);
  }

  // console.log(props?.chainId,"kkkkkkkkkkkkkkkkkk------------------>")
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
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
                    <h5 className="hide-text">1</h5>
                  </div>
                  <div className="input-group mb-1" id="search-bar">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="bi bi-search" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by name or symbol"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>

                <div className="token-parts">
                  <a onClick={props.onHide}>
                    <a onClick={() => coinitem(props?.destinationcoinData)}>
                      <div className="parts-head">
                        <div className="left-part">
                          <img
                            src={props?.destinationcoinData?.logoUrl}
                            className="left-part-image"
                          />
                          <div className="left-side-text">
                            <h5 className="left-text-eth">{newData?.name}</h5>
                            <p className="grey-text">{newData?.symbol}</p>
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
                </div>
              </form>
            </div>
          </div>
        </section>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default DestinationCoinList;
