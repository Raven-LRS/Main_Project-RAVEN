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

  // Button handler button for handling a
  // request event for metamask
  // const btnhandler = () => {
  //   // Asking if metamask is already present or not
  //   if (window.ethereum) {
  //     // res[0] for fetching a first wallet
  //     window.ethereum
  //       .request({ method: "eth_requestAccounts" })
  //       .then((res) => accountChangeHandler(res[0]));
  //   } else {
  //     alert("install metamask extension!!");
  //   }
  // };

  // const getbalance = (address) => {
  //   // Requesting balance method
  //   window.ethereum
  //     .request({
  //       method: "eth_getBalance",
  //       params: [address, "latest"],
  //     })
  //     .then((balance) => {
  //       // Setting balance
  //       setdata({
  //         Balance: ethers.utils.formatEther(balance),
  //       });
  //     });
  // };

  // // Function for getting handling all events
  // const accountChangeHandler = (account) => {
  //   // Setting an address data
  //   setdata({
  //     address: account,
  //   });

  //   // Setting a balance
  //   getbalance(account);
  // };

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

      <Card style={{ marginTop: "-80px" }}>
        <Card.Body>
         
          <h2>Split</h2>
          <p className="function_detail">This function splits a NFT in case Owner wills it. NftID refers to tokrnID in smart contract.<br/>
          Uri1,Uri2 refers to metadata of new tokens. for more refer this</p>
          <br />
          <label>NFT ID</label>
          <input
            style={{ marginLeft: "42px" }}
            ref={inputamt}
            type="text"
            id="amt"
            name="amt"
          />

<br></br><br></br>
          <label>URI 1</label>
          <input
            style={{ marginLeft: "60px" }}
            ref={inputamt1}
            type="text"
            id="amt1"
            name="amt1"
          />
          <br></br><br></br>
          {/* https://api.npoint.io/85d1c9f86870b292c0a6 */}
          <label>URI 2</label>
          <input
            style={{ marginLeft: "55px" }}
            ref={inputamt2}
            type="text"
            id="amt2"
            name="amt2"
          />

          {/* https://api.npoint.io/93f545d7fdc6a183a092 */}
          <br />
          <br />
          <button className="button" onClick={handle}>
            Split
          </button>
          <br />

          <h2>Merge</h2>
          <p className="function_detail">This function merges two NFTs in case Owner wills it. NftID1, NftID2 refers to tokenID in smart contract.<br/>
          Uri3 refers to metadata of new token. for more refer this</p>
          <br />
          <label>NFT ID 1</label>
          <input
            style={{ marginLeft: "30px" }}
            ref={inputamt3}
            type="text"
            id="amt3"
            name="amt3"
          />

          <br></br><br></br>
          <label>NFT ID 2</label>
          <input
            style={{ marginLeft: "25px" }}
            ref={inputamt4}
            type="text"
            id="amt4"
            name="amt4"
          />

          <br></br><br></br>
          <label>URI 3</label>
          <input
            style={{ marginLeft: "54px" }}
            ref={inputamt5}
            type="text"
            id="amt5"
            name="amt5"
          />

          <br />
          <br />
          <button className="button" onClick={handle1}>
            Merge
          </button>
          <br />
          <br />
        </Card.Body>
      </Card>
    </div>
  );
}
export default Splitmerge;
