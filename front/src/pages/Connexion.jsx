import React from 'react';

export default function Connexion(){
    return(
        <div className='containerGenral'>
            <div className='containerConnexion'>
                <h1>Connexion</h1>
                <input type='email' placeholder='Email'></input>
                <input type='passwork' placeholder='Mot de passe'></input>
            </div>

            <div className='containerInscription'>
            <h1>Inscription</h1>
            <input type='text' placeholder='Nom'></input>
            <input type='text' placeholder='Prenom'></input>
            <input type='email' placeholder='Email'></input>
            <input type='passwork' placeholder='Mot de passe'></input>
            </div>
        </div>
    );
}