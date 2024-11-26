import { createApp } from 'vue';
import App from './App.vue';
import router from './routes'; 
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'; 
import 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import Navbar from './components/Navbar.vue';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css'; 



const pinia = createPinia();

const app = createApp(App);



const options = {
    position: POSITION.TOP_RIGHT, 
    timeout: 3000,               
    closeOnClick: true,           
  };

app.component('Navbar', Navbar);
app.use(pinia);
app.use(router); 

app.use(Toast, options);
app.mount('#app');
