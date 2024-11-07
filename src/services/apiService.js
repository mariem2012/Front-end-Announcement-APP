// // src/services/apiService.js
// import axios from 'axios';
// import { API_URL } from '../config';

// export const login = async (email, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/login`, { email, password });
//     return response.data; // Contient probablement un token ou des infos utilisateur
//   } catch (error) {
//     throw error.response ? error.response.data : new Error('Erreur de connexion');
//   }
// };

// export const register = async (name, email, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/register`, { name, email, password });
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : new Error('Erreur d\'inscription');
//   }
// };
