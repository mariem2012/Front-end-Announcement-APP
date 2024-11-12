<template>
  <div class="home-container">
    <section class="search-section text-center text-indigo">
      <div class="overlay">
        <h1>Cherchez et trouvez des annonces locales</h1>
        <p>Facilement et rapidement.</p>
        <div class="search-bar">
          <input v-model="searchQuery" type="text" placeholder="Recherche d'annonce" class="form-control me-2" />
          <button @click="filterAnnonces" class="btn">Rechercher</button>
        </div>
      </div>
    </section>

    <div class="recent-section container my-5">
    <h2 class="text-center">Annonces Récentes</h2>
    <div v-if="recentAnnonces.length" class="row">
      <div class="col-md-3" v-for="(annonce, index) in recentAnnonces" :key="index">
        <div class="card">
          <img :src="getImagePath(annonce.image)" class="card-img-top" :alt="annonce.title" />
          <div class="card-body text-center">
            <h5 class="card-title">{{ annonce.title }}</h5>
            <p class="card-text">{{ annonce.category }}</p>
            <router-link :to="'/annonce/' + annonce.id" class="btn btn-primary mt-2">Voir Détails</router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Aucune annonce ne correspond à votre recherche.</p>
    </div>
  </div>

  </div>
</template>

<script setup>
import { reactive } from 'vue';

const recentAnnonces = reactive([
  { id: 1, title: 'Télévision 4K à vendre', category: 'Électronique', image: 'tvImg.jpg' },
  { id: 2, title: 'Location appartement 3 pièces', category: 'Immobilier', image: 'immobilier.jpg' },
  { id: 3, title: 'Offre de stage en marketing', category: 'Emploi', image: 'emploi.jpg' },
  { id: 4, title: 'Voiture familiale à vendre', category: 'Véhicules', image: 'vehicule.jpg' },
]);


const getImagePath = (imageName) => {
  return new URL(`../assets/images/${imageName}`, import.meta.url).href;
};


const filterAnnonces = () => {
  const query = searchQuery.value.toLowerCase();
  const filteredAnnonces = recentAnnonces.filter((annonce) =>
    annonce.title.toLowerCase().includes(query) || annonce.category.toLowerCase().includes(query)
  );

  if (filteredAnnonces.length) {
    console.log('Annonces filtrées :', filteredAnnonces);
    alert(`Nous avons trouvé ${filteredAnnonces.length} annonce(s) correspondant à votre recherche.`);
  } else {
    console.log('Aucune annonce ne correspond à votre recherche.');
    alert('Aucune annonce ne correspond à votre recherche.');
  }
};
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


.recent-section .card {
  transition: 0.3s ease;
}

.recent-section .card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}
</style>


