import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    categories: ['Catégorie 1', 'Catégorie 2'], // Liste des catégories
  }),
  actions: {
    fetchCategories() {
      // Simulez l'appel d'une API pour récupérer des catégories
      this.categories = ['Catégorie 1', 'Catégorie 2', 'Catégorie 3'];
    },
    addCategory(newCategory) {
      if (!this.categories.includes(newCategory)) {
        this.categories.push(newCategory);
      }
    },
  },
});
