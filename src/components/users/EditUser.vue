<template>
  <div class="container">
    <form @submit.prevent="handleEditUser" class="formulaire form mb-5 mt-5 shadow p-3 mb-5 bg-body rounded">
      <div class="mb-3">
        <label for="nom" class="form-label">Nom :</label>
        <input type="text" class="input form-control" v-model="nom" id="nom" required />
      </div>
      
      <div class="mb-3">
        <label for="email" class="form-label">Email :</label>
        <input type="email" class="input form-control" v-model="email" id="email" required />
      </div>
      
      <div class="mb-3">
        <label for="phone" class="form-label">Téléphone :</label>
        <input type="tel" class="input form-control" v-model="phone" id="phone" />
      </div>
      
      <div class="mb-3">
        <label for="address" class="form-label">Adresse :</label>
        <input type="text" class="input form-control" v-model="address" id="address" />
      </div>
      
      <div class="mb-3">
        <label for="status" class="form-label">Status :</label>
        <select class="input form-select" v-model="status" id="status" required>
          <option value="true">Actif</option>
          <option value="false">Inactif</option>
        </select>
      </div>
      
      <button class="clr btn mt-3 mb-4 me-3 text-white">Enregistrer</button>
      <RouterLink class="list text-decoration-none text-white me-5 fw-bold" to="/list-user">
        <button type="button" class="btn btn-danger mt-3 mb-4">Annuler</button>
      </RouterLink>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../../store/userStore';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const store = useUserStore();

// Champs du formulaire
const nom = ref('');
const email = ref('');
const phone = ref('');
const address = ref('');
const status = ref('true'); // Défaut : "Actif"

// Récupération de l'ID de l'utilisateur depuis les paramètres de route
const userId = route.params.id;

// Chargement des données de l'utilisateur existant
onMounted(async () => {
  try {
    const user = await store.fetchUserById(userId);
    if (user) {
      nom.value = user.name;
      email.value = user.email;
      phone.value = user.phone;
      address.value = user.address;
      status.value = user.status ? 'true' : 'false'; // Conversion booléen -> string
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
  }
});

// Gestion de la soumission du formulaire
const handleEditUser = async () => {
  const userData = {
    name: nom.value,
    email: email.value,
    phone: phone.value,
    address: address.value,
    status: status.value === 'true', // Conversion string -> booléen
  };

  try {
    await store.updateUser(userId, userData);
    console.log("Utilisateur mis à jour :", userData);
    router.push('/list-user');
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
  }
};
</script>

<style scoped>
.clr {
  background-color: #070f69;
}
.clr:hover {
  background-color: #070f69;
}
.formulaire {
  width: 50%;
  border-radius: 10px;
  padding: 20px;
  margin: auto;
}

.container {
  padding-top: 70px;
}
</style>
