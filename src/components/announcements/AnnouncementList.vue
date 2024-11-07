

<template>
  <div class="announcement-list">
    <h2>Annonces récentes</h2>
    <div class="row">
      <div v-for="announcement in announcements" :key="announcement.id" class="col-md-4 mb-4">
        <div class="card">
          <img :src="announcement.imageUrl" class="card-img-top" alt="image d'annonce" />
          <div class="card-body">
            <h5 class="card-title">{{ announcement.title }}</h5>
            <p class="card-text">{{ announcement.description }}</p>
            <p><strong>Catégorie:</strong> {{ announcement.category.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../api.js'; 

const announcements = ref([]);

// Récupère les annonces lors du montage du composant
const fetchAnnouncements = async () => {
  try {
    const response = await api.get('/announcements'); // Appel à /api/announcements
    announcements.value = response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des annonces:', error);
  }
};

onMounted(fetchAnnouncements);
</script>

<style scoped>
.announcement-list {
  padding: 20px;
}
.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>

  


   <!-- <template>
    <div class="container mt-5">
      <div v-if="loading" class="text-center">Chargement de l'annonce...</div>
      <div v-else-if="announcement">
        <h2>{{ announcement.title }}</h2>
        <p><strong>Description:</strong> {{ announcement.description }}</p>
        <p><strong>Prix:</strong> {{ announcement.price }}€</p>
        <p><strong>Date de publication:</strong> {{ announcement.publication_date }}</p>
        <div v-if="announcement.pictures.length">
          <h4>Images :</h4>
          <img v-for="picture in announcement.pictures" :src="`@/assets/images/${picture}`" :alt="announcement.title" :key="picture" class="announcement-img" />
        </div>
        <router-link to="/">Retour à l'accueil</router-link>
      </div>
      <div v-else>
        <p>Annonce non trouvée.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAnnouncementStore } from '@/store/announcementStore';
  
  const route = useRoute();
  const store = useAnnouncementStore();
  const { announcement, loading, fetchAnnouncement } = store;
  
  // Charger l'annonce lors du montage du composant
  onMounted(() => {
    const id = parseInt(route.params.id);
    fetchAnnouncement(id);
  });
  </script>
  
  <style scoped>
  .announcement-img {
    width: 100%;
    height: auto;
    margin-top: 10px;
    border-radius: 5px;
  }
  </style> -->
  