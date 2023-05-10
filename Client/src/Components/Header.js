import React, { useState } from "react";
import { ethers } from "ethers";
import "../App.css";
import { FiCopy } from 'react-icons/fi';
export default function Header() {
  const [add, setadd] = useState("ClickAgain");
  const [data, setdata] = useState({
    address: null,
    Balance: null,
  });
  const [log, setlog] = useState("LOGIN");
  const btnhandler = () => {
    // Asking if metamask is already present or not
    if (window.ethereum) {
      // res[0] for fetching a first wallet
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => accountChangeHandler(res[0]));

      console.log("connected");
    } else {
      alert("install metamask extension!!");
    }

    // setlog(`${add.slice(0,5)}...${add.slice(-5)}`);
  };

  const getbalance = (address) => {
    // Requesting balance method
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      .then((balance) => {
        // Setting balance
        setdata({
          Balance: ethers.utils.formatEther(balance),
        });
      });
  };

  // Function for getting handling all events
  const accountChangeHandler = (account) => {
    // Setting an address data
    setdata({
      address: account,
    });
    console.log(account);
    setadd(account);
    setlog(`${add.slice(0, 5)}...${add.slice(-5)}`);

    // Setting a balance
    getbalance(account);
  };
  // function rel(){
  //   location.reload()
  // }

  //-------

  return (
    <>
      <img
        align="left"
        className="img"
        src={require("./raven.png")}
        alt="logo"
      />

      <div className="head">
        <h1 style={{fontFamily: 'Bruno Ace SC'}}>RAVEN</h1>
      </div>
      <button onClick={btnhandler} className="log">
        {log}
      </button>
      <button className="log" style={{padding:'1px',border:'none',marginInlineStart:'3px'}}
        onClick={() => {
          navigator.clipboard.writeText(add);
        }}
      >
        <FiCopy/>
      </button>
    </>
  );
}
