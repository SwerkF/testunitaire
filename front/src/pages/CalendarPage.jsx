import React, { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CardComponent from "../components/CardComponent";
import "../styles/calendar.css";
import axios from "axios";
import Modal from "../components/ModalComponent";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

 
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [eventsResponse, eventsDatesResponse, reservationsResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/eventss"),
          axios.get("http://127.0.0.1:8000/api/events_datess"),
          axios.get("http://127.0.0.1:8000/api/reservations"),
        ]);

        const eventsData = eventsResponse.data["hydra:member"] || [];
        const eventsDatesData = eventsDatesResponse.data["hydra:member"];
        const reservationsData = reservationsResponse.data;

        console.log(eventsData, eventsDatesData, reservationsData);

        const ticketsReservedPerEventDate = reservationsData.reduce(
          (acc, reservation) => {
            const eventDateId = reservation.event_date_id.split("/").pop();
            acc[eventDateId] =
              (acc[eventDateId] || 0) + reservation.number_of_tickets;
            return acc;
          },
          {}
        );

        const mergedData = eventsData
          .map((event) => {
            const eventDates = eventsDatesData.filter((date) => {
              const eventId = date.event.split("/").pop();
              return parseInt(eventId) === event.id;
            });

            return eventDates.map((eventDate) => {
              const totalTickets = eventDate.tickets;
              const reservedTickets =
                ticketsReservedPerEventDate[eventDate.id] || 0;
              const isSoldOut = reservedTickets >= totalTickets;

              return {
                ...event,
                date: eventDate.date,
                totalTickets,
                reservedTickets,
                status: eventDate.isCancelled
                  ? "Annulé"
                  : isSoldOut
                  ? "Complet"
                  : "Disponible",
                event_date_id: eventDate.id,  // Include event_date_id here
              };
            });
          })
          .flat();

        setEvents(mergedData);
      } catch (err) {
        console.log(err);
        setError("Une erreur s'est produite. Veuillez réessayer.");
      }
    };

    fetchEvents();
  }, []);


  useEffect(() => {
    const formattedEvents =
      events &&
      events.map((event, index) => ({
        title: event.title,
        start: event.date,
        end: event.date,
        extendedProps: {
          description: event.description,
          image_url: event.image_url,
          age: event.minimum_age,
          type: event.type,
          event_id: event.id,
          event_date_id: event.event_date_id,
          reservedTickets: event.reservedTickets,
          totalTickets: event.totalTickets,
        },
        classNames: [
          event.status ? `fc-event-${event.status.toLowerCase()}` : "",
        ],
        id: index,
      }));
    setEvents(formattedEvents);
  }, []);

  const handleEventClick = (clickInfo) => {
    const { title, extendedProps, start } = clickInfo.event;
    setModalContent({
      title,
      description: extendedProps.description,
      imageUrl: extendedProps.image_url,
      eventAge: extendedProps.age,
      date: start,
      event_date_id: extendedProps.event_date_id,
    });
    setModalOpen(true);
  };


  return (
    <div className="calendar-page mb-5">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth",
        }}
        height="100%"
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        locale="fr"
      />
      {error && <div className="alert alert-danger">{error}</div>}
      {isModalOpen && (
        <Modal
          title={modalContent.title}
          description={modalContent.description}
          onClose={() => setModalOpen(false)}
          imageUrl={modalContent.imageUrl}
          id={modalContent.event_id}
          eventAge={modalContent.eventAge}
          date={modalContent.date}
          event_date_id={modalContent.event_date_id}
        />
      )}
    </div>
  );
};

function renderEventContent(eventInfo) {
  return (
    <div className="d-flex">
      <div className="ms-auto">
        <i className="d-flex">
          <span>{eventInfo.event.title}</span>{" "}
          <span className="ms-auto fw-semibold">
            {eventInfo.event.extendedProps.type}
          </span>
        </i>
        <br />

        {eventInfo.event.extendedProps.image_url ? (
          <img
          src={eventInfo.event.extendedProps.image_url}
          alt={eventInfo.event.title}
          className="rounded-2"
          style={{ width: "100%" }}
        />
        ) : (
          <img
            src="https://placehold.co/600x400"
            alt={eventInfo.event.title}
            className="rounded-2"
            style={{ width: "100%" }}
          />
        )}
        <div className="d-flex">
          <span>
            <b>{eventInfo.timeText}</b>{" "}
          </span>

          <div className="d-flex">
            <span className="me-3">{eventInfo.event.extendedProps.age}</span>
            <span className="ms-5">
              {eventInfo.event.extendedProps.totalTickets -
                eventInfo.event.extendedProps.reservedTickets}{" "}
              Restant(s)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
