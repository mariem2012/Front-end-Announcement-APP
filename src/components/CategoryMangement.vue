<!-- src/components/CategoryManagement.vue -->
<template>
  <div>
    <h2>Gestion des catégories</h2>
    <form @submit.prevent="createCategory">
      <input v-model="category.name" placeholder="Nom de la catégorie" required />
      <button type="submit">Ajouter</button>
    </form>
    <div v-for="cat in categories" :key="cat.id">
      <span>{{ cat.name }}</span>
      <button @click="deleteCategory(cat.id)">Supprimer</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCategoriesStore } from '../store/categories';

const categoriesStore = useCategoriesStore();
const category = ref({ name: '' });
const categories = computed(() => categoriesStore.categories);

onMounted(() => {
  categoriesStore.fetchCategories(); // Charger les catégories au démarrage
});

const createCategory = async () => {
  await categoriesStore.createCategory(category.value);
  category.value = { name: '' }; // Réinitialiser le formulaire
};

const deleteCategory = async (id) => {
  await categoriesStore.deleteCategory(id);
};
</script>