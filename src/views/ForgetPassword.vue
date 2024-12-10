<template>
  <div class="container-fluid">
    <div class="register-container">
      <h2>Récupération de mot de passe</h2>
      <form @submit.prevent="handleForgotPassword">
        <div class="form-group">
          <label for="email">Adresse e-mail :</label>
          <div class="input-container">
            <span class="input-icon">
              <i class="fas fa-envelope"></i>
            </span>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              placeholder="Entrez votre adresse e-mail"
              required
            />
          </div>
        </div>
        <div class="button-group">
          <button type="submit" class="btn-submit">Recevoir un mail</button>
          <router-link class="btn-cancel" to="/login">Annuler</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useRoute, useRouter } from "vue-router";
import api from '../api';

const route = useRoute();
const router = useRouter();
const email = ref("");
const message = ref("");
const toast = useToast();

async function handleForgotPassword() {
  try {
    const response = await api.post(
      "/request-reset-password",
      { email: email.value }
    );
    message.value = response.data.message || "Lien de réinitialisation envoyé.";
    toast.success("Lien de réinitialisation envoyé ! \n Verifiez votre boite mail");
    router.push("/login");
  } catch (error) {
    message.value = error.response.data.message || "Erreur lors de l'envoi.";
    toast.error(message.value);
  }
  console.log("Valeur de l'email :", email.value);
}
</script>

<style scoped>
.container-fluid {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
}

.register-container {
  background: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  color: #555;
  margin-bottom: 8px;
  display: block;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 10px;
  color: #aaa;
  font-size: 1.2rem;
}

input.form-control {
  width: 100%;
  padding: 10px 10px 10px 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
}

input.form-control:focus {
  box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.btn-submit {
  flex: 1;
  margin-right: 10px;
  padding: 10px;
  background-color: #ffa500; /* Orange */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #e68a00; /* Orange foncé */
}

.btn-cancel {
  flex: 1;
  text-align: center;
  padding: 10px;
  background: none;
  color: #dc3545;
  border: 1px solid #dc3545;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.3s, color 0.3s;
}

.btn-cancel:hover {
  background-color: #dc3545;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .button-group {
    flex-direction: column;
  }

  .btn-submit,
  .btn-cancel {
    flex: none;
    width: 100%;
    margin: 5px 0;
  }
}
</style>
