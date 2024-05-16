import { render, screen, waitFor ,act } from '@testing-library/react';
import Reservations from '../pages/Reservations';
import React from 'react';

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

// set axios in for Reservation
jest.mock('axios', () => ({
    get: () => Promise.resolve({ data: [] })
}));

let container;

describe('Reservations redner', () => {
    test('should render component', async () => {
        act(() => {
            container = render(<Reservations />);
        })  

        // expect h1 to be set
        await waitFor(() => {
            expect(container.getByText('Reservations')).toBeInTheDocument();
        })
    });
});

describe('Reservations context', () => {
    test('should set user in context', async () => {
        act(() => {
            container = render(<Reservations />);
        })  

        // expect user to be set
        await waitFor(() => {
            expect(container.getByText('Reservations')).toBeInTheDocument();
        })
    });
});

describe('Reservations redirection', () => {
    test('should redirect to login page if user is not set', async () => {
        jest.mock('react', () => ({
            ...jest.requireActual('react'),
            useContext: () => ({ user: null })
        }));

        act(() => {
            container = render(<Reservations />);
        })  

        // expect user to be set
        await waitFor(() => {
            expect(container.getByText('Reservations')).toBeInTheDocument();
        })
    });
});
