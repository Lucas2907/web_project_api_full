import React from "react";

function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <button className="modal__close" type="button" onClick={onClose} />

        <div
          className={`modal__icon ${
            isSuccess ? "modal__icon_success" : "modal__icon_error"
          }`}
        />

        <p className="modal__message">{message}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
