
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
        <label for="price" class="form-label">
          <i class="fas fa-money-bill-alt me-2"></i> Prix (<span style="font-weight: bold;">MRU</span>) :
        </label>
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

      

      <button type="submit" class="btn btn-primary btn-lg w-100">Enregistrer les modifications</button>
    </form>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useAnnouncementStore } from '../../store/announcementStore';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const route = useRoute();
const router = useRouter();
const store = useAnnouncementStore();

const title = ref('');
const price = ref(0);
const selectedCategory = ref('');
const description = ref('');
const toast = useToast()
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



const handleEditAnnouncement = async () => {
  try {
    await store.updateAnnouncement(announcementId.value, {
      title: title.value,
      price: parseFloat(price.value),
      category_id: parseInt(selectedCategory.value),
      description: description.value,
      
    });
    toast.success('Annonce modifiée avec succès');
    router.push('/list-announcement');
  } catch (error) {
    console.error("Erreur lors de la modification de l'annonce :", error);
    if (error.errors) {
      //serverErrors.value = error.errors;  Affichez les erreurs serveur
    } else {
      toast.error(
        error.error || 'Une erreur est survenue. Veuillez réessayer.'
      );
    }
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
