import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../styles/calendar.css";
import axios from "axios";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [eventsResponse, eventsDatesResponse] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/eventss"),
          axios.get("http://127.0.0.1:8000/api/events_datess"),
        ]);

        const eventsData = eventsResponse.data["hydra:member"];
        const eventsDatesData = eventsDatesResponse.data["hydra:member"];

        // Fusionner les données des deux requêtes
        const mergedData = eventsData.map((event) => {
          const eventDates = eventsDatesData.filter((date) => {
            const eventId = date.event.split("/").pop();
            return parseInt(eventId) === event.id;
          });
          return {
            ...event,
            date: eventDates[0].date,
            tickets: eventDates[0].tickets,
            status : eventDates[0].is_cancelled,
          };
        });

        setEvents(mergedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  console.log(events);

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
          tickets: event.tickets,
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
    const { description, image_url, age } = extendedProps;

    console.log(`Title: ${title}
Description: ${description}
Date: ${start.toISOString()}
Age: ${age}
Image URL: ${image_url}`);
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
    </div>
  );
};

function renderEventContent(eventInfo) {
  console.log(eventInfo);
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

        <img
          src={eventInfo.event.extendedProps.image_url}
          alt={eventInfo.event.title}
          className="rounded-2"
          style={{ width: "100%" }}
        />
        <div className="d-flex">
          <span>
            <b>{eventInfo.timeText}</b>{" "}
          </span>

          <div className="d-flex">
            <span className="me-3">{eventInfo.event.extendedProps.age}</span>
            <span className="ms-5">
              {eventInfo.event.extendedProps.tickets} Restant(s)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
