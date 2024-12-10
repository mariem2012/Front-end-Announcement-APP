<template>
  <Navbar />
  <div v-if="annonce" class="announcement-details container">
    <div class="row">
      <!-- Section Images -->
      <div class="col-md-6 mb-4" v-for="( index) in annonce.picture" :key="index">
        <img 
          
          :src="annonce.picture[index]" 
          class="img-fluid rounded shadow main-image" 
          :alt="annonce.title" 
          @click="openModal(annonce.picture[0])"
        />
      </div>
      
      <!-- Section Détails -->
      <div class="col-md-6">
        <h2 class="mb-4">{{ annonce.title }}</h2>
       
        <p> {{ annonce.description }}</p>
        
        <p> {{ formatPrice(annonce.price) }}</p>
        <!-- <p> {{ (annonce.category.value) }}</p> -->
        <small> {{ formatDate(annonce.publish_date) }}</small>
        <!-- Galerie d'images -->
        
        <hr />
        <h5 class="mt-4 mb-4">Contacter l'annonceur :</h5>
        <p><strong><i class="fa fa-user"></i></strong> {{ annonce.user?.name || "N/A" }}</p>
        <p><strong><i class="fa fa-envelope"></i></strong> {{ annonce.user?.email || "N/A" }}</p>
        <p><strong><i class="fa fa-phone"></i></strong> {{ annonce.user?.phone || "N/A" }}</p>
        <p><strong><i class="fa fa-map-marker"></i></strong> {{ annonce.user?.address || "N/A" }}</p>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content">
      <img :src="selectedImage" class="img-fluid" alt="Image en plein écran" />
      <button class="close-button" @click.stop="closeModal">×</button>
    </div>
  </div>

  
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAnnouncementStore } from "../../store/announcementStore";

// Récupérer l'identifiant de l'annonce depuis les paramètres de la route
const route = useRoute();
const id = parseInt(route.params.id);

// Stockage des données de l'annonce
const announcementStore = useAnnouncementStore();
const annonce = ref({});

// État pour le modal
const isModalOpen = ref(false);
const selectedImage = ref(null);

// Fonction appelée lors du montage du composant
onMounted(async () => {
  try {
    // Récupérer les détails de l'annonce depuis le store
    annonce.value = await announcementStore.fetchAnnouncementById(id);
    console.log("Annonce récupérée :", annonce.value);
  } catch (error) {
    console.error("Erreur lors du chargement de l'annonce :", error);
  }
});

// Formatage de la date en français
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Formatage du prix
const formatPrice = (price) => {
  return `${price?.toLocaleString()} MRU` || "N/A";
};

// Ouvrir le modal
const openModal = (image) => {
  selectedImage.value = image;
  isModalOpen.value = true;
};

// Fermer le modal
const closeModal = () => {
  isModalOpen.value = false;
  selectedImage.value = null;
};
</script>
<style scoped>
/* Général */
.announcement-details {
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  padding: 30px;
  margin: 20px auto;
}

h2 {
  color: #FFA500;
  font-weight: bold;
}

p {
  color: #555;
  font-size: 1.1rem;
  line-height: 1.6;
}

p strong {
  color: #333;
}

/* Images principales */
.main-image {
  max-height: 400px;
  width: 100%;
  object-fit: cover;
  /* border: 3px solid #FFA500; */
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Galerie d'images */
.grid-image img {
  height: 150px;
  width: auto;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.main-image:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

}

/* Séparateur */
hr {
  margin: 30px 0;
  border-color: #FFA500;
}

/* Chargement */
.loading-message {
  font-size: 1.4rem;
  color: #777;
  font-style: italic;
  margin-top: 20px;
  text-align: center;
}

/* Style pour le modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.modal-content img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
}
</style>
