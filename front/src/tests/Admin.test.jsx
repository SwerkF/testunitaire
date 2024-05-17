import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Admin from "../pages/Admin";
import axios from "axios";

jest.mock("axios");

// set useContext in for Reservation
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => ({ user: { id: 1, email:"admin@gmail.com" } })
}));


// set useNavigate in for Reservation
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => () => {}
}));

// transofrm to html 
/*
import { Button } from "react-bootstrap";
import EventForm from "../components/EventForm";
import EventTable from "../components/EventTable";
*/
jest.mock("react-bootstrap", () => ({
  Button: jest.fn(({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  )),
}));

jest.mock("../components/EventForm", () => jest.fn(() => <div>MockedEventForm</div>));
jest.mock("../components/EventTable", () => jest.fn(({ events }) => (
  <div>
    {events.map((event) => (
      <div key={event.id}>
        <div>{event.title}</div>
        <div>{event.description}</div>
      </div>
    ))}
  </div>
)));

jest.mock('@fullcalendar/react', () => ({
  __esModule: true,
  default: jest.fn(({ events }) => (
    <div>
      MockedCalendar
      {events.map((event, index) => (
        <div key={index}>
          <div>{event.title}</div>
          <div>{event.extendedProps?.type}</div>
          <div>{event.extendedProps?.totalTickets - event.extendedProps?.reservedTickets} Restant(s)</div>
        </div>
      ))}
    </div>
  ))
}));


jest.mock('@fullcalendar/daygrid', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn()
}));

jest.mock('@fullcalendar/timegrid', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn()
}));

jest.mock('@fullcalendar/interaction', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn()
}));


describe("Admin component", () => {
  it("fetches and displays events", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        "hydra:member": [
          {
            id: 1,
            title: "Concert",
            description: "A great concert",
            type: "concert",
            minimumAge: 18,
            imageUrl: "www.example.com/image.jpg",
          },
          {
            id: 2,
            title: "Festival",
            description: "A fun festival",
            type: "festival",
            minimumAge: 16,
            imageUrl: "www.example.com/festival.jpg",
          },
        ],
      },
    });

    render(<Admin />);

    await waitFor(() => {
      expect(screen.getByText("A great concert")).toBeInTheDocument();
      expect(screen.getByText("A fun festival")).toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenCalledWith("http://127.0.0.1:8000/api/eventss");
  });
});
