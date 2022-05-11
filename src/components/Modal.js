import React from "react";
import "../index.css";

function Modal(props) {
  return (
      <div className="modal-container">
        <a href={"#open-modal-1"+props.id}>Open Modal</a>
        <div id={"open-modal-1"+props.id} className="modal-window">
        <div>
        <a href="#modal-close" title="Close" className="modal-close">close &times;</a>
        <h2>{props.name}</h2>
        <div>{props.name}</div>
        </div>
        </div>
      </div>);
}
export default Modal;


