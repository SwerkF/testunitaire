import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function EventTable({ events, handleEdit, handleCancel }) {

  const [eventsState, setEventsState] = useState(null);

  useEffect(() => {
    setEventsState(events);
  },[events]);

  return (
    (eventsState ? (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Type</th>
            <th>Âge Minimum</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.imageUrl ? <img src={event.imageUrl} alt="Event" style={{ width: "100px", height: "auto" }} /> : 'Pas d\'image'}</td>
              <td>{event.title}</td>
              <td>{event.description}</td>
              <td>{event.type}</td>
              <td>{event.minimumAge}</td>
              <td>
                <Button variant="info" onClick={() => handleEdit(event)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button variant="danger" onClick={() => handleCancel(event)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    ) : (
      "Aucun événement trouvé."
    )
  )
  );
}

export default EventTable;
