<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Annonces App</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Accueil</router-link>
            </li>
            <li v-if="!isLoggedIn" class="nav-item">
              <router-link to="/login" class="nav-link">Connexion</router-link>
            </li>
            <li v-if="!isLoggedIn" class="nav-item">
              <router-link to="/register" class="nav-link">Inscription</router-link>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <button @click="handleLogout" class="nav-link btn btn-link">Déconnexion</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isLoggedIn = ref(false);
  
  const handleLogout = () => {
    // Logique de déconnexion
    isLoggedIn.value = false;
    console.log('Déconnecté');
  };
  </script>
  
  <style>
  .navbar {
    margin-bottom: 20px;
  }
  </style>
  