<!-- <template>
  <Navbar />
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
        <small class="text-danger">{{ errors.title }}</small>
      </div>

      <div class="mb-3">
        <label for="price" class="form-label">
           <i class="fas fa-money-bill-alt me-2"></i> Prix (<span style="font-weight: bold;">MRU</span>) :
        </label>        <input
          type="number"
          class="form-control"
          v-model.number="price" 
          step="0.01"
          placeholder="Entrez le prix en MRU"
          required
        />
        <small class="text-danger">{{ errors.price }}</small>
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
        <small class="text-danger">{{ errors.description }}</small>
      </div>

    

      <button type="submit" class="btn w-100 mt-3">Ajouter l'annonce</button>
    </form>
  </div>
</template>

<script setup>
import { useAnnouncementStore } from '../../store/announcementStore';
import { useRouter } from 'vue-router';
import {computed, ref, watch} from 'vue';
import { onMounted } from 'vue';
import { useToast } from 'vue-toastification'


const toast = useToast();

const router = useRouter();
const store = useAnnouncementStore();

const title = ref('');
const price = ref(0);
const selectedCategory = ref('');
const description = ref('');
const user_id = ref(null)
const categories = ref([]);
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


const loadCategories = async () => {
  try {
    await store.fetchCategories();
    categories.value = store.categories;
  } catch (error) {
    console.error("Erreur lors du chargement des catégories :", error);
  }
};

const userId = (computed(()=> localStorage.getItem("userId")))

onMounted(() => {
  loadCategories();
});



const handleAddAnnouncement = async () => {
  try {
    await store.createAnnouncement({
      title: title.value,
      price: parseFloat(price.value),
      category_id: parseInt(selectedCategory.value),
      description: description.value,
      publish_date: new Date().toISOString(),
    });
    toast.success('Annonce ajoutée avec succès');
    router.push(`/profil/${userId.value}`);
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'annonce :", error);
    if (error.response && error.response.data.errors) {
      serverErrors.value = error.response.data.errors;
    } else {
      toast.error(
        'Erreur lors de l\'ajout de l\'annonce. Veuillez réessayer.'
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
   -->


   <template>
    <Navbar />
    <div class="container mt-5">
      <form @submit.prevent="handleAddAnnouncement" class="formulaire form shadow p-4 mb-5 bg-body rounded">
        <h2 class="text-center mb-4">Ajouter une Annonce</h2>
  
        <div class="mb-3">
          <label for="title" class="form-label"><i class="fas fa-heading me-2"></i> Titre de l'annonce :</label>
          <input type="text" class="form-control" v-model="annonce.title" id="title" placeholder="Entrez le titre" required />
          <small class="text-danger">{{ errors.title }}</small>
        </div>
  
        <div class="mb-3">
          <label for="price" class="form-label">
             <i class="fas fa-money-bill-alt me-2"></i> Prix (<span style="font-weight: bold;">MRU</span>) :
          </label>        
          <input type="number" class="form-control" v-model.number="annonce.price" step="0.01" placeholder="Entrez le prix en MRU" required />
          <small class="text-danger">{{ errors.price }}</small>
        </div>
  
        <div class="mb-3">
          <label for="category" class="form-label"><i class="fas fa-list-alt me-2"></i> Catégorie :</label>
          <select class="form-select" v-model="selectedCategory" id="category" required>
            <option value="" disabled>Choisissez une catégorie</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
        </div>
  
        <div class="mb-3">
          <label for="description" class="form-label"><i class="fas fa-align-left me-2"></i> Description :</label>
          <textarea class="form-control" v-model="annonce.description" id="description" rows="4" placeholder="Décrivez votre annonce"></textarea>
          <small class="text-danger">{{ errors.description }}</small>
        </div>
  
        <div class="mb-3">
          <label for="images" class="form-label"><i class="fas fa-picture me-2"></i> Photos :</label>
          <input class="form-control" type="file" id="images" multiple @change="handleImageUpload" />
        </div>
  
        <button type="submit" class="btn w-100 mt-3">Ajouter l'annonce</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { useAnnouncementStore } from '../../store/announcementStore';
  import { useRouter } from 'vue-router';
  import { computed, ref, watch, onMounted } from 'vue';
  import { useToast } from 'vue-toastification';
  import axios from 'axios';
   const picture = ref([])
  const selectedCategory = ref('');

  const toast = useToast();
  const router = useRouter();
  const store = useAnnouncementStore();
  //  const user = ref(parseInt(route.params.id) )
  const annonce = ref({
      title : '',
      description : '',
      price : null,
      
      // user_id : user.value,
      category_id : selectedCategory,
      publish_date: new Date().toISOString()
      
  })

  
  const categories = ref([]);
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
  
  const userId = computed(() => localStorage.getItem("userId"));
  console.log(userId);
  
  onMounted(() => {
    loadCategories();
  });
  
  const loadCategories = async () => {
    try {
      await store.fetchCategories();
      categories.value = store.categories;
    } catch (error) {
      console.error("Erreur lors du chargement des catégories :", error);
    }
  };
  
  // Capture image files
  const handleImageUpload = (event) => {
    picture.value = Array.from(event.target.files); // Capturer plusieurs fichiers
  };
  
  const handleAddAnnouncement = async () => {
  try {
    const formData = new FormData();

    // Ajouter chaque fichier séparément à FormData
    picture.value.forEach((file, index) => {
      formData.append('upload', file); // 'upload' doit correspondre au champ attendu dans le backend
    });

    // Envoyer la requête au backend
    const uploadResponse = await axios.post(
      `http://localhost:3500/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (uploadResponse.data.success) {
      const newAnnouce = {
        ...annonce.value,
        picture: uploadResponse.data.imageUrl, // Utilisation de l'URL retournée par le backend
      };
      await store.createAnnouncement(newAnnouce);

      toast.success('Annonce ajoutée avec succès');
      router.push(`/profil/${userId.value}`);
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'annonce :", error);
    if (error.response && error.response.data.errors) {
      serverErrors.value = error.response.data.errors;
    } else {
      toast.error('Erreur lors de l\'ajout de l\'annonce. Veuillez réessayer.');
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