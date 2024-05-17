import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function EventForm({ show, handleClose, handleSubmit, event, mode }) {
  // État pour gérer les dates de l'événement
  const [dates, setDates] = useState(event ? event.dates : ['']);

  // Gérer le changement de chaque date individuelle
  const handleDateChange = (index, value) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates);
  };

  // Ajouter un nouveau champ de date
  const addDateField = () => {
    setDates([...dates, '']);
  };

  // Supprimer un champ de date spécifique
  const removeDateField = index => {
    setDates(dates.filter((_, i) => i !== index));
  };

  // Gérer la soumission du formulaire
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Création de l'objet eventData pour inclure toutes les données du formulaire plus les dates
    const formData = new FormData(e.target);
    const eventData = {
      ...Object.fromEntries(formData.entries()),
      dates
    };
    handleSubmit(eventData); // Appel de la fonction handleSubmit passée en props
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleFormSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{mode === 'create' ? 'Créer un événement' : 'Modifier un événement'}</Modal.Title>
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
              <option value="video games">Jeux vidéo</option>
              <option value="theatre">Exposition</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>URL de l'image</Form.Label>
            <Form.Control type="text" name="imageUrl" placeholder="Entrez l'URL de l'image" defaultValue={event ? event.imageUrl : ''} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Âge minimum</Form.Label>
            <Form.Control type="number" name="minimumAge" defaultValue={event ? parseInt(event.minimumAge) : 0} required />
          </Form.Group>
          <Form.Label>Dates de l'événement</Form.Label>
          {dates.map((date, index) => (
            <div key={index} className="d-flex mb-2">
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => handleDateChange(index, e.target.value)}
                required
              />
              {dates.length > 1 && (
                <Button variant="danger" onClick={() => removeDateField(index)} className="ml-2">Supprimer</Button>
              )}
            </div>
          ))}
          <Button variant="info" onClick={addDateField} className="mb-3">Ajouter une date</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Fermer</Button>
          <Button variant="primary" type="submit">Enregistrer</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EventForm;
