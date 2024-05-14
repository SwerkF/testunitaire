import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function CancellationForm({ show, handleClose, handleCancel, event }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={(e) => handleCancel(e, event.id)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Cancellation Reason</Form.Label>
            <Form.Control as="textarea" name="cancelReason" required />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button type="submit" variant="danger">Cancel Event</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default CancellationForm;
