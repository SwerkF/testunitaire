import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Reservation from '../components/Reservation';

// Mock the onSignupSuccess function
describe('Reservation Component', () => {
  const setup = (props = {}) => {
    const defaultProps = {
      eventName: "Concert",
      initialDate: "2024-06-15",
      userBirthDate: "2000-05-13",
      evenAge: 18,
      ...props
    };
    render(<Reservation {...defaultProps} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    setup(); 
  });

  test('rend le formulaire avec les valeurs initiales', () => {
    expect(screen.getByLabelText(/Date de l'événement/i)).toHaveValue('2024-06-15');
    expect(screen.getByLabelText(/Nombre de places/i)).toHaveValue(1);
  });

  test('soumet avec succès le formulaire pour une seule personne', async () => {
    fireEvent.change(screen.getByLabelText(/Nombre de places/i), { target: { value: 1 } });
    fireEvent.change(screen.getByLabelText(/Date de l'événement/i), { target: { value: '2024-06-20' } });
    fireEvent.submit(screen.getByRole('button', { name: /S'inscrire/i }));

    const successMessage = await screen.findByText(/Enregistré pour 1 personne\(s\) à l'événement du 2024-06-20./i);
    expect(successMessage).toBeInTheDocument();
  });

  test('affiche la case à cocher pour plusieurs personnes', () => {
    fireEvent.change(screen.getByLabelText(/Nombre de places/i), { target: { value: 2 } });
    expect(screen.getByLabelText(/Je confirme que tous les participants ont plus de 18 ans./i)).toBeInTheDocument();
  });

  test('soumet avec succès le formulaire pour plusieurs personnes si la confirmation de l\'âge est vérifiée', async () => {
    fireEvent.change(screen.getByLabelText(/Nombre de places/i), { target: { value: 2 } });
    const ageConfirmationCheckbox = screen.getByLabelText(/Je confirme que tous les participants ont plus de 18 ans/i);
    if (!ageConfirmationCheckbox.checked) {
      fireEvent.click(ageConfirmationCheckbox); 
    }
    fireEvent.submit(screen.getByTestId('submit-button'));

    const successMessage = await screen.findByText(/Enregistré pour 2 personne\(s\) à l'événement du 2024-06-15./i);
    expect(successMessage).toBeInTheDocument();
  });
});
