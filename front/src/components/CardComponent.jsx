import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import Modal from './ModalComponent.jsx';

import "../styles/CardComponent.scss";
import axios from 'axios';


const CardComponent = ({ event_date_id, event_id, ticket, date}) => {
  const [event, setEvent] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000' + event_id)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the events!', error);
      });
  }, []);
  


  return (
    <div className="card-home">
      <div> 
        <img src={event.imageUrl} alt="" className="img-card-home" />
      </div>
      <div className="card-content-home">
        <h2 className="h2-home">{event.title}</h2>
        <p className="p-home">{typeof event.description === 'string' && event.description.length > 40 ? event.description.slice(0, 40) + '...' : event.description}</p>
        <button className="button-home a-home" onClick={() => setModalOpen(true)}>
          {event.buttonText}
          <span className="material-symbols-outlined">&#10132;</span>
        </button>
      </div>
      {isModalOpen && <Modal
        title= {event.title}
        description={event.description}
        onClose={() => setModalOpen(false)}
        imageUrl={event.imageUrl}
        id={event}
        eventAge={event.minimum_age}
        date= {date}
      />
      }
    </div>
  );
};


CardComponent.propTypes = {
  event_date_id: PropTypes.string.isRequired,
  event_id: PropTypes.string.isRequired,
  ticket: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};


export default CardComponent;