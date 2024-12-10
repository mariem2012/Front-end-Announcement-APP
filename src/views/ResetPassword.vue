<!-- <template>
  <div class="container-fluid">
    <div class="register-container">
    <h2>Recupération de mot de passe</h2>
    <form @submit.prevent="handleResetPassword">
      
      <div class="form-group">
        <label for="pass">Nouveau Mot De Passe :</label>
        <input type="password" id="pass" v-model="newPassword" required />
      </div>
      <div class="form-group">
        <label for="passwrd">Confirmer le Mot De Passe :</label>
        <input type="password" id="passwrd" v-model="confirmPassword" required />
      </div>
      <button type="submit">Enregistrer</button>
      <router-link class="annuler " to="/login">Annuler</router-link>
    </form>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
  </div>
 
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import api from "../api";


const newPassword = ref("");
const confirmPassword = ref("");
const message = ref("");
const route = useRoute();
const router = useRouter();
const toast = useToast();

async function handleResetPassword() {
  if (newPassword.value !== confirmPassword.value) {
    message.value = "Les mots de passe ne correspondent pas.";
    toast.error("Les mots de passe ne correspondent pas.");
    console.log({
  token: route.query.token,
  newPassword: newPassword.value,
});

    return;
  }

  try {
    const token = route.query.token;
    const response = await api.post(
      "/reset-password",
      {
        token,
        newPassword: newPassword.value,
      }

    );
    message.value =
      response.data.message || "Mot de passe réinitialisé avec succès.";
    toast.success("Mot de passe réinitialisé avec succès !");
    router.push("/");
  } catch (error) {
    message.value =
      error.response.data.message || "Erreur de réinitialisation.";
    toast.error("Erreur de réinitialisation.");
  }
}
</script>

<style scoped>
.container-fluid{
  /* background-image: url(../../assets/pexels-codioful-7134986.jpg); */
  width: 100%;
  height: 100vh;
  margin: 0;
  padding-top: 130px;
  filter: blur(100);
}
.register-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
  font-size: 1.2rem;
}
.annuler{
  text-align: center;
  margin-left: 40%;
  margin-top: 50px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #218838;
}
p {
  text-align: center;
  margin-top: 10px;
}
a {
  color: #007bff;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style> -->



<template>
  <div class="container-fluid">
    <div class="register-container">
      <h2>Récupération de mot de passe</h2>
      <form @submit.prevent="handleResetPassword">
        <div class="form-group">
          <!-- <label for="pass">Nouveau Mot De Passe :</label> -->
          <div class="input-container">
            <i class="fa fa-lock"></i>
            <input
              :type="showPassword ? 'text' : 'password'"
              id="pass"
              v-model="newPassword"
              placeholder="Entrez votre nouveau mot de passe"
              required
            />
            <i
              class="fa"
              :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
              @click="toggleShowPassword"
            ></i>
          </div>
        </div>
        <div class="form-group">
          <!-- <label for="passwrd">Confirmer le Mot De Passe :</label> -->
          <div class="input-container">
            <i class="fa fa-lock"></i>
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              id="passwrd"
              v-model="confirmPassword"
              placeholder="Confirmez votre mot de passe"
              required
            />
            <i
              class="fa"
              :class="showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'"
              @click="toggleShowConfirmPassword"
            ></i>
          </div>
        </div>
        <div class="button-group">
          <button type="submit" class="btn-save">Enregistrer</button>
          <router-link class="btn-cancel" to="/login">Annuler</router-link>
        </div>
      </form>
      <p v-if="message" class="message">{{ message }}</p>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import api from "../api";

const newPassword = ref("");
const confirmPassword = ref("");
const message = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const route = useRoute();
const router = useRouter();
const toast = useToast();

function toggleShowPassword() {
  showPassword.value = !showPassword.value;
}

function toggleShowConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value;
}

async function handleResetPassword() {
  if (newPassword.value !== confirmPassword.value) {
    message.value = "Les mots de passe ne correspondent pas.";
    toast.error("Les mots de passe ne correspondent pas.");
    return;
  }

  try {
    const token = route.query.token;
    const response = await api.post("/reset-password", {
      token,
      newPassword: newPassword.value,
    });
    message.value = response.data.message || "Mot de passe réinitialisé avec succès.";
    toast.success("Mot de passe réinitialisé avec succès !");
    router.push("/login");
  } catch (error) {
    message.value = error.response?.data?.message || "Erreur de réinitialisation.";
    toast.error("Erreur de réinitialisation.");
  }
}
</script>



<style scoped>
/* Global container */
.container-fluid {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
}

/* Card styling */
.register-container {
  background: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 1.5rem;
}

/* Form group */
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #666;
}

.input-container {
  position: relative;
}

input {
  width: 100%;
  padding: 10px 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
}

input:focus {
  /* border-color: #FFA500; */
  box-shadow: 0px 0px 5px rgba(7, 12, 17, 0.5);
}

/* Icons */
.input-container .fa {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #070f69;
  cursor: pointer;
}

.input-container .fa-lock {
  left: 10px;
}

.input-container .fa-eye,
.input-container .fa-eye-slash {
  right: 10px;
}

/* Buttons */
.button-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.btn-save {
  flex: 1;
  margin-right: 10px;
  padding: 10px;
  background-color: #070f69;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-save:hover {
  background-color: #FFA500;
}

.btn-cancel {
  flex: 1;
  text-align: center;
  padding: 10px;
  background: none;
  color: #dc3545;
  border: 1px solid #dc3545;
  border-radius: 5px;
  font-size: 1rem;
  text-decoration: none;
}

.btn-cancel:hover {
  background-color: #dc3545;
  color: #fff;
}

/* Message */
.message {
  margin-top: 20px;
  text-align: center;
  color: #666;
  font-size: 1rem;
}
</style>
