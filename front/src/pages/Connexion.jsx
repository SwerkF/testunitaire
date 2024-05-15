import React, { useState } from 'react';
import "../styles/Connexion.css";
import Button from 'react-bootstrap/Button';
import Input from '../components/Input';

export default function Connexion() {
    const [showConnexion, setShowConnexion] = useState(false);

    const toggleForm = () => {
        setShowConnexion(!showConnexion);
    };

    return (
        <>
            <div className='containerGeneral'>

                {showConnexion ? (
                    <div className='containerConnexion'>
                        <h1>Connexion</h1>
                        <label>Email</label>
                        <input type='email' placeholder='votreemail@gmail.com'></input>
                        <label>Mot de passe</label>
                        <input type='password' placeholder='*****'></input>
                        <button>Se connecter</button>
                        <p>
                            <a href='#' onClick={toggleForm}>Vous n'avez pas de compte ? Inscrivez-vous ici</a>
                        </p>
                    </div>
                ) : (
                    <div className='containerGeneralInscription'>
                        <div className='containerInformationInscription'>
                            <h3>CREER UN COMPTE</h3>
                            <p className='mx-w-20'>
                                En créant votre compte, vous accédez à une plateforme exclusive vous permettant de réserver facilement vos billets pour les concerts les plus prisés. Profitez d'une expérience utilisateur fluide et sécurisée, avec la possibilité de consulter les calendriers des événements à venir, choisir vos sièges préférés et recevoir des offres spéciales réservées aux membres. Rejoignez notre communauté passionnée de musique et vivez des moments inoubliables en assistant à vos concerts favoris.
                            </p>
                        </div>

                        <div className='containerInscription'>
                            <a href='#' onClick={toggleForm}>Vous avez déjà un compte ? Connectez-vous ici</a>
                            <label>Nom</label>
                            <input type='text' placeholder='Jean'></input>
                            <label>Prenom</label>
                            <input type='text' placeholder='Dupont'></input>
                            <label>Email</label>
                            <input type='email' placeholder='votreemail@gmail.com'></input>
                            <label>Mot de passe</label>
                            <input type='password' placeholder='*******'></input>
                            <label>Date de naissance</label>
                            <input type='date'></input>

                            <div className='containerCondition'>
                                <input type='checkbox'></input>
                                <label>Accepter les conditions d'utilisation</label>
                            </div>
                            <button>Créer votre compte</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
