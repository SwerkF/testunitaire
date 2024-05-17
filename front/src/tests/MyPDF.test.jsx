import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import MyPDF from '../components/MyPDF';

// Mock PDFViewer component
jest.mock('@react-pdf/renderer', () => ({
  PDFViewer: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
  Document: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
  Page: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
  Text: jest.fn().mockImplementation(({ children }) => <div>{children}</div>),
  Image: jest.fn().mockImplementation(({ src }) => <img src={src} />)
}));

let container;

let data = {
    reservation: {
        number_of_tickets: 3
    },
    event: {
        title: 'Event title'
    },
    eventDates: {
        date: '2024-05-30T00:00:00+02:00'
    }
}

describe('MyPDF Render', () => {
    test('should render component', async () => {
        act(() => {
            container = render(<MyPDF data={data}/>);
        })  

        // expect qrCodeImage to be set
        await waitFor(() => {
            expect(container.getByText('Nom: Event title')).toBeInTheDocument();
            expect(container.getByText('Nombre de place: 3')).toBeInTheDocument();
            expect(container.getByText('Date: 2024-05-30')).toBeInTheDocument();
            expect(container.getByRole('img')).toBeInTheDocument();
        })
        
    });
});

describe('MyPDF QRCode Generated', () => {
    // img src should be set to qrCodeImage
    test('should set img src to qrCodeImage', async () => {
        act(() => {
            container = render(<MyPDF data={data}/>);
        })  

        // expect qrCodeImage to be set
        await waitFor(() => {
            expect(container.getByRole('img')).toHaveAttribute('src');
        })
    });
})
