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
          <p className="function_detail">
            Metadata can be feed to this form to create a metadata file which
            can be stored in cloud to NFT URI
          </p>
          <br />
        </div>
        <div className="form-group" >
          <input
            style={{ width: "60%" }}
            type="text"
            name="name"
            id="namee"
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label for="namee">Name:</label>
        </div>

        <div className="form-group" >
          <input
            style={{ width: "60%"}}
            type="text"
            name="survey"
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label>Survey Number:</label>
        </div>
        <div className="form-group" >
          <input
            style={{ width: "60%" }}
            id="sizee"
            type="text"
            name="size"
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label for="sizee">Size:</label>
        </div>
        <div className="form-group" >
          <input
            style={{ width: "60%" }}
            id="locc"
            type="text"
            name="loc"
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label for="locc">Location:</label>
        </div>
        <div className="form-group">
          <input
            style={{ width: "60%" }}
            id="imgg"
            type="text"
            name="image"
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label for="imgg">Image URI:</label>
        </div>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
      <br />
      <br />
      <a
        style={{ color: "white" }}
        href="https://www.npoint.io/"
        target="_blank"
      >
        Host a NFT
      </a>
      <div className="subhead">
        <h3>NFT Minter</h3>
        <p className="function_detail">
          Generated uri and address of the nft owner is given to create new Nft.
         
        </p>
      </div>
      <div className="form-group">
        <input
          style={{ width: "60%"}}
          type="text"
          ref={inputadd}
          name="address"
          id="addd"
          placeholder=" "
          required
        />
        <label for="addd">Address:</label>
      </div>
      <div className="form-group">
        <input
         style={{ width: "60%"}}
          type="text"
          ref={inputuri}
          name="uri"
          id="urii"
          placeholder=" "
          required
        />
        <label for="urii">URI:</label>
      </div>
      <button className="button" onClick={handlemint}>
        Mint
      </button>
    </div>
  );
}

export default Metadata;
