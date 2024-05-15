import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardComponent from "../components/CardComponent";
import "../styles/EventList.css";
const EventList = () => {
  const [events, setEvents] = useState([]);
    
useEffect(() => {
    axios.get('http://localhost:8000/api/eventss')
        .then((response) => {
            setEvents(response.data['hydra:member']);
        })
        .catch((error) => {
            console.error('There was an error fetching the events!', error);
        });
}, []);

    

    return (
            <div>
            <h1 class="title-h1">Event List</h1>
            <ul class= "event-container">
                    {events.map((event) => (
                            <CardComponent title={event.title} description={event.description} buttonText="plus d'info" imageUrl={event.imageUrl} id={event.id}/>
                    ))}
            </ul>
            </div>
    );
}

export default EventList;