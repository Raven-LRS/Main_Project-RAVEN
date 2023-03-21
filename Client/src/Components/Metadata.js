import React, { useState } from "react";
import axios from "axios";

function Metadata() {
  const [formData, setFormData] = useState({});

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
        </div>
      <label>
        Name:
        <input style={{marginLeft:'125px'}}type="text" name="name" onChange={handleChange} />
      </label><br>
      </br>
      <br>
      </br>
      <label>
        ID Number:
        <input style={{marginLeft:'70px'}}type="text" name="id" onChange={handleChange} />
      </label>
      <br>
      </br>
      <br>
      </br>
      <label>
        Survey Number:
        <input style={{marginLeft:'20px'}} type="text" name="survey" onChange={handleChange} />
      </label>
      <br>
      </br>
      <br>
      </br>
      <label>
        Size:
        <input style={{marginLeft:'150px'}}type="text" name="size" onChange={handleChange} />
      </label>
      <br>
      </br>
      <br>
      </br>
      <label>
        Location:
        <input style={{marginLeft:'100px'}} type="text" name="loc" onChange={handleChange} />
      </label>
      <button className="button" type="submit">Submit</button>
    </form>
    </div>
  );
}

export default Metadata;
