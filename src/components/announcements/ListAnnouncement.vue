

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

<!-- <template>
  <div class="container">
    <h2 class="text-center mb-4">Liste des Annonces</h2>

    <div class="mb-3 d-flex justify-content-between">
      <select v-model="filterCategory" class="form-select w-25">
        <option value="">Toutes les catégories</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>

      <div class="w-50">
        <input
          type="number"
          v-model="minPrice"
          placeholder="Prix minimum"
          class="form-control d-inline-block w-45 me-2"
        />
        <input
          type="number"
          v-model="maxPrice"
          placeholder="Prix maximum"
          class="form-control d-inline-block w-45"
        />
      </div>
    </div>

    <ul class="list-group">
      <li v-for="announcement in filteredAnnouncements" :key="announcement.id" class="list-group-item">
        <h5>{{ announcement.title }}</h5>
        <p>{{ announcement.description }}</p>
        <p>Prix : {{ announcement.price }} €</p>
        <p>Catégorie : {{ getCategoryName(announcement.category_id) }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAnnouncementStore } from '../../store/announcementStore';

const store = useAnnouncementStore();

const filterCategory = ref('');
const minPrice = ref('');
const maxPrice = ref('');

const categories = ref(store.categories);
const announcements = ref(store.announcements);

const getCategoryName = (categoryId) => {
  const category = categories.value.find(cat => cat.id === categoryId);
  return category ? category.name : 'Inconnue';
};

const filteredAnnouncements = computed(() => {
  return announcements.value.filter((announcement) => {
    const matchesCategory = filterCategory.value
      ? announcement.category_id === parseInt(filterCategory.value)
      : true;

    const matchesMinPrice = minPrice.value ? announcement.price >= parseFloat(minPrice.value) : true;
    const matchesMaxPrice = maxPrice.value ? announcement.price <= parseFloat(maxPrice.value) : true;

    return matchesCategory && matchesMinPrice && matchesMaxPrice;
  });
});
</script> -->




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
