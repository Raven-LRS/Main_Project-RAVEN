// Importing modules
import React, { useEffect, useState } from "react";

import "../App.css";
import { Button, Card } from "react-bootstrap";

import { nftaddress2, abi1 } from "./abi";
import web3 from "./web3";


function Dashboard() {
  

  var tokens = [];

  var contract = new web3.eth.Contract(abi1, nftaddress2);

  
  //------------------------------------------------------------------
  //------------------------------------------------------------------

  //displaying NFT
  var main = async () => {
    var accounts = await web3.eth.getAccounts();
    var account = accounts[0];

    const balance = Number(await contract.methods.balanceOf(account).call());

    for (var i = 0; i < balance; i++) {
      var tokenId = await contract.methods.tokenOfOwnerByIndex(account, i).call();
      var tokenURI = await contract.methods.tokenURI(tokenId).call();
      var metadataRes = await fetch(`${tokenURI}`);
      var metadata = await metadataRes.json();
      tokens.push({ tokenId, tokenURI, metadata });
      console.log(tokens);
      // console.log(tokens[0]);
    }

    

    document.getElementById("root1").innerHTML = tokens
      .map(createElement)
      .join("");
    console.log("Values have been updated");
    console.log(tokens);
  };

  function createElement(token) {
    return ` <div>
  	
  	<img src="${token.metadata.image}" width="100" height="100"/>
	<h2 style="margin-left: 220px;margin-top:-60px">#${token.tokenId} ${token.metadata.name}</h2>
	
	<hr style="width: 85%;margin-left: -80px"/>
  
</div>`;
  }
 

  return (
    <div className="home">
      {/* Calling all values which we
	have stored in usestate */}

      <Card>
        <Card.Body>
          
          <Button
            style={{ marginLeft: "220px" }}
            className="button"
            onClick={main}
          >
            Display the Land NFTs
          </Button>
         
          <br />
          <br />
         
          <div id="root1">
            
          </div>
         
        </Card.Body>
      </Card>
    </div>
  );
}
export default Dashboard;
