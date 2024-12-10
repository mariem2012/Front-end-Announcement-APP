<template>
    <div>
    <nav class="navbar navbar-light bg-light">
        <div class="container">
          <router-link to="/" class="navbar-brand">
            <img src="../assets/images/logo.svg" alt="Logo" class="logo" />
          </router-link>
          <div>
            <router-link to="/" class="btn">Quitter</router-link>
          </div>
        </div>
      </nav>
  </div>
  <div class="auth-page">
    <div class="auth-container">
      <h2 class="text-center mb-4">Inscription</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group mb-3 input-with-icon">
          <!-- <label for="name">Nom complet</label> -->
          <input
            type="text"
            v-model="name"
            class="form-control"
            id="name"
            placeholder="Entrez votre nom complet"
            required
          />
          <small class="text-danger">{{ errors.name }}</small>
        </div>

        <div class="form-group mb-3 input-with-icon">
          <!-- <label for="email">Email</label> -->
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-envelope"></i>
            </span>
            <input
              type="email"
              v-model="email"
              class="form-control"
              id="email"
              placeholder="Entrez votre email"
              required
            />
          </div>
          <small class="text-danger">{{ errors.email }}</small>
        </div>

        <div class="form-group mb-3 input-with-icon">
          <!-- <label for="password">Mot de passe</label> -->
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-lock"></i>
            </span>
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="form-control"
              id="password"
              placeholder="Entrez votre mot de passe"
              required
            />
            <span class="input-group-text toggle-password" @click="toggleShowPassword">
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </span>
            <small class="text-danger">{{ errors.password }}</small>
          </div>
        </div>

        <div class="form-group mb-3 input-with-icon">
          <!-- <label for="phone">Numéro de téléphone</label> -->
          <input
            type="tel"
            v-model="phone"
            class="form-control"
            id="phone"
            placeholder="Entrez votre numéro de téléphone"
            required
          />
          <small class="text-danger">{{ errors.phone }}</small>
        </div>

        <div class="form-group mb-3 input-with-icon">
          <!-- <label for="address">Adresse</label> -->
          <input
            type="text"
            v-model="address"
            class="form-control"
            id="address"
            placeholder="Entrez votre adresse"
            required
          />
          <small class="text-danger">{{ errors.address }}</small>
        </div>

        <button type="submit" class="btn w-100">S'inscrire</button>
      </form>

      <p class="text-center mt-3">
        Déjà inscrit ? <router-link to="/login" class="link">Connectez-vous</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';
import { computed } from "vue";
import { useToast } from 'vue-toastification';


const toast = useToast()



const name = ref('');
const email = ref('');
const password = ref('');
const phone = ref('');
const address = ref('');
const showPassword = ref(false); // Contrôle pour afficher/masquer le mot de passe
const router = useRouter()
const authStore = useAuthStore();

const errors = ref({});
  const serverErrors = ref([]);

  
  watch(serverErrors, (newErrors) => {
    errors.value = {};
    newErrors.forEach((err) => {
      if (err.path === "name") {
      errors.value.name = err.msg;
    }
    if (err.path === "email") {
      errors.value.email = err.msg;
    }
    if (err.path === "password") {
      errors.value.password = err.msg;
    }
    if (err.path === "phone") {
      errors.value.phone = err.msg;
    }
    if (err.path === "address") {
      errors.value.address = err.msg;
    }
    });
  });


const handleRegister = async () => {
  try {
    const userData = {
      name: name.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
      address: address.value,
    };

    await authStore.register(userData);
    const userId = (computed(()=> localStorage.getItem("userId")))
    const role = computed(()=> localStorage.getItem("userRole"))
    console.log("USER_ID", userId.value, "ROLE", role.value);


    router.push({ path: `/profil/${userId}` });
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    if (error.response && error.response.data.errors) {
      serverErrors.value = error.response.data.errors;
    } else {
      toast.error('Erreur lors de l\'ajout de l\'annonce. Veuillez réessayer.');
    }
  }
};


const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped>
/* Design principal */
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #F8F7F4; 
}

.auth-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #fff; /* Fond blanc */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #070f69; /* Bleu foncé */
}

.input-group-text {
  background-color: #F8F7F4; /* Beige clair */
  /* border: 1px solid #FFA500;  */
  color: #070f69; /* Bleu foncé */
}

.toggle-password {
  cursor: pointer;
}



.form-control:focus {
  border-color: #070f69; 
  box-shadow: 0 0 5px rgba(7, 15, 105, 0.5);
}

.btn {
  background-color: #FFA500; /* Bouton orange */
  color: #fff;
  border: none;
}

.btn:hover {
  background-color: #070f69; /* Bleu foncé */
  color: #fff;
}

.link {
  color: #070f69; /* Lien bleu foncé */
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.navbar {
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  /* .logo {
    height: 40px;
  } */
  
  .buttons .btn-primary {
    background-color: #FFA500;
    border: none;
  }
  
  .buttons .btn-outline-primary {
    border-color: #FFA500;
    color: #FFA500;
  }
  
  .buttons .btn-outline-primary:hover {
    background-color: #070f69;
    border: none;
    color: #fff;
  }

  .container.text-center.mt-5 {
  background-color: #ffffff; 
  padding: 30px; 
  border-radius: 10px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  max-width: 800px; 
  margin: 0 auto; 
}
 
  
  img {
    max-width: 100%;
    height: auto;
  }
</style>
