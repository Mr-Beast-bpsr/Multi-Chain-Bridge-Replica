import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function CustomWallets(props) {
    const [modalShow, setShowCustomWallet] = React.useState(false);


async function handleMartian(){
    props.setCustomWalletName("Martian")
    
}
async function handlePontem(){
    props.setCustomWalletName("Pontem")
    
}




  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter lahry"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="wallet-custom">
            <div className="wallet-sedule">
              <a href="#" className="wallet-butt" onClick={handleMartian}>
                <img src="martain.png" alt="Girl in a jacket" width="40" height="40">
                
                </img>
                <p>Martian Wallet</p>
                
             </a>
            </div>
            <div className="wallet-sedule">
            <a href="#" className="wallet-butt" onClick={handlePontem}>
                <img src="pontem.svg" alt="Girl in a jacket" width="40" height="40">
                
                </img>
                <p>Pontem Wallet</p>
                
             </a>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomWallets;
