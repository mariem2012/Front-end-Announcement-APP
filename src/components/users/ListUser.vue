 <template>
  <div class="container">
    <div class="search-bar d-flex justify-content-center my-4">
      <h1 class="mb-4 text-center fw-bold title-margin" style="color: #070f69">
        Liste des Utilisateurs
      </h1>
      <input
        type="text"
        class="form-control me-2 search-input"
        placeholder="Rechercher un utilisateur"
        v-model="searchTerm"
      />
      <button class="btn search-btn" @click="filterUsers">Rechercher</button>
    </div>

    <RouterLink class="list text-decoration-none text-white me-5 fw-bold" to="/add-user">
      <button class="clr btn text-white mt-5 mb-4 fw-bold" v-if="afficheBtn" @click="maskBtn">
        Ajouter un utilisateur
      </button>
    </RouterLink>

    <div class="table-responsive">
      <table class="table custom-table">
        <thead class="table-header">
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Adresse</th>
            <th>Statut</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.address }}</td>
            <td>{{ user.status }}</td>
            <td class="text-center">
              <button class="btn btn-sm" @click="openModal(user)">
                <i class="fa-solid fa-eye" style="color: #4596d3; font-size: 20px"></i>
              </button>
              <RouterLink :to="{ path: `/edit-user/${user.id}` }">
                <button class="btn btn-sm">
                  <i class="fa-solid fa-pen-to-square" style="color: #1ac163; font-size: 20px"></i>
                </button>
              </RouterLink>
              <button class="btn btn-sm" @click="destroyUser(user.id)">
                <i class="fa-solid fa-trash" style="color: #e30d0d; font-size: 20px"></i>
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
          <p><strong>Statut :</strong> {{ selectedUser.status ? 'Actif' : 'Inactif' }}</p>
          <p><strong>Téléphone :</strong> {{ selectedUser.phone }}</p>
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
const searchTerm = ref('');
let afficheBtn = true;

const filteredUsers = ref([]);

onMounted(() => {
  store.fetchUsers().then(() => {
    users.value = store.users;
    filteredUsers.value = store.users;
  });
});

const filterUsers = () => {
  const term = searchTerm.value.toLowerCase();
  filteredUsers.value = users.value.filter(
    (user) =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.phone.includes(term) ||
      user.address.toLowerCase().includes(term)
  );
};

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
.search-bar {
  display: flex;
  gap: 8px;
}

.search-input {
  width: 50%;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
}

.search-btn {
  background-color: #070f69;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
}

.search-btn:hover {
  background-color: #0544a1;
}

.clr {
  background-color: #070f69;
}

.table {
  font-size: 14px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.table th, .table td {
  text-align: center;
  padding: 12px;
}

.table-header {
  background-color: #070f69;
  color: #fff;
}

.table-responsive {
  margin-top: 30px;
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
<!-- <template>
  <div class="container">
     Barre de recherche et filtre 
    <div class="search-bar d-flex justify-content-center my-4">
      <h1 class="mb-4 text-center fw-bold title-margin" style="color: #070f69;">
        Liste des Utilisateurs
      </h1>
      <div class="d-flex align-items-center">
        <input
          type="text"
          class="form-control me-2 search-input"
          placeholder="Rechercher un utilisateur"
          v-model="searchTerm"
        />
        <button class="btn search-btn" @click="filterUsers">
          <i class="fa fa-search"></i>
        </button>
      </div>
    </div>
  
    <RouterLink to="/add-user" class="text-decoration-none">
      <button
        class="btn add-user-btn mt-3 mb-4 fw-bold"
        v-if="afficheBtn"
        @click="maskBtn"
      >
        Ajouter un utilisateur
      </button>
    </RouterLink>
  
    >
    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th>Id</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Téléphone</th>
            <th>Adresse</th>
            <th>Statut</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.address }}</td>
            <td>
              <span :class="user.status ? 'badge bg-success' : 'badge bg-danger'">
                {{ user.status ? 'Actif' : 'Inactif' }}
              </span>
            </td>
            <td class="text-center">
              <button class="btn btn-sm action-btn" @click="openModal(user)" title="Voir les détails">
                <i class="fa-solid fa-eye" style="color: #070f69;"></i>
              </button>
              <RouterLink :to="{ path: `/edit-user/${user.id}` }">
                <button class="btn btn-sm modify-btn" title="Modifier">
                  <i class="fa-solid fa-pen-to-square" style="color: #070f69;"></i>
                </button>
              </RouterLink>
              <button class="btn btn-sm action-btn" @click="destroyUser(user.id)" title="Supprimer">
                <i class="fa-solid fa-trash" style="color: #e30d0d;"></i>
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
          <p><strong>Rôle :</strong> {{ selectedUser.role }}</p>
          <p><strong>Statut :</strong> {{ selectedUser.status ? 'Actif' : 'Inactif' }}</p>
          <p><strong>Téléphone :</strong> {{ selectedUser.phone }}</p>
          <p><strong>Adresse :</strong> {{ selectedUser.address }}</p>
        </div>
        <button class="btn btn-danger" @click="closeModal">Fermer</button>
      </div>
    </div>
  </div>
</template> -->
  
<!-- <script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../../store/userStore';
  
const store = useUserStore();
const users = ref([]);
const searchTerm = ref('');
const afficheBtn = true;
const filteredUsers = ref([]);
  
onMounted(() => {
  store.fetchUsers().then(() => {
    users.value = store.users;
    filteredUsers.value = store.users;
  });
});
  
const filterUsers = () => {
  const term = searchTerm.value.toLowerCase();
  filteredUsers.value = users.value.filter(
    (user) =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
  );
};
  
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
  
const destroyUser = async (id) => {
  const confirmDelete = confirm('Voulez-vous vraiment supprimer cet utilisateur ?');
  if (confirmDelete) {
    await store.deleteUser(id);
  }
};
</script>
   -->
<!-- <style scoped>
.container {
  padding-top: 70px;
}

.search-input {
  border-radius: 30px;
  padding: 8px 16px;
  width: 250px;
}

.search-btn {
  border-radius: 30px;
  padding: 8px 16px;
  background-color: #070f69;
  border: none;
}

.search-btn:hover {
  background-color: #0544a1;
}

.add-user-btn {
  background-color: #070f69;
  border-radius: 30px;
  padding: 10px 20px;
  color: white;
}

.add-user-btn:hover {
  background-color: #0544a1;
}

.table {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}

.table-light th {
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.05em;
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
  width: 100%;
  max-width: 500px;
}

.action-btn {
  background-color: #fff;
  border: none;
}

.action-btn i {
  font-size: 20px;
  color: #070f69;
}

.action-btn:hover {
  background-color: #f0f0f0;
}

.modify-btn {
  background-color: #FFA500;  /* Changement de la couleur ici */
  border-radius: 30px;
  color: white;
  padding: 8px 16px;
}

.modify-btn:hover {
  background-color: #e68900;  /* Couleur de survol plus foncée */
}

.badge {
  padding: 5px 10px;
  font-size: 12px;
}

.badge.bg-success {
  background-color: #28a745;
  color: white;
}

.badge.bg-danger {
  background-color: #dc3545;
  color: white;
}
</style> -->
