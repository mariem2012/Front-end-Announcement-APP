<!-- <template>
 <Navbar />
  <div class="home-container">
    <section class="search-section text-center text-indigo">
      <div class="overlay">
        <h1>Bienvenue sur notre plateforme</h1>
        <p>Recherchez facilement ce dont vous avez besoin.</p>
        <div class="search-bar">
          <input v-model="searchQuery" type="text" placeholder="Recherche d'annonce" class="form-control me-2" />
          <button @click="filterAnnouncements" class="btn">Rechercher</button>
         </div>
      </div>
    </section>


    <div class="categories-section container my-5">
      <h2 class="text-center">Top Catégories</h2>
      <div id="categoriesCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
  <div
    v-for="(category, index) in categories"
    :key="index"
    :class="['carousel-item', { active: index === 0 }]"
  >
    <div class="card mx-auto colorful-card">
      <div class="card-body text-center">
        <h5 class="card-title">{{ category.name }}</h5>
      </div>
    </div>
  </div>


        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#categoriesCarousel"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#categoriesCarousel"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>

    <div class="recent-section container my-5">
    <h2 class="text-center">Annonces Récentes</h2>
    <div v-if="recentAnnouncements.length" class="row">
      <div class="col-md-3" v-for="(annonce, index) in recentAnnouncements" :key="index">
        <div class="card">
          <img :src="annonce.picture[0]" class="card-img-top" :alt="annonce.title" />
          <div class="card-body text-center">
            <h5 class="card-title">{{ annonce.title }}</h5>
            <p class="card-text">{{ annonce.category }}</p>
            <router-link :to="`/annonces/${annonce.id}`" class="btn btn-warning mt-2">Voir Détails</router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Aucune annonce ne correspond à votre recherche.</p>
    </div>
  </div>

  </div>
  <Footer />
</template>


<script setup>
import { ref, onMounted } from 'vue';
import api from '../api.js';
import Footer from './Footer.vue';

const searchQuery = ref('');
const recentAnnouncements = ref([]);
const allAnnouncements = ref([]); 
const categories = ref([]);

const fetchCategories = async () => {
  try {
    const response = await api.get('/categories');
    categories.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories :', error);
  }
};

const fetchAnnouncements = async () => {
  try {
    const response = await api.get('/announcements');
    allAnnouncements.value = response.data; 
    recentAnnouncements.value = response.data; 
  } catch (error) {
    console.error('Erreur lors de la récupération des Announcemets :', error);
  }
};

