<template>
  <div class="reset-password">
    <form
      @submit.prevent="handleResetPassword"
      class="formulaire form mb-5 shadow p-3 mb-5 bg-body rounded"
    >
      <div class="mb-3">
        <label class="mb-2" for="oldPassword">Ancien mot de passe</label>
        <div class="input-group">
          <input
            type="password"
            class="form-control"
            v-model="oldPassword"
            id="oldPassword"
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="togglePassword"
          >
            <i :class="eyeIconClass"></i>
          </button>
        </div>
      </div>
      <div class="mb-3">
        <label class="mb-2" for="newPassword">Nouveau mot de passe</label>
        <div class="input-group">
          <input
            type="password"
            class="form-control"
            v-model="newPassword"
            id="newPassword"
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="togglenewPassword"
          >
            <i :class="eyeIconClass"></i>
          </button>
        </div>
      </div>

      <button class="clr btn text-white mt-3 mb-4 me-3">
        Confirmer
      </button>
      <RouterLink
        class="list text-decoration-none text-white me-5 fw-bold"
        to="/login"
      >
        <button class="btn btn-danger mt-3 mb-4">
          Annuler
        </button>
      </RouterLink>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
const newPassword = ref("");
const oldPassword = ref("");

const eyeIconClass = ref("fas fa-eye");

import { getCurrentInstance } from "vue";
import { useAuthStore } from "../store/authStore";
import api from "../api";
const { proxy } = getCurrentInstance();
const toast = useToast();
const authStore = useAuthStore()
async function handleResetPassword() {
  try {
    await api.put("/users/user/change-password", {
      currentPassword: oldPassword.value,
      newPassword: newPassword.value,
    });

    toast.success("Mot de passe changé avec succès !");

    oldPassword.value = "";
    newPassword.value = "";

    proxy.$router.push("/login");
    authStore.logout()
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Erreur lors de la modification du mot de passe.";
    toast.error(errorMessage);
  }
}

const togglePassword = () => {
  const passwordInput = document.getElementById("oldPassword");
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";

  // eyeIconClass.value = isPassword ? "fas fa-eye-slash" : "fas fa-eye";
  eyeIconClass.value = isPassword ? "fas fa-eye-slash" : "fas fa-eye";
  console.log("Toggled password visibility:", eyeIconClass.value);
};
const togglenewPassword = () => {
  const passwordInput = document.getElementById("newPassword");
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";

  // eyeIconClass.value = isPassword ? "fas fa-eye-slash" : "fas fa-eye";
  eyeIconClass.value = isPassword ? "fas fa-eye-slash" : "fas fa-eye";
  console.log("Toggled password visibility:", eyeIconClass.value);
};
</script>


<style scoped>
.clr {
  background-color: #343a40;
}
.clr:hover {
  background-color: #24272a;
}
input {
  width: 100%;
  margin: auto;
}
.formulaire {
  width: 40%;
  border-radius: 10px;
  padding: 20px;
  margin: auto;
  margin-top: 16vh;
}
textarea {
  resize: none;
}
.message {
  margin-top: 1rem;
  text-align: center;
  color: red;
}
</style>
