import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function EventForm({ show, handleClose, handleSubmit, event, mode }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{mode === 'create' ? 'Create Event' : 'Edit Event'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Titre</Form.Label>
            <Form.Control type="text" name="title" defaultValue={event ? event.title : ''} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" name="description" defaultValue={event ? event.description : ''} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Control as="select" name="type" defaultValue={event ? event.type : ''} required>
              <option value="concert">Concert</option>
              <option value="festival">Festival</option>
              <option value="brocante">Brocante</option>
              <option value="video games">Video Games</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
  <Form.Label>Image URL</Form.Label>
  <Form.Control type="text" name="imageUrl" placeholder="Enter image URL" defaultValue={event ? event.imageUrl : ''} required />
</Form.Group>

          <Form.Group>
            <Form.Label>Age Minimum</Form.Label>
            <Form.Control type="number" name="minimumAge" defaultValue={event ?  event.minimumAge : ''} required />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" type="submit">Enregistrer</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EventForm;
