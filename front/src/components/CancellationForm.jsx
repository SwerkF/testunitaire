import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function CancellationForm({ show, handleClose, handleCancel, event }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={(e) => handleCancel(e, event.id)}>
        <Modal.Header closeButton>
          <Modal.Title>Annuler l'événement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label htmlFor="cancellationReason">Raison d'annulation</Form.Label>
            <Form.Control as="textarea" name="cancellationReason" id="cancellationReason" required />
          </Form.Group>
          <Form.Control type="hidden" name="isCancelled" value="true" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Fermer</Button>
          <Button type="submit" variant="danger">Annuler</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CancellationForm;
