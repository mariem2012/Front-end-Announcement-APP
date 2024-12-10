
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
        this.selectedAnnouncement = response.data;
        return response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'annonce :', error);
      }
    },
    
    

    async fetchAnnouncementsByUserId(userId) {
      try {
        const response = await api.get(`/announcements/annouceUser/${userId}`);
        if (response && response.data) {
          this.announcements = response.data;
          return this.announcements;
          // console.log(response);
          
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



    async  createAnnouncement(data) {
      try {
        const response = await api.post('/announcements', data);
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la création de l'annonce:", error);
        throw error;
      }
    },
    

    

    // async createAnnouncement(data) {
    //   try {
    //     const token = localStorage.getItem('token'); 
    //     const config = {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     };
    //     const response = await api.post('/announcements', data, config);
    //     this.announcements.push(response.data.announcement);
    //     return response.data; 
    //   } catch (error) {
    //     console.error("Erreur lors de la création de l'annonce:", error);
        
    //     throw error;
    //   }
    // },


   
    async updateAnnouncement(id, data) {
      try {
        const token = localStorage.getItem('token'); 
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await api.put(`/announcements/${id}`, data, config);

        const index = this.announcements.findIndex(
          (announcement) => announcement.id === id
        );
        if (index !== -1) {
          this.announcements[index] = response.data.announcement;
        }
        return response.data; 
      } catch (error) {
        console.error("Erreur lors de la modification de l'annonce:", error);
        
        throw error;
      }
    },

    
    

    async deleteAnnouncement(id) {
      try {
        await api.delete(`/announcements/${id}`);
        await this.fetchAnnouncementsByUserId()
        this.announcements = this.announcements.filter(a => a.id !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression de l'annonce:", error);
      }
    }
  },
});


