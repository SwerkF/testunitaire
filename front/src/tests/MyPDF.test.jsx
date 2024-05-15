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

describe('MyPDF', () => {
    test('should render component', async () => {
        let container;
        act(() => {
            container = render(<MyPDF id={1}/>);
            //const { firstChild } = container;
        })  

        // expect qrCodeImage to be set
        await waitFor(() => {
            expect(container.getByText('Hello, this is my PDF!')).toBeInTheDocument();
            expect(container.getByRole('img')).toBeInTheDocument();
        })
        
    });
});

describe('MyPDF', () => {
    // img src should be set to qrCodeImage
    test('should set img src to qrCodeImage', async () => {
        let container;
        act(() => {
            container = render(<MyPDF id={1}/>);
        })  

        // expect qrCodeImage to be set
        await waitFor(() => {
            expect(container.getByRole('img')).toHaveAttribute('src');
        })
    });
})
