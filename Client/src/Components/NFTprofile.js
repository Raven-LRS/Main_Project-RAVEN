// Importing modules
import React, { useEffect, useState } from "react";
import "../App.css";
import { Button, Card } from "react-bootstrap";
import { nftaddress2, abi1 } from "./abi";
import web3 from "./web3";
import {useRef} from "react";
import Popup from "./Popup";

function NFTprofile() {
  // usetstate for storing and retrieving wallet details
  

  const prof1 = useRef(null);
  const seller_ = useRef(null);
  const buyer_ = useRef(null);
  const tid_ = useRef(null);
  
  const [nftd, setNftd] = useState({});
  const [btnpp, setbtnpp] = useState(false);

  

  var tokens = [];
 
  var contract = new web3.eth.Contract(abi1, nftaddress2);

  

  var main_profile = async (val1) => {
    var accounts = await web3.eth.getAccounts();
    var account = accounts[0];

    const balance = Number(await contract.methods.balanceOf(account).call());

    for (var i = 0; i < balance; i++) {
      var tokenId = await contract.methods
        .tokenOfOwnerByIndex(account, i)
        .call();
      var tokenURI = await contract.methods.tokenURI(tokenId).call();
      var metadataRes = await fetch(`${tokenURI}`);
      var metadata = await metadataRes.json();
      tokens.push({ tokenId, tokenURI, metadata });
      console.log(tokens);
      
      
    }

   
    setNftd(tokens[val1].metadata);

    
  };

  const handle_prof = () => {
    let x = prof1.current.value;
    main_profile(x)
}
 
  const sell = async(seller,buyer, tid) => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.safeTransferFrom(seller,buyer, tid).send({ from: accounts[0] });
  }

  const handle_sell = () => {
    let a = seller_.current.value;
    let b = buyer_.current.value;
    let c = tid_.current.value;
    sell(a,b,c)
}


  return (
    <div className="home">
      {/* Calling all values which we
	have stored in usestate */}

      <Card>
        <Card.Body>
          
          <label>NFT Id:</label>
          <input
            style={{ marginLeft: "60px" }}
            ref={prof1}
            type="text"
            id="id_1"
            name="id_1"
          />
          <br></br>

          <Button
            style={{ marginLeft: "220px" }}
            className="button"
            onClick={handle_prof}
          >
            View Data
          </Button>
         
          <br />
          <br />

          <label>name:</label>
          {nftd.name}
          <br />
          <br />
          <label>image:</label>
          {nftd.image}
          <button onClick={() => setbtnpp(true)} className="button">
          SELL
        </button>
        <br></br>
        <br></br>
        <Popup trigger={btnpp} setTrigger={setbtnpp}>
          <div style={{ color: "black" }}>
            <form>
              <label>
                From:
                <input
                  ref = {seller_}
                  style={{ marginLeft: "68px" }}
                  className="input"
                  type="text"
                  name="sender"
                />
              </label>
              <br></br>
              <label>
                To:
                <input ref = {buyer_} className="input" type="text" name="reciever" />
              </label>
              <br></br>
              <label>
                ID:
                <input ref = {tid_} className="input" type="text" name="idno" />
              </label>
            </form>
            <button className="button" onClick={handle_sell}>PROCEED</button>
          </div>
        </Popup>
        </Card.Body>
      </Card>
    </div>
  );
}
export default NFTprofile;
