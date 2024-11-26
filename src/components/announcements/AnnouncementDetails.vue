<template>
  <div v-if="Object.keys(annonce.value).length > 0" class="row">
    <div class="col-md-6">
      <img v-if="annonce.value.image" :src="annonce.value.image" class="img-fluid rounded shadow" :alt="annonce.value.title" />
    </div>

    <div class="col-md-6">
      <h2 class="mb-4">{{ annonce.value.title }}</h2>
      <p class="text-muted"><strong>Catégorie :</strong> {{ annonce.value.category }}</p>
      <p><strong>Description :</strong> {{ annonce.value.description }}</p>
      <p><strong>Date de publication :</strong> {{ formatDate(annonce.value.publishedAt) }}</p>
      <p><strong>Prix :</strong> {{ formatPrice(annonce.value.price) }}</p>
      <p><strong>Statut :</strong> {{ annonce.value.status }}</p>
      <hr />
      <h5>Informations sur l'utilisateur</h5>
      <p><strong>Nom :</strong> {{ annonce.value.user?.name || "N/A" }}</p>
      <p><strong>Email :</strong> {{ annonce.value.user?.email || "N/A" }}</p>
      <p><strong>Téléphone :</strong> {{ annonce.value.user?.phone || "N/A" }}</p>
    </div>
  </div>
  <div v-else>
    <p class="text-center">Chargement des détails de l'annonce...</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useAnnouncementStore } from "../../store/announcementStore";

const route = useRoute();
const id = parseInt(route.params.id, 10);

const announcementStore = useAnnouncementStore();
const annonce = ref({}); 

onMounted(async () => {
  try {
    annonce.value = await announcementStore.fetchAnnouncementById(id);
    console.log("Annonce récupérée :", annonce.value); 
  } catch (error) {
    console.error("Erreur lors du chargement de l'annonce :", error);
  }
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatPrice = (price) => {
  return `${price?.toLocaleString()} MRU` || "N/A";
};
</script>

<style scoped>
.announcement-details {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.img-fluid {
  max-height: 400px;
  object-fit: cover;
}

h2 {
  color: #333;
}

p {
  color: #555;
  font-size: 1rem;
}

hr {
  margin: 20px 0;
  border-color: #ff6600;
}

.text-center {
  font-size: 1.2rem;
  color: #555;
}
</style>
