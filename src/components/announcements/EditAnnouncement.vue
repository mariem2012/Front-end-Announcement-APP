
<template>
  <Navbar />
  <div class="container mt-5">
    <form @submit.prevent="handleEditAnnouncement" class="formulaire form shadow-lg p-5 mb-5 rounded bg-white">
      <h2 class="text-center mb-4 text-dark">Modifier l'Annonce</h2>

      <div class="mb-4">
        <label for="title" class="form-label"><i class="fas fa-heading me-2"></i> Titre de l'annonce :</label>
        <input
          type="text"
          class="form-control form-control-lg"
          v-model="annonce.title"
          id="title"
          placeholder="Entrez le titre"
          required
        />
        <small class="text-danger">{{ errors.title }}</small>
      </div>

      <div class="mb-4">
        <label for="price" class="form-label">
          <i class="fas fa-money-bill-alt me-2"></i> Prix (<span style="font-weight: bold;">MRU</span>) :
        </label>
        <input
          type="number"
          class="form-control form-control-lg"
          v-model.number="annonce.price" 
          step="0.01"
          placeholder="Entrez le prix en MRU"
          required
        />
        <small class="text-danger">{{ errors.price }}</small>
      </div>

      <div class="mb-4">
        <label for="category" class="form-label"><i class="fas fa-list-alt me-2"></i> Catégorie :</label>
        <select
  class="form-select form-select-lg"
  v-model="annonce.category_id"
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
          v-model="annonce.description"
          id="description"
          rows="4"
          placeholder="Décrivez votre annonce"
        ></textarea>
        <small class="text-danger">{{ errors.description }}</small>
      </div>
      <div class="mb-3">
          <label for="images" class="form-label"><i class="fas fa-picture me-2"></i> Photos :</label>
          <input class="form-control" type="file" id="images" multiple @change="handleImageUpload" />
        </div>
        <div v-if="annonce.picture && annonce.picture.length">
  <p>Images actuelles :</p>
  <div class="d-flex flex-wrap">
    <img
      v-for="img in annonce.picture"
      :src="img"
      :alt="'Image' + img"
      :key="img"
      class="m-2"
      width="100"
    />
  </div>
</div>

      

      <button type="submit" class="btn btn-primary btn-lg w-100">Enregistrer les modifications</button>
    </form>
  </div>
</template>


<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useAnnouncementStore } from '../../store/announcementStore';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const store = useAnnouncementStore();
const picture = ref([])
const handleImageUpload = (event) => {
    picture.value = Array.from(event.target.files); // Capturer plusieurs fichiers
  };
const selectedCategory = ref('');

const toast = useToast()
const categories = ref([]);
const announcementId = ref('');
const annonce = ref({
      title : '',
      description : '',
      price : null,
      
      // user_id : user.value,
      category_id : selectedCategory,
      publish_date: new Date().toISOString()
      
  })
const errors = ref({});

const serverErrors = ref([]); 
watch(serverErrors, (newErrors) => {
  errors.value = {}; 
  newErrors.forEach((err) => {
    if (err.path === "title") {
      errors.value.title = err.msg;
    }
    if (err.path === "price") {
      errors.value.price = err.msg;
    }
    if (err.path === "description") {
      errors.value.description = err.msg;
    }
  });
});
console.log(errors.value.title);

const userId = (computed(()=> localStorage.getItem("userId")))

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
  annonce.value = {
    ...fetchedAnnouncement,
    category_id: fetchedAnnouncement.category_id,
    
  };
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
    const formData = new FormData();
    picture.value.forEach((file) => {
      formData.append('upload', file);
    });

    // Téléchargement des images
    const uploadResponse = await axios.post(
      `http://localhost:3500/upload`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (uploadResponse.data.success) {
      // const imageUrls = uploadResponse.data.imageUrl; // Tableau d'URL retourné par le backend
      // console.log(imageUrls);

      const updatedAnnouncement = {
        ...annonce.value,
        picture: uploadResponse.data.imageUrl 
        
        // Ajout du tableau d'images
      };
console.log(updatedAnnouncement);
      // Mise à jour de l'annonce
      await store.updateAnnouncement(announcementId.value, updatedAnnouncement);
      toast.success("Annonce modifiée avec succès");
      router.push(`/profil/${userId.value}`);
    }
  } catch (error) {
    console.error("Erreur lors de la modification de l'annonce :", error);
    if (error.response?.data?.errors) {
      serverErrors.value = error.response.data.errors;
    } else {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
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
