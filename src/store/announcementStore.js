
import { defineStore } from 'pinia';
import api from '../api.js'; 

export const useAnnouncementStore = defineStore('announcementStore', {
  state: () => ({
    announcements: [],
    selectedAnnouncement: {},
    categories: [],   
    users: [],         
  }),

  actions: {
    async fetchAnnouncements() {
      try {
        const response = await api.get('/announcements');
        this.announcements = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des annonces:', error);
      }
    },

    async fetchCategories() {   
      try {
        const response = await api.get('/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }


    },

    async fetchUsers() {   
      try {
        const response = await api.get('/users');
        this.users = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    },

    async fetchAnnouncementById(id) {
      try {
        const response = await api.get(`/announcements/${id}`);
        if (response && response.data) {
          this.selectedAnnouncement = response.data;
          
        } else {
          console.error('Aucune donnée d\'annonce reçue.');
          this.selectedAnnouncement = {}; // Remplacer `null` par un objet vide
        }
        return response.data
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'annonce:', error);
        this.selectedAnnouncement = {}; // Toujours retourner un objet
      }
    },
    

    async fetchAnnouncementsByUserId(userId) {
      try {
        const response = await api.get(`/announcements/annouceUser/${userId}`);
        if (response && response.data) {
          this.announcements = response.data;
          console.log(response);
          
        } else {
          console.error('Aucune annonce trouvée pour cet utilisateur.');
          this.announcements = [];
        }
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des annonces pour cet utilisateur :',
          error
        );
        this.announcements = [];
      }
    },

    

    async createAnnouncement(data) {
      try {
        const token = localStorage.getItem('token'); // Récupérer le token depuis le stockage local
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await api.post('/announcements', data, config);
        this.announcements.push(response.data.announcement);
        return response.data; // Retourner les données pour confirmation
      } catch (error) {
        console.error("Erreur lors de la création de l'annonce:", error);
        if (error.response) {
          throw error.response.data; // Propager les erreurs du backend pour traitement
        }
        throw error;
      }
    },


    // async createAnnouncement(formData) {
    //   try {
    //     const response = await api.post('/announcements', formData, {
    //       headers: { 'Content-Type': 'multipart/form-data' },
    //     });
    //     return response.data;
    //   } catch (error) {
    //     console.error("Erreur lors de la création de l'annonce :", error);
    //     throw error;
    //   }
    // },
    async updateAnnouncement(id, data) {
      try {
        const token = localStorage.getItem('token'); // Récupérer le token depuis le stockage local
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await api.put(`/announcements/${id}`, data, config);

        // Mettre à jour localement l'annonce si elle est trouvée
        const index = this.announcements.findIndex(
          (announcement) => announcement.id === id
        );
        if (index !== -1) {
          this.announcements[index] = response.data.announcement;
        }
        return response.data; // Retourner les données mises à jour
      } catch (error) {
        console.error("Erreur lors de la modification de l'annonce:", error);
        if (error.response) {
          throw error.response.data; // Propager les erreurs du backend
        }
        throw error;
      }
    },

    
    

    async deleteAnnouncement(id) {
      try {
        await api.delete(`/announcements/${id}`);
        this.announcements = this.announcements.filter(a => a.id !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression de l'annonce:", error);
      }
    }
  },
});


