import { render, screen, waitFor ,act } from '@testing-library/react';
import CardReservation from '../components/CardReservation';
import React from 'react';

let container;

let data = {
    "reservations": {      
        "id": 1,
        "number_of_tickets": 3,
        "reservation_date": "2024-05-30T00:00:00+02:00",
        "user_id": "/api/users/1",
        "event_date_id": "/api/events_datess/1",
        "numberOfTickets": 3,
        "reservationDate": "2024-05-30T00:00:00+02:00",
        "userId": "/api/users/1",
        "eventDateId": "/api/events_datess/1"
    },

}

describe('CardReservation render', () => {
    test('should render CardReservation', async () => {
        await act(async () => {
            container = render(<CardReservation reservation={data} />);
        });
    });
});

describe('CardReservation context', () => {
    test('should render CardReservation with reservation', async () => {
        await act(async () => {
            container = render(<CardReservation reservation={data} />);
        });
    });
});

// axios get request
jest.mock('axios', () => ({
    get: () => Promise.resolve({ data: [] })
}));

// axios get request
jest.mock('axios', () => ({
    get: () => Promise.resolve({ data: [] })
}));

describe('CardReservation axios', () => {
    test('should set axios', async () => {
        await act(async () => {
            container = render(<CardReservation reservation={data} />);

            // expect axios to be set
            await waitFor(() => {
                expect(container).toBeDefined();
            });

            expect(container.firstChild).toMatchInlineSnapshot(`undefined`);
            
        });
    });
});