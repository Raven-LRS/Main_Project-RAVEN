import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "../App.css";
import { Card } from "react-bootstrap";
import { nftaddress2, abi1 } from "./abi";
import web3 from "./web3";
import { useRef } from "react";
import { data } from "./Header";

function Splitmerge(props) {
  // usetstate for storing and retrieving wallet details
  const [data, setdata] = useState({
    address: "",
    Balance: null,
  });

  const [amount, setAmount] = useState("");
  const [amount1, setAmount1] = useState("");
  const inputamt = useRef(null);
  const inputamt1 = useRef(null);
  const inputamt2 = useRef(null);
  const inputamt3 = useRef(null);
  const inputamt4 = useRef(null);
  const inputamt5 = useRef(null);

  const nftcontract = new web3.eth.Contract(abi1, nftaddress2);

  //------------------------------------------------------------------
  //------------------------------------------------------------------

  const Split = async (nftid, uri1, uri2) => {
    console.log("Transfering....");

    const accounts = await web3.eth.getAccounts();
    await nftcontract.methods
      .nftsplit(nftid, uri1, uri2)
      .send({ from: accounts[0] });
  };
  function handle() {
    console.log(inputamt1.current.value);

    let h = inputamt.current.value;
    let i = inputamt1.current.value;
    let j = inputamt2.current.value;

    Split(h, i, j);
  }

  //-----------------------------------------------------------------

  const Merge = async (nftid1, nftid2, uri3) => {
    console.log("Transfering....");

    const accounts = await web3.eth.getAccounts();
    await nftcontract.methods
      .nftmerge(nftid1, nftid2, uri3)
      .send({ from: accounts[0] });
  };
  function handle1() {
    console.log(inputamt1.current.value);

    let k = inputamt3.current.value;
    let l = inputamt4.current.value;
    let m = inputamt5.current.value;

    Merge(k, l, m);
  }

  return (
    <div className="home">
      {/* Calling all values which we
	have stored in usestate */}
<div id="box">
      <h2 style={{textAlign:'center'}}>Split</h2>
      <p className="function_detail">
        This function splits a NFT in case Owner wills it. NFT ID refers to
        tokenID in smart contract.
        <br />
        URI 1,URI 2 refers to metadata of new tokens.
      </p>
      <br />
      <div className="form-group" >
        <input
          style={{width:'70%',borderRadius:'10px'}}
          ref={inputamt}
          type="text"
          id="amt"
          name="amt"
          placeholder=" "
          required
        />
        <label for="amt">NFT ID</label>
      </div>

      <div className="form-group" >
        <input
          style={{width:'70%',borderRadius:'10px'}}
          ref={inputamt1}
          type="text"
          id="amt1"
          name="amt1"
          placeholder=" "
          required
        />
        <label for="amt1">URI 1</label>
      </div>

      {/* https://api.npoint.io/85d1c9f86870b292c0a6 */}
      <div className="form-group" >
        <input style={{width:'70%',borderRadius:'10px'}} ref={inputamt2} type="text" id="amt2" name="amt2"  placeholder=" "
          required/>
        <label for="amt2">URI 2</label>
      </div>
      {/* https://api.npoint.io/93f545d7fdc6a183a092 */}
    
      <button style={{marginLeft:'250px'}} className="button" onClick={handle}>
        Split
      </button>
      <br /> 
      </div>      <br /> 
      <div id="box">
      <h2 style={{textAlign:'center'}}>Merge</h2>
      <p className="function_detail">
        This function merges two NFTs in case Owner wills it. NFT ID1, NFT ID2
        refers to tokenID in Smart contract.
        <br />
        URI 3 refers to Metadata of new token
      </p>
      <br />
      <div className="form-group" >
        <input style={{width:'70%',borderRadius:'10px'}} ref={inputamt3} type="text" id="amt3" name="amt3" placeholder=" "
          required />
        <label for="amt3">NFT ID 1</label>
      </div>

      <div className="form-group" >
        <input style={{width:'70%',borderRadius:'10px'}} ref={inputamt4} type="text" id="amt4" name="amt4"  placeholder=" "
          required/>
        <label for="amt4">NFT ID 2</label>
      </div>

      <div className="form-group" >
        <input style={{width:'70%',borderRadius:'10px'}} ref={inputamt5} type="text" id="amt5" name="amt5" placeholder=" "
          required />
        <label for="amt5">URI 3</label>
      </div>

      <button style={{marginLeft:'250px'}} className="button" onClick={handle1}>
        Merge
      </button>
      
      </div><br />
      <br />
    </div>
  );
}
export default Splitmerge;
