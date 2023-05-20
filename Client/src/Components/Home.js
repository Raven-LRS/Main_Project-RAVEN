import React from "react";

export default function Home() {
  return (
    <div className="home">
      <h1>Meet RAVEN ! </h1>

      <h1>The Decentralised Land Record System </h1><br></br>
       
      <h2 style={{ color: "#ffd600" }}>Requirements to use</h2>
      <p>User must have metamask extension enabled in their Browser. 
        And it should be changed to <strong>Sepolia testnet</strong> for smooth transaction</p>
      <br></br>
      <h2 style={{ color: "#ffd600" }}>Login</h2>
      <p>The User has to Login with Metamask ID</p>
      <br></br>
      <h2 style={{ color: "#ffd600" }}>Create NFT</h2>
      
      <p>The Land Registrar can create Land NFTs through Create NFT tab</p>
      <p style={{ color: "#ffd600", marginLeft: "70px" }}>Nft Metadata:</p>
      <p style={{ marginLeft: "90px" }}>User can create a JSON file locally and then save it in npoint to generate uri link.
       Note that json file will be stored in "C:/Users/Public/"</p>
      <p style={{ color: "#ffd600", marginLeft: "70px" }}>Nft Minter:</p>
      <ul style={{ marginLeft: "110px" }}>
        <li>Address - represents for owner of the NFT</li>
        <li>URI - represents Metadata link generated from n-point</li>
      </ul>
      <br></br>
      <h2 style={{ color: "#ffd600" }}>Dashboard</h2>
      <p>Users can view thier Land NFT holdings and Its Metadata through Dashboard</p>
      <br></br>
      <h2 style={{ color: "#ffd600" }}>Split/Merge</h2>
      <p>The User can Split their Land NFT into two NFTs</p>
      <ul style={{ marginLeft: "70px" }}>
        <li>Nft Id - represents NFT to be split</li>
        <li>URI 1 - represents Metadata link generated from n-point for 1st partition</li>
        <li>URI 2 - represents Metadata link generated from n-point for 2nd partition</li>
      </ul>
      <p>The User can Merge their two Land NFTs into One NFT</p>
      <ul style={{ marginLeft: "70px" }}>
        <li>Nft Id 1 - represents NFT to be merged</li>
        <li>Nft Id 2 - represents NFT to be merged</li>
        <li>URI 3 - represents Metadata link generated from n-point for new NFT</li>
      </ul>
      <br></br>
    </div>
  );
}
