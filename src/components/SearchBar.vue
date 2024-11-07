<template>
    <div class="search-bar">
      <input v-model="keyword" placeholder="Recherche d'annonce" class="form-control me-2" />
      <select v-model="selectedCategory" class="form-select">
        <option value="">Toutes les catégories</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
      <button @click="search" class="btn btn-primary">Rechercher</button>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import api from '../api';
  
  const keyword = ref('');
  const selectedCategory = ref('');
  const categories = ref([]);
  
  // Charge les catégories lors du montage
  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories'); // Appel à /api/categories
      categories.value = response.data;
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
    }
  };
  
  // Fonction de recherche (pourrait être propagée vers un composant parent)
  const search = () => {
    console.log('Recherche:', keyword.value, selectedCategory.value);
  };
  
  onMounted(fetchCategories);
  </script>
  
  <style scoped>
  .search-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  </style>
  