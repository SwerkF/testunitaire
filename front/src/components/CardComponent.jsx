import React, { useState } from 'react';
import PropTypes from "prop-types";
import Modal from './ModalComponent.jsx'; // Import the Modal component
import "../styles/CardComponent.scss";


const CardComponent = ({ title, description, buttonText, imageUrl, id}) => {

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="card-home">
      <div> 
        <img src={imageUrl} alt="" className="img-card-home" />
      </div>
      <div className="card-content-home">
        <h2 className="h2-home">{title}</h2>
        <p className="p-home">{typeof description === 'string' && description.length > 40 ? description.slice(0, 40) + '...' : description}</p>
        <button className="button-home a-home" onClick={() => setModalOpen(true)}>
          {buttonText}
          <span className="material-symbols-outlined">&#10132;</span>
        </button>
      </div>
      {isModalOpen && <Modal
        title= {title}
        description={description}
        onClose={() => setModalOpen(false)}
        imageUrl={imageUrl}
        id={id}
      />}
    </div>
  );
};


CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};


export default CardComponent;