   <!-- <template>
    <div class="container mt-5">
      <form @submit.prevent="handleAddAnnouncement" class="formulaire form shadow p-4 mb-5 bg-body rounded">
        <h2 class="text-center mb-4">Ajouter une Annonce</h2>
        
        <div class="mb-3">
          <label for="title" class="form-label"><i class="fas fa-heading"></i> Titre de l'annonce :</label>
          <input
            type="text"
            class="form-control"
            v-model="title"
            id="title"
            placeholder="Entrez le titre"
            required
          />
        </div>
  
        <div class="mb-3">
          <label for="price" class="form-label"><i class="fas fa-dollar-sign"></i> Prix :</label>
          <input
            type="number"
            class="form-control"
            v-model="price"
            id="price"
            placeholder="Entrez le prix"
            required
          />
        </div>
  
        <div class="mb-3">
          <label for="category" class="form-label"><i class="fas fa-list-alt"></i> Catégorie :</label>
          <select
            class="form-select"
            v-model="selectedCategory"
            id="category"
            required
          >
            <option value="" disabled>Choisissez une catégorie</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
  
        <div class="mb-3">
          <label for="description" class="form-label"><i class="fas fa-align-left"></i> Description :</label>
          <textarea
            class="form-control"
            v-model="description"
            id="description"
            rows="4"
            placeholder="Décrivez votre annonce"
          ></textarea>
        </div>
  
        <div class="mb-3">
          <label for="picture" class="form-label"><i class="fas fa-picture"></i> Photos :</label>
          <input
            class="form-control"
            type="file"
            id="picture"
            multiple
            @change="handleImageUpload"
          />
          <small class="text-muted">Vous pouvez télécharger plusieurs picture</small>
        </div>
  
        <button type="submit" class="btn btn-primary w-100 mt-3">Ajouter l'annonce</button>
      </form>
    </div>
  </template>

<script setup>
import { useAnnouncementStore } from '../../store/announcementStore';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const store = useAnnouncementStore();

const title = ref('');
const price = ref(0);
const selectedCategory = ref('');
const description = ref('');
const picture = ref([]);
const categories = ref([]);

// Fonction pour charger les catégories
const loadCategories = async () => {
  try {
    await store.fetchCategories();
    categories.value = store.categories;
  } catch (error) {
    console.error("Erreur lors du chargement des catégories :", error);
  }
};

// Charger les catégories lorsque le composant est monté
onMounted(() => {
  loadCategories();
});

const handleImageUpload = (event) => {
  picture.value = Array.from(event.target.files);
};

const handleAddAnnouncement = async () => {
  try {
    await store.createAnnouncement({
      title: title.value,
      price: parseFloat(price.value),
      category_id: parseInt(selectedCategory.value),
      description: description.value,
      pictures: picture.value,
      publish_date: new Date().toISOString(),
    });
    console.log('Annonce ajoutée avec succès');
    router.push('/list-announcement');
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'annonce :", error);
  }
};
</script> -->


  
<!-- <script setup>
import { useAnnouncementStore } from '../../store/announcementStore';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const store = useAnnouncementStore();

const title = ref('');
const price = ref(0);
const selectedCategory = ref('');
const description = ref('');
const picture = ref([]);

const user = JSON.parse(localStorage.getItem('user'));

const handleImageUpload = (event) => {
  picture.value = Array.from(event.target.files);
};

const handleAddAnnouncement = async () => {
  try {
    await store.createAnnouncement({
      title: title.value,
      price: parseFloat(price.value),
      category_id: parseInt(selectedCategory.value),
      description: description.value,
      pictures: picture.value,
      publish_date: new Date().toISOString(),
      user_id: user.id, 
    });
    console.log('Annonce ajoutée avec succès par', user.username);
    router.push('/list-announcement');
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'annonce :", error);
  }
};
</script> -->








<template>
  <div class="container mt-5">
    <form @submit.prevent="handleAddAnnouncement" class="formulaire form shadow p-4 mb-5 bg-body rounded">
      <h2 class="text-center mb-4">Ajouter une Annonce</h2>

      <div class="mb-3">
        <label for="title" class="form-label"><i class="fas fa-heading"></i> Titre de l'annonce :</label>
        <input
          type="text"
          class="form-control"
          v-model="title"
          id="title"
          placeholder="Entrez le titre"
          required
        />
      </div>

      <div class="mb-3">
        <label for="price" class="form-label"><i class="fas fa-dollar-sign"></i> Prix (en MRU) :</label>
        <input
          type="number"
          class="form-control"
          v-model="price"
          id="price"
          placeholder="Entrez le prix en MRU"
          required
        />
      </div>

      <div class="mb-3">
        <label for="category" class="form-label"><i class="fas fa-list-alt"></i> Catégorie :</label>
        <select
          class="form-select"
          v-model="selectedCategory"
          id="category"
          required
        >
          <option value="" disabled>Choisissez une catégorie</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="description" class="form-label"><i class="fas fa-align-left"></i> Description :</label>
        <textarea
          class="form-control"
          v-model="description"
          id="description"
          rows="4"
          placeholder="Décrivez votre annonce"
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="picture" class="form-label"><i class="fas fa-picture"></i> Photos :</label>
        <input
          class="form-control"
          type="file"
          id="picture"
          multiple
          @change="handleImageUpload"
        />
        <small class="text-muted">Vous pouvez télécharger plusieurs picture</small>
      </div>

      <button type="submit" class="btn btn-primary w-100 mt-3">Ajouter l'annonce</button>
    </form>
  </div>
</template>

<script setup>
import { useAnnouncementStore } from '../../store/announcementStore';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const store = useAnnouncementStore();

const title = ref('');
const price = ref(0);
const selectedCategory = ref('');
const description = ref('');
const picture = ref([]);
const categories = ref([]);
// const userId = ref(1); 

const loadCategories = async () => {
  try {
    await store.fetchCategories();
    categories.value = store.categories;
  } catch (error) {
    console.error("Erreur lors du chargement des catégories :", error);
  }
};

onMounted(() => {
  loadCategories();
});

const handleImageUpload = (event) => {
  picture.value = Array.from(event.target.files);
};

const handleAddAnnouncement = async () => {
  try {
    await store.createAnnouncement({
      title: title.value,
      price: parseFloat(price.value),
      category_id: parseInt(selectedCategory.value),
      description: description.value,
      picture: picture.value,
      publish_date: new Date().toISOString(),
      // user_id: userId.value, 
    });
    console.log('Annonce ajoutée avec succès');
    router.push('/list-announcement');
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'annonce :", error);
  }
};
</script>


  
  <style scoped>
  .formulaire {
    max-width: 600px;
    margin: auto;
  }

  .container {
    padding-top: 70px;
  }
  </style>
  