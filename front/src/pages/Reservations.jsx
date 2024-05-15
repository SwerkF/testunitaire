import React, { useState, useEffect } from 'react';
import MyPDF from '../components/MyPDF';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Input from '../components/Input';
import axios from 'axios';
import CardReservation from '../components/CardReservation';

const Reservations = () => {

    const [reservations, setReservations] = useState([])
    const [selectedReservation, setSelectedReservation] = useState(null)

    const [show, setShow] = useState(false);

    useEffect(() => {
        /*setReservations([
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
        ])*/

        axios.get('http://127.0.0.1:8000/api/reservation/users/1')
            .then((response) => {
                console.log(response.data)
                setReservations(response.data)
            })
            .catch((error) => {
                console.error(error)
            })

    }, [])

    return (
        <div className='d-flex flex-column'>
            <h1>Reservations</h1>
            <Input label="Search" inputstyle="w-50" type="text" placeholder="Search" />
            <div className="d-flex flex-wrap gap-4">
                {reservations.map((reservation) => (
                    <CardReservation reservation={reservation} onClick={() => console.log(reservation)} />
                ))}
            </div>
            {selectedReservation && (
                <Modal show={selectedReservation !== null} onHide={() => setSelectedReservation(null)} size='xl'>
                    <Modal.Header closeButton>
                        <Modal.Title>Reservation pour {selectedReservation?.name}</Modal.Title>
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