<template>
  <div class="container form-container">
    <h2 class="text-center mb-4">Modifier une catégorie</h2>

    <form @submit.prevent="handleSubmit" class="p-4 shadow-sm rounded bg-light">
      <div class="mb-4">
        <label for="name" class="form-label">Nom de la catégorie</label>
        <input
          type="text"
          id="name"
          v-model="category.name"
          class="form-control form-control-lg"
          placeholder="Entrez le nom de la catégorie"
          required
        />
      </div>

      <div class="mb-4">
        <label for="status" class="form-label">Statut</label>
        <select v-model="category.status" class="form-select form-select-lg" required>
          <option :value="true">Actif</option>
          <option :value="false">Inactif</option>
        </select>
      </div>

      <button type="submit" class="btn btn-warning btn-lg w-100">
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
    // alert("Catégorie mise à jour avec succès !");
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
.form-container {
  max-width: 600px;
  margin: 100px auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-label {
  font-weight: 600;
}

.btn-warning {
  background-color: #ffc107;
  border: none;
}

.btn-warning:hover {
  background-color: #e0a800;
}

.form-control-lg,
.form-select-lg {
  height: calc(1.5em + 1rem + 2px);
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  border-radius: 0.3rem;
}

.text-center {
  color: #343a40;
}
</style>
