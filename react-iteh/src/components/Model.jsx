import React from "react";
import "./Model.css";

const Modal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="modal-confirm" onClick={onConfirm}>Da</button>
          <button className="modal-cancel" onClick={onCancel}>Ne</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
