import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Reservation from '../components/Reservation';

// Mock the onSignupSuccess function
const mockOnSignupSuccess = jest.fn();

describe('Reservation Component', () => {
  const setup = (props = {}) => {
    const defaultProps = {
      eventName: "Concert",
      initialDate: "2024-06-15",
      userBirthDate: "2000-05-13",
      userId: 1,
      evenAge: 18,
      event_date_id: 123,
      onSignupSuccess: mockOnSignupSuccess,
      ...props
    };
    render(<Reservation {...defaultProps} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('rend le formulaire avec les valeurs initiales', () => {
    expect(screen.getByLabelText(/Nombre de places/i)).toHaveValue(1);
  });

  test('soumet avec succès le formulaire pour une seule personne', async () => {
    fireEvent.change(screen.getByLabelText(/Nombre de places/i), { target: { value: 1 } });
    fireEvent.change(screen.getByLabelText(/Date de l'événement/i), { target: { value: '2024-06-20' } });
    fireEvent.submit(screen.getByTestId('submit-button'));

    const successMessage = await screen.findByText(/Votre réservation a été enregistrée./i);
    expect(successMessage).toBeInTheDocument();
    expect(mockOnSignupSuccess).toHaveBeenCalledWith('2024-06-20', 1);
  });

  test('affiche la case à cocher pour plusieurs personnes', () => {
    setup();
    fireEvent.change(screen.getByLabelText(/Nombre de places/i), { target: { value: 2 } });
    expect(screen.getByTestId('age-confirmation')).toBeInTheDocument();
  });

  test('soumet avec succès le formulaire pour plusieurs personnes si la confirmation de l\'âge est vérifiée', async () => {
    fireEvent.change(screen.getByLabelText(/Nombre de places/i), { target: { value: 2 } });
    const ageConfirmationCheckbox = screen.getByTestId('age-confirmation');
    if (!ageConfirmationCheckbox.checked) {
      fireEvent.click(ageConfirmationCheckbox); 
    }
    fireEvent.submit(screen.getByTestId('submit-button'));

    const successMessage = await screen.findByText(/Votre réservation a été enregistrée./i);
    expect(successMessage).toBeInTheDocument();
    expect(mockOnSignupSuccess).toHaveBeenCalledWith('2024-06-15', 2);
  });

  test('ne soumet pas le formulaire si l\'utilisateur n\'est pas connecté', () => {
    setup({ userId: null }); 
    fireEvent.click(screen.getByText(/Réserver maintenant/i));
    expect(screen.getByText(/Vous devez être connecté pour réserver un événement./i)).toBeInTheDocument();
  });
});