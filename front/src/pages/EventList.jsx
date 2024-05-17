import React, { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "../components/CardComponent";
import "../styles/EventList.css";
const EventList = () => {
  const [events, setEvents] = useState([]);
    
useEffect(() => {
    axios.get('http://localhost:8000/api/events_datess')
        .then((response) => {
            setEvents(response.data['hydra:member']);
            console.log("EVEBNT DATES", response.data['hydra:member']);
        })
        .catch((error) => {
            console.error('There was an error fetching the events!', error);
        });
        
}, []);

  return (
    <div className=" pe-3 ps-3">
      <h1 className="title-h1">Liste des évènements</h1>
      <div className="row">
        {events.length > 0 ? (
          events.map((event) => (
            <div className="col-3">
            <CardComponent 
              key={event.id}
              event_date_id={event.id}
              event_id={event.event}
              ticket={event.tickets}
              date={event.date}
              isCancelled={event.isCancelled} 
              cancellationReason={event.cancellationReason}
              
            />
            </div>
          ))
        ) : (
          <p>Aucun événement à afficher pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
