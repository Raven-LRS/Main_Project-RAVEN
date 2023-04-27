// Importing modules
import React, { useEffect, useState } from "react";
import "../App.css";
import { Button, Card } from "react-bootstrap";
import { nftaddress2, abi1 } from "./abi";
import web3 from "./web3";
import { useRef } from "react";
import Popup from "./Popup";

function NFTprofile() {
  // usetstate for storing and retrieving wallet details

  const prof1 = useRef(null);
  const seller_ = useRef(null);
  const buyer_ = useRef(null);
  const tid_ = useRef(null);
  const addr = useRef(null);
  const [nftd, setNftd] = useState({});
  const [btnpp1, setbtnpp1] = useState(false);

  const [btnpp2, setbtnpp2] = useState(false);

  var tokens = [];

  var contract = new web3.eth.Contract(abi1, nftaddress2);

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
    }

    setNftd(tokens[val1].metadata);
  };

  const handle_prof = () => {
    let x = prof1.current.value;
    main_profile(x);
    setbtnpp1(true);
  };

  const sell = async (seller, buyer, tid) => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods
      .safeTransferFrom(seller, buyer, tid)
      .send({ from: accounts[0] });
  };

  const handle_sell = () => {
    let a = seller_.current.value;
    let b = buyer_.current.value;
    let c = tid_.current.value;
    sell(a, b, c);
  };

  return (
    <div className="home">
      {/* Calling all values which we
	have stored in usestate */}

      <Card>
        <Card.Body>
          <label>NFT ID:</label>
          <input
            style={{ marginLeft: "60px" }}
            ref={prof1}
            type="text"
            id="id_1"
            name="id_1"
          />
          <br></br>

          <Button
            style={{ marginLeft: "220px", marginTop: "30px" }}
            className="button"
            onClick={handle_prof}
          >
            View Data
          </Button>

          <Popup
            style={{ backgroundColor: "#61dafb" }}
            trigger={btnpp1}
            setTrigger={setbtnpp1}
          >
            <div style={{ color: "black" }}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkdDy1MPyAklifM98twCxSuRj7EVJPO0cmHg&usqp=CAU"
                class="center"
              />
              <br></br>
              <label>Name:</label>
              {nftd.name}
              <br />
              <br />
              <label>ID Number:</label>
              <br />
              <br />
              <label>Survey Number:</label>
              <br />
              <br />
              <label>Size:</label>
              <br />
              <br />
              <label>Location:</label>
              <br />
              <br />

              <button
                onClick={() => setbtnpp2(true)}
                style={{ marginTop: "30px" }}
                className="button"
              >
                SELL
              </button>
            </div>
          </Popup>
          <Popup trigger={btnpp2} setTrigger={setbtnpp2}>
            <div style={{ color: "black" }}>
              <form>
                <label>
                  From:
                  <input
                    ref={seller_}
                    style={{ marginLeft: "72px" }}
                    className="input"
                    type="text"
                    name="sender"
                  />
                </label>
                <br></br>
                <label>
                  To:
                  <input
                    ref={buyer_}
                    className="input"
                    type="text"
                    name="reciever"
                  />
                </label>
                <br></br>
                <label>
                  ID:
                  <input ref={tid_} className="input" type="text" name="idno" />
                </label>
              </form>
              <button className="button" onClick={handle_sell}>
                PROCEED
              </button>
            </div>
          </Popup>
          <br></br>
          <hr style={{ width: "80%", marginLeft: "-30px" }}></hr>
          <br></br>
          <h2 style={{ marginLeft: "300px" }}>Registrar Consent</h2>
          <label>User Address :</label>
          <input
            style={{ marginLeft: "60px" }}
            ref={addr}
            type="text"
            id="id_1"
            name="id_1"
          />
          <button
            // onClick={() => setbtnpp2(true)}
            style={{ marginTop: "30px" }}
            className="button"
          >
            GRANT PERMISSION
          </button>
          <br /> <br />
          <label>User Address :</label>
          <input
            style={{ marginLeft: "60px" }}
            ref={addr}
            type="text"
            id="id_1"
            name="id_1"
          />
          <button
            // onClick={() => setbtnpp2(true)}
            style={{ marginTop: "30px" }}
            className="button"
          >
            REVOKE PERMISSION
          </button>
        </Card.Body>
      </Card>
    </div>
  );
}
export default NFTprofile;
