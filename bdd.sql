-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 17 mai 2024 à 15:20
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `billetterie`
--

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `image_url` varchar(2555) DEFAULT NULL,
  `minimum_age` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `type`, `image_url`, `minimum_age`) VALUES
(2, 'Concert de Jazz', 'Un concert de jazz avec des artistes internationaux.', 'Musique', 'https://picsum.photos/200/200', 18),
(3, 'Exposition d\'Art Contemporain', 'Une exposition mettant en valeur des œuvres d\'artistes contemporains.', 'Art', 'https://picsum.photos/300/300', 0),
(4, 'Festival de Cinéma', 'Projection de films indépendants du monde entier.', 'Cinéma', 'https://picsum.photos/250/250', 12),
(5, 'Conférence sur la Technologie', 'Discussions sur les dernières innovations technologiques.', 'Conférence', 'https://picsum.photos/270/270', 16),
(6, 'Atelier de Cuisine Italienne', 'Apprenez à préparer des plats italiens traditionnels.', 'Atelier', 'https://picsum.photos/200/300', 10),
(7, 'Spectacle de Magie', 'Un spectacle de magie pour toute la famille.', 'Spectacle', 'https://picsum.photos/400/400', 0),
(8, 'Soirée de Stand-up Comedy', 'Des humoristes locaux vous feront rire toute la soirée.', 'Comédie', 'https://picsum.photos/800/800', 18),
(9, 'Marathon de Yoga', 'Une journée complète de yoga pour tous les niveaux.', 'Sport', 'https://picsum.photos/200/300', 12),
(10, 'Bal de Promo', 'Un bal de promo pour les lycéens et leurs invités.', 'Événement Social', 'https://picsum.photos/200/300', 16),
(11, 'Fête de la Musique', 'Une célébration de la musique avec des performances en direct.', 'Musique', 'https://picsum.photos/200/300', 0);

-- --------------------------------------------------------

--
-- Structure de la table `events_dates`
--

CREATE TABLE `events_dates` (
  `id` int(11) NOT NULL,
  `event_id_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `tickets` int(11) DEFAULT NULL,
  `cancellation_reason` longtext DEFAULT NULL,
  `is_cancelled` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `events_dates`
--

INSERT INTO `events_dates` (`id`, `event_id_id`, `date`, `tickets`, `cancellation_reason`, `is_cancelled`) VALUES
(2, 2, '2024-05-30', 30, NULL, NULL),
(3, 3, '2024-05-31', 6000, NULL, NULL),
(4, 3, '2024-05-31', 6000, NULL, NULL),
(5, 4, '2024-06-06', 10, NULL, NULL),
(6, 4, '2024-05-24', 6000, NULL, NULL),
(7, 8, '2024-05-18', 6000, 'COVID', 1);

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `event_date_id` int(11) DEFAULT NULL,
  `number_of_tickets` int(11) DEFAULT NULL,
  `reservation_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`id`, `user_id`, `event_date_id`, `number_of_tickets`, `reservation_date`) VALUES
(2, 2, 2, 30, '2024-05-17'),
(3, 2, 5, 8, '2024-05-17'),
(4, 3, 3, 1, '2024-05-17'),
(5, 4, 4, 3, '2024-05-17'),
(6, 4, 5, 3, '2024-05-17');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(180) NOT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '(DC2Type:json)' CHECK (json_valid(`roles`)),
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `firstname`, `name`, `birthday`) VALUES
(2, 'user@test.com', '[\"user\"]', '$2a$10$8dKhXiXxs/Zhu4DqifSDc.UkfQph2T8amFMD3stLMTSHASe0EQOIK', 'Test', 'User', '2024-01-17'),
(3, 'admin@test.com', '[\"user\"]', '$2a$10$CEVB4csKf4jlgxiTbfG0SebpqbqTQClogg2TBHN0hmGEjHcxiUo1K', 'Test', 'Admin', '2024-05-24'),
(4, 'user2@test.com', '[\"user\"]', '$2a$10$iNh80yI.um.iOtQjF9EjOe3qaq3IrP1.GjO3G7nsSS76A4/gx0.u2', 'Test2', 'User', '1999-01-14');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `events_dates`
--
ALTER TABLE `events_dates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_1BC801383E5F2F7B` (`event_id_id`);

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_42C84955A76ED395` (`user_id`),
  ADD KEY `IDX_42C849553DC09FC4` (`event_date_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_IDENTIFIER_EMAIL` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `events_dates`
--
ALTER TABLE `events_dates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `events_dates`
--
ALTER TABLE `events_dates`
  ADD CONSTRAINT `FK_1BC801383E5F2F7B` FOREIGN KEY (`event_id_id`) REFERENCES `events` (`id`);

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `FK_42C849553DC09FC4` FOREIGN KEY (`event_date_id`) REFERENCES `events_dates` (`id`),
  ADD CONSTRAINT `FK_42C84955A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
