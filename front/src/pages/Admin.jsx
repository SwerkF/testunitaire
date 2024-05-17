import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import EventForm from "../components/EventForm";
import EventTable from "../components/EventTable";
import CancellationForm from "../components/CancellationForm";
import "../styles/AdminStyle.css";
import axios from "axios";

function Admin() {
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [modalType, setModalType] = useState("create");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/eventss");
      console.log(response.data["hydra:member"]);
      setEvents(response.data["hydra:member"]);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setModalType("edit");
    setShowEventModal(true);
  };

  const handleCancel = (event) => {
    setCurrentEvent(event);
    setShowCancelModal(true);
  };

  const handleCloseEventModal = () => {
    setShowEventModal(false);
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
  };

  const handleEventFormSubmit = async (eventData) => {
    const { dates, ...eventDetails } = eventData; // Séparer les dates des autres détails de l'événement
    console.log(eventData);
    try {
      let savedEvent = null;
      console.log("Event details", eventDetails);
      console.log("modal type", modalType);
      if (modalType === "create") {
        // Créer l'événement principal sans les dates
        eventDetails.minimumAge = parseInt(eventDetails.minimumAge);
        const eventResponse = await axios.post(
          "http://localhost:8000/api/eventss",
          eventDetails
        );
        savedEvent = eventResponse.data;
        console.log("Event response", eventResponse);
      } else {
        // Mettre à jour l'événement principal sans les dates
        const eventResponse = await axios.put(
          `http://localhost:8000/api/eventss/${eventDetails.id}`,
          eventDetails
        );
        savedEvent = eventResponse.data;
      }

      // Enregistrer les dates dans l'endpoint /api/events_date
      if (savedEvent && savedEvent.id) {
        await Promise.all(
          dates.map((date) =>
            axios.post("http://localhost:8000/api/events_datess", {
              event: "/api/events/" + savedEvent.id,
              date: date,
              tickets: 7000,
            })
          )
        );
      }

      fetchEvents();
    } catch (error) {
      console.error("Error saving event and dates:", error);
    }
    setShowEventModal(false);
  };

  const handleCancellationFormSubmit = async (reason) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/events_datess/${currentEvent.id}`,
        { cancellationReason: reason,
           isCancelled: true }
      );

      fetchEvents();
    } catch (error) {
      console.error("Error cancelling event:", error);
    }
    setShowCancelModal(false);
  };

  return (
    <div className="container-admin">
      <div
        className="d-flex justify-content-center"
        style={{ paddingTop: "20px", width: "100%" }}
      >
        <h1>Admin Dashboard</h1>
      </div>
      <div
        className="d-flex justify-content-center"
        style={{ paddingTop: "20px", width: "100%" }}
      >
        <Button
          onClick={() => {
            setModalType("create");
            setCurrentEvent(null);
            setShowEventModal(true);
          }}
        >
          Ajoutez un nouveau événement
        </Button>{" "}
      </div>

      <EventTable
        events={events}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
      />

      {showEventModal && (
        <EventForm
          show={showEventModal}
          handleClose={handleCloseEventModal}
          handleSubmit={handleEventFormSubmit}
          event={currentEvent}
          mode={modalType}
        />
      )}

      {showCancelModal && (
        <CancellationForm
          show={showCancelModal}
          handleClose={handleCloseCancelModal}
          handleSubmit={handleCancellationFormSubmit}
          event={currentEvent}
        />
      )}
    </div>
  );
}

export default Admin;
