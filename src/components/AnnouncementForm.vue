<template>
    <div>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="title" class="form-label">Titre de l'annonce</label>
          <input v-model="newAnnouncement.title" type="text" class="form-control" id="title" />
        </div>
        <div class="mb-3">
          <label for="category" class="form-label">Catégorie</label>
          <input v-model="newAnnouncement.category" type="text" class="form-control" id="category" />
        </div>
        <button type="submit" class="btn btn-primary">Ajouter l'annonce</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
import { useAnnouncementStore } from '../store/announcementStore';
  
  const store = useAnnouncementStore();
  const newAnnouncement = ref({ title: '', category: '' });
  
  const submitForm = () => {
    store.addAnnouncement(newAnnouncement.value);
    newAnnouncement.value = { title: '', category: '' }; 
  };
  </script>
  