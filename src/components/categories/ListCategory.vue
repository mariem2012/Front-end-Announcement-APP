   <!-- <template>
    <div class="container mt-5">
      <h2 class="text-center fw-bold mb-4">Liste des Catégories</h2>
  
      <RouterLink to="/add-category">
        <button class="btn btn-dark mb-4 fw-bold">
          <i class="fa-solid fa-plus-circle"></i> Ajouter une Catégorie
        </button>
      </RouterLink>
  
      <div class="table-responsive">
        <table class="table table-striped table-bordered border-dark">
          <thead class="table-success">
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Status</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories" :key="category.id">
              <td>{{ category.id }}</td>
              <td>{{ category.name }}</td>
              <td>
                <span :class="category.status ? 'text-success fw-bold' : 'text-danger fw-bold'">
                  {{ category.status ? 'Actif' : 'Inactif' }}
                </span>
              </td>
              <td class="text-center">
                <button @click="viewCategory(category)" class="btn btn-outline-info btn-sm mx-1">
                  <i class="fa-solid fa-eye" style="color: #4596d3; font-size: 20px;"></i>
                </button>
                <RouterLink :to="`/edit-category/${category.id}`">
                  <button class="btn btn-outline-success btn-sm mx-1">
                    <i class="fa-solid fa-pen-to-square" style="color: #1ac163; font-size: 20px;"></i>
                  </button>
                </RouterLink>
                <button @click="destroyCategory(category.id)" class="btn btn-outline-danger btn-sm mx-1">
                  <i class="fa-solid fa-trash" style="color: #e30d0d; font-size: 20px;"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>

<script setup>
import { onMounted, ref } from "vue";
import { useCategoryStore } from "../../store/categoryStore";

const categories = ref([]);
const store = useCategoryStore();

onMounted(() => {
  store.fetchCategories().then(() => {
    categories.value = store.categories;
  });
});

const viewCategory = (category) => {
  alert(`Détails de la catégorie : ${category.name}`);
};

const destroyCategory = async (id) => {
  const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?");
  if (confirmDelete) {
    await store.deleteCategory(id);
    alert("Catégorie supprimée avec succès.");
  }
};
</script>


<style scoped>
.container {
  padding-top: 70px;
}

.table-responsive {
  border-radius: 10px;
  overflow: hidden;
}

.table {
  border: 1px solid #dee2e6;
}

.table th,
.table td {
  text-align: center;
  vertical-align: middle;
}

.text-success {
  color: #28a745 !important;
}

.text-danger {
  color: #dc3545 !important;
}

button i {
  margin-right: 5px;
}

.btn-outline-info {
  border-color: #4596d3;
  color: #4596d3;
}

.btn-outline-success {
  border-color: #1ac163;
  color: #1ac163;
}

.btn-outline-danger {
  border-color: #e30d0d;
  color: #e30d0d;
}
</style> -->


<template>
  <div class="container mt-5">
    <h2 class="text-center fw-bold mb-4">Liste des Catégories</h2>

    <!-- Barre de recherche et bouton d'ajout -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="input-group" style="max-width: 300px">
        <span class="input-group-text" id="search-addon">
          <i class="fas fa-search"></i>
        </span>
        <input
          type="text"
          class="form-control"
          v-model="searchQuery"
          placeholder="Rechercher une catégorie..."
          aria-label="Search"
          aria-describedby="search-addon"
        />
      </div>
      <RouterLink to="/add-category">
        <button class="btn btn-dark fw-bold">
          <i class="fa-solid fa-plus-circle"></i> Ajouter une Catégorie
        </button>
      </RouterLink>
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-bordered border-dark">
        <thead class="table-success">
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Status</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in filteredCategories" :key="category.id">
            <td>{{ category.id }}</td>
            <td>{{ category.name }}</td>
            <td>
              <span :class="category.status ? 'text-success fw-bold' : 'text-danger fw-bold'">
                {{ category.status ? 'Actif' : 'Inactif' }}
              </span>
            </td>
            <td class="text-center">
              <button
                @click="viewCategoryDetails(category)"
                class="btn btn-outline-info btn-sm mx-1"
              >
                <i class="fa-solid fa-eye" style="color: #4596d3; font-size: 20px;"></i>
              </button>
              <RouterLink :to="`/edit-category/${category.id}`">
                <button class="btn btn-outline-success btn-sm mx-1">
                  <i class="fa-solid fa-pen-to-square" style="color: #1ac163; font-size: 20px;"></i>
                </button>
              </RouterLink>
              <button @click="destroyCategory(category.id)" class="btn btn-outline-danger btn-sm mx-1">
                <i class="fa-solid fa-trash" style="color: #e30d0d; font-size: 20px;"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-body">
          <h3>Détails de la Catégorie</h3>
          <p><strong>ID :</strong> {{ selectedCategory.id }}</p>
          <p><strong>Nom :</strong> {{ selectedCategory.name }}</p>
          <p><strong>Status :</strong> {{ selectedCategory.status ? 'Actif' : 'Inactif' }}</p>
        </div>
        <button class="btn btn-danger" @click="closeModal">Fermer</button>
      </div>
    </div>

    <div v-if="filteredCategories.length === 0" class="text-center mt-4">
      <p>Aucune catégorie trouvée.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCategoryStore } from "../../store/categoryStore";
import { useToast } from "vue-toastification";
const toast = useToast()
const searchQuery = ref("");
const store = useCategoryStore();

const isModalVisible = ref(false);
const selectedCategory = ref(null);

onMounted(() => {
  store.fetchCategories();
});

const categories = computed(() => store.categories);

const filteredCategories = computed(() => {
  return categories.value.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const viewCategoryDetails = (category) => {
  selectedCategory.value = category;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
  selectedCategory.value = null;
};

const destroyCategory = async (id) => {
  const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?");
  if (confirmDelete) {
    const result = await store.deleteCategory(id);

    if (result.success) {
      toast.success(result.message, { position: "top-right" });
    } else {
      toast.error(result.message, { position: "top-right" });
    }
  }
};
</script>

<style scoped>
.container {
  padding-top: 70px;
}

.input-group-text {
  background-color: #fbfbfb;
  color: white;
}

.table-responsive {
  border-radius: 10px;
  overflow: hidden;
}

.table {
  border: 1px solid #dee2e6;
}

.table th,
.table td {
  text-align: center;
  vertical-align: middle;
}

.text-success {
  color: #28a745 !important;
}

.text-danger {
  color: #dc3545 !important;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: left;
}

.modal-body h3 {
  margin-bottom: 20px;
}
</style>
