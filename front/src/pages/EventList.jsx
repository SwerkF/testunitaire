import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
        axios.get(`http://localhost:3001/events/${id}`)
        .then((response) => {
            setEvents(response.data);
        });
    }, [id]);
    
    return (
        <div>
        <h1>Event List</h1>
        <ul>
            {events.map((event) => (
            <li key={event.id}>{event.name}</li>
            ))}
        </ul>
        </div>
    );
}

export default EventList;