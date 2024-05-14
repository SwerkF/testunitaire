import React, { useState, useEffect } from 'react';
import MyPDF from '../components/MyPDF';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Reservations = () => {

    const [reservations, setReservations] = useState([])
    const [selectedReservation, setSelectedReservation] = useState(null)

    const [show, setShow] = useState(false);

    useEffect(() => {
        setReservations([
            {
                uuid: "1",
                name: "John Doe",
                date: "2021-12-31",
                time: "12:00",
                guests: 2
            },
            {
                uuid: "2",
                name: "Jane Doe",
                date: "2021-12-31",
                time: "12:00",
                guests: 2
            }

        
        ])
    }, [])

    return (
        <div>
            <h1>Reservations</h1>
            <ul>
                {reservations.map((reservation, index) => (
                    <li key={index}>
                        <h2>{reservation.name}</h2>
                        <p>{reservation.date} at {reservation.time}</p>
                        <p>Guests: {reservation.guests}</p>
                        <button onClick={() => setSelectedReservation(reservation)}>Réservation {reservation.uuid}</button>
                    </li>
                ))}
            </ul>
            {selectedReservation && (
                <Modal show={selectedReservation !== null} onHide={() => setSelectedReservation(null)} size='xl'>
                    <Modal.Header closeButton>
                        <Modal.Title>Reservation for {selectedReservation?.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <MyPDF uuid={selectedReservation.uuid} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setSelectedReservation(null)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default Reservations;