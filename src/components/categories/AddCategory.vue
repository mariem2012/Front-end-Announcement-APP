   <template>
    <div class="container form-container">
      <h2 class="text-center mb-4">Ajouter une catégorie</h2>
  
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
          <small class="text-danger">{{ errors.name }}</small>
        </div>
  
        <div class="mb-4">
          <label for="status" class="form-label">Statut</label>
          <select v-model="category.status" class="form-select form-select-lg" required>
            <option value="actif">Actif</option>
            <option value="inactif">Inactif</option>
          </select>
        </div>
  
        <button type="submit" class="btn btn-success btn-lg w-100">
          <i class="fas fa-plus-circle"></i> Ajouter la catégorie
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import {  ref, watch} from "vue";
  import { useCategoryStore } from "../../store/categoryStore";
  import { useRouter } from "vue-router";
  import { useToast } from "vue-toastification";


  const toast = useToast()
  
  const router = useRouter();
  const store = useCategoryStore();

  const errors = ref({});

  
  
  const category = ref({
    name: "",
    status: 'actif', 
  });


  const serverErrors = ref([]); 


  watch(serverErrors, (newErrors) => {
  errors.value = {}; 
  newErrors.forEach((err) => {
    if (err.path === "name") {
      errors.value.name = err.msg;
    }
    if (err.path === "statut") {
      errors.value.statut = err.msg;
    }
  });
});
  
  const handleSubmit = async () => {
    try {
      const payload = {
        name: category.value.name.trim(),
        status: category.value.status === "actif", 
      };
  
      if (!payload.name) {
        alert("Le nom de la catégorie est requis.");
        return;
      }
  
  
      await store.addCategory(payload);
  
      router.push("/list-category");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la catégorie:", error);
      if (error.response && error.response.data.errors) {
      serverErrors.value = error.response.data.errors;
    } else {
      toast.error(
        'Erreur lors de l\'ajout de categorie. Veuillez réessayer.'
      );
    }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: auto;
  }
  </style>
  