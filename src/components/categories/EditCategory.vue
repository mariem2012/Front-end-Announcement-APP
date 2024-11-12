<template>
    <div class="container mt-5">
      <h2 class="text-center">Modifier une catégorie</h2>
  
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="name" class="form-label">Nom de la catégorie</label>
          <input
            type="text"
            id="name"
            v-model="category.name"
            class="form-control"
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
        <button type="submit" class="btn btn-warning">
          <i class="fas fa-edit"></i> Modifier
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useCategoryStore } from "../../store/categoryStore";
  import { useRoute, useRouter } from "vue-router";
  
  const router = useRouter();
  const route = useRoute();
  const store = useCategoryStore();
  
  const category = ref({
    id: null,
    name: "",
    status: true,
  });
  
  const loadCategory = async () => {
    const id = route.params.id;
    const fetchedCategory = await store.getCategoryById(id);
    category.value = fetchedCategory;
  };
  
  const handleSubmit = async () => {
    try {
      await store.updateCategory(category.value);
      router.push("/list-category");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la catégorie", error);
    }
  };
  
  onMounted(() => {
    loadCategory();
  });
  </script>
  
  <style scoped>
  .form-label {
    font-weight: bold;
  }
  </style>
  