
import { defineStore } from 'pinia';
import api from '../api.js'; 

export const useAnnouncementStore = defineStore('announcementStore', {
  state: () => ({
    announcements: [],
    selectedAnnouncement: null,
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

    // async fetchAnnouncementById(id) {
    //   try {
    //     const response = await api.get(`/announcements/${id}`);
    //     this.selectedAnnouncement = response.data;
    //   } catch (error) {
    //     console.error("Erreur lors de la récupération de l'annonce:", error);
    //   }
    // },


    async fetchAnnouncementById(id) {
      try {
        const response = await api.get(`/announcements/${id}`);
        // Vérification que l'annonce est bien retournée
        if (response && response.data) {
          this.selectedAnnouncement = response.data;
        } else {
          console.error("Aucune donnée d'annonce reçue.");
          this.selectedAnnouncement = null; // Mettre à null en cas de données vides
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'annonce:", error);
        this.selectedAnnouncement = null; // En cas d'erreur, vider selectedAnnouncement
      }
    },
    

    async createAnnouncement(data) {
      try {
        const response = await api.post('/announcements', data);
        this.announcements.push(response.data);
      } catch (error) {
        console.error("Erreur lors de la création de l'annonce:", error);
      }
    },

    async updateAnnouncement(id, data) {
      try {
        const response = await api.put(`/announcements/${id}`, data);
        const index = this.announcements.findIndex(a => a.id === id);
        if (index !== -1) this.announcements[index] = response.data;
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'annonce:", error);
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



// import { defineStore } from 'pinia';
// import api from '../api.js'; 

// export const useAnnouncementStore = defineStore('announcementStore', {
//   state: () => ({
//     announcements: [],
//     categories: [],  
//     users: [],
//   }),

//   actions: {
//     async fetchAnnouncements() {
//       try {
//         const response = await api.get('/announcements');
//         if (response.data && Array.isArray(response.data)) {
//           this.announcements = response.data;
//           console.log('Données récupérées:', this.announcements);
//         } else {
//           console.error('Réponse inattendue de l\'API:', response.data);
//         }
//       } catch (error) {
//         console.error('Erreur lors de la récupération des annonces:', error.message);
//         throw error;
//       }
//     },

//     async fetchCategories() {
//       try {
//         const response = await api.get('/categories'); 
//         if (response.data && Array.isArray(response.data)) {
//           this.categories = response.data;
//         } else {
//           console.error('Réponse inattendue de l\'API (categories):', response.data);
//         }
//       } catch (error) {
//         console.error('Erreur lors de la récupération des catégories:', error.message);
//       }
//     },


//     async createAnnouncement(announcementData) {
//       try {
//         console.log("Sending announcement data:", announcementData); 
    
//         const response = await api.post('/announcements', announcementData);
//         this.announcements.push(response.data);
//         console.log("Announcement added successfully", response.data);
//       } catch (error) {
//         console.error("Erreur lors de l'ajout d'une annonce:", error.response ? error.response.data : error);
//         throw error;
//       }
//     },

//     async updateAnnouncement(id, data) {
//       try {
//         const index = this.announcements.findIndex((a) => a.id === id);
//         if (index !== -1) {
//           this.announcements[index] = { ...this.announcements[index], ...data };
//         }
//       } catch (error) {
//         console.error('Erreur lors de la mise à jour de l\'annonce:', error);
//       }
//     },

//     async deleteAnnouncement(id) {
//       try {
//         this.announcements = this.announcements.filter((a) => a.id !== id);
//       } catch (error) {
//         console.error('Erreur lors de la suppression de l\'annonce:', error);
//       }
//     }
//   },
// });


// import { defineStore } from 'pinia';
// import api from '../api.js';
// import { getUser } from '../userService.js';

// export const useAnnouncementStore = defineStore('announcementStore', {
//   state: () => ({
//     announcements: [],
//     categories: [],
//     currentUser: getUser() || null, // Utiliser l'utilisateur du `userService`
//   }),

//   actions: {
//     async fetchAnnouncements() {
//       try {
//         const response = await api.get('/announcements');
//         if (response.data && Array.isArray(response.data)) {
//           this.announcements = response.data;
//           console.log('Données récupérées:', this.announcements);
//         } else {
//           console.error('Réponse inattendue de l\'API:', response.data);
//         }
//       } catch (error) {
//         console.error('Erreur lors de la récupération des annonces:', error.message);
//         throw error;
//       }
//     },

//     async fetchCategories() {
//       try {
//         const response = await api.get('/categories');
//         if (response.data && Array.isArray(response.data)) {
//           this.categories = response.data;
//         } else {
//           console.error('Réponse inattendue de l\'API (categories):', response.data);
//         }
//       } catch (error) {
//         console.error('Erreur lors de la récupération des catégories:', error.message);
//       }
//     },

//     async createAnnouncement(announcementData) {
//       try {
//         const user = getUser(); // Récupérer l'utilisateur connecté
//         if (!user) {
//           throw new Error('Utilisateur non connecté');
//         }

//         const announcement = {
//           ...announcementData,
//           user_id: user.id, // Ajouter l'ID de l'utilisateur
//         };

//         console.log("Envoi des données de l'annonce:", announcement);

//         const response = await api.post('/announcements', announcement);
//         this.announcements.push(response.data);
//         console.log("Annonce ajoutée avec succès", response.data);
//       } catch (error) {
//         console.error("Erreur lors de l'ajout d'une annonce:", error.response ? error.response.data : error);
//         throw error;
//       }
//     },

//     async updateAnnouncement(id, data) {
//       try {
//         const index = this.announcements.findIndex((a) => a.id === id);
//         if (index !== -1) {
//           this.announcements[index] = { ...this.announcements[index], ...data };
//         }
//       } catch (error) {
//         console.error('Erreur lors de la mise à jour de l\'annonce:', error);
//       }
//     },

//     async deleteAnnouncement(id) {
//       try {
//         this.announcements = this.announcements.filter((a) => a.id !== id);
//       } catch (error) {
//         console.error('Erreur lors de la suppression de l\'annonce:', error);
//       }
//     },
//   },
// });

