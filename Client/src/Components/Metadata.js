import React, { useState } from "react";
import axios from "axios";
import { nftaddress2, abi1 } from "./abi";
import web3 from "./web3";
import { useRef } from "react";

function Metadata() {
  const [formData, setFormData] = useState({});

  const inputadd = useRef(null);
  const inputuri = useRef(null);

  const nftcontract = new web3.eth.Contract(abi1, nftaddress2);

  const Mint = async (minter, nfturi) => {
    console.log("minting....");

    const accounts = await web3.eth.getAccounts();
    await nftcontract.methods
      .safeMint(minter, nfturi)
      .send({ from: accounts[0] });
  };
  function handlemint() {
    let add = inputadd.current.value;
    let uri_ = inputuri.current.value;

    Mint(add, uri_);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/submit-form",
        formData
      );

      if (!response.data.success) {
        throw new Error("Failed to store data");
      }

      alert("Data stored successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <div className="subhead">
          <h3>NFT Metadata</h3>
          <p className="function_detail">Metadata can be feed to this form to create a metadata file which can be stored in cloud to nft uri. for more refer this</p>
          <br/>
        </div>
        <label>
          Name:
          <input
            style={{ marginLeft: "125px" }}
            type="text"
            name="name"
            onChange={handleChange}
          />
        </label>
        <br></br>
        <br></br>
        <label>
          ID Number:
          <input
            style={{ marginLeft: "70px" }}
            type="text"
            name="id"
            onChange={handleChange}
          />
        </label>
        <br></br>
        <br></br>
        <label>
          Survey Number:
          <input
            style={{ marginLeft: "20px" }}
            type="text"
            name="survey"
            onChange={handleChange}
          />
        </label>
        <br></br>
        <br></br>
        <label>
          Size:
          <input
            style={{ marginLeft: "150px" }}
            type="text"
            name="size"
            onChange={handleChange}
          />
        </label>
        <br></br>
        <br></br>
        <label>
          Location:
          <input
            style={{ marginLeft: "100px" }}
            type="text"
            name="loc"
            onChange={handleChange}
          />
        </label>
        <br></br>
        <br></br>
        <label>
          Image URI:
          <input
            style={{ marginLeft: "80px" }}
            type="text"
            name="image"
            onChange={handleChange}
          />
        </label> <br />
      <br></br>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
      <br />
      <br />
      <div className="subhead">
        <h3>NFT Minter</h3>
        <p className="function_detail">Generated uri and address of the nft owner is given to create new Nft. for more refer this</p>
      </div>
      
      <label>
        Address:
        <input
          style={{ marginLeft: "125px" }}
          type="text"
          ref={inputadd}
          name="address"
        />
      </label>
      <br />
      <br></br>
      <label>
        URI:
        <input
          style={{ marginLeft: "175px" }}
          type="text"
          ref={inputuri}
          name="uri"
        />
      </label>
      <br />
      <br />
      <button className="button" onClick={handlemint}>
        Mint
      </button>
    </div>
  );
}

export default Metadata;
