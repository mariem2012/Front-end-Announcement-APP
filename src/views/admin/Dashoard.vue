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

    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../store/authStore';
import { useUserStore } from '../../store/userStore';

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
  background-color: #FFF;
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


