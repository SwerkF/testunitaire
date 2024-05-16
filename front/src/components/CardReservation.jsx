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
        setReservations(reservation);
        axios.get('http://localhost:8000' + reservation.eventDateId)  
            .then((response) => {
                setEventDates(response.data)
                axios.get('http://localhost:8000' + response.data.event)
                    .then((response) => {
                        setEvent(response.data)
                        console.log(response.data)
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const handleDate = (date) => {
        const newDate = new Date(date)
        return newDate.toDateString()

    }

    return (
        (event && eventDates) ? (
            <div className="card w-50">
                <div className="card-body">
                   <div className='d-flex flex-column gap-2 justify-content-between'>
                        <div className='d-flex flex-row align-items-center gap-2'>
                            {event.imageUrl !== 'string' && event.imageUrl !== '' ? (
                                <img src={event.imageUrl} alt={event.title} style={{ objectFit: 'cover', width: '100px', height: '100px' }} />
                            ) : (
                                <img src='https://picsum.photos/100/100' alt={event.title} style={{ objectFit: 'cover', width: '100px', height: '100px' }} />
                            )}
                            <div className='d-flex flex-column'>
                                <h5 className="card-title">{event.title} - <span className='fs-6'>{handleDate(eventDates.date)}</span></h5>
                                <p className="card-text">{event.description}</p>
                                <p className='card-text'>{reservation.number_of_tickets} {reservation.number_of_tickets > 1 ? "places" : "place"}</p>
                            </div>
                        </div>
                        <button className='btn btn-primary' onClick={() => { onClick(reservation, event, eventDates)}}>Details</button>
                    </div>
                </div>
            </div>
        ) : ('Loading...')
    )
}

export default CardReservation;