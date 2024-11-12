<template>
  <div class="container mt-5">
    <form @submit.prevent="handleEditAnnouncement" class="formulaire form shadow p-4 mb-5 bg-body rounded">
      <h2 class="text-center mb-4">Modifier l'Annonce</h2>
      
      <div class="mb-3">
        <label for="title" class="form-label">Titre de l'annonce :</label>
        <input type="text" id="title" v-model="announcement.title" class="form-control" required>
      </div>

      <div class="mb-3">
        <label for="price" class="form-label">Prix :</label>
        <input type="number" id="price" v-model="announcement.price" class="form-control" required>
      </div>

      <div class="mb-3">
        <label for="category" class="form-label">Catégorie :</label>
        <select id="category" v-model="announcement.category_id" class="form-select" required>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description :</label>
        <textarea id="description" v-model="announcement.description" class="form-control" rows="4"></textarea>
      </div>

      <button type="submit" class="btn btn-primary w-100 mt-3">Enregistrer les modifications</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAnnouncementStore } from '../../store/announcementStore';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const store = useAnnouncementStore();

const announcement = ref({
  title: '',
  price: 0,
  category_id: '',
  description: '',
});

onMounted(async () => {
  const id = route.params.id;
  const fetchedAnnouncement = await store.fetchAnnouncementById(id);
  if (fetchedAnnouncement) {
    announcement.value = fetchedAnnouncement;
  }
});

const handleEditAnnouncement = async () => {
  await store.updateAnnouncement(announcement.value.id, announcement.value);
  router.push('/list-announcement');
};
</script>


<!-- <script setup>
import { ref, onMounted } from 'vue';
import { useAnnouncementStore } from '../../store/announcementStore';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const store = useAnnouncementStore();

const announcement = ref({
  title: '',
  price: 0,
  category_id: '',
  description: '',
});

const categories = ref([]);

onMounted(async () => {
  const id = route.params.id;
  const fetchedAnnouncement = await store.fetchAnnouncementById(id);
  if (fetchedAnnouncement) {
    announcement.value = fetchedAnnouncement;
  }
  categories.value = await store.fetchCategories();
});

const handleEditAnnouncement = async () => {
  await store.updateAnnouncement(announcement.value.id, announcement.value);
  router.push('/list-announcement');
};
</script> -->

<style scoped>
.formulaire {
  max-width: 600px;
  margin: auto;
}
</style>
