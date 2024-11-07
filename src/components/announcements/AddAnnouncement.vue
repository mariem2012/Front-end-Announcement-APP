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
    <div class="container my-5">
      <h2>Ajouter une Annonce</h2>
      <form @submit.prevent="handleAddAnnonce">
        <div class="mb-3">
          <label for="title" class="form-label">Titre</label>
          <input type="text" v-model="title" id="title" class="form-control" required />
        </div>
        
        <div class="mb-3">
          <label for="category" class="form-label">Catégorie</label>
          <select v-model="category" id="category" class="form-select">
            <option value="Emploi">Emploi</option>
            <option value="Immobilier">Immobilier</option>
            <option value="Véhicules">Véhicules</option>
            <option value="Électronique">Électronique</option>
          </select>
        </div>
        
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea v-model="description" id="description" class="form-control" rows="3" required></textarea>
        </div>
  
        <div class="mb-3">
          <label for="price" class="form-label">Prix</label>
          <input type="number" step="0.01" v-model="price" id="price" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label for="latitude" class="form-label">Latitude</label>
          <input type="number" v-model="latitude" id="latitude" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label for="longitude" class="form-label">Longitude</label>
          <input type="number" v-model="longitude" id="longitude" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label for="picture" class="form-label">Image</label>
          <input type="file" @change="handleFileUpload" id="picture" class="form-control" multiple />
        </div>
  
        <button type="submit" class="btn btn-primary">Publier Annonce</button>
      </form>
    </div>
  </template>
  
  