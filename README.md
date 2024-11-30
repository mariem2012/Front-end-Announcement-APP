# Announcement App

## Description

Announcement App est une application web de gestion des annonces locales en Mauritanie, développée avec Vue.js 3 et la Composition API. La gestion des états est réalisée avec Pinia, et la navigation entre les différentes pages (Accueil, Annonces, Catégories, Utilisateurs) est assurée par Vue Router. L'interface utilisateur est stylisée avec Bootstrap, offrant une expérience utilisateur moderne et réactive.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- VueJS `npm create vite@latest`


## Installation

Suivez ces étapes pour configurer le projet sur votre machine locale :

1. **Clonez le repository :**

    ```bash
    https://github.com/mariem2012/Front-end-Announcement-APP.git
    ```

2. **Accédez au dossier du projet :**

    ```bash
    cd Front-end-Announcement-APP
    ```

3. **Installez les dépendances :**

    ```bash
    npm install
    ```

## Utilisation

Pour démarrer l'application, exécutez la commande suivante :

```bash
npm run dev
```
L'application est accessible sur http://localhost:5173.

## Les fonctionalités

1. **Announcement :** 

 - fetchAnnouncements : cette fonction permet de recuperer touts les annonces.
   
 - fetchAnnouncementById : cette fonction permet de recuperer une annonce à partir de son id.
   
 - createAnnouncement : cette fonction permet d'ajouter une annonce.
 
 - deleteAnnouncement : cette fonction permet d'effacer une annonce à partir de son id.
 
 - updateAnnouncement :  cette fonction permet de modifier une annonce.
2. **Category :** 

 - fetchCategories : Récupère toutes les catégories disponibles.
 - getCategoryById : Récupère une catégorie spécifique en utilisant son identifiant.

 - addCategory : Ajoute une nouvelle catégorie.
 - deleteCategory : Supprime une catégorie à partir de son id.
 
 - updateCategory : Modifier Modifie une catégorie existante.
3. **User  :** 

 - registerUser  : Permet à un nouvel utilisateur de s'inscrire à l'application.
 - loginUser  : Authentifie l'utilisateur en vérifiant ses identifiants.
 - fetchUsers : Récupère la liste des utilisateurs (administration).
 - addUser : Ajoute une nouvelle utilisateur (administration).
 - fetchUserById : Récupère les informations d'un utilisateur spécifique en utilisant son identifiant.
 
 - updateUser : Met à jour les informations de l'utilisateur.
 - deleteUser : Supprime un utilisateur en fonction de son identifiant.
 - logoutUser : Déconnecte l'utilisateur de l'application.
 
## Author
- **GitHub** : [Mariem Dianifaba](https://github.com/mariem2012)

