import { render, screen, fireEvent } from '@testing-library/react'; // Ne pas importer act depuis react-dom/test-utils
import Connexion from '../pages/Connexion';
import React from 'react';
import '@testing-library/jest-dom';

describe('Connexion', () => {
    it('should render Connexion component', () => {
        render(<Connexion />);
        // Vérifie si le composant Connexion est rendu
        const connexionComponent = screen.getByTestId('connexion-component');
        expect(connexionComponent).toBeInTheDocument();
    });

    it('should render "Connexion" title', () => {
        render(<Connexion />);
        // Vérifie si le titre "Connexion" est rendu
        const titleElement = screen.getByText(/Connexion/i);
        expect(titleElement).toBeInTheDocument();
    });

    it('should toggle form visibility on link click', () => {
        render(<Connexion />);
        // Vérifie si le formulaire d'inscription est initiallement caché
        const inscriptionForm = screen.queryByTestId('inscription-form');
        expect(inscriptionForm).not.toBeInTheDocument();

        // Clique sur le lien "Vous avez déjà un compte ? Connectez-vous ici"
        const linkElement = screen.getByText(/Vous avez déjà un compte ? Connectez-vous ici/i);
        fireEvent.click(linkElement);

        // Vérifie si le formulaire d'inscription est maintenant visible
        const updatedInscriptionForm = screen.getByTestId('inscription-form');
        expect(updatedInscriptionForm).toBeInTheDocument();
    });
});
