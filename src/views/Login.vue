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
      <h2 class="text-center mb-4">Connexion</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group mb-3">
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
        <div class="form-group mb-3 position-relative">
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
            <span class="input-group-text toggle-password" @click="togglePasswordVisibility">
              <svg
                v-if="showPassword"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-eye-off"
              >
                <path
                  d="M17.94 17.94A10.05 10.05 0 0 1 12 19.5a10 10 0 0 1-9.5-6 9.97 9.97 0 0 1 1.64-2.01M12 5.5a10 10 0 0 1 9.5 6 9.97 9.97 0 0 1-1.64 2.01M3 3l18 18"
                ></path>
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-eye"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </span>
            <small class="text-danger">{{ errors.password }}</small>
          </div>
        </div>
        <button type="submit" class="btn w-100">Se connecter</button>
      </form>
      <p class="text-center mt-3">
        <router-link to="/forgetpassword" class="link">Mot de passe oublié ?</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch} from 'vue';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';



const toast  = useToast()

const router = useRouter();
const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const showPassword = ref(false);



const errors = ref({});
  const serverErrors = ref([]);

  
  watch(serverErrors, (newErrors) => {
    errors.value = {};
    newErrors.forEach((err) => {
      // if (err.path === "email") {
      //   errors.value.email = err.msg;
      // }
      if (err.path === "password") {
        errors.value.password = err.msg;
      }
    });
  });

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

async function handleLogin() {
  try {
    const user = await authStore.login(email.value, password.value);
    
    
    if (user?.role) {
      if (user.role === 'ADMIN') {
        router.push({ path: `/dashboard` });
      } else if (user.role === 'ANNONCEUR') {
        router.push({ path: `/profil/${user.userId}` });
      } else {
        errorMessage.value = "Rôle de l'utilisateur non reconnu.";
      }

    } else {
      errorMessage.value = "Impossible de récupérer le rôle de l'utilisateur.";
    }
  } catch (error) {
    // errorMessage.value = error.message || "Une erreur est survenue lors de la connexion.";
    console.error(error);
    if (error.response && error.response.data.errors) {
      serverErrors.value = error.response.data.errors;
    } else {
      toast.error('Erreur lors de la connexion. Veuillez réessayer.');
    }
  }
}
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
  margin-top: 60px;
  max-width: 400px;
  padding: 30px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(31, 31, 30, 0.4), 0 2px 8px rgba(7, 15, 105, 0.2);
  transition: box-shadow 0.3s ease-in-out;
}

h2 {
  color: #070f69; /* Bleu foncé */
}

.input-group-text {
  background-color: #F8F7F4; /* Beige clair */
  color: #070f69; /* Bleu foncé */
}

.toggle-password {
  cursor: pointer;
  color: #070f69;
}

.form-control:focus {
  border-color: #070f69; 
  box-shadow: 0 0 5px rgba(7, 15, 105, 0.5);
}

.btn {
  background-color: #FFA500; /* Orange */
  color: #fff;
  border: none;
}

.btn:hover {
  background-color: #070f69; /* Bleu foncé */
  color: #fff;
}

.link {
  color: #070f69; /* Bleu foncé */
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.text-danger {
  color: red;
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
