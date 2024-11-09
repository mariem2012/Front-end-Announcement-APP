
// import { defineStore } from 'pinia';
// import api from '../api.js'; 

// export const useAnnouncementStore = defineStore('announcementStore', {
//   state: () => ({
//     announcements: [],
//     selectedAnnouncement: null,
//     categories: [],   
//     users: [],         
//   }),

//   actions: {
//     async fetchAnnouncements() {
//       try {
//         const response = await api.get('/announcements');
//         this.announcements = response.data;
//       } catch (error) {
//         console.error('Erreur lors de la récupération des annonces:', error);
//       }
//     },

//     async fetchCategories() {   
//       try {
//         const response = await api.get('/categories');
//         this.categories = response.data;
//       } catch (error) {
//         console.error('Erreur lors de la récupération des catégories:', error);
//       }
//     },

//     async fetchUsers() {   
//       try {
//         const response = await api.get('/users');
//         this.users = response.data;
//       } catch (error) {
//         console.error('Erreur lors de la récupération des utilisateurs:', error);
//       }
//     },

//     async fetchAnnouncementById(id) {
//       try {
//         const response = await api.get(`/announcements/${id}`);
//         this.selectedAnnouncement = response.data;
//       } catch (error) {
//         console.error("Erreur lors de la récupération de l'annonce:", error);
//       }
//     },

//     async createAnnouncement(data) {
//       try {
//         const response = await api.post('/announcements', data);
//         this.announcements.push(response.data);
//       } catch (error) {
//         console.error("Erreur lors de la création de l'annonce:", error);
//       }
//     },

//     async updateAnnouncement(id, data) {
//       try {
//         const response = await api.put(`/announcements/${id}`, data);
//         const index = this.announcements.findIndex(a => a.id === id);
//         if (index !== -1) this.announcements[index] = response.data;
//       } catch (error) {
//         console.error("Erreur lors de la mise à jour de l'annonce:", error);
//       }
//     },

//     async deleteAnnouncement(id) {
//       try {
//         await api.delete(`/announcements/${id}`);
//         this.announcements = this.announcements.filter(a => a.id !== id);
//       } catch (error) {
//         console.error("Erreur lors de la suppression de l'annonce:", error);
//       }
//     }
//   },
// });



import { defineStore } from 'pinia';
import api from '../api.js'; 

export const useAnnouncementStore = defineStore('announcementStore', {
  state: () => ({
    announcements: [],
    categories: [],  
    users: [],
    // currentUser: {      
    //   id: 1,
    //   name: 'Assa Camara',
    //   email: 'camaraa@example.com',
    //   phone: '+222 234 4567',
    //   address: 'Nouakchott, Mauritanie',
    // },
  }),

  actions: {
    async fetchAnnouncements() {
      try {
        const response = await api.get('/announcements');
        if (response.data && Array.isArray(response.data)) {
          this.announcements = response.data;
          console.log('Données récupérées:', this.announcements);
        } else {
          console.error('Réponse inattendue de l\'API:', response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des annonces:', error.message);
        throw error;
      }
    },

    async fetchCategories() {
      try {
        const response = await api.get('/categories'); 
        if (response.data && Array.isArray(response.data)) {
          this.categories = response.data;
        } else {
          console.error('Réponse inattendue de l\'API (categories):', response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error.message);
      }
    },
    

   
    // async createAnnouncement(data) {
    //   try {
    //     const newAnnouncement = {
    //       id: Date.now(), 
    //       ...data,
    //       user_id: this.currentUser.id,
    //       user: this.currentUser,
    //       status: true,
    //       // publication_date: new Date().toISOString(), 
    //     };

      
    //     // newAnnouncement.publication_date = this.formatDate(newAnnouncement.publication_date);
        
    //     this.fetchAnnouncements()
        
    //   } catch (error) {
    //     console.error('Erreur lors de la création de l\'annonce:', error);
    //   }
    // },


    async createAnnouncement(announcementData) {
      try {
        console.log("Sending announcement data:", announcementData); 
    
        const response = await api.post('/announcements', announcementData);
        this.announcements.push(response.data);
        console.log("Announcement added successfully", response.data);
      } catch (error) {
        console.error("Erreur lors de l'ajout d'une annonce:", error.response ? error.response.data : error);
        throw error;
      }
    },

    async updateAnnouncement(id, data) {
      try {
        const index = this.announcements.findIndex((a) => a.id === id);
        if (index !== -1) {
          this.announcements[index] = { ...this.announcements[index], ...data };
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'annonce:', error);
      }
    },

    async deleteAnnouncement(id) {
      try {
        this.announcements = this.announcements.filter((a) => a.id !== id);
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'annonce:', error);
      }
    }
  },
});
