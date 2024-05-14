
import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


function EventTable({ events, handleEdit, handleCancel }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>       
          <th>Description</th>
          <th>Type</th>
          <th>Age Minimum</th>
         
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map(event => (
          <tr key={event.id}>
            <td>{event.id}</td>
            <td>{event.imageUrl ? <img src={event.imageUrl} alt="Event" style={{ width: "100px", height: "auto" }} /> : 'No Image'}</td>
            <td>{event.name}</td>
    
            <td>{event.description}</td>
            <td>{event.type}</td>
            <td>{event.ageMinimum}</td>
          


            <td>
              <Button variant="info" onClick={() => handleEdit(event)}>     <FontAwesomeIcon icon={faEdit} /></Button>

              <Button variant="danger" onClick={() => handleCancel(event)}>    <FontAwesomeIcon icon={faTrashAlt} />
</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default EventTable;

