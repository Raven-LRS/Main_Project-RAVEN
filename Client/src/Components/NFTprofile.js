// Importing modules
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "../App.css";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";
import { nftaddress2, abi1 } from "./abi";
import web3 from "./web3";
import { NavLink } from "react-router-dom";
import NftProf from "./NftProf.tsx";
import { createElement } from "react";

import {useRef} from "react";
// import NftProf from "./NftProf"
// import { BrowserRouter, Routes, Route,NavLink } from "react-router-dom";

function NFTprofile() {
  // usetstate for storing and retrieving wallet details
  const Data = {
    ID: "John",

    idno: 123456789,

    surveyno: "14",

    size: " 5 acres",

    location: "Mannargudi",
  };

  const prof1 = useRef(null);
  const prof2 = useRef(null);
  const [showChild, setShowChild] = useState(false);
  const handleClick = () => {
    setShowChild(true);
    // setData('Hello from Parent Component!')
  };
  const navigate = useNavigate();

  // const[amount,setAmount]=useState("");
  // const[amount1,setAmount1]=useState("");

  var tokens = [];

  var contract = new web3.eth.Contract(abi1, nftaddress2);

  // Button handler button for handling a
  // request event for metamask
  // const btnhandler = () => {

  // 	// Asking if metamask is already present or not
  // 	if (window.ethereum) {

  // 	// res[0] for fetching a first wallet
  // 	window.ethereum
  // 		.request({ method: "eth_requestAccounts" })
  // 		.then((res) => accountChangeHandler(res[0]));
  // 	} else {
  // 	alert("install metamask extension!!");
  // 	}
  // };

  // const getbalance = (address) => {

  // 	// Requesting balance method
  // 	window.ethereum
  // 	.request({
  // 		method: "eth_getBalance",
  // 		params: [address, "latest"]
  // 	})
  // 	.then((balance) => {
  // 		// Setting balance
  // 		setdata({
  // 		Balance: ethers.utils.formatEther(balance),
  // 		});
  // 	});
  // };

  // // Function for getting handling all events
  // const accountChangeHandler = (account) => {
  // 	// Setting an address data
  // 	setdata({
  // 	address: account,
  // 	});

  // 	// Setting a balance
  // 	getbalance(account);
  // };

  //------------------------------------------------------------------
  //------------------------------------------------------------------

  //displaying NFT
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
      // console.log(tokens[0]);
      
    }

    // for (var i = 0; i < tokens.length; i++) {
    //   var token = tokens[i];
    //   var metadataRes = await fetch(`${token.tokenURI}`);
    //   var metadata = await metadataRes.json();
    //   token.metadata = metadata;
    // }

    
    var nft_data = tokens[val1].metadata;
    console.log("identier");
    console.log(nft_data);

    document.getElementById("root1").innerHTML = tokens
      .map(createElement)
      .join("");
    console.log("Values have been updated");
    console.log(tokens[0].tokenURI);
  };

  const handle_prof = () => {
    let x = prof1.current.value;
    main_profile(x)
}

  function createElement(token) {
    return ` <div>
  	
  	<img src="${token.metadata.image}" width="100" height="100"/>
	<h2 style="margin-left: 220px;margin-top:-60px">#${token.tokenId} ${token.metadata.name}</h2>
	<Button class = "but" >View</Button>
  
	<hr style="width: 85%;margin-left: -80px"/>
  
</div>`;
  }
  // function createElement({ token }) {
  //   return createElement(
  //     'h1',
  //     "nljnclj"
  //   );
  // }
  // style="margin-left: 500px;background-color: #ffd600;margin-top:-60px"
  {
    /* <h1>#${token.tokenId} ${token.metadata.name}</h1></Link> */
  }

  return (
    <div className="home">
      {/* Calling all values which we
	have stored in usestate */}

      <Card>
        <Card.Body>
          {/* <NftProf tok = {tokens} /> */}
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
            Submit
          </Button>
          {/* <button  style={{ marginLeft: "240px" ,marginBottom:'140px' }} className="button"onClick={handleClick}>View Metadata</button> */}
          {/* {showChild && <NftProf token={} />} */}

          <br />
          <br />

          <label>name:</label>
          {/* {nft_data} */}
          {/* <Button onClick={approve} >
		approve
		</Button><br/><br/> */}
          <div id="root1">
            {/* <Card className="card">
      <Card.Img variant="top" src="https://elevate.ca/wp-content/uploads/2022/04/galaxy-7040416_1280-1024x576.png"  style ={{width:"150px"}}/>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card> */}
          </div>
          <button
            style={{ marginLeft: "240px" }}
            className="button"
            onClick={handleClick}
          >
            View Metadata
          </button>
          {showChild && <NftProf Data={Data} />}
        </Card.Body>
      </Card>
    </div>
  );
}
export default NFTprofile;
