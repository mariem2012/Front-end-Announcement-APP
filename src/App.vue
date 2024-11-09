<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <img src="./assets/images/logo.svg" alt="Logo" class="logo d-inline-block align-top" />
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
              <router-link to="/" class="nav-link d-flex align-items-center">
                <i class="fa-solid fa-house mx-2"></i> 
                Accueil
              </router-link>
            </li>
            <!-- <li class="nav-item">
              <router-link
                :to="isLoggedIn ? '/add-annonce' : '/login'"
                class="nav-link btn btn-outline d-flex align-items-center"
              >
              <i class="fa-solid fa-right-to-bracket me-2"></i>
               Connexion
              </router-link>
            </li> -->
            <li class="nav-item">
              <router-link
                to="/list-user"
                class="nav-link d-flex align-items-center"
              >
                <i class="fa-solid fa-users mx-2"></i>
                <span>Users</span>
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                to="/list-announcement"
                class="nav-link d-flex align-items-center"
              >
                <i class="fa-solid fa-bullhorn mx-2"></i>
                <span>Annonces</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script setup>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { ref } from 'vue';

const isLoggedIn = ref(false);

// Fonction de déconnexion
const handleLogout = () => {
  isLoggedIn.value = false;
  console.log('Déconnecté');
};
</script>

<style>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.nav-link {
  font-size: 1em;
  font-weight: bold;
}

.nav-link:hover {
  color: #FFA500;
}

.logo {
  font-weight: bold;
  max-width: max-content;
}

</style>


<!-- <template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img src="./assets/images/logo.svg" alt="Logo"  class="logo d-inline-block align-top" />
        </a>
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
                <router-link to="/" class="nav-link">Accueil</router-link>
              </li>
              <li v-if="!isLoggedIn" class="nav-item">
                <router-link to="/login" class="nav-link">Connexion</router-link>
              </li>
              <li v-if="!isLoggedIn" class="nav-item">
                <router-link to="/register" class="nav-link">Inscription</router-link>
              </li>
              
              <li v-if="isLoggedIn" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Mon Compte
            </a>
            <ul class="dropdown-menu" aria-labelledby="userDropdown">
              <li><router-link to="/" class="dropdown-item">Profil</router-link></li>
              <li><router-link to="/" class="dropdown-item">Paramètres</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><button @click="handleLogout" class="dropdown-item">Déconnexion</button></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import { ref } from 'vue';
  
  const isLoggedIn = ref(false);
  
  const handleLogout = () => {
    isLoggedIn.value = false;
    console.log('Déconnecté');
  };

</script>

<style>

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1)
}

.nav-link {
  font-size: 1em;
  font-weight: bold;
}

.nav-link:hover {
  color: #FFA500;
}

.logo {
  font-weight: bold;
  max-width: max-content;
} -->




<!-- </style> -->
