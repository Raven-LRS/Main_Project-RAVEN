import React from "react";
import "../popup.css";
function Popup(props) {
  return props.trigger ? (
    <div className="Popup">
      <div className="Popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          <b>X</b>
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    " "
  );
}

export default Popup;
