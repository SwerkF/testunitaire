import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardComponent from "../components/CardComponent";
import "../styles/EventList.css";
const EventList = () => {
  const [events, setEvents] = useState([]);
    
useEffect(() => {
    axios.get('http://localhost:8000/api/events_dates')
        .then((response) => {
            setEvents(response.data['hydra:member']);
        })
        .catch((error) => {
            console.error('There was an error fetching the events!', error);
        });
        
}, []);

    return (
            <div>
            <h1 class="title-h1">Liste des évènements</h1>
            <ul class= "event-container">
                    {events.map((event) => (
                            <CardComponent event_date_id={event.id} event_id={event.event} ticket={event.tickets} date={event.date}/>
                    ))}
            </ul>
            </div>
    );
}

export default EventList;