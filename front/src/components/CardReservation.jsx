import React, { useState, useEffect } from 'react';
import axios from 'axios';
const CardReservation = ({ reservation, onClick }) => {
    /*
    Reservations:
        "id": 1,
        "number_of_tickets": 3,
        "reservation_date": "2024-05-30T00:00:00+02:00",
        "user_id": "/api/users/1",
        "event_date_id": "/api/events_datess/1",
        "numberOfTickets": 3,
        "reservationDate": "2024-05-30T00:00:00+02:00",
        "userId": "/api/users/1",
        "eventDateId": "/api/events_datess/1"

    EventDates:
        "id": 0,
        "date": "2024-05-15T07:47:17.032Z",
        "tickets": 0,
        "is_cancelled": true,
        "cancellation_reason": "string",
        "event_id": "1",
        "cancelled": true,
        "cancellationReason": "string",
        "eventId": "1"
    
    Event:
        "id": 0,
        "title": "string",
        "description": "string",
        "type": "string",
        "image_url": "string",
        "minimum_age": 0,
        "imageUrl": "string",
        "minimumAge": 0
    
    */

    const [reservations, setReservations] = useState([])
    const [eventDates, setEventDates] = useState([])
    const [event, setEvent] = useState(null)

    useEffect(() => {
        //http://127.0.0.1:8000/api/
        setReservations(reservation);
        axios.get('http://localhost:8000' + reservation.eventDateId)  
            .then((response) => {
                console.log(response.data)
                setEventDates(response.data)

                axios.get('http://localhost:8000' + response.data.eventId)
                    .then((response) => {
                        console.log(response.data)
                        setEvent(response.data)
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (
        (event && eventDates) ? (
            <div className="card" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{event?.title}</h5>
                <p className="card-text">Date: {eventDates?.date}</p>
                <p className="card-text">Number of tickets: {reservations?.number_of_tickets}</p>
                <button onClick={() => onClick(reservation)} className="btn btn-primary">More details</button>
            </div>
        </div>
        ) : ('Loading...')
    )
}

export default CardReservation;