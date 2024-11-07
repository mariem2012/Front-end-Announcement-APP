<template>
  <div class="auth-page">
    <div class="auth-container">
      <h2 class="text-center mb-4">Connexion</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group mb-3">
          <label for="email">Email</label>
          <input type="email" v-model="email" class="form-control" id="email" placeholder="Entrez votre email" required />
        </div>
        <div class="form-group mb-3">
          <label for="password">Mot de passe</label>
          <input type="password" v-model="password" class="form-control" id="password" placeholder="Entrez votre mot de passe" required />
        </div>
        <button type="submit" class="btn w-100">Se connecter</button>
      </form>
      <p class="text-center mt-3">
        Pas encore inscrit ? <router-link to="/register">Créez un compte</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const handleLogin = () => {
  console.log('Connexion avec', email.value, password.value);
};
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.auth-container {
  margin-top: 60px;
  max-width: 400px;
  padding: 30px;
  background: white;
  border-radius: 8px;
  border: 1px solid #FFA500;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

input {
  /* border: 1px solid #0A0F43; */
  border: 1px solid #070f69;
  outline: none;
}

.btn {
  background-color: #FFA500;
  color: #FFFF;
}

div p {
  color: #070f69;
}
</style>
