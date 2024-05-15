import { TextEncoder, TextDecoder } from 'util';
import { render, screen } from '@testing-library/react';
import Reservations from '../pages/Reservations';
import React from 'react';

describe('Reservations', () => {
    it('should render Reservations', () => {
        render(<Reservations />);
        const linkElement = screen.getByText(/Reservations/i);
        expect(linkElement).toBeInTheDocument();
    });
})

// should open modal 

describe('Reservations', () => {
    it('should open modal', async () => {
        render(<Reservations />);
        const button = screen.getByText('Réservation 1');
        button.click();
        const modal = await screen.findByText('Reservation for John Doe');
        expect(modal).toBeInTheDocument();
        

    });
});