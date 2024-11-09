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

  <template>
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
  
  