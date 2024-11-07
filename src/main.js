import { createApp } from 'vue';
import App from './App.vue';
import router from './routes'; // Importer le router ici
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'; 
import 'bootstrap';

import '@fortawesome/fontawesome-free/css/all.css';

// import 'composent/Navbar'
// import './assets/main.css';

const app = createApp(App);

// app.component('Navbar', Navbar)
app.use(createPinia());
app.use(router); 
app.mount('#app');
