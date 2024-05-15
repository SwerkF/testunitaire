import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalComponent from '../components/ModalComponent';

describe('ModalComponent', () => {
    it('should render ModalComponent', () => {
        render(<ModalComponent />);
        const modal = screen.getByTestId('modal-component');
        expect(modal).toBeInTheDocument();
    });

    it('should render ModalComponent with title', () => {
        render(<ModalComponent title="Modal Title" />);
        const title = screen.getByText('Modal Title');
        expect(title).toBeInTheDocument();
    });

    it('should render ModalComponent with children', () => {
        render(<ModalComponent><p>Modal Content</p></ModalComponent>);
        const content = screen.getByText('Modal Content');
        expect(content).toBeInTheDocument();
    });

    it('should render ModalComponent with close button', () => {
        render(<ModalComponent />);
        const closeButton = screen.getByTestId('close-button');
        expect(closeButton).toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', () => {
        const mockOnClose = jest.fn();
        render(<ModalComponent onClose={mockOnClose} />);
        const closeButton = screen.getByTestId('close-button');
        fireEvent.click(closeButton);
        expect(mockOnClose).toHaveBeenCalled();
    });
});