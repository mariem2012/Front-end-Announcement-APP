<template>
    <div>
      <h2>Profil Utilisateur</h2>
      <p>Nom: {{ user?.name }}</p>
      <p>Email: {{ user?.email }}</p>
      <button @click="logout">Déconnexion</button>
    </div>
  </template>

<script setup>
    import { useAuthStore } from '../../store/authStore';

    const authStore = useAuthStore();
    authStore.fetchUser();
</script>

  
  <!-- <script setup>
  import { computed } from 'vue';
  import { useUserStore } from '../store/userStore';
  
  const userStore = useUserStore();
  const user = computed(() => userStore.user);

  
  
  const logout = async () => {
    await userStore.logout();
  };
  </script> -->