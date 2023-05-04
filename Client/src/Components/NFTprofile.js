// Importing modules
import React, { useEffect, useState } from "react";
import "../App.css";
import { Button, Card } from "react-bootstrap";
import { nftaddress2, abi1 } from "./abi";
import web3 from "./web3";
import { useRef } from "react";
import Popup from "./Popup";

function NFTprofile() {
  // usetstate for storing and retrieving wallet details

  const prof1 = useRef(null);
  const seller_ = useRef(null);
  const buyer_ = useRef(null);
  const tid_ = useRef(null);
  const addr = useRef(null);
  const addr1 = useRef(null);
  const [nftd, setNftd] = useState({});
  const [btnpp1, setbtnpp1] = useState(false);

  const [btnpp2, setbtnpp2] = useState(false);

  var tokens = [];
  var tkdisp;

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
      if (tokenId == val1) {
        tkdisp = i;
      }
      console.log(tokens);
    }

    setNftd(tokens[tkdisp].metadata);
  };

  const handle_prof = () => {
    let x = prof1.current.value;
    main_profile(x);
    setbtnpp1(true);
  };

  const sell = async (buyer, tid) => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.nftSell(buyer, tid).send({ from: accounts[0] });
  };

  const handle_sell = () => {
    //let a = seller_.current.value;
    let b = buyer_.current.value;
    let c = tid_.current.value;
    sell(b, c);
  };

  const approve = async (user_to_enable) => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods
      .Reg_approval(user_to_enable)
      .send({ from: accounts[0] });
  };

  const handle_approve = () => {
    let d = addr.current.value;
    approve(d);
  };

  const revoke = async (user_to_revoke) => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods
      .revoke_reg_approval(user_to_revoke)
      .send({ from: accounts[0] });
  };

  const handle_revoke = () => {
    let e = addr1.current.value;
    revoke(e);
  };

  return (
    <div className="home">
      {/* Calling all values which we
	have stored in usestate */}
      <div className="form-group">
        <input
          ref={prof1}
          type="text"
          id="id_1"
          name="id_1"
          placeholder=" "
          required
        />
        <label for="id_1">NFT ID:</label>
      </div>
      <Button
        style={{
          marginLeft: "350px",
          marginTop: "30px",
          padding: "10px 40px",
        }}
        className="button"
        onClick={handle_prof}
      >
        View Data
      </Button>
      <Popup
        style={{ backgroundColor: "#61dafb" }}
        trigger={btnpp1}
        setTrigger={setbtnpp1}
      >
        <div style={{ color: "black" }}>
          <img src={nftd.image} class="center" />
          <br></br>
          <p>Name:</p>
          {nftd.name}
          <br />
          <br />
          <p>ID Number:</p>
          {nftd.id}
          <br />
          <br />
          <p>Survey Number:</p>
          {nftd.suevey}
          <br />
          <br />
          <p>Size:</p>
          {nftd.size}
          <br />
          <br />
          <p>Location:</p>
          <a href={nftd.loc} target="_blank">
            {nftd.loc}
          </a>
          <br />
          <br />

          <button
            onClick={() => setbtnpp2(true)}
            style={{ marginTop: "30px" }}
            className="button"
          >
            SELL
          </button>
        </div>
      </Popup>
      <Popup trigger={btnpp2} setTrigger={setbtnpp2}>
        <div style={{ color: "black" }}>
          <form>
            <div className="form-group">
              <input
                ref={buyer_}
                className="input"
                type="text"
                name="reciever"
                id="too"
                placeholder=" "
                required
              />
              <label for="too">To:</label>
            </div>
            <div className="form-group">
              <input
                ref={tid_}
                className="input"
                type="text"
                name="idno"
                id="nfti"
                placeholder=" "
                required
              />
              <label for="nfti">NFT ID:</label>
            </div>
          </form>
          <button className="button" onClick={handle_sell}>
            PROCEED
          </button>
        </div>
      </Popup>
      <br></br>
      <hr style={{ width: "80%", marginLeft: "-30px" }}></hr>
      <br></br>
      <h2 style={{ marginLeft: "300px" }}>Registrar Consent</h2>
      <p className="function_detail">
        Registrar has to give his approval to initiate modification in Nft. for
        more refer this
      </p>
      <br />
      <div className="form-group">
        <input
          ref={addr}
          type="text"
          id="id_1"
          name="id_1"
          placeholder=" "
          required
        />  
        <label for="id_1">User Address :</label>
      </div>
      <button
        onClick={handle_approve}
        style={{ padding: "6px 20px", fontSize: "17px" }}
        className="button"
      >
        Approve
      </button>
      <br /> <br />
      <div className="form-group">
        <input
          ref={addr1}
          type="text"
          id="id_1"
          name="id_1"
          placeholder=" "
          required
        />
        <label for="id_1">User Address :</label>
      </div>
      <button
        onClick={handle_revoke}
        style={{ padding: "6px 20px", fontSize: "17px" }}
        className="button"
      >
        Revoke
      </button>
    </div>
  );
}
export default NFTprofile;
