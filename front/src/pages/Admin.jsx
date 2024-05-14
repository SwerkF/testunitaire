import React from 'react';
import EventForm from '../components/EventForm';
import EventTable from '../components/EventTable';
import { Container, Row, Col } from 'react-bootstrap';

const Admin = () => {
  return (
    <Container fluid>
      <Row className="justify-content-center mt-4">
        <Col md={8}>
          <h1 className="text-center">Administration Dashboard</h1>
          <EventForm />
          <EventTable />
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
