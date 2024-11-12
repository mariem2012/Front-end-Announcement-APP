// // stores/gestion.js
// import { defineStore } from 'pinia';
// import api from '../api.js';

// export const useCategoryStore = defineStore('categoryStore', {
//   state: () => ({
//     categories: []
//   }),

//   actions: {
//     async fetchCategories() {
//       try {
//         const response = await api.get('/categories');
//         this.categories = response.data;
//         console.log("Categories affichés avec succes", this.users);

//       } catch (error) {
//         console.error('Erreur lors du chargement des catégories:', error);
//       }
//     },

//     async addCategory(name) {
//       try {
//         const response = await api.post('/categories', { name });
//         this.categories.push(response.data);
//       } catch (error) {
//         console.error('Erreur lors de l’ajout de la catégorie:', error);
//         throw error;
//       }
//     },

//     async updateCategory(updatedCategory) {
//       try {
//         const response = await api.put(`/categories/${updatedCategory.id}`, updatedCategory);
//         const index = this.categories.findIndex(category => category.id === updatedCategory.id);
//         if (index !== -1) {
//           this.categories[index] = response.data;
//         }
//       } catch (error) {
//         console.error('Erreur lors de la mise à jour de la catégorie:', error);
//         throw error;
//       }
//     },

//     async deleteCategory(id) {
//       try {
//         await api.delete(`/categories/${id}`);
//         this.categories = this.categories.filter(category => category.id !== id);
//       } catch (error) {
//         console.error('Erreur lors de la suppression de la catégorie:', error);
//       }
//     }
//   }
// });



import { defineStore } from "pinia";
import api from '../api.js'; 

export const useCategoryStore = defineStore("categoryStore", {
  state: () => ({
    categories: [],
  }),

  actions: {
    async fetchCategories() {
      try {
        const response = await api.get("/categories");
        console.log(response);
       return this.categories = response.data;
      } catch (error) {
        console.error("Erreur lors du chargement des catégories", error);
      }
    },
      
    async addCategory(category) {
      try {
        const response = await api.post("/categories/add", category);
        this.categories.push(response.data.category);
      } catch (error) {
        console.error("Erreur lors de l'ajout de la catégorie", error);
      }
    },

    async getCategoryById(id) {
      try {
        const response = await api.get(`/categories/${id}`);
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération de la catégorie", error);
      }
    },

    async updateCategory(category) {
      try {
        const response = await api.put(`/categories/${category.id}`, category);
        const index = this.categories.findIndex(c => c.id === category.id);
        if (index !== -1) {
          this.categories[index] = response.data.category;
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la catégorie", error);
      }
    },

    async deleteCategory(id) {
      try {
        await api.delete(`/categories/${id}`);
        this.categories = this.categories.filter(c => c.id !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression de la catégorie", error);
      }
    },
  },
});
