import { useEffect, useState } from "react";
import Popup from "./Popup";
// import { contract, abi } from "./abi";
// import web3 from "./web3";
import React from "react";
import { useLocation } from "react-router-dom";
import "./Header";
import "../App.css";

interface Data {
  name: string;
  website: string;
  email: string;
  country: string;
}
export default function NftProf({ Data }) {
  // const nftcontract = new web3.eth.Contract(abi, contract);
  // const [sender, setsender] = useState();
  // let token1 = []
  // token1 = props.tok;
  // const [data, setData] = useState<Data>();
  const [btnpp, setbtnpp] = useState(false);
  // const location = useLocation();
  // // const title = location.state.title;
  // const fetchJson = () => {
  //   fetch("https://api.npoint.io/40d03538c02697f10317")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setData(data);
  //       // console.log(location);
  //     })
  //     .catch((e: Error) => {
  //       console.log(e.message);
  //     });
  //   // console.log(token1[0])
  // };
  // useEffect(() => {
  //   fetchJson();
  // }, []);

  // const sell = async(sender,reciever,id_no) => {
  //   const accounts = await web3.eth.getAccounts();
  //   await nftcontract.methods.safeTransferFrom(sender, reciever , id_no, "").send({from:accounts[0]});
  // }

  return (
    <div
      style={{
        marginTop: "3px",
        marginBottom: "200px",
      }}
    >
      <hr style={{ marginLeft: "5px", width: "85%" }}></hr>
      <div className="wrapper">
        <Popup trigger={btnpp} setTrigger={setbtnpp}></Popup>
        <div className="subhead">
          <h3> Land Details</h3>
        </div>
        <div>
          <b>Name:</b>
          {Data.ID}
          {/* {title} */}
        </div>
        <br></br>
        <div>
          <b>ID number:</b> {Data?.idno}
        </div>
        <br></br>
        <div>
          <b>Survey number:</b> {Data?.surveyno}
        </div>
        <br></br>
        <div>
          <b>Size:</b> {Data?.size}
        </div>
        <br></br>
        <div>
          <label>
            <b>Location :</b> {Data?.location}
          </label>
        </div>
        <button onClick={() => setbtnpp(true)} className="button">
          SELL
        </button>
        <br></br>
        <br></br>
        <Popup trigger={btnpp} setTrigger={setbtnpp}>
          <div style={{ color: "black" }}>
            <form>
              <label>
                From:
                <input
                  style={{ marginLeft: "68px" }}
                  className="input"
                  type="text"
                  name="sender"
                />
              </label>
              <br></br>
              <label>
                To:
                <input className="input" type="text" name="reciever" />
              </label>
              <br></br>
              <label>
                ID:
                <input className="input" type="text" name="idno" />
              </label>
            </form>
            <button className="button">PROCEED</button>
          </div>
        </Popup>
      </div>
      <hr style={{ marginLeft: "5px", width: "85%" }}></hr>
    </div>
  );
}
