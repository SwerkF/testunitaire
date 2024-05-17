# Test unitaire

## Installation

Pour cloner le projet, ouvrez un terminal et placez vous dans un dossier via la commande `cd` et executez la commande suivante:

```
git clone https://github.com/SwerkF/testunitaire
```

Effectuez la commande `cd ./testunitaire`.

Ouvrez 2 terminaux.

### Installation Back:

Effectuez la commande suivante pour vous placer dans le dossier back:

```
cd ./back
```

Configurez votre base de données via le fichier .env.

```
DATABASE_URL="mysql://<USER>:<PASSWORD>@127.0.0.1:3306/<NOM_BASE_DE_DONNES>"
```

Pour installer les dépendances, faîtes la commande suivante:

```
composer install
```

Effectuez la commande suivante pour installer la base de données:
```
php bin/console cache:clear
php bin/console doctrine:database:create     
php bin/console doctrine:schema:update --force
```

Effectuez la commande suivante pour installer la base de données test:

```     
symfony console --env=test doctrine:database:create
symfony console --env=test doctrine:schema:update --force
```

Installez le fichier ```bdd.sql``` sur votre serveur.

Vous pouvez lancer votre application avec la commande suivante:
```
symfony server:start
```

### Installation Front:


Effectuez la commande suivante pour vous placer dans le dossier back:

```
cd ./front
```

Pour installer les dépendances, faîtes la commande suivante:

```
npm install
```

Vous pouvez lancer votre application avec la commande suivante:
```
npm run start
```

### Effectuer les tests

Pour lancer les tests dans le back, faîtes la commande suivante:
```
php bin/phpunit
```

Pour le front, faîtes cette commande:
```
npm run jest
```

User test:

user@test.com
UserTest123!

admin@test.com
AdminTest123!
