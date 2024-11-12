// // src/userService.js

// const USER_KEY = 'user';

// // Fonction pour définir l'utilisateur local
// export function setUser(user) {
//   localStorage.setItem(USER_KEY, JSON.stringify(user));
//   console.log("Utilisateur défini :", user);
// }

// // Fonction pour récupérer l'utilisateur local
// export function getUser() {
//   const user = JSON.parse(localStorage.getItem(USER_KEY));
//   if (user) {
//     console.log("Utilisateur récupéré :", user);
//   }
//   return user;
// }

// // Fonction pour déconnecter l'utilisateur local
// export function logoutUser() {
//   localStorage.removeItem(USER_KEY);
//   console.log("Utilisateur déconnecté");
// }

// // Fonction pour vérifier si un utilisateur est connecté
// export function isAuthenticated() {
//   return !!getUser();
// }
