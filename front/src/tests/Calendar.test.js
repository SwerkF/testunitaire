import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CalendarPage from '../pages/CalendarPage';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

// Mock axios
jest.mock('axios');
// Mock the FullCalendar component
jest.mock('@fullcalendar/react', () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn(() => <div>MockedCalendar</div>)  // Return a div to simulate rendering
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
    axios.get.mockResolvedValue({ data: { 'hydra:member': [] } });  // Mocking empty response for simplicity
  });

  it('rend sans plantage', async () => {
    render(<CalendarPage />);
    await waitFor(() => expect(screen.getByText('MockedCalendar')).toBeInTheDocument());
  });

  it('récupère les événements avec succès et les affiche', async () => {
    // Mock response to simulate fetched events
    axios.get.mockResolvedValueOnce({
      data: {
        'hydra:member': [
          {
            id: 1,
            title: 'Test Event',
            description: 'This is a test event',
            date: '2023-05-01',
            image_url: 'http://example.com/image.jpg',
            minimum_age: 18,
            type: 'Music',
            tickets: 100,
            reservedTickets: 10,
            status: 'Disponible'
          }
        ]
      }
    });

    render(<CalendarPage />);
    await waitFor(() => {
      // Check if event details are processed and displayed
      expect(screen.getByText('Test Event')).toBeInTheDocument();
      expect(screen.getByText('Music')).toBeInTheDocument();
    });
  });

  it('gère les erreurs de \'API de manière élégante', async () => {
    // Simulate an API error
    axios.get.mockRejectedValue(new Error('API Error'));
    render(<CalendarPage />);
    await waitFor(() => {
      expect(screen.getByText('MockedCalendar')).toBeInTheDocument();
      // You could also check for an error message if your component displays one
    });
  });
});
