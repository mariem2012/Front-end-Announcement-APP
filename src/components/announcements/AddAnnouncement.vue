<!-- <template>
    <div class="container mt-5">
      <h2>Publier une nouvelle annonce</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="title" class="form-label">Titre</label>
          <input type="text" id="title" v-model="newAnnouncement.title" class="form-control" required>
        </div>
  
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea id="description" v-model="newAnnouncement.description" class="form-control" rows="4" required></textarea>
        </div>
  
        <div class="mb-3">
          <label for="price" class="form-label">Prix</label>
          <input type="number" id="price" v-model="newAnnouncement.price" class="form-control" required>
        </div>
  
        <div class="mb-3">
          <label for="publication_date" class="form-label">Date de publication</label>
          <input type="date" id="publication_date" v-model="newAnnouncement.publication_date" class="form-control" required>
        </div>
  
        <div class="mb-3">
          <label for="pictures" class="form-label">Images (URL)</label>
          <input type="text" id="pictures" v-model="newAnnouncement.pictures" placeholder="Entrez l'URL d'une image" class="form-control">
        </div>
  
        <button type="submit" class="btn btn-primary">Publier l'annonce</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAnnouncementStore } from '../../store/announcementStore';
  
  const store = useAnnouncementStore();
  const { createAnnouncement } = store;

  const newAnnouncement = ref({
    title: '',
    description: '',
    price: 0,
    publication_date: new Date().toISOString().split('T')[0],
    pictures: '' 
  });
  
  function handleSubmit() {
    createAnnouncement({ ...newAnnouncement.value });
  
    newAnnouncement.value = {
      title: '',
      description: '',
      price: 0,
      publication_date: new Date().toISOString().split('T')[0],
      pictures: ''
    };
    
    alert('Annonce ajoutée avec succès !');
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin-top: 30px;
  }
  </style>
   -->

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
          <label for="images" class="form-label"><i class="fas fa-images"></i> Photos :</label>
          <input
            class="form-control"
            type="file"
            id="images"
            multiple
            @change="handleImageUpload"
          />
          <small class="text-muted">Vous pouvez télécharger plusieurs images</small>
        </div>
  
        <button type="submit" class="btn btn-primary w-100 mt-3">Ajouter l'annonce</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { useAnnouncementStore } from '../../store/announcementStore';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

  const router = useRouter();
  const store = useAnnouncementStore();

  const title = ref('');
  const price = ref(0);
  const selectedCategory = ref('');
  const description = ref('');
  const images = ref([]);
  
  const categories = ref([
    { id: 1, name: 'Immobilier' },
    { id: 2, name: 'Véhicules' },
    { id: 3, name: 'Électronique' },
  ]);
  
  
  const handleImageUpload = (event) => {
    images.value = Array.from(event.target.files);
  };

  
  const handleAddAnnouncement =  () => {
    createAnnouncement();
    router.push('/list-announcement')
  };  
    
  const createAnnouncement = async () => {
    try {
      await store.createAnnouncement({
        title: title.value,
      price: parseFloat(price.value),
      category_id: parseInt(selectedCategory.value),
      description: description.value,
      pictures: images.value
      });
      console.log('Annonce ajoutée avec succès');
      router.push('/list-announcement')
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'annonce :", error);
    }
  }
   
  
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
  