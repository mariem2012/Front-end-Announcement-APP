// src/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3500', 
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

// try {
//   const response = await api.get('/users');
//   console.log('Liste des utilisateurs:', response.data);
// } catch (error) {
//   console.error('Erreur de connexion avec le backend:', error);
// }

export default api;
