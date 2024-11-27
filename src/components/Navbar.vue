<!-- <template>
    <div id="app">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
          <router-link to="/" class="navbar-brand">
            <img src="../assets/images/logo.svg" alt="Logo" class="logo d-inline-block align-top" />
          </router-link>
  
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
  
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <router-link
                  :to="isLoggedIn ? '/add-annonce' : '/login'"
                  class="nav-link btn btn-outline d-flex align-items-center"
                >
                <i class="fa-solid fa-right-to-bracket me-2"></i>
                 Connexion
                </router-link>
              </li>
              <li class="nav-item" @click="handleLogout()">
                <router-link
                  :to="isLoggedIn ? '/add-annonce' : '/login'"
                  class="nav-link btn btn-outline d-flex align-items-center"
                >
                <i class="fa-solid fa-right-to-bracket me-2"></i>
                 Déonnexion
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  
      <router-view />
    </div>
  </template>




  
   -->



   <template>
    <div id="app">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
          <router-link to="/" class="navbar-brand">
            <img src="../assets/images/logo.svg" alt="Logo" class="logo d-inline-block align-top" />
          </router-link>
  
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
  
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li v-if="role=='ADMIN'">
                <router-link to="/list-category" class="nav-link link-text" :class="{ active: $route.path === '/list-category' }">
                  <i class="fa-solid fa-list me-2"></i> Catégories
                </router-link>
              </li>
              <li>
                <router-link :to="role ==='ADMIN' ?'/list-announcement': '/profil'" class="nav-link link-text" :class="{ active: $route.path === '/list-announcement' }">
                  <i class="fa-solid fa-bullhorn me-2"></i> Annonces
                </router-link>
              </li>
              <li v-if="role=='ADMIN'">
                <router-link to="/list-user" class="nav-link  link-text" :class="{ active: $route.path === '/list-user' }">
                  <i class="fa-solid fa-users me-2"></i> Utilisateurs
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  to="/publish"
                  class="nav-link btn btn-primary d-flex align-items-center me-3"
                >
                  <i class="fa-solid fa-plus me-2"></i>
                  Publier une annonce
                </router-link>
              </li>
  
              <li class="nav-item" v-if="!authStore.isAuthenticated">
              <router-link
                to="/login"
                class="nav-link btn btn-outline d-flex align-items-center"
              >
                <i class="fa-solid fa-right-to-bracket me-2"></i>
                Se connecter
              </router-link>
            </li>

            <!-- Bouton "Déconnexion" -->
            <li class="nav-item" title="Utilisateur" v-if="authStore.isAuthenticated">
              <router-link :to=" role === 'ADMIN' ? '/dashboard' :`/profil/${userId}`"
                class="nav-link btn btn-outline d-flex align-items-center"
              >
                <i class="fa-solid fa-user mt-1 me-2"></i>
              </router-link>
            </li>
            <li class="nav-item" v-if="authStore.isAuthenticated">
              <button
                @click="handleLogout"
                class="nav-link btn btn-outline d-flex align-items-center"
              >
                <i class="fa-solid fa-right-from-bracket me-2"></i>
                Déconnexion
              </button>
            </li>
            </ul>
          </div>
        </div>
      </nav>
  
      <router-view />
    </div>
  </template>
  
  <script setup>
  import { computed, ref } from "vue";
  import { useAuthStore } from '../store/authStore';
import router from "../routes";

    const authStore = useAuthStore();
const userId = (computed(()=> localStorage.getItem("userId")))
const role = computed(()=> localStorage.getItem("userRole"))

console.log("USER_ID", userId.value, "ROLE", role.value);

    const handleLogout = async () => {
      await authStore.logout();
      router.push("/")
    };
  </script>
  
  <style scoped>
  .navbar {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .logo {
    height: 40px;
  }
  
  .navbar-nav .btn-primary {
    background-color: none;
    border: 1px solid #070f69;
  }
  
  .navbar-nav .btn-primary:hover {
    background-color: #FFA500;
  }
  
  .navbar-nav .btn-outline {
    border-color: #ff6600;
  }
  

  
  .navbar-nav .btn-outline:hover {
    background-color: #FFA500;
    color: #fff;
  }
  </style>
  