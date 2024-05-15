import React, { useState, useContext } from "react";
import "../styles/Connexion.css";
import axios from "axios";
import bcrypt from "bcryptjs";
import {
  validateEmail,
  validatePassword,
} from "../services/authenticationValidation";
import "../styles/global.css";
import { Button } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext"; // Importer le contexte utilisateur

export default function Connexion() {
  const { setUser } = useContext(UserContext); // Utiliser le contexte pour mettre à jour l'utilisateur
  const [showConnexion, setShowConnexion] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Email invalide");
      return;
    }
    if (!validatePassword(password)) {
      setError(
        "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre"
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const userData = {
        email: email,
        roles: ["user"], // Rôle par défaut
        password: hashedPassword,
        firstname: prenom,
        name: nom,
        birthday: dateNaissance,
      };

      const response = await axios.post('http://localhost:8000/api/users', userData);

      console.log("Signup successful:", response.data);

      // Mettre à jour le contexte utilisateur avec les informations de l'utilisateur enregistré
      setUser({
        email,
        firstname: prenom,
        name: nom,
        birthday: dateNaissance,
      });

    } catch (error) {
      console.error("Error signing up:", error);
      setError("Erreur lors de la création du compte");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Email invalide");
      return;
    }

    try {
      // Effectuer une requête GET pour récupérer tous les utilisateurs
      const response = await axios.get('http://localhost:8000/api/users');

      // Filtrer pour trouver l'utilisateur avec l'email correspondant
      const user = response.data['hydra:member'].find(u => u.email === email);

      if (!user) {
        setError("Email ou mot de passe invalide");
        return;
      }

      // Vérifier le mot de passe
      const isMatch = bcrypt.compareSync(password, user.password);

      if (isMatch) {
        console.log("Login successful");

        // Mettre à jour le contexte utilisateur avec les informations de l'utilisateur connecté
        setUser({
          email: user.email,
          firstname: user.firstname,
          name: user.name,
          birthday: user.birthday,
        });
      } else {
        console.error("Email ou mot de passe invalide");
        setError("Email ou mot de passe invalide");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Erreur lors de la connexion");
    }
  };

  const toggleForm = () => {
    setShowConnexion(!showConnexion);
  };

  return (
    <div className="containerGeneral">
      {showConnexion ? (
        <form className="containerConnexion" onSubmit={handleLogin}>
          <h1>Connexion</h1>
          <label className="text-light fs-6">Email</label>
          <input
            type="email"
            className="w-100"
            placeholder="votreemail@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="mt-3 text-light fs-6">Mot de passe</label>
          <input
            type="password"
            className="w-100"
            placeholder="*****"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="mt-3 w-100 btn-color-yellow">Se connecter</Button>
          <p>
            <a href="#" onClick={toggleForm} className="fs-6 pb-3 text-color-yellow">
              Vous n'avez pas de compte ? Inscrivez-vous ici
            </a>
          </p>
          {error && (
              <span style={{ fontSize: "0.8rem" }} className="text-danger">
                {error}
              </span>
            )}
        </form>
      ) : (
        <div className="containerGeneralInscription">
          <div className="containerInformationInscription">
            <h3>CREER UN COMPTE</h3>
            <p className="mx-w-20">
              En créant votre compte, vous accédez à une plateforme exclusive
              vous permettant de réserver facilement vos billets pour les
              concerts les plus prisés. Profitez d'une expérience utilisateur
              fluide et sécurisée, avec la possibilité de consulter les
              calendriers des événements à venir, choisir vos sièges préférés et
              recevoir des offres spéciales réservées aux membres. Rejoignez
              notre communauté passionnée de musique et vivez des moments
              inoubliables en assistant à vos concerts favoris.
            </p>
          </div>

          <form className="containerInscription" style={{width : "40%"}} onSubmit={handleRegister}>
            <a href="#" onClick={toggleForm} className="fs-6 pb-3 text-color-yellow">
              Vous avez déjà un compte ? Connectez-vous ici
            </a>
            <label>Nom</label>
            <input
              type="text"
              placeholder="Dupont"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
            <label>Prenom</label>
            <input
              type="text"
              placeholder="Jean"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
            <label>Email</label>
            <input
              type="email"
              placeholder="votreemail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Mot de passe</label>
            <input
              type="password"
              placeholder="*******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Confirmation du mot de passe</label>
            <input
              type="password"
              placeholder="*******"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label>Date de naissance</label>
            <input 
              type="date" 
              value={dateNaissance}
              onChange={(e) => setDateNaissance(e.target.value)}
              required 
            />

            <div className="containerCondition">
              <input type="checkbox" required />
              <label>Accepter les conditions d'utilisation</label>
            </div>
            <Button type="submit" className="btn-color">Créer votre compte</Button>
            {error && (
              <span style={{ fontSize: "0.8rem" }} className="text-danger">
                {error}
              </span>
            )}
          </form>
        </div>
      )}
    </div>
  );
}