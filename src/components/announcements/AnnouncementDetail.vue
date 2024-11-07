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
  import { useAnnouncementStore } from '../../store/announcementStore';
  
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
  </style>
   -->

   <template>
    <div class="container my-5">
      <h2>{{ annonce.title }}</h2>
      <img :src="annonce.image || 'default-image.jpg'" alt="Image Annonce" class="img-fluid" />
      <p><strong>Catégorie :</strong> {{ annonce.category }}</p>
      <p><strong>Description :</strong> {{ annonce.description }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const annonce = ref(null);
  
  // Exemple de données pour démonstration
  const annonceData = [
    { id: 1, title: "Offre d'emploi", category: "Emploi", description: "Description de l'emploi" },
    { id: 2, title: "Maison à vendre", category: "Immobilier", description: "Description de la maison" },
  ];
  
  onMounted(() => {
    const id = parseInt(route.params.id);
    annonce.value = annonceData.find(item => item.id === id) || { title: 'Annonce introuvable' };
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  </style>
  