<template>
  <div class="home-container">
    <section class="search-section text-center text-indigo">
      <div class="overlay">
        <h1>Cherchez et trouvez des annonces locales</h1>
        <p>Facilement et rapidement.</p>
        <div class="search-bar">
          <input type="text" placeholder="Recherche d'annonce" class="form-control me-2" />
          <input type="text" placeholder="Emplacement" class="form-control me-2" />
          <button class="btn">Rechercher</button>
        </div>
      </div>
    </section>

    <div class="home-container">
    <SearchBar @search="handleSearch" />
    <!-- <ListAnnouncement :announcements="filteredAnnouncements" /> -->
  </div>

    <section class="popular-section container my-5">
      <h2 class="text-center">Annonces Populaires</h2>
      <div class="row">
        <div class="col-md-3" v-for="(category, index) in popularCategories" :key="index">
          <div class="card">
            <img :src="category.image" class="card-img-top" :alt="category.name" />
            <div class="card-body text-center">
              <h5 class="card-title">{{ category.name }}</h5>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="recent-section container my-5">
      <h2 class="text-center">Annonces Récentes</h2>
      <div class="row">
        <div class="col-md-3" v-for="(annonce, index) in recentAnnonces" :key="index">
          <div class="card">
            <img :src="annonce.image" class="card-img-top" :alt="annonce.title" />
            <div class="card-body text-center">
              <h5 class="card-title">{{ annonce.title }}</h5>
              <p class="card-text">{{ annonce.category }}</p>
              <router-link :to="'/annonce/' + annonce.id" class="btn btn-primary mt-2">Voir Détails</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import ListAnnouncement from '../components/announcements/ListAnnouncement.vue';

const popularCategories = reactive([
  { name: 'Emploi', image: '../assets/images/emploi.jpg.' },
  { name: 'Immobilier', image: '/assets/images/immobilier.jpg' },
  { name: 'Véhicules', image: '/assets/images/vehicules.jpg' },
  { name: 'Électronique', image: '/assets/images/electronique.jpg' },
]);

const recentAnnonces = reactive([
  { id: 1, title: 'Télévision 4K à vendre', category: 'Électronique', image: '/assets/images/tv.jpg' },
  { id: 2, title: 'Location appartement 3 pièces', category: 'Immobilier', image: '/assets/images/appartement.jpg' },
  { id: 3, title: 'Offre de stage en marketing', category: 'Emploi', image: '/assets/images/stage.jpg' },
  { id: 4, title: 'Voiture familiale à vendre', category: 'Véhicules', image: '/assets/images/voiture.jpg' },
]);
</script>

<style scoped>
.search-section {
  background-image: url('../assets/images/an-img.png');
  background-size: cover;
  background-position: center;
  padding: 80px 20px;
  color: #fff;
  position: relative;
}

.overlay {
  padding: 50px 20px;
  border-radius: 8px;
}

.btn {
  background-color: #070f69;
  color: #fff;
}

.search-bar {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.popular-section .card,
.recent-section .card {
  transition: 0.3s ease;
  color: #1b639e;
}

.popular-section .card:hover,
.recent-section .card:hover {
  transform: scale(1.05);
  background-color:  #f8f7f4;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.recent-section .btn-primary {
  background-color: #FFA500;
  border: none;
}
</style>


<!-- <template>
  <div class="home-container">
    <section class="search-section text-center text-indigo">
      <div class="overlay">
        <h1>Cherchez et trouvez des annonces locales</h1>
        <p>Facilement et rapidement.</p>
        <div class="search-bar">
          <input type="text" placeholder="Recherche d'annonce" class="form-control me-2" />
          <input type="text" placeholder="Emplacement" class="form-control me-2" />
          <button class="btn">Rechercher</button>
        </div>
      </div>
    </section>

    <section class="popular-section container my-5">
      <h2 class="text-center">Annonces Populaires</h2>
      <div class="row">
        <div class="col-md-3" v-for="(category, index) in popularCategories" :key="index">
          <div class="card">
            <img :src="category.image" class="card-img-top" :alt="category.name" />
            <div class="card-body text-center">
              <h5 class="card-title">{{ category.name }}</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const popularCategories = reactive([
  { name: 'Emploi', image: '/assets/images/emploi.jpg' },
  { name: 'Immobilier', image: '/images/immobilier.jpg' },
  { name: 'Véhicules', image: '/images/vehicules.jpg' },
  { name: 'Électronique', image: '/images/electronique.jpg' },
]);
</script>

<style scoped>
.search-section {
  background-image: url('../assets/images/an-img.png');
  background-size: cover;
  background-position: center;
  padding: 80px 20px;
  color: #fff;
  position: relative;
}

.overlay {
  padding: 50px 20px;
  border-radius: 8px;
}

.btn {
  background-color: #070f69;
  color: #fff;
}

.search-bar {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.popular-section .card {
  transition: 0.3s ease;
}

.popular-section .card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}
</style>

   -->