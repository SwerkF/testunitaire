import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NavbarComponent from '../components/NavbarComponent';
import { UserContext } from '../App';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock local storage
const mockLocalStorage = (function() {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = String(value);
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

Object.defineProperty(window, 'location', {
  value: { reload: jest.fn() }
});

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

describe('NavbarComponent', () => {
  const userAdmin = { user: { role: "admin" } };
  const userRegular = { user: { role: "user" } };

  beforeEach(() => {
    // Clear all items in localStorage
    window.localStorage.clear();
    jest.clearAllMocks();
  });

  it('should render the component', () => {
    render(
        <MemoryRouter>
            <UserContext.Provider value={{ user: null }}>
                <NavbarComponent />
            </UserContext.Provider>
        </MemoryRouter>
    );
    });

  it('should display basic links when not logged in', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ user: null }}>
          <NavbarComponent />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('ACCUEIL')).toBeInTheDocument();
    expect(screen.getByText('EVENEMENTS')).toBeInTheDocument();
    expect(screen.getByText('CALENDRIER')).toBeInTheDocument();
    expect(screen.getByText('CONNEXION')).toBeInTheDocument();
    expect(screen.queryByText('RESERVATIONS')).toBeNull();
    expect(screen.queryByText('DECONNEXION')).toBeNull();
    expect(screen.queryByText('ADMIN')).toBeNull();
  });

  it('should display additional links when logged in as a regular user', () => {
    window.localStorage.setItem('user', 'testUser');
    render(
      <MemoryRouter>
        <UserContext.Provider value={userRegular}>
          <NavbarComponent />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('RESERVATIONS')).toBeInTheDocument();
    expect(screen.getByText('DECONNEXION')).toBeInTheDocument();
    expect(screen.queryByText('ADMIN')).toBeNull();
  });

  it('should display admin link when logged in as an admin', () => {
    window.localStorage.setItem('user', 'adminUser');
    render(
      <MemoryRouter>
        <UserContext.Provider value={userAdmin}>
          <NavbarComponent />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('ADMIN')).toBeInTheDocument();
  });

  it('should remove user from local storage and reload page on logout', () => {
    window.localStorage.setItem('user', 'testUser');
    render(
      <MemoryRouter>
        <UserContext.Provider value={userRegular}>
          <NavbarComponent />
        </UserContext.Provider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('DECONNEXION'));
    expect(window.localStorage.getItem('user')).toBeNull();
    expect(window.location.reload).toHaveBeenCalled();
  });
});
