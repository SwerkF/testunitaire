import React, { useState, useEffect, useContext } from 'react';
import MyPDF from '../components/MyPDF';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import CardReservation from '../components/CardReservation';
import { UserContext } from '../App';

const Reservations = () => {

    const { user } = useContext(UserContext);

    const [reservations, setReservations] = useState([])
    const [selectedReservation, setSelectedReservation] = useState()
    const [filteredReservations, setFilteredReservations] = useState(null)

    const [show, setShow] = useState(false);

    useEffect(() => {
        console.log(user)
        axios.get('http://localhost:8000/api/reservations/users/'+user.id)
            .then((response) => {
                setReservations(response.data)
                setFilteredReservations(response.data)
            })
            .catch((error) => {
            })

    }, [])

    const handleSelectReservation = (reservation, event, eventDates) => {
        setSelectedReservation({ reservation, event, eventDates })
    }

    return (
        <div className='container d-flex flex-column min-vh-100'>
            <h1>Reservations</h1>
            <div className="d-flex flex-wrap gap-4 mt-5">
                {filteredReservations && filteredReservations.map((reservation) => (
                    <CardReservation key={reservation.id} reservation={reservation} onClick={handleSelectReservation} />
                ))}
            </div>
            {selectedReservation && (
                <Modal show={selectedReservation !== null} onHide={() => setSelectedReservation(null)} size='xl'>
                    <Modal.Header closeButton>
                        <Modal.Title>Votre réservation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <MyPDF data={selectedReservation} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setSelectedReservation(null)}>
                            Fermer
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default Reservations;