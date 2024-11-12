

<template>
  <div class="container mt-5">
    <RouterLink to="/add-announcement">
      <button class="btn btn-dark my-4">Ajouter une Annonce</button>
    </RouterLink>

    <div v-if="announcements.length" class="row">
      <div v-for="announcement in announcements" :key="announcement.id" class="col-md-6 col-lg-4 mb-4">
        <div class="card shadow-sm h-100">
          <img
            v-if="announcement.pictures && announcement.pictures.length"
            :src="announcement.pictures[0]"
            class="card-img-top"
            alt="Image de l'annonce"
          />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ announcement.title }}</h5>
            
            <ul class="list-unstyled mb-3">
              <li><strong>Prix:</strong> {{ announcement.price }} MRU</li>
              <li><strong>Date de publication :</strong> {{ formatDate(announcement.publish_date || new Date()) }}</li>
              <li><strong>Catégorie:</strong> {{ getCategoryName(announcement.category_id) }}</li>
              <li><strong>Statut:</strong> {{ announcement.status ? 'Actif' : 'Inactif' }}</li>
              <!-- <li><strong>Utilisateur:</strong> {{ announcement.user?.name }}</li> -->
            </ul>

            <p class="card-text">{{ announcement.description }}</p>

            <div class="mt-auto d-flex justify-content-between">
              <RouterLink :to="`/edit-annoncement/${announcement.id}`" class="btn btn-success btn-sm">
                Modifier
              </RouterLink>
              <button @click="deleteAnnouncement(announcement.id)" class="btn btn-dark btn-sm">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center">
      <p>Aucune annonce disponible pour le moment.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useAnnouncementStore } from '../../store/announcementStore';

const store = useAnnouncementStore();
const announcements = computed(() => store.announcements);
const categories = computed(() => store.categories);

onMounted(() => {
  store.fetchAnnouncements();
  store.fetchCategories();
});

function getCategoryName(categoryId) {
  const category = categories.value.find(cat => cat.id === categoryId);
  return category ? category.name : 'Catégorie inconnue';
}

function formatDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}



const deleteAnnouncement = (id) => {
  if (confirm('Voulez-vous vraiment supprimer cette annonce ?')) {
    store.deleteAnnouncement(id);
  }
};
</script> 


<style scoped>

.container {
  padding-top: 70px;
}

.card-img-top {
  max-height: 200px;
  object-fit: cover;
}

.card {
  border-radius: 10px;
}

.card-body {
  display: flex;
  flex-direction: column;
  box-shadow: 0 6px 10px rgba(183, 155, 16, 0.15);

  
}

.btn {
  width: 100px;
}

</style>
