<template>
  <div class="auth-page">
    <div class="auth-container">
      <h2 class="text-center mb-4">Inscription</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group mb-3">
          <label for="name">Nom</label>
          <input type="text" v-model="name" class="form-control" id="name" placeholder="Entrez votre nom complet" required />
        </div>
        <div class="form-group mb-3">
          <label for="email">Email</label>
          <input type="email" v-model="email" class="form-control" id="email" placeholder="Entrez votre email" required />
        </div>
        <div class="form-group mb-3">
          <label for="password">Mot de passe</label>
          <input type="password" v-model="password" class="form-control" id="password" placeholder="Entrez votre mot de passe" required />
        </div>
        <button type="submit" class="btn w-100">Créer un compte</button>
      </form>
      <p class="text-center mt-3">
        Déjà inscrit ? <router-link to="/login">Connectez-vous</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const password = ref('');

const handleRegister = () => {
  // Logique d'inscription
  console.log('Inscription avec', name.value, email.value, password.value);
};
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #FFFF;
}

.auth-container {
  max-width: 600px;
  margin-top: 60px;
  padding: 30px;
  background: #FFA500;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

input {
  /* border: 1px solid #0A0F43; */
  border: none;
  outline: none;
}

.btn {
  background-color: #070f69;
  color: #FFFF;
}

label {
  color: #070f69;
}

div p {
  color: #070f69;
}
</style>
