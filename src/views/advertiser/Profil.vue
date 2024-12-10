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
    <div>
      <div class="card shadow-sm" style="background-color: #f8f9fa; border-radius: 15px;">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-4" style="background-color: #e9ecef; padding: 20px; border-radius: 15px;">
            <div class="d-flex align-items-center">
              <img
                :src="user.profilePicture || 'https://cdn-icons-png.flaticon.com/512/456/456212.png'"
                alt="Profile Picture"
                class="rounded-circle me-3 shadow"
                style="
                  width: 100px;
                  height: 100px;
                  object-fit: cover;
                  border: 3px solid #218838;
                "
              />

              <div>
                <h4 class="mb-1" style="color: #218838;">{{ user.name }}</h4>
                <p class="text-muted mb-0"><i class="fa fa-envelope me-2"></i>{{ user.email }}</p>
                <small class="text-muted"><i class="fa fa-map-marker me-2"></i>{{ user.address }}</small>
              </div>
            </div>
            <router-link
              class="btn btn-outline-primary"
              to="/add-announcement"
            >
              Ajouter une annonce
            </router-link>
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
          
          <div class="container">
          <div class="row row-cols-1 row-cols-md-2 g-4">
            <div 
              class="col"
              v-for="(annonce, index) in announcements.sort((a,b)=> b.id -a.id)"
              :key="index"
            >
                  <div class="card shadow-lg rounded-4 border-0 mb-4">
                    <img 
                    :src="annonce.picture[0]" 
                  class="card-img-top rounded-top-4" 
                  alt="Image du projet"
                  style="height: 200px; width: 90%; object-fit: cover;"
                >
                    <div class="card-body text-start">
                      <h5 class="card-title fw-bold text-primary">{{ annonce.title }}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item desc-description border-0 text-start">
                {{ annonce.description.length > 30 ? annonce.description.slice(0, 30) + '...' : annonce.description }}
              </li>

                  
                  <li class="list-group-item border-0 text-muted text-start">
                    <small>
                      <i class="fa fa-calendar"></i>  {{ formatDate(annonce.publish_date) }} 
                    </small>
                    
                  </li>
                  <li class="list-group-item border-0 text-muted text-start">
                    <small>
                      <i class="fa fa-calendar"></i>  {{ annonce.price }} 
                    </small>
                  </li>
                </ul>
                <div class="card-body d-flex justify-content-between">
                  <button 
                    type="button" 
                    class="btn btn-outline-primary rounded-pill px-3"
                    title="Modifier"
                    @click="router.push(`/edit-announcement/${annonce.id}`)"
                    >
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </button>
                  <button 
                    type="button" 
                    class="btn btn-outline-secondary rounded-pill px-3"
                    title="Affichier"
                    @click="show(annonce.id)"
                    >
                    <i class="fa fa-eye" aria-hidden="true"></i>
                  </button>
                  <button 
                    type="button" 
                    class="btn btn-outline-danger rounded-pill px-3"
                    title="Supprimer"
                    @click="deleteAnnouncement(annonce.id)"
                  >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
              <list-announcement :desable-list="false" :annonce="annonceDetail" @update:modalVisible="modalVisible = $event" :modalVisible="modalVisible" />
            </div>
          </div>
        </div>
        
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
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
              <input type="tel" id="phone" class="form-control" v-model="editForm.phone" />
            </div>
            <div class="text-end">
              <button type="button" class="btn btn-secondary me-2" data-bs-dismiss="modal">Annuler</button>
              <router-link
                class="btn btn-warning me-2"
                to="/put/password"
              >
                Modifier le mot de passe
              </router-link>
              <button class="btn btn-success">Enregistrer</button>
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
import router from '../../routes';
import { useToast } from 'vue-toastification';
import ListAnnouncement from '../../components/announcements/ListAnnouncement.vue';
const route = useRoute();
const userId = parseInt(route.params.id);
const toast = useToast()

const userStore = useUserStore();
const announcementStore = useAnnouncementStore();

const user = ref({});
const announcements = ref([]);
const editForm = ref({
  name: '',
  email: '',
  address: '',
  phone: '',
});

const annonceDetail = ref({
  title: "",
  description: "",
  price: "",
  publish_date: "",
  category_id: "",
  status: ""
})
const modalVisible = ref(false)

// Charger le profil utilisateur
async function loadUserProfile() {
  try {
    const fetchedUser = await userStore.fetchUserById(userId);
    if (fetchedUser) {
      user.value = fetchedUser;
      Object.assign(editForm.value, fetchedUser); // Synchroniser les données pour l'édition
    } else {
      console.error('Aucune donnée utilisateur trouvée.');
    }
  } catch (error) {
    console.error('Erreur lors du chargement du profil utilisateur :', error);
  }
}

// Charger les annonces de l'utilisateur
async function loadUserAnnouncements() {
  try {
    announcements.value = await announcementStore.fetchAnnouncementsByUserId(userId)
    console.log(announcements.value);
    return announcements
    
  } catch (error) {
    console.error('Erreur lors du chargement des annonces :', error);
  }
}

function show(id) {
  const a = announcements.value.find(a => a.id === id);
  annonceDetail.value.title = a.title
  annonceDetail.value.description = a.description
  annonceDetail.value.price = a.price
  annonceDetail.value.publish_date = a.publish_date
  annonceDetail.value.category_id = a.category_id
  annonceDetail.value.status = a.status
  
  modalVisible.value = true;
}



function formatDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Charger les données lors de la création du composant
onMounted(async () => {
  try {
    await loadUserProfile();
    await loadUserAnnouncements();
  } catch (error) {
    console.error('Erreur globale lors du chargement des données :', error);
  }
});

async function updateProfile() {
  try {
    await userStore.updateUser(userId, editForm.value);
    await loadUserProfile();
    toast.success('Profil mis à jour avec succès !');
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil :', error);
    toast.success('Erreur lors de la mise à jour du profil :', error);

  }
}



const deleteAnnouncement = async(id) => {
  if (confirm("Voulez-vous vraiment supprimer cette annonce ?")) {
   await announcementStore.deleteAnnouncement(id);
   await loadUserAnnouncements()
   toast.success('Annonce supprimer avec sucés')
  }
};
</script>



