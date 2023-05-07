import React from "react";
import "../popup.css";
import { GrClose } from 'react-icons/gr';
function Popup(props) {
  return props.trigger ? (
    <div className="Popup">
      <div className="Popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
        <GrClose/>
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    " "
  );
}

export default Popup;
