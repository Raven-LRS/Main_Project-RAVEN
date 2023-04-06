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

// import {useRef} from "react";
// import NftProf from "./NftProf"
// import { BrowserRouter, Routes, Route,NavLink } from "react-router-dom";

function Dashboard() {
  // usetstate for storing and retrieving wallet details
  const Data = {
    ID: "John",

    idno: 123456789,

    surveyno: "14",

    size: " 5 acres",

    location: "Mannargudi",
  };
  const [showChild, setShowChild] = useState(false);
  const handleClick = () => {
    setShowChild(true);
    // setData('Hello from Parent Component!')
  };
  const navigate = useNavigate();

  // const[amount,setAmount]=useState("");
  // const[amount1,setAmount1]=useState("");

  let tokens = [];

  const contract = new web3.eth.Contract(abi1, nftaddress2);

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
  const main = async () => {
    var accounts = await web3.eth.getAccounts();
    let account = accounts[0];

    const balance = Number(await contract.methods.balanceOf(account).call());

    for (var i = 0; i < balance; i++) {
      const tokenId = await contract.methods
        .tokenOfOwnerByIndex(account, i)
        .call();
      const tokenURI = await contract.methods.tokenURI(tokenId).call();
      tokens.push({ tokenId, tokenURI });
    }

    for (var i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const metadataRes = await fetch(`${token.tokenURI}`);
      const metadata = await metadataRes.json();
      token.metadata = metadata;
    }

    document.getElementById("root1").innerHTML = tokens
      .map(createElement)
      .join("");
    console.log("Values have been updated");
  };

  function createElement(token) {
    return ` <div>
  	
  	<img src="${token.metadata.image}" width="100" height="100"/>
	<h2>#${token.tokenId} ${token.metadata.name}</h2>
	
  
	<hr />
  
</div>`;
  }

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

          <Button
            style={{ marginLeft: "270px" }}
            className="button"
            onClick={main}
          >
            Display the Land NFTs
          </Button>
          

          <br />
          <br />
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
          <button  style={{ marginLeft: "270px" ,marginBottom:'140px' }} className="button"onClick={handleClick}>View Metadata</button>
          {showChild && <NftProf Data={Data} />}
        </Card.Body>
      </Card>
    </div>
  );
}
export default Dashboard;
