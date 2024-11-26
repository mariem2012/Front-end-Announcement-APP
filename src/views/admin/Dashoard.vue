
 <!-- <template>
  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-light fixed-top">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <img src="../../assets/images/logo.svg" alt="Logo" class="logo d-inline-block align-top" />
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
            <li class="nav-item" v-if="isLoggedIn" @click="handleLogout()">
              <router-link
                :to="'/login'"
                class="nav-link btn btn-outline d-flex align-items-center"
              >
                <i class="fa-solid fa-right-to-bracket me-2"></i>
                Déconnexion
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="sidebar bg-light shadow-sm">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/" class="nav-link d-flex align-items-center">
            <i class="fa-solid fa-home me-2"></i> Tableau de bord
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/list-category" class="nav-link d-flex align-items-center">
            <i class="fa-solid fa-list me-2"></i> Catégories
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/list-announcement" class="nav-link d-flex align-items-center">
            <i class="fa-solid fa-bullhorn me-2"></i> Annonces
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/list-user" class="nav-link d-flex align-items-center">
            <i class="fa-solid fa-users me-2"></i> Utilisateurs
          </router-link>
        </li>
      </ul>
      <hr />
      <div class="user-info">
        <div class="dropdown">
          <a
            href="#"
            class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              class="rounded-circle me-2"
            />
            <strong>{{ user.name }}</strong>
          </a>
          <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>
    </div>

  
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '../../store/authStore';

const user = reactive({
  name: 'Fatouma Cisse',
  email: 'cfama673@gmail.com',
});

const authStore = useAuthStore();
const isLoggedIn = ref(false);

const handleLogout = async () => {
  await authStore.logout();
  isLoggedIn.value = false;
  console.log('Déconnecté');
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: row;
}

.navbar {
  background-color: #F8F7F4;
  z-index: 1000;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.navbar .nav-link {
  font-weight: bold;
}

.navbar .nav-link:hover {
  color: #FFA500;
}

.logo {
  font-weight: bold;
  max-width: max-content;
}

.sidebar {
  width: 280px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 4rem; 
  background-color: #F8F7F4;
  overflow-y: auto;
}

.sidebar .nav-link {
  font-size: 1rem;
  font-weight: 500;
  padding: 0.8rem 1rem;
  color: #333;
  transition: background-color 0.3s ease;
}

.sidebar .nav-link:hover {
  background-color: #FFA500;
  color: #fff;
  border-radius: 4px;
}

.sidebar .user-info {
  margin-top: auto;
  padding: 1rem;
  text-align: center;
}

.content {
  margin-left: 280px;
  margin-top: 4rem; 
  padding: 1rem;
  flex-grow: 1;
  background-color: #FAFAFA;
}
</style> -->



<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top">
      <div class="container">
        <a class="navbar-brand" href="/">
          <img src="../../assets/images/logo.svg" alt="Logo" class="logo" />
        </a>

        <!-- Bouton Mode Sombre -->
        <!-- <button class="btn btn-link me-3" @click="toggleDarkMode">
          <i class="fas fa-moon"></i> Mode sombre
        </button> -->

        <!-- Liens principaux -->
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto">
            <!-- <li class="nav-item">
              <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">
                <i class="fa-solid fa-home me-2"></i> Accueil
              </router-link>
            </li> -->
            <li>
              <router-link to="/list-category" class="nav-link" :class="{ active: $route.path === '/list-category' }">
                <i class="fa-solid fa-list me-2"></i> Catégories
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/list-announcement" class="nav-link" :class="{ active: $route.path === '/list-announcement' }">
                <i class="fa-solid fa-bullhorn me-2"></i> Annonces
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/list-user" class="nav-link" :class="{ active: $route.path === '/list-user' }">
                <i class="fa-solid fa-users me-2"></i> Utilisateurs
              </router-link>
            </li>
          </ul>
        </div>

        <div class="d-flex align-items-center">
          <div class="dropdown">
            <!-- <button
              class="btn btn-link dropdown-toggle"
              type="button"
              id="userMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fas fa-user-circle fa-2x"></i> Mariem
            </button> -->
            <!-- <a
            href="#"
            class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
            id="dropdownUser2"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="../../assets/images/carnet.png"
              alt=""
              width="32"
              height="32"
              class="rounded-circle me-2"
            />
            <strong>{{ user.name }}</strong>
          </a> -->
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenu">
              <li><router-link to="/user-profil" class="dropdown-item">Profil</router-link></li>
              <li><router-link to="/settings" class="dropdown-item">Paramètres</router-link></li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <button class="dropdown-item" @click="handleLogout">
                  Déconnexion
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <!-- <Profil /> -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../store/authStore';
import { useUserStore } from '../../store/userStore';
// import Profil from '../advertiser/Profil.vue';

const authStore = useAuthStore();
const userStore = useUserStore();
const role = userStore.role;

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle('dark-mode', isDarkMode.value);
};

const handleLogout = async () => {
  await authStore.logout();
  console.log('Déconnecté');
};
</script>

<style scoped>
.navbar {
  background-color: #F8F7F4;
  z-index: 1000;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.nav-link {
  color: #333;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #FFA500;
}

.content {
  margin-top: 70px;
  padding: 1rem;
}

.btn {
  background-color: transparent;
  color: #070f69;
  border: 2px solid #070f69;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.btn:hover {
  color: #fff;
  background-color: #070f69;
}
</style>


