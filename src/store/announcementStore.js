// import { defineStore } from 'pinia';

// export const useAnnouncementStore = defineStore('announcementStore', {
//   state: () => ({
//     announcements: [], // Liste des announcements
//   }),
//   actions: {
//     fetchAnnouncements() {
//       // Simulez l'appel d'une API ici
//       this.announcements = [
//         { id: 1, title: 'Annonce 1', category: 'Catégorie 1' },
//         { id: 2, title: 'Annonce 2', category: 'Catégorie 2' },
//       ];
//     },
//     addAnnouncement(newAnnouncement) {
//       this.announcements.push(newAnnouncement);
//     },
//   },
// });

// stores/announcementStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAnnouncementStore = defineStore('announcementStore', () => {
  const announcements = ref([]);

  const fetchAnnouncement = async () => {
    try {
      const response = await axios.get('/api/announcements');
      announcements.value = response.data;
    } catch (error) {
      console.error('Erreur lors du chargement des annonces :', error);
    }
  };

  const AddAnnouncement = (annonce) => {
    announcements.value.push(annonce);
  };

  const getAnnoncementById = (id) => {
    return announcements.value.find(annonce => annonce.id === id);
  };

  return { announcements, fetchAnnouncement, AddAnnouncement, getAnnoncementById };
});






