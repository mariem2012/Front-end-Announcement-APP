<!-- 

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

</style> -->



<template>
  <div class="container mt-5">
    <h2 class="text-center fw-bold mb-4">Liste des Annonces</h2>

    <!-- Barre de recherche -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="input-group" style="max-width: 400px;">
        <span class="input-group-text" id="search-addon">
          <i class="fas fa-search"></i>
        </span>
        <input
          type="text"
          class="form-control"
          v-model="searchQuery"
          placeholder="Rechercher une annonce..."
          aria-label="Search"
          aria-describedby="search-addon"
        />
      </div>
      <RouterLink to="/add-announcement">
        <button class="btn btn-dark fw-bold">
          <i class="fa-solid fa-plus-circle"></i> Ajouter une Annonce
        </button>
      </RouterLink>
    </div>

    <!-- Liste des annonces -->
    <div class="table-responsive">
      <table class="table table-striped table-bordered border-dark">
        <thead class="table-success">
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Prix (MRU)</th>
            <th>Date de Publication</th>
            <th>Catégorie</th>
            <th>Statut</th>
            
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="announcement in filteredAnnouncements" :key="announcement.id">
            <td>{{ announcement.id }}</td>
            <td>{{ announcement.title }}</td>
            <td>{{ announcement.price }}</td>
            <td>{{ formatDate(announcement.publish_date || new Date()) }}</td>
            <td>{{ getCategoryName(announcement.category_id) }}</td>
            <td>
              <span :class="announcement.status ? 'text-success fw-bold' : 'text-danger fw-bold'">
                {{ announcement.status ? 'Actif' : 'Inactif' }}
              </span>
            </td>
           
            <td class="text-center">
              <button
                @click="viewAnnouncementDetails(announcement)"
                class="btn btn-outline-info btn-sm mx-1"
              >
                <i class="fa-solid fa-eye"></i>
              </button>
              <RouterLink :to="`/edit-announcement/${announcement.id}`" class="btn btn-outline-success btn-sm mx-1">
                <i class="fa-solid fa-pen-to-square"></i>
              </RouterLink>
              <button @click="deleteAnnouncement(announcement.id)" class="btn btn-outline-danger btn-sm mx-1">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal pour afficher les détails d'une annonce -->
    <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-body">
          <h3>Détails de l'Annonce</h3>
          <p><strong>Titre :</strong> {{ selectedAnnouncement.title }}</p>
          <p><strong>Prix :</strong> {{ selectedAnnouncement.price }} MRU</p>
          <p><strong>Date de Publication :</strong> {{ formatDate(selectedAnnouncement.publish_date) }}</p>
          <p><strong>Catégorie :</strong> {{ getCategoryName(selectedAnnouncement.category_id) }}</p>
          <p><strong>Statut :</strong> {{ selectedAnnouncement.status ? 'Actif' : 'Inactif' }}</p>
          <p><strong>Description :</strong> {{ selectedAnnouncement.description }}</p>
        </div>
        <button class="btn btn-danger" @click="closeModal">Fermer</button>
      </div>
    </div>

    <div v-if="filteredAnnouncements.length === 0" class="text-center mt-4">
      <p>Aucune annonce trouvée.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useAnnouncementStore } from "../../store/announcementStore";

const store = useAnnouncementStore();
const announcements = ref([]);
const searchQuery = ref("");

// État pour la modal
const isModalVisible = ref(false);
const selectedAnnouncement = ref(null);

onMounted(() => {
  store.fetchAnnouncements().then(() => {
    announcements.value = store.announcements;
  });
});

const filteredAnnouncements = computed(() =>
  announcements.value.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

function getCategoryName(categoryId) {
  const category = store.categories.find((cat) => cat.id === categoryId);
  return category ? category.name : "Catégorie inconnue";
}

function formatDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  // const year = date.getFullYear();
  // const month = String(date.getMonth() + 1).padStart(2, "0");
  // const day = String(date.getDate()).padStart(2, "0");

  // return `${year}-${month}-${day}`;



  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Afficher la modal avec les détails d'une annonce
const viewAnnouncementDetails = (announcement) => {
  selectedAnnouncement.value = announcement;
  isModalVisible.value = true;
};

// Fermer la modal
const closeModal = () => {
  isModalVisible.value = false;
  selectedAnnouncement.value = null;
};

const deleteAnnouncement = (id) => {
  if (confirm("Voulez-vous vraiment supprimer cette annonce ?")) {
    store.deleteAnnouncement(id);
  }
};
</script>

<style scoped>
.container {
  padding-top: 70px;
}

.input-group-text {
  background-color: #3fb59e;
  color: white;
}

.table-responsive {
  border-radius: 10px;
  overflow: hidden;
}

.table {
  border: 1px solid #dee2e6;
}

.table th,
.table td {
  text-align: center;
  vertical-align: middle;
}

.text-success {
  color: #28a745 !important;
}

.text-danger {
  color: #dc3545 !important;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: left;
}

.modal-body h3 {
  margin-bottom: 20px;
}
</style>

