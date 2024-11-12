<!-- <template>
  <div class="container mt-5">
    <form @submit.prevent="handleEditAnnouncement" class="formulaire form shadow p-4 mb-5 bg-body rounded">
      <h2 class="text-center mb-4">Modifier l'Annonce</h2>

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
        <small class="text-muted">Vous pouvez télécharger plusieurs photos</small>
      </div>

      <button type="submit" class="btn w-100 mt-3">Enregistrer les modifications</button>
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

const title = ref('');
const price = ref(0);
const selectedCategory = ref('');
const description = ref('');
const picture = ref([]);
const categories = ref([]);
const announcementId = ref('');

const loadCategories = async () => {
  try {
    await store.fetchCategories();
    categories.value = store.categories;
  } catch (error) {
    console.error("Erreur lors du chargement des catégories :", error);
  }
};

const loadAnnouncement = async () => {
  try {
    const id = route.params.id;
    announcementId.value = id;
    await store.fetchAnnouncementById(id);

    const fetchedAnnouncement = store.selectedAnnouncement;

    if (fetchedAnnouncement) {
      title.value = fetchedAnnouncement.title;
      price.value = fetchedAnnouncement.price;
      selectedCategory.value = fetchedAnnouncement.category_id;
      description.value = fetchedAnnouncement.description;
      picture.value = fetchedAnnouncement.picture || [];
    } else {
      console.error("Aucune annonce trouvée pour cet ID");
    }
  } catch (error) {
    console.error("Erreur lors du chargement de l'annonce :", error);
  }
};


onMounted(() => {
  loadCategories();
  loadAnnouncement();
});

const handleImageUpload = (event) => {
  picture.value = Array.from(event.target.files);
};

const handleEditAnnouncement = async () => {
  try {
    await store.updateAnnouncement(announcementId.value, {
      title: title.value,
      price: parseFloat(price.value),
      category_id: parseInt(selectedCategory.value),
      description: description.value,
      picture: picture.value,
    });
    console.log('Annonce modifiée avec succès');
    router.push('/list-announcement');
  } catch (error) {
    console.error("Erreur lors de la modification de l'annonce :", error);
  }
};
</script>



<style scoped>
.formulaire {
  max-width: 600px;
  margin: auto;
}

.btn {
  background-color: #FFA500;
}

.container {
  margin-top: 70px;
}
</style> -->


<template>
  <div class="container mt-5">
    <form @submit.prevent="handleEditAnnouncement" class="formulaire form shadow-lg p-5 mb-5 rounded bg-white">
      <h2 class="text-center mb-4 text-dark">Modifier l'Annonce</h2>

      <div class="mb-4">
        <label for="title" class="form-label"><i class="fas fa-heading me-2"></i> Titre de l'annonce :</label>
        <input
          type="text"
          class="form-control form-control-lg"
          v-model="title"
          id="title"
          placeholder="Entrez le titre"
          required
        />
      </div>

      <div class="mb-4">
        <label for="price" class="form-label"><i class="fas fa-dollar-sign me-2"></i> Prix (en MRU) :</label>
        <input
          type="number"
          class="form-control form-control-lg"
          v-model="price"
          id="price"
          placeholder="Entrez le prix en MRU"
          required
        />
      </div>

      <div class="mb-4">
        <label for="category" class="form-label"><i class="fas fa-list-alt me-2"></i> Catégorie :</label>
        <select
          class="form-select form-select-lg"
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

      <div class="mb-4">
        <label for="description" class="form-label"><i class="fas fa-align-left me-2"></i> Description :</label>
        <textarea
          class="form-control form-control-lg"
          v-model="description"
          id="description"
          rows="4"
          placeholder="Décrivez votre annonce"
        ></textarea>
      </div>

      <div class="mb-4">
        <label for="picture" class="form-label"><i class="fas fa-images me-2"></i> Photos :</label>
        <input
          class="form-control form-control-lg"
          type="file"
          id="picture"
          multiple
          @change="handleImageUpload"
        />
        <small class="text-muted">Vous pouvez télécharger plusieurs photos</small>
      </div>

      <button type="submit" class="btn btn-primary btn-lg w-100">Enregistrer les modifications</button>
    </form>
  </div>
</template>

<style scoped>
/* Harmoniser avec la page d'accueil */
.formulaire {
  max-width: 800px;
  margin: auto;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
}

/* Style du bouton */
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

/* Style des champs */
.form-control,
.form-select {
  border-radius: 8px;
  border: 1px solid #ced4da;
  padding: 12px;
}

/* Couleur et style des étiquettes */
.form-label {
  font-weight: bold;
  color: #333;
}

/* Ombre pour correspondre aux cartes d'annonces */
.form {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

/* Espacement et animation */
.container {
  padding-top: 60px;
}

.me-2 {
  margin-right: 10px;
  color: #ff8c00;
}
</style>
