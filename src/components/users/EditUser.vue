<!-- <template>
  <div class="container">
    <form @submit.prevent="handleUpdateUser">
      <input v-model="name" placeholder="Nom" />
      <input v-model="email" placeholder="Email" />
      <input v-model="phone" placeholder="Téléphone" />
      <button type="submit">Mettre à jour</button>
    </form>
  </div>
</template>

<script setup>
import { useUserStore } from '../../store/userStore';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const store = useUserStore();
const router = useRouter();
const route = useRoute();
const id = route.params.id;

const name = ref('');
const email = ref('');
const phone = ref('');

onMounted(() => {
  store.fetchUserById(id).then(user => {
    name.value = user.name;
    email.value = user.email;
    phone.value = user.phone;
  });
});

const handleUpdateUser = () => {
  const userData = {
    id,
    name: name.value,
    email: email.value,
    phone: phone.value,
  };
  store.updateUser(id, userData).then(() => {
    router.push({ name: 'ListUser' });
  });
};
</script>


   -->


   <template>
    <div class="container">
      <form @submit.prevent="handleEditUser" class="formulaire form mb-5 mt-5 shadow p-3 mb-5 bg-body rounded">
        <div class="mb-3">
          <label for="nom" class="form-label">Nom :</label>
          <input type="text" class="input form-control" v-model="nom" id="nom" required />
        </div>
        
        <div class="mb-3">
          <label for="email" class="form-label">Email :</label>
          <input type="email" class="input form-control" v-model="email" id="email" required />
        </div>
        
        <div class="mb-3">
          <label for="password" class="form-label">Mot de passe :</label>
          <input type="password" class="input form-control" v-model="password" id="password" />
        </div>
        
        <div class="mb-3">
          <label for="phone" class="form-label">Téléphone :</label>
          <input type="tel" class="input form-control" v-model="phone" id="phone" />
        </div>
        
        <div class="mb-3">
          <label for="address" class="form-label">Adresse :</label>
          <input type="text" class="input form-control" v-model="address" id="address" />
        </div>
        
        <div class="mb-3">
          <label for="status" class="form-label">Status :</label>
          <select class="input form-select" v-model="status" id="status" required>
            <option value="true">Actif</option>
            <option value="false">Inactif</option>
          </select>
        </div>
        
        <button class="clr btn mt-3 mb-4 me-3 text-white">Enregistrer</button>
        <RouterLink class="list text-decoration-none text-white me-5 fw-bold" to="/list-user">
          <button class="btn btn-danger mt-3 mb-4">Annuler</button>
        </RouterLink>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '../../store/userStore';
  import { useRouter, useRoute } from 'vue-router';
  
  const router = useRouter();
  const route = useRoute();
  const store = useUserStore();
  
  const nom = ref("");
  const email = ref("");
  const password = ref("");
  const phone = ref("");
  const address = ref("");
  const status = ref("true");
  
  const userId = route.params.id;
  
  onMounted(async () => {
    const user = await store.fetchUserById(userId);
    if (user) {
      nom.value = user.name;
      email.value = user.email;
      phone.value = user.phone;
      address.value = user.address;
      status.value = user.status ? 'true' : 'false';
    }
  });
  
  const handleEditUser = async () => {
    await store.updateUser(userId, {
      name: nom.value,
      email: email.value,
      password: password.value || undefined, // optional
      phone: phone.value,
      address: address.value,
      status: status.value === 'true'
    });
    console.log("userId:", userId);
    router.push('/list-user');
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
  