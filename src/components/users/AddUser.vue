 <!-- <template>
    <div class="container">
      <form @submit.prevent="handleAddUser">
        <input v-model="name" placeholder="Nom" />
        <input v-model="email" placeholder="Email" />
        <input v-model="phone" placeholder="Téléphone" />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from '../../store/userStore';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const store = useUserStore();
  const router = useRouter();
  const name = ref('');
  const email = ref('');
  const phone = ref('');
  
  const handleAddUser = () => {
    const userData = {
      name: name.value,
      email: email.value,
      phone: phone.value,
    };
    store.addUser(userData).then(() => {
      router.push({ name: 'ListUser' });
    });
  };
  </script> -->

  <!-- <template>
    <div class="container">
      <form @submit.prevent="handleAddUser" class="formulaire form mb-5 mt-5 shadow p-3 mb-5 bg-body rounded">
        <div class="mb-3">
          <label for="nom" class="form-label">Nom :</label>
          <input
            type="text"
            class="input form-control"
            v-model="nom"
            id="nom"
            required
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email :</label>
          <input
            type="email"
            class="input form-control"
            v-model="email"
            id="email"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Mot de passe :</label>
          <input
            type="password"
            class="input form-control"
            v-model="password"
            id="password"
            required
          />
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">Numéro de téléphone :</label>
          <input
            type="tel"
            class="input form-control"
            v-model="phone"
            id="phone"
            required
          />
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">Adresse :</label>
          <input
            type="text"
            class="input form-control"
            v-model="address"
            id="address"
            required
          />
        </div>
        <div class="mb-3">
        <label for="status" class="form-label">Status :</label>
        <div>
          <input
            type="checkbox"
            id="status"
            v-model="status"
            class="form-check-input"
          />
          <label for="status" class="form-check-label">Actif</label>
        </div>
      </div>
        <button class="clr btn mt-3 mb-4 me-3 text-white">
          Ajouter
        </button>
        <RouterLink class="list text-decoration-none text-white me-5 fw-bold" to="/list-user">
          <button class="btn btn-danger mt-3 mb-4">
            Annuler
          </button>
        </RouterLink>
      </form>
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from '../../store/userStore';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  
  const router = useRouter();
  const store = useUserStore();
  
  const nom = ref("");
  const email = ref("");
  const password = ref("");
  const phone = ref("");
  const address = ref("");
  const status = ref("true"); 
  
  const handleAddUser = () => {
    addUser();
    router.push('/list-user');
  };
  
  const addUser = async () => {
    try {
      await store.addUser({
        name: nom.value,
        email: email.value,
        password: password.value,
        phone: phone.value,
        address: address.value,
        status: status.value === 'true' 
      });
      console.log("Utilisateur ajouté avec succès");
      router.push('/list-user'); 
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur:", error);
    }
  };
  </script>
  
  <style scoped>
  .clr {
    background-color: #070f69;
  }
  .clr:hover {
    background-color: #070f69;
  }
  .formulaire {
    width: 50%;
    border-radius: 10px;
    padding: 20px;
    margin: auto;
  }

  .container {
    padding-top: 70px;
  }
  </style>
  
   -->
   <template>
    <div class="container">
      <form @submit.prevent="handleAddUser" class="formulaire form mb-5 mt-5 shadow p-3 mb-5 bg-body rounded">
        <div class="mb-3">
          <label for="name" class="form-label">Nom :</label>
          <input
            type="text"
            class="input form-control"
            v-model="name"
            id="name"
            required
          />
          <small class="text-danger">{{ errors.name }}</small>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email :</label>
          <input
            type="email"
            class="input form-control"
            v-model="email"
            id="email"
            required
          />
          <small class="text-danger">{{ errors.email }}</small>
        </div>
        <div class="mb-3">
            <label for="role" class="form-label">Rôle :</label>
          <input
            type="enum"
            class="input form-control"
            v-model="role"
            id="role"
            required
          />
          <small class="text-danger">{{ errors.description }}</small>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Mot de passe :</label>
          <input
            type="password"
            class="input form-control"
            v-model="password"
            id="password"
            required
          />
          <small class="text-danger">{{ errors.password }}</small>
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">Numéro de téléphone :</label>
          <input
            type="tel"
            class="input form-control"
            v-model="phone"
            id="phone"
            required
          />
          <small class="text-danger">{{ errors.phone }}</small>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">Adresse :</label>
          <input
            type="text"
            class="input form-control"
            v-model="address"
            id="address"
            required
          />
          <small class="text-danger">{{ errors.address }}</small>
        </div>
        <div class="form-floating mb-4">
          <select
            id="statut"
            class="form-select"
            v-model="status"
            required
          >
            <option value="actif">Actif</option>
            <option value="inactif">Inactif</option>
          </select>
          <label for="statut">
            <i class="fas fa-toggle-on me-2"></i>Statut
          </label>
          <span v-if="errors.status" class="error-text">{{
            errors.status
          }}</span>

        </div>
        <button class="clr btn mt-3 mb-4 me-3 text-white">
          Ajouter
        </button>
        <RouterLink class="list text-decoration-none text-white me-5 fw-bold" to="/list-user">
          <button class="btn btn-danger mt-3 mb-4">
            Annuler
          </button>
        </RouterLink>
      </form>
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from '../../store/userStore';
  import { useRouter } from 'vue-router';
  import { ref, watch } from 'vue';
  import { useToast } from 'vue-toastification'


  const toast = useToast();
  
  const router = useRouter();
  const store = useUserStore();
  
  const nom = ref("");
  const email = ref("");
  const role = ref("");
  const password = ref("");
  const phone = ref("");
  const address = ref("");
  const status = ref("actif"); 
  const errors = ref({});
  const serverErrors = ref([]); 
  watch(serverErrors, (newErrors) => {
  errors.value = {}; // Réinitialiser les erreurs
  newErrors.forEach((err) => {
    if (err.path === "name") {
      errors.value.name = err.msg;
    }
    if (err.path === "email") {
      errors.value.email = err.msg;
    }
    if (err.path === "password") {
      errors.value.password = err.msg;
    }
    if (err.path === "role") {
      errors.value.role = err.msg;
    }
    if (err.path === "phone") {
      errors.value.phone = err.msg;
    }
    if (err.path === "address") {
      errors.value.address = err.msg;
    }
  });
});

  
  const handleAddUser = () => {
    addUser();
    
  };
  
  const addUser = async () => {
    try {
      await store.addUser({
        name: nom.value,
        email: email.value,
        email: role.value,
        password: password.value,
        phone: phone.value,
        address: address.value,
        status: status.value === 'actif'
      });
      console.log("Utilisateur ajouté avec succès");
      toast.success('Utilisateur ajouté avec succès.')
      router.push('/list-user'); 
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur:", error);
      if (error.response && error.response.data.errors) {
      // Remplir les erreurs serveur
      serverErrors.value = error.response.data.errors;
    } else {
    toast.error(
      "Erreur lors de l'ajout du prestataire. Veuillez vérifier les données."
    );
    }
    }
  };
  </script>
  
  <style scoped>
  .clr {
    background-color: #070f69;
  }
  .clr:hover {
    background-color: #070f69;
  }
  .formulaire {
    width: 50%;
    border-radius: 10px;
    padding: 20px;
    margin: auto;
  }
  
  .container {
    padding-top: 70px;
  }
  </style>
  