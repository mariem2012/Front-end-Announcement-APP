<!-- <template>
    <div class="container">
      <table class="table table-striped table-bordered mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.status ? 'Actif' : 'Inactif' }}</td>
            <td>
              <button @click="editUser(user.id)">Modifier</button>
              <button @click="deleteUser(user.id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from '../../store/userStore';
  import { ref, onMounted } from 'vue';
  
  const store = useUserStore();
  const users = ref([]);
  
  onMounted(() => {
    store.fetchUsers().then(() => {
      users.value = store.users;
    });
  });
  
  const editUser = (id) => {
    // Rediriger vers la page de modification de l'utilisateur
    router.push({ name: 'EditUser', params: { id } });
  };
  
  const deleteUser = (id) => {
    store.deleteUser(id);
  };
  </script>
  <style scoped>
  .container {
  padding-top: 70px; /* Ajuste la valeur selon la hauteur de ta navbar */
}
  </style> -->


  <template>
    <div class="container">
      <RouterLink class="list text-decoration-none text-white me-5 fw-bold" to="/add-user">
        <button class="clr btn text-white mt-5 mb-4 fw-bold" v-if="afficheBtn" @click="maskBtn">
          Ajouter un utilisateur
        </button>
      </RouterLink>
  
      <div class="table-responsive">
        <table class="table table-striped table-bordered border-black">
          <thead class="table-success">
            <tr>
              <th>Id</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Adresse</th>
              <th>Status</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td> 
              <td>{{ user.address }}</td> 
              <td>{{ user.status ? 'Actif' : 'Inactif' }}</td>
              <td class="text-center">
                <button class="btn btn-sm" @click="openModal(user)">
                  <i class="fa-solid fa-eye" style="color: #4596d3; font-size: 25px"></i>
                </button>
                <RouterLink :to="{ path: `/edit-user/${user.id}` }">
                  <button class="btn btn-sm">
                    <i class="fa-solid fa-pen-to-square" style="color: #1ac163; font-size: 25px"></i>
                  </button>
                </RouterLink>
                <button class="btn btn-sm" @click="destroyUser(user.id)">
                  <i class="fa-solid fa-trash" style="color: #e30d0d; font-size: 25px"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-body">
            <h3>Détails de l'Utilisateur</h3>
            <p><strong>Nom :</strong> {{ selectedUser.name }}</p>
            <p><strong>Email :</strong> {{ selectedUser.email }}</p>
            <p><strong>Status :</strong> {{ selectedUser.status ? 'Actif' : 'Inactif' }}</p>
            <p><strong>Phone :</strong> {{ selectedUser.phone }}</p> 
            <p><strong>Adresse :</strong> {{ selectedUser.address }}</p> 
          </div>
          <button class="btn btn-danger" @click="closeModal">Fermer</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '../../store/userStore';
  
  const store = useUserStore();
  const users = ref([]);
  let afficheBtn = true;
  
  onMounted(() => {
    store.fetchUsers().then(() => {
      users.value = store.users;
    });
  });
  
  const maskBtn = () => {
    afficheBtn = false;
  };
  
  const isModalVisible = ref(false);
  const selectedUser = ref(null);
  
  const openModal = (user) => {
    selectedUser.value = user;
    isModalVisible.value = true;
  };
  
  const closeModal = () => {
    isModalVisible.value = false;
  };
  
  const destroyUser = (id) => {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      store.deleteUser(id);
    }
  };
  </script>
  
  
  <style scoped>
  .clr {
    background-color: #070f69;
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
    max-width: 500px;
    width: 100%;
    position: relative;
  }
  
  .modal-body {
    padding: 20px;
  }

  .container {
    padding-top: 70px;
  }
  </style>
  