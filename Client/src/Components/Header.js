import React from "react";
export default function Header() {
  return (
    <>
      <img
        align="left"
        className="img"
        src={require("./raven.png")}
        alt="logo"
      />

      <div className="head">
        <h1>RAVEN</h1>
      </div>
      <button className="log">LOGIN</button>
    </>
  );
}
