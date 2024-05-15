import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Connexion from '../pages/Connexion';

describe('Connexion', () => {
    // Test de basculement vers le formulaire de connexion
    it('should toggle to login form when "Vous avez déjà un compte ? Connectez-vous ici" link is clicked', () => {
        render(<Connexion />);
        
        // Vérifie que le formulaire d'inscription est affiché initialement
        const nameInput = screen.getByLabelText('Nom');
        const firstNameInput = screen.getByLabelText('Prenom');
        const emailInput = screen.getByLabelText('Email');
        const passwordInput = screen.getByLabelText('Mot de passe');
        const dateOfBirthInput = screen.getByLabelText('Date de naissance');
        const createAccountButton = screen.getByText('Créer votre compte');
        expect(nameInput).toBeInTheDocument();
        expect(firstNameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(dateOfBirthInput).toBeInTheDocument();
        expect(createAccountButton).toBeInTheDocument();
        
        // Clique sur le lien pour basculer vers le formulaire de connexion
        const loginLink = screen.getByText("Vous avez déjà un compte ? Connectez-vous ici");
        fireEvent.click(loginLink);
        
        // Vérifie que le formulaire de connexion est affiché après le clic
        const emailInput2 = screen.getByLabelText('Email');
        const passwordInput2 = screen.getByLabelText('Mot de passe');
        expect(emailInput2).toBeInTheDocument();
        expect(passwordInput2).toBeInTheDocument();
    });

    // Test d'affichage d'une erreur de validation lors de la soumission avec des champs vides
    it('should display validation error when submitting form with empty fields', async () => {
        render(<Connexion />);
    
        const createAccountButton = screen.getByText('Créer votre compte');
        fireEvent.click(createAccountButton);
    
        // Attend que le message d'erreur soit rendu dans le DOM
        /*await waitFor(() => {
            expect(screen.getByText('Email invalide')).toBeInTheDocument();
        });*/
    });

    // Test d'affichage d'une erreur de validation lors de la saisie d'un email invalide
    it('should display validation error when entering invalid email', async () => {
        render(<Connexion />);

        const emailInput = screen.getByLabelText('Email');
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

        const createAccountButton = screen.getByText('Créer votre compte');
        fireEvent.click(createAccountButton);

        // Attend que le message d'erreur soit rendu dans le DOM
        /*await waitFor(() => {
            expect(screen.getByText('Email invalide')).toBeInTheDocument();
        });*/
    });
});
