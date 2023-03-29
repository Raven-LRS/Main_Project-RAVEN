// Importing modules
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "../App.css";
import { Button, Card } from "react-bootstrap";
// import { Link } from "react-router-dom"; 
//import "bootstrap/dist/css/bootstrap.min.css";
import {nftaddress2,abi1} from "./abi";
import web3 from "./web3";
// import {useRef} from "react";
// import NftProf from "./NftProf"
// import { BrowserRouter, Routes, Route,NavLink } from "react-router-dom";



function Dashboard() {

// usetstate for storing and retrieving wallet details
const [data, setdata] = useState({
	address: "",
	Balance: null,
});

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

	const balance = Number(await contract.methods.balanceOf(account).call())

	for (var i = 0; i < balance; i++) {
		const tokenId = await contract.methods.tokenOfOwnerByIndex(account, i).call()
		const tokenURI = await contract.methods.tokenURI(tokenId).call();
		tokens.push({ tokenId, tokenURI })
	}

	for (var i = 0; i < tokens.length; i++) {
		const token = tokens[i];
		const metadataRes = await fetch(`${token.tokenURI}`)
		const metadata = await metadataRes.json()
		token.metadata = metadata
	}

	document.getElementById("root1").innerHTML = tokens.map(createElement).join("")
	console.log('Values have been updated')
}

function createElement(token) {
	return ` <div>
  <a href='/NftProf'>
   
  <img src="${token.metadata.image}" width="100" height="100"/>
	<h2>#${token.tokenId} ${token.metadata.name}</h2></a>
	
	<hr />
  
</div>`
}


{/* <h1>#${token.tokenId} ${token.metadata.name}</h1></Link> */}

	  	

		  
	

return (
	<div className="home">
	{/* Calling all values which we
	have stored in usestate */}

	<Card className="text-center">
		
		<Card.Body>
		{/* <NftProf tok = {tokens} /> */}

		<Button className="button" onClick={main} >
			DisplayNFT
		</Button>
		
		
		
		<br/>
		<br/>
		{/* <Button onClick={approve} >
		approve
		</Button><br/><br/> */}
		<div  id="root1"></div>
		
		</Card.Body>
	</Card>
	</div>
);

}
export default Dashboard;



