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
  const [modalType, setModalType] = useState("create"); // 'create' or 'edit'

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/eventss "); // http://localhost:8000/api/events
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

  const handleEventFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const eventData = Object.fromEntries(formData.entries());
   console.log(eventData);
    try { 
      if (modalType === "create") {
        await axios.post("http://localhost:8000/api/eventss", eventData); //api
      } else {
        await axios.put(
          `http://localhost:8000/api/eventss/{id}${currentEvent.id}`,
          eventData
        ); //api
      }
      fetchEvents();
    } catch (error) {
      console.error("Error saving event:", error);
    }
    setShowEventModal(false);
  };

  const handleCancellationFormSubmit = async (event) => {
    event.preventDefault();
    const reason = event.target.elements.cancelReason.value;
    try {
      await axios.patch(
        `http://localhost:8000/api/events_datess/{id}/${currentEvent.id}/cancel`,
        { reason }
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
          handleCancel={handleCancellationFormSubmit}
          event={currentEvent}
        />
      )}
    </div>
  );
}

export default Admin;
