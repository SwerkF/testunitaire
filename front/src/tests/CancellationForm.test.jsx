import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CancellationForm from '../components/CancellationForm';


let container;
describe('CancellationForm', () => {
  const mockHandleClose = jest.fn();
  const mockHandleCancel = jest.fn();
  const event = { id: 1, name: 'Sample Event' };

  beforeEach(() => {
  container =  render(
      <CancellationForm
        show={true}
        handleClose={mockHandleClose}
        handleCancel={mockHandleCancel}
        event={event}
      />
    );
  });

  test('renders the modal with correct elements', () => {
    expect(screen.getByText('Annuler l\'événement')).toBeInTheDocument();
    expect(screen.getByLabelText('Raison d\'annulation')).toBeInTheDocument();
    expect(screen.getByText('Fermer')).toBeInTheDocument();
    expect(screen.getByText('Annuler')).toBeInTheDocument();
  });

  test('calls handleClose when the close button is clicked', () => {
    fireEvent.click(screen.getByText('Fermer'));
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  test('calls handleCancel with the correct arguments when the form is submitted', () => {
    const cancellationReason = 'Event cancelled due to unforeseen circumstances.';
    fireEvent.change(screen.getByLabelText('Raison d\'annulation'), { target: { value: cancellationReason } });
    fireEvent.submit(screen.getByRole('button', { name: 'Annuler' }));

    expect(mockHandleCancel).toHaveBeenCalledTimes(1);
    expect(mockHandleCancel).toHaveBeenCalledWith(expect.anything(), event.id);
  });

  test('shows the modal when show is true', () => {
    expect(screen.getByRole('dialog')).toBeVisible();
  });
});
