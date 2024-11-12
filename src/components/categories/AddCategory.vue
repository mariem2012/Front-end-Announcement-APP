<template>
    <div class="container mt-5">
      <h2 class="text-center">Ajouter une catégorie</h2>
  
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="name" class="form-label">Nom de la catégorie</label>
          <input
            type="text"
            id="name"
            v-model="category.name"
            class="form-control"
            placeholder="Nom de la catégorie"
            required
          />
        </div>
        <div class="mb-3">
          <label for="status" class="form-label">Statut</label>
          <select v-model="category.status" class="form-control" required>
            <option value="true">Actif</option>
            <option value="false">Inactif</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-plus-circle"></i> Ajouter
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useCategoryStore } from "../../store/categoryStore";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const store = useCategoryStore();
  
  const category = ref({
    name: "",
    status: true, 
  });
  
  const handleSubmit = async () => {
    try {
      await store.addCategory(category.value); 
      router.push("/list-category"); 
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie", error);
    }
  };
  </script>
  
  <style scoped>
  .form-label {
    font-weight: bold;
  }

  .container {
    margin-top: 70px;
  }
  </style>
  