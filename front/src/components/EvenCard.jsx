import React from 'react';
import { Card, Button } from 'react-bootstrap';

const EventCard = ({ title, image, date, description, buttonText, footerText }) => {

    if(description.length > 100) {
        description = description.substring(0, 170) + "...";
    }
    if(title.length > 20) {
        title = title.substring(0, 20) + "...";
    }

  return (
    <Card style={{ width: "100%", height : "29rem" }}>
      <Card.Img variant="top" src={image} style={{height: "15rem"}}/>
      <Card.Body className="pb-0">
        <Card.Title className="mb-0 fw-bold">{title}</Card.Title>
        <Card.Text className="text-left" style={{ fontSize: "0.9rem" }}>
          <span style={{ fontSize: "0.8rem" }}>{date}</span><br />
          {description}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="border-top-0 d-flex">
        <Button variant="primary ps-2 pe-2 pt-0 pb-0 h-75 btn-color">{buttonText}</Button>
        <p className="ms-auto" style={{ fontSize: "0.9rem" }}>{footerText}</p>
      </Card.Footer>
    </Card>
  );
}

export default EventCard;
