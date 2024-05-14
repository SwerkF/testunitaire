import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import "../styles/ModalComponent.css";

const Modal = ({ title, onClose, imageUrl, id, description }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    date: '',
    people: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/submit-form', {
        ...formData,
        id
      });
      console.log('Form submitted:', response.data);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">&#10005;</button>
        <div className="modal-header">{title}</div>
        <div className="modal-elements">
            <div className="modal-image">
                <img src={imageUrl} alt={title}/>
                <p className='description'>{description}</p>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Nom</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                <label htmlFor="age">Age</label>
                <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />

                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />

                <label htmlFor="people">Nombre de personne</label>
                <input type="number" id="people" name="people" value={formData.people} onChange={handleChange} required />
            <button type="submit" className="submit-button">Procéder au payement</button>
            </form>
        </div>    
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Modal;
