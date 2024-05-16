import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CalendarPage from '../pages/CalendarPage';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

// Mock axios
jest.mock('axios');
// Mock the FullCalendar component
// Mock the FullCalendar component
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

describe('Calendar Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { 'hydra:member': [] } }); 
  });

  test('rend sans plantage (le fichier ne plante pas)', async () => {
    render(<CalendarPage />);
    await waitFor(() => expect(screen.getByText('MockedCalendar')).toBeInTheDocument());
  });

  
  test('gère les erreurs de \'API de manière élégante', async () => {
    // Simulate an API error
    axios.get.mockRejectedValue(new Error('API Error'));
    render(<CalendarPage />);
    await waitFor(() => {
      expect(screen.getByText('MockedCalendar')).toBeInTheDocument();
    });
  });

  // it('récupère et affiche les événements avec succès', async () => {
  //   // Mock API responses
  //   axios.get.mockImplementation(url =>
  //     Promise.resolve({
  //       data: url.includes('eventss')
  //         ? { 'hydra:member': [{ id: 1, title: 'Event 1', description: 'Description 1', image_url: 'http://example.com/image.jpg', minimum_age: 18, type: 'Music' }] }
  //         : url.includes('events_datess')
  //         ? { 'hydra:member': [{ event: '1', id: 1, date: '2024-05-16', tickets: 100, is_cancelled: false }] }
  //         : { 'hydra:member': [{ event_date_id: '1', number_of_tickets: 10 }] }
  //     })
  //   );
  
  //   render(<CalendarPage />);
  //   await waitFor(() => {
  //     expect(screen.getByText('Event 1')).toBeInTheDocument();
  //     expect(screen.getByText('Music')).toBeInTheDocument();
  //     expect(screen.getByText('90 Restant(s)')).toBeInTheDocument();
  //   });
  // });
  

  it('Affiche une erreur sur la vue client', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));
    render(<CalendarPage />);
    await waitFor(() => expect(screen.getByText("Une erreur s'est produite. Veuillez réessayer.")).toBeInTheDocument());
  });
});
