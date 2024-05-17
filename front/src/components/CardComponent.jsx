import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import Modal from './ModalComponent.jsx';
import { Badge } from 'react-bootstrap';

import "../styles/CardComponent.scss";
import axios from 'axios';


const CardComponent = ({ event_date_id, event_id, ticket, isCancelled, cancellationReason, date}) => {
  const [event, setEvent] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [nbPlacesRestantes, setNbPlacesRestantes] = useState(0);
  const [reservation, setReservation] = useState([]);

  useEffect(() => {
    console.log(event_id);
    axios.get('http://localhost:8000' + event_id)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the events!', error);
      });

      console.log("EVENT DATE ID", event_date_id);
    axios.get('http://localhost:8000/api/reservations/dates/'+event_date_id)
      .then((response) => {
        let reserv = response.data;
        let ticketRestant = ticket
        reserv.forEach((reserv) => {
          ticketRestant = ticketRestant - reserv.number_of_tickets;
        })
        setNbPlacesRestantes(ticketRestant);
      })
      .catch((error) => {
        if(error.response.status === 404){
          setNbPlacesRestantes(ticket);
        }
      });
  }, []);
  


  return (
    <div className="card-home">
      <div> 
        {event.imageUrl ? <img className={isCancelled ? "img-card-home-cancelled" : "img-card-home"} src={event.imageUrl} alt={event.title} /> : <img className="img-card-home" src="https://placehold.co/600x400" alt={event.title} />}
      </div>
      <div className="card-content-home">
        <h2 className="h2-home mb-0">{event.title}</h2>
        <p className="p-home">{date.split('T')[0]}</p>
        <p className="p-home">{typeof event.description === 'string' && event.description.length > 40 ? event.description.slice(0, 40) + '...' : event.description}</p>
        {isCancelled ? (
          <React.Fragment>
            <Badge bg="danger p-home">Annulé</Badge>
            <p className="p-home">Raison: {cancellationReason}</p>
          </React.Fragment>
        ) : (
         nbPlacesRestantes > 0 ? (
          <React.Fragment>
              <p className="p-home">Il reste {nbPlacesRestantes} places</p>
            <button className="button-home a-home fw-bold"  onClick={() => setModalOpen(true)}>
              {event.buttonText}
              <span className="material-symbols-outlined">Réserver</span>
            </button>
          </React.Fragment>
         ) : (
          <Badge bg="danger p-home">Complet</Badge>
         )
        )}
        
        
      </div>
      {isModalOpen && <Modal
        title= {event.title}
        description={event.description}
        onClose={() => setModalOpen(false)}
        imageUrl={event.imageUrl}
        id={event}
        eventAge={event.minimum_age}
        date= {date}
        event_date_id={event_date_id}
        ticketRestant={nbPlacesRestantes}
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