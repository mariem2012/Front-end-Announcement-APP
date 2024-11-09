<!-- 


<template>
  <div class="container mt-5">
    <RouterLink to="/add-announcement">
      <button class="btn btn-primary my-4">Ajouter une Annonce</button>
    </RouterLink>

    <div class="row">
      <div v-for="announcement in announcements" :key="announcement.id" class="col-md-4 mb-4">
        <div class="card shadow-sm">
          <img v-if="announcement.pictures.length" :src="announcement.pictures[0]" class="card-img-top" alt="Image de l'annonce">
          <div class="card-body">
            <h5 class="card-title">{{ announcement.title }}</h5>
            <p class="card-text">{{ announcement.description }}</p>
            <p><strong>Prix:</strong> {{ announcement.price }}€</p>
            <p><strong>Date de publication:</strong> {{ announcement.publication_date }}</p>
            <p><strong>Statut:</strong> {{ announcement.status ? 'Actif' : 'Inactif' }}</p>
            <p><strong>Catégorie:</strong> {{ announcement.category_id }}</p>
            <p><strong>Utilisateur:</strong> {{ announcement.user.name }}</p>
            <RouterLink :to="`/edit-announcement/${announcement.id}`">
              <button class="btn btn-success btn-sm">Modifier</button>
            </RouterLink>
            <button class="btn btn-danger btn-sm" @click="deleteAnnouncement(announcement.id)">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAnnouncementStore } from '../../store/announcementStore';

const store = useAnnouncementStore();
const announcements = store.announcements;

onMounted(() => {
  store.fetchAnnouncements(); // Récupérer les annonces simulées de l'utilisateur
});

const deleteAnnouncement = (id) => {
  if (confirm('Voulez-vous vraiment supprimer cette annonce ?')) {
    store.deleteAnnouncement(id);
  }
};
</script> -->


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
              <li><strong>Prix:</strong> {{ announcement.price }} €</li>
              <li><strong>Date de publication:</strong> {{ formatDate(announcement.publication_date) }}</li>
              <li><strong>Catégorie:</strong> {{ getCategoryName(announcement.category_id) }}</li>
              <li><strong>Statut:</strong> {{ announcement.status ? 'Actif' : 'Inactif' }}</li>
              <li><strong>Utilisateur:</strong> {{ announcement.user?.name }}</li>
            </ul>

            <p class="card-text">{{ announcement.description }}</p>

            <div class="mt-auto d-flex justify-content-between">
              <RouterLink :to="`/edit-announcement/${announcement.id}`" class="btn btn-success btn-sm">
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

    <!-- Message lorsque la liste est vide -->
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

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
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
  /* background-color: #FFA500; */
  /* color: #1b639e; */

}

.btn {
  width: 100px;
    /* background-color: #1b639e; */

}

</style>
