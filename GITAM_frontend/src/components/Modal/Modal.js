import React from 'react';
import { AiOutlineClose } from 'react-icons/ai'; 
import './Modal.css'; 

const Modal = ({ isOpen, closeModal, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <AiOutlineClose className="close-icon" onClick={closeModal} />
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Modal;
