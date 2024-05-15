import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../styles/calendar.css";
import axios from "axios";

const CalendarPage = () => {
  const [eventsData, setEventsData] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/eventss');
        setEventsData(response.data['hydra:member']);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  
  console.log(eventsData);

  // const eventsData = [
  //   {
  //     title: "Armada 2024",
  //     image_url:
  //       "https://i-de.unimedias.fr/2023/12/07/dt158lehavrevuemerbr-6571e2b88e9bb.jpg?auto=format%2Ccompress&crop=faces&cs=tinysrgb&fit=crop&h=501&w=890",
  //     date: "2024-05-24T18:00:00",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, reprehenderit aperiam impedit illo commodi?",
  //     status: "Complet",
  //     is_canceled: false,
  //     minimum_age: "18 ans et plus",
  //   },
  //   {
  //     title: "Festival de Musique",
  //     image_url:
  //       "https://cdn.sortiraparis.com/images/80/77153/422736-festival-de-films-courts-de-maisons-laffitte-2019.jpg",
  //     date: "2024-05-15T20:00:00",
  //     description: "Un festival de musique avec des artistes du monde entier.",
  //     status: "Annulé",
  //     is_canceled: true,
  //     minimum_age: "12 ans et plus",
  //   },
  //   {
  //     title: "Exposition de peinture",
  //     image_url:
  //       "https://eurofilmfest-lille.com/wp-content/uploads/2023/02/Carton-infos-1-1400x788.png",
  //     date: "2024-05-01T10:00:00",
  //     description: "Une exposition de peinture avec des artistes locaux.",
  //     status: "",
  //     is_canceled: false,
  //     minimum_age: "Tout public",
  //   },
  // ];

  useEffect(() => {
    const formattedEvents = eventsData && eventsData.map((event, index) => ({
      title: event.title + (event.status ? ` (${event.status})` : ""),
      start: event.date,
      end: event.endDate || event.date,
      extendedProps: {
        description: event.description,
        image: event.image_url,
        age: event.minimum_age,
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
    const { description, image, age } = extendedProps;

    console.log(`Title: ${title}
Description: ${description}
Date: ${start.toISOString()}
Age: ${age}
Image URL: ${image}`);
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
  return (
    <div className="d-flex">
      <div className="ms-auto">
        <i>{eventInfo.event.title}</i>
        <br />

        <img
          src={eventInfo.event.extendedProps.image}
          alt={eventInfo.event.title}
          className="rounded-2"
          style={{ width: "100%" }}
        />
        <div className="d-flex">
          <span>
            <b>{eventInfo.timeText}</b>{" "}
          </span>

          <span className="ms-auto">{eventInfo.event.extendedProps.age}</span>
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
