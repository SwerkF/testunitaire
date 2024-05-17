import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Reservation from '../components/Reservation';

// Axios mock
jest.mock('axios');

describe('Reservation Component', () => {
  const setup = (props = {}) => {
    const defaultProps = {
      eventName: "Concert",
      initialDate: "2024-06-15",
      userBirthDate: "2000-05-13",
      evenAge: 18,
      userId: 1,
      event_date_id: 123,
      ...props
    };
    render(<Reservation {...defaultProps} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('rend le formulaire avec les valeurs initiales', () => {
    setup();
    expect(screen.getByLabelText(/Nombre de places/i)).toHaveValue(1);
  });

  test('affiche la case à cocher pour plusieurs personnes', () => {
    setup();
    fireEvent.change(screen.getByLabelText(/Nombre de places/i), { target: { value: 2 } });
    expect(screen.getByLabelText(/Je confirme que tous les participants ont plus de 18 ans./i)).toBeInTheDocument();
  });

  test('valide correctement la restriction d\'âge', () => {
    setup({ userBirthDate: "2010-05-13", evenAge: 18 }); 
    fireEvent.click(screen.getByText(/Réserver maintenant/i));
    expect(screen.getByText(/Vous devez avoir plus de 18 ans pour participer à cet événement./i)).toBeInTheDocument();
  });

  test('soumet le formulaire avec succès', async () => {
    axios.post.mockResolvedValue({ data: 'success' });
    setup();
    fireEvent.click(screen.getByText(/Réserver maintenant/i));
    await waitFor(() => expect(screen.queryByText("Votre réservation a été enregistrée.")).toBeInTheDocument());
  });

  test('ne soumet pas le formulaire si l\'utilisateur n\'est pas connecté', () => {
    setup({ userId: null }); 
    fireEvent.click(screen.getByText(/Réserver maintenant/i));
    expect(screen.getByText(/Vous devez être connecté pour réserver un événement./i)).toBeInTheDocument();
  });
});