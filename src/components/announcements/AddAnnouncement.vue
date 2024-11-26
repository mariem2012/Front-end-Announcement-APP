<template>
  <div class="container mt-5">
    <form @submit.prevent="handleAddAnnouncement" class="formulaire form shadow p-4 mb-5 bg-body rounded">
      <h2 class="text-center mb-4">Ajouter une Annonce</h2>

      <div class="mb-3">
        <label for="title" class="form-label"><i class="fas fa-heading me-2"></i> Titre de l'annonce :</label>
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
        <label for="price" class="form-label">
           <i class="fas fa-money-bill-alt me-2"></i> Prix (<span style="font-weight: bold;">MRU</span>) :
        </label>        <input
          type="number"
          class="form-control"
          v-model="price"
          id="price"
          placeholder="Entrez le prix en MRU"
          required
        />
      </div>

      <div class="mb-3">
        <label for="category" class="form-label"><i class="fas fa-list-alt me-2"></i> Catégorie :</label>
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
        <label for="description" class="form-label"><i class="fas fa-align-left me-2"></i> Description :</label>
        <textarea
          class="form-control"
          v-model="description"
          id="description"
          rows="4"
          placeholder="Décrivez votre annonce"
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="picture" class="form-label"><i class="fas fa-picture me-2"></i> Photos :</label>
        <input
          class="form-control"
          type="file"
          id="picture"
          multiple
          @change="handleImageUpload"
        />
        <small class="text-muted">Vous pouvez télécharger plusieurs picture</small>
      </div>

      <button type="submit" class="btn w-100 mt-3">Ajouter l'annonce</button>
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
  max-width: 800px;
  margin: auto;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
}

.btn {
  background-color: #004080;
  border: none;
  color: #fff;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #003366;
}

.form-control,
.form-select {
  border-radius: 8px;
  border: 1px solid #ced4da;
  padding: 12px;
}

.form-label {
  font-weight: bold;
  color: #333;
}

.form {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.container {
  padding-top: 60px;
}

.me-2 {
  margin-right: 10px;
  color: #ff8c00;
}
  </style>
  