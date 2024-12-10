import { defineStore } from 'pinia';
import api from '../api.js';
import { ref } from 'vue';

import { useToast } from 'vue-toastification';
const toast = useToast(); 


export const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: ref(localStorage.getItem('token') || null),
    isAuthenticated: ref(!!localStorage.getItem('token')),
    // user: ref({}),
    user:{},
    role: ''
  }),

  actions: {

    async initialize() {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          this.token = storedToken;
          this.isAuthenticated = true;
          api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        }
      },

    async login(email, password) {
      try {
        const response = await api.post('/login', { email, password });

        const { token, user } = response.data;
        localStorage.setItem("userId", user.id)
        localStorage.setItem("userRole", user.role)
        
        this.user.value = {
          role: user.role,
          userId: user.id,
          userName: user.name,
        };

        this.token = token;
        this.isAuthenticated = true;
        localStorage.setItem('token', this.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        console.log(token)
        toast.success('Vous avez été connecté avec succès !');
        return this.user.value;
      } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        throw error;
      }
    },

    async register(userData) {
      try {
        const response = await api.post('/register', userData);
        const { token, user } = response.data;
    
        // Enregistrer le token et les informations utilisateur
        this.token = token;
        this.isAuthenticated = true;
        localStorage.setItem('token', this.token);
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userRole', user.role);
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    
        this.user = {
          id: user.id,
          name: user.name,
          role: user.role,
        };
    
        toast.success('Inscription réussie. Bienvenue sur la plateforme !');
        return response.data;
      } catch (error) {
        toast.error('Erreur lors de l\'inscription');
        throw error; // Propager l'erreur pour que le composant puisse réagir
      }
    },
    

    async logout() {

        try {
            this.isAuthenticated = false;
            this.user.value = null;
            localStorage.removeItem('token');
            delete api.defaults.headers.common['Authorization'];
            toast.success('Vous avez été déconnecté avec succès !');
          } catch (error) {
            console.error('Erreur lors de la déconnexion :', error);
            toast.error('Erreur lors de la déconnexion.');
          }
    },
  },
});