const filterAnnouncements = () => {
  if (searchQuery.value.trim() === '') {
    recentAnnouncements.value = allAnnouncements.value;
  } else {
    recentAnnouncements.value = allAnnouncements.value.filter(
      (annonce) =>
        annonce.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        annonce.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
};

const getImagePath = (imageName) => {
  return new URL(`../assets/images/${imageName}`, import.meta.url).href;
};

onMounted(() => {
  fetchAnnouncements();
  fetchCategories(); 
});
</script> -->

<template>
  <Navbar />
   <div class="home-container">
     <section class="search-section text-center text-indigo">
       <div class="overlay">
         <h1>Bienvenue sur notre plateforme</h1>
         <p>Recherchez facilement ce dont vous avez besoin.</p>
         <div class="search-bar">
           <input v-model="searchQuery" type="text" placeholder="Recherche d'annonce" class="form-control me-2" />
           <button @click="filterAnnouncements" class="btn">Rechercher</button>
          </div>
       </div>
     </section>
 
 
     <div class="categories-section container my-5">
  <h2 class="text-center">Top Catégories</h2>
  <div id="categoriesCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div
        v-for="(category, index) in categories"
        :key="index"
        :class="['carousel-item', { active: index === 0 }]"
      >
        <!-- Ajout de @click pour filtrer par catégorie -->
        <div class="card mx-auto colorful-card" @click="filterByCategory(category.name)">
          <div class="card-body text-center">
            <h5 class="card-title">{{ category.name }}</h5>
          </div>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#categoriesCarousel"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#categoriesCarousel"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

  <!-- <div class="text-center mt-4">
    <button @click="resetAnnouncements" class="btn btn-secondary">Réinitialiser</button>
  </div> -->
</div>

     <div class="recent-section container my-5">
       <h2 class="text-center">Annonces Récentes</h2>
       <div v-if="recentAnnouncements.length" class="row">
         <div class="col-md-3" v-for="(annonce, index) in recentAnnouncements" :key="index">
           <div class="card">
             <img :src="annonce.picture[0]" class="card-img-top" :alt="annonce.title" />
             <div class="card-body text-center">
               <h5 class="card-title">{{ annonce.title }}</h5>
               <p class="card-text">{{ annonce.category }}</p>
               <router-link :to="`/annonces/${annonce.id}`" class="btn btn-warning mt-2">Voir Détails</router-link>
             </div>
           </div>
         </div>
       </div>
       <div v-else>
         <p>Aucune annonce ne correspond à votre recherche.</p>
       </div>
     </div>
   </div>
   <Footer />
 </template>
 
 <script setup>
 import { ref, onMounted } from 'vue';
 import api from '../api.js';
 import Footer from './Footer.vue';
 
 const searchQuery = ref(''); // Stocke la requête de recherche
 const recentAnnouncements = ref([]); // Liste des annonces filtrées et affichées
 const allAnnouncements = ref([]);  // Liste complète des annonces non filtrées
 const categories = ref([]); // Liste des catégories disponibles
 
 // Fonction pour récupérer les catégories depuis l'API
 const fetchCategories = async () => {
   try {
     const response = await api.get('/categories');
     categories.value = response.data;
   } catch (error) {
     console.error('Erreur lors de la récupération des catégories :', error);
   }
 };
 
 // Fonction pour récupérer toutes les annonces depuis l'API
 const fetchAnnouncements = async () => {
   try {
     const response = await api.get('/announcements');
     allAnnouncements.value = response.data; 
     recentAnnouncements.value = response.data; 
   } catch (error) {
     console.error('Erreur lors de la récupération des Announcemets :', error);
   }
 };


 const filterByCategory = (categoryName) => {
  recentAnnouncements.value = allAnnouncements.value.filter(
    (annonce) => annonce.category.toLowerCase() === categoryName.toLowerCase()
  );
};

 
 // Fonction de filtrage : met à jour les annonces affichées en fonction du titre
 const filterAnnouncements = () => {
   // Si aucun texte de recherche, toutes les annonces sont affichées
   if (searchQuery.value.trim() === '') {
     recentAnnouncements.value = allAnnouncements.value;
   } else {
     // Filtrer uniquement par titre des annonces
     recentAnnouncements.value = allAnnouncements.value.filter(
       (annonce) =>
         annonce.title.toLowerCase().includes(searchQuery.value.toLowerCase())
     );
   }
 };
 
 onMounted(() => {
   fetchAnnouncements(); // Récupère les annonces au montage du composant
   fetchCategories(); // Récupère les catégories au montage du composant
 });
 </script>
 
 
<style scoped>
.search-section {
  background-image: url('../assets/images/home-img.png'); 
  background-size: cover; 
  background-position: center; 
  padding: 80px 20px; 
  color: #fff; 
  position: relative; 
  text-align: center; 
}

.search-section .content h1 {
  font-size: 2.5rem; 
  margin-bottom: 10px;
}

.search-section .content p {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto; 
}

.categories-section {
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 15px;
  /* box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); */
}

.category-card {
  position: relative;
  width: 300px;
  height: 200px;
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.category-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.category-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
}

.category-overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), transparent);
  display: flex;
  justify-content: center;
  align-items: center;
}

.category-title {
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
}

.carousel-control-prev,
.carousel-control-next {
  width: 50px;
  height: 50px;

  border: none;
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: invert(1);
}



.overlay {
  padding: 20px;
  padding-bottom: 20px;
  border-radius: 8px;
  background-color: #070f6977;
  width: 60%;
  margin: auto;

}

.btn {
  background-color: #070f69;
  color: #fff;
}


.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  max-width: 600px; 
  margin-left: auto;
  margin-right: auto; 
}

.search-bar input {
  flex: 1; 
  max-width: 500px; 
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.search-bar .btn {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #070f69;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}


.recent-section .card {
  transition: 0.3s ease;
}

.recent-section .card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.carousel-inner {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none; /* Cache la scrollbar */
  -ms-overflow-style: none; /* Cache la scrollbar pour Internet Explorer */
}

.carousel-inner::-webkit-scrollbar {
  display: none; /* Cache la scrollbar pour Chrome/Safari */
}

.carousel-item {
  flex: 0 0 auto;
  transition: transform 0.5s ease-in-out;
  margin: 10px;
}

.colorful-card {
  width: 20rem;
  border: none;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg,#ff8c00,#f0b770); /* Couleurs vives par défaut */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.colorful-card:hover {
  transform: scale(1.08);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #003366, #c2e9fb); /* Change de couleur au survol */
}

.colorful-card .card-body {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.colorful-card .card-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.4rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  letter-spacing: 1.2px;
}

.colorful-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0));
  opacity: 0.6;
  z-index: 0;
  pointer-events: none;
}

</style>


