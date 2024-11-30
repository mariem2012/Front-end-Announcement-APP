<template>
    <Navbar />
    <div class="container mt-5">
      <h2 class="text-center fw-bold mb-4">Consultez les Annonces</h2>
  
      <!-- Barre de recherche -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          class="form-control"
          v-model="searchQuery"
          placeholder="Rechercher une annonce par titre ou catégorie..."
          style="max-width: 400px;"
        />
      </div>
  
      <!-- Liste des annonces -->
      <div class="row">
        <div
          v-for="announcement in filteredAnnouncements"
          :key="announcement.id"
          class="col-md-6 col-lg-4 mb-4"
        >
          <div class="card shadow-sm h-100">
            <img
              v-if="announcement.pictures && announcement.pictures.length"
              :src="announcement.pictures[0]"
              class="card-img-top"
              alt="Image de l'annonce"
            />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ announcement.title }}</h5>
              <p class="card-text text-muted">{{ announcement.description }}</p>
              <ul class="list-unstyled mb-3">
                <li><strong>Prix:</strong> {{ announcement.price }} MRU</li>
                <li>
                  <strong>Catégorie:</strong> {{ getCategoryName(announcement.category_id) }}
                </li>
                <li>
                  <strong>Date:</strong> {{ formatDate(announcement.publish_date || new Date()) }}
                </li>
              </ul>
              <button
                class="btn btn-primary mt-auto"
                @click="viewAnnouncementDetails(announcement)"
              >
                Voir Détails
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal pour afficher les détails -->
      <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <h4>{{ selectedAnnouncement.title }}</h4>
          <p><strong>Prix:</strong> {{ selectedAnnouncement.price }} MRU</p>
          <p>
            <strong>Catégorie:</strong>
            {{ getCategoryName(selectedAnnouncement.category_id) }}
          </p>
          <p>
            <strong>Date de publication:</strong>
            {{ formatDate(selectedAnnouncement.publish_date) }}
          </p>
          <p><strong>Description:</strong> {{ selectedAnnouncement.description }}</p>
          <button class="btn btn-danger mt-3" @click="closeModal">Fermer</button>
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
  
  // État pour la modale
  const isModalVisible = ref(false);
  const selectedAnnouncement = ref(null);
  
  onMounted(() => {
    store.fetchAnnouncements().then(() => {
      announcements.value = store.announcements;
    });
  });
  
  const filteredAnnouncements = computed(() =>
    announcements.value.filter((announcement) => {
      const query = searchQuery.value.toLowerCase();
      return (
        announcement.title.toLowerCase().includes(query) ||
        getCategoryName(announcement.category_id).toLowerCase().includes(query)
      );
    })
  );
  
  function getCategoryName(categoryId) {
    const category = store.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Catégorie inconnue";
  }
  
  function formatDate(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return date.toLocaleDateString();
  }
  
  function viewAnnouncementDetails(announcement) {
    selectedAnnouncement.value = announcement;
    isModalVisible.value = true;
  }
  
  function closeModal() {
    isModalVisible.value = false;
    selectedAnnouncement.value = null;
  }
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
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
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
    border-radius: 10px;
    max-width: 500px;
    text-align: left;
  }
  
  .modal-content h4 {
    margin-bottom: 15px;
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .text-center {
    margin-top: 20px;
  }
  </style>
  