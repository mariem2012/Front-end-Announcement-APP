import { createApp } from 'vue';
import App from './App.vue';
import router from './routes'; 
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'; 
import 'bootstrap';
// import { setUser, getUser } from './userService';

import '@fortawesome/fontawesome-free/css/all.css';


const pinia = createPinia();

const app = createApp(App);

app.use(createPinia());
app.use(router); 

// const user = getUser();
// if (user) {
//   const store = pinia.store('announcementStore');
//   store.currentUser = user; 
//   console.log('Utilisateur restauré dans le store :', user);
// }

app.mount('#app');
