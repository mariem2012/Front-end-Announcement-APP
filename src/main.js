import { createApp } from 'vue';
import App from './App.vue';
import router from './routes'; 
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'; 
import 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';


const pinia = createPinia();

const app = createApp(App);

app.use(createPinia());
app.use(router); 


app.mount('#app');
