<!-- <template>
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
        </div>
  
        <div class="mb-4">
          <label for="status" class="form-label">Statut</label>
          <select v-model="category.status" class="form-select form-select-lg" required>
            <option :value="true">Actif</option>
            <option :value="false">Inactif</option>
          </select>
        </div>
  
        <button type="submit" class="btn btn-success btn-lg w-100">
          <i class="fas fa-plus-circle"></i> Ajouter la catégorie
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
  console.log("handleSubmit appelé avec : ", category.value);
  try {
    await store.addCategory(category.value);
    console.log("Catégorie ajoutée avec succès !");
    router.push("/list-category");
  } catch (error) {
    console.error("Erreur lors de l'ajout de la catégorie", error);
  }
};

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
  
  .btn-success {
    background-color: #28a745;
    border: none;
  }
  
  .btn-success:hover {
    background-color: #218838;
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
   -->

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
  import { ref } from "vue";
  import { useCategoryStore } from "../../store/categoryStore";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const store = useCategoryStore();
  
  const category = ref({
    name: "",
    status: 'actif', 
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
      console.error("Erreur lors de l'ajout de la catégorie", error.response?.data || error.message);
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: auto;
  }
  </style>
  