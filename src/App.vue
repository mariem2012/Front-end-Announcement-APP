<template>
   <router-link to="/" />

    <router-view />
</template>

<script setup>
import { useAuthStore } from './store/authStore';


const authStore = useAuthStore();

authStore.initialize();
</script>

<style>

</style>

