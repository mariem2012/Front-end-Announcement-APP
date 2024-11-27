 <!-- <template>
  <Navbar />
  <div class="container mt-5">
    <div v-if="loading" class="text-center my-5">
      <p>Chargement...</p>
    </div>
    <div v-else>
      <div class="card shadow-sm" style="background-color: #f8f9fa; border-radius: 15px;">
        <div class="card-body">
          <div
            class="d-flex justify-content-between align-items-center mb-4"
            style="background-color: #e9ecef; padding: 20px; border-radius: 15px;"
          >
            <div class="d-flex align-items-center">
              <img
                :src="user.profilePicture || 'https://via.placeholder.com/100'"
                alt="Profile Picture"
                class="rounded-circle me-3"
                style="width: 100px; height: 100px; object-fit: cover; border: 3px solid #218838;"
              />
              <div>
                <h4 class="mb-1" style="color: #218838;">{{ user.name }}</h4>
                <p class="text-muted mb-0"><i class="fa fa-envelope me-2"></i>{{ user.email }}</p>
                <small class="text-muted"><i class="fa fa-map-marker me-2"></i>{{ user.address }}</small>
              </div>
            </div>
            <button
              class="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#editProfileModal"
            >
              Modifier le profil
            </button>
          </div>

          <p class="mt-4" style="font-size: 1.1rem; color: #343a40;">
            <i class="fa fa-phone me-2"></i> {{ user.phone }}
          </p>

          <h5 class="mt-4 mb-3" style="color: #218838;">Annonces récentes</h5>
          <div v-if="announcements.length > 0" class="row">
            <div
              v-for="annonce in announcements"
              :key="annonce.id"
              class="col-md-4 mb-3"
            >
              <div
                class="card h-100"
                style="border: 1px solid #218838; border-radius: 10px; overflow: hidden;"
              >
                <img
                  :src="annonce.image || 'https://via.placeholder.com/150'"
                  class="card-img-top"
                  :alt="annonce.title"
                  style="height: 150px; object-fit: cover;"
                />
                <div class="card-body" style="background-color: #e9ecef;">
                  <h6 class="card-title mb-2" style="color: #218838;">{{ annonce.title }}</h6>
                  <p class="card-text text-muted">{{ annonce.shortDescription }}</p>
                </div>
              </div>
            </div>
          </div>
          <p v-else class="text-center text-muted">Aucune annonce trouvée pour cet utilisateur.</p>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="editProfileModal"
    tabindex="-1"
    aria-labelledby="editProfileModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editProfileModalLabel">Modifier le profil</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateProfile">
            <div class="mb-3">
              <label for="name" class="form-label">Nom</label>
              <input
                type="text"
                id="name"
                class="form-control"
                v-model="editForm.name"
                required
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                id="email"
                class="form-control"
                v-model="editForm.email"
                required
              />
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Adresse</label>
              <input
                type="text"
                id="address"
                class="form-control"
                v-model="editForm.address"
              />
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">Téléphone</label>
              <input
                type="text"
                id="phone"
                class="form-control"
                v-model="editForm.phone"
              />
            </div>
            <div class="text-end">
              <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Annuler</button>
              <button type="submit" class="btn btn-success">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../../api.js';

const route = useRoute();
const userId = parseInt(route.params.id);

const user = ref({});
const announcements = ref([]);
const loading = ref(true);

const showEditModal = ref(false);
const editForm = ref({
  name: '',
  email: '',
  address: '',
  phone: '',
});

async function fetchUserProfile(userId) {
  try {
    const response = await api.get(`/users/${userId}`);
    if (response && response.data) {
      user.value = response.data;
      Object.assign(editForm.value, response.data); 
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du profil utilisateur :", error);
  }
}

async function fetchAnnouncementsByUserId(userId) {
  try {
    const response = await api.get(`/announcements/annouceUser/${userId}`);
    if (response && response.data) {
      announcements.value = response.data;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des annonces pour cet utilisateur :', error);
  }
}

async function updateProfile() {
  try {
    const response = await api.put(`/userprofile`, editForm.value);
    if (response && response.data) {
      user.value = response.data; 
      showEditModal.value = false; 
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil :', error);
  }
}

onMounted(async () => {
  loading.value = true;
  await Promise.all([fetchUserProfile(userId), fetchAnnouncementsByUserId(userId)]);
  loading.value = false;
});
</script>
 -->



 <template>
  <Navbar />
  <div class="container mt-5">
    <!-- Loader -->
    <div v-if="loading" class="text-center my-5">
      <p>Chargement...</p>
    </div>
    <div v-else>
      <!-- Profil utilisateur -->
      <div class="card shadow-sm" style="background-color: #f8f9fa; border-radius: 15px;">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-4" style="background-color: #e9ecef; padding: 20px; border-radius: 15px;">
            <div class="d-flex align-items-center">
              <img
                :src="user.profilePicture || 'https://via.placeholder.com/100'"
                alt="Profile Picture"
                class="rounded-circle me-3"
                style="width: 100px; height: 100px; object-fit: cover; border: 3px solid #218838;"
              />
              <div>
                <h4 class="mb-1" style="color: #218838;">{{ user.name }}</h4>
                <p class="text-muted mb-0"><i class="fa fa-envelope me-2"></i>{{ user.email }}</p>
                <small class="text-muted"><i class="fa fa-map-marker me-2"></i>{{ user.address }}</small>
              </div>
            </div>
            <button
              class="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#editProfileModal"
            >
              Modifier le profil
            </button>
          </div>

          <p class="mt-4" style="font-size: 1.1rem; color: #343a40;">
            <i class="fa fa-phone me-2"></i> {{ user.phone }}
          </p>

          <!-- Annonces utilisateur -->
          <h5 class="mt-4 mb-3" style="color: #218838;">Annonces récentes</h5>
          <div v-if="announcements.length > 0" class="row">
            <div v-for="annonce in announcements" :key="annonce.id" class="col-md-4 mb-3">
              <div class="card h-100" style="border: 1px solid #218838; border-radius: 10px;">
                <img
                  :src="annonce.image || 'https://via.placeholder.com/150'"
                  class="card-img-top"
                  :alt="annonce.title"
                  style="height: 150px; object-fit: cover;"
                />
                <div class="card-body" style="background-color: #e9ecef;">
                  <h6 class="card-title mb-2" style="color: #218838;">{{ annonce.title }}</h6>
                  <p class="card-text text-muted">{{ annonce.shortDescription }}</p>
                </div>
              </div>
            </div>
          </div>
          <p v-else class="text-center text-muted">Aucune annonce trouvée pour cet utilisateur.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal pour modifier le profil -->
  <div
    class="modal fade"
    id="editProfileModal"
    tabindex="-1"
    aria-labelledby="editProfileModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editProfileModalLabel">Modifier le profil</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateProfile">
            <div class="mb-3">
              <label for="name" class="form-label">Nom</label>
              <input type="text" id="name" class="form-control" v-model="editForm.name" required />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" class="form-control" v-model="editForm.email" required />
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Adresse</label>
              <input type="text" id="address" class="form-control" v-model="editForm.address" />
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">Téléphone</label>
              <input type="text" id="phone" class="form-control" v-model="editForm.phone" />
            </div>
            <div class="text-end">
              <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Annuler</button>
              <button type="submit" class="btn btn-success">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '../../store/userStore';
import { useAnnouncementStore } from '../../store/announcementStore';

const route = useRoute();
const userId = parseInt(route.params.id);

// Stores
const userStore = useUserStore();
const announcementStore = useAnnouncementStore();

// States
const loading = ref(true);
const user = ref({});
const announcements = ref([]);
const editForm = ref({
  name: '',
  email: '',
  address: '',
  phone: '',
});

// Méthodes
async function loadUserProfile() {
  try {
    const fetchedUser = await userStore.fetchUserById(userId);
    if (fetchedUser) {
      user.value = fetchedUser;
      Object.assign(editForm.value, fetchedUser);
    } else {
      console.error("Aucune donnée utilisateur trouvée.");
    }
  } catch (error) {
    console.error("Erreur lors du chargement du profil utilisateur :", error);
  }
}

async function loadUserAnnouncements() {
  try {
    const fetchedAnnouncements = await announcementStore.fetchAnnouncementsByUserId(userId);
    if (fetchedAnnouncements && fetchedAnnouncements.length > 0) {
      announcements.value = fetchedAnnouncements;
    } else {
      console.warn("Aucune annonce trouvée pour cet utilisateur.");
    }
  } catch (error) {
    console.error("Erreur lors du chargement des annonces :", error);
  }
}

onMounted(async () => {
  loading.value = true;
  try {
    await Promise.all([loadUserProfile(), loadUserAnnouncements()]);
  } catch (error) {
    console.error("Erreur globale lors du chargement des données :", error);
  } finally {
    loading.value = false;
  }
});

</script>
