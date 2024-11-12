<!-- <template>
    <div class="container mt-5">
      <h2 class="text-center">Liste des Catégories</h2>
  
      <RouterLink to="/add-category" class="btn btn-primary mb-3">
        <i class="fas fa-plus-circle"></i> Ajouter
      </RouterLink>
  
      <div class="table-responsive">
        <table class="table table-striped table-bordered">
          <thead class="table-success">
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Status</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in store.categories" :key="category.id">
              <td>{{ category.id }}</td>
              <td>{{ category.name }}</td>
              <td>
                <span :class="category.status ? 'text-success' : 'text-danger'">
                  {{ category.status ? 'Actif' : 'Inactif' }}
                </span>
              </td>
              <td class="text-center">
                <button @click="viewCategory(category)" class="btn btn-info btn-sm">
                  <i class="fas fa-eye"></i> Voir
                </button>
                <RouterLink :to="`/edit-category/${category.id}`" class="btn btn-warning btn-sm">
                  <i class="fas fa-edit"></i> Modifier
                </RouterLink>
                <button @click="destroyCategory(category.id)" class="btn btn-danger btn-sm">
                  <i class="fas fa-trash"></i> Supprimer
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
  const categories = ref([])
  const store = useCategoryStore();
  
  
  onMounted(() => {
    
    categories.value = store.fetchCategories();

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
  button i {
    margin-right: 5px;
  }
  .table th,
  .table td {
    text-align: center;
  }
  .text-success {
    color: green;
  }
  .text-danger {
    color: red;
  }
  </style>
   -->


   <template>
    <div class="container mt-5">
      <h2 class="text-center fw-bold mb-4">Liste des Catégories</h2>
  
      <RouterLink to="/add-category">
        <button class="btn btn-primary mb-4 fw-bold">
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
</style>
