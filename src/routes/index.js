import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Logout from '../views/Logout.vue';
import Register from '../views/Register.vue';
import EditAnnoncement from '../components/announcements/EditAnnouncement.vue';
import AddAnnouncement from '../components/announcements/AddAnnouncement.vue';
import ListAnnouncement from '../components/announcements/ListAnnouncement.vue'
import ListUser from '../components/users/ListUser.vue'
import EditUser from '../components/users/EditUser.vue'
import AddUser from '../components/users/AddUser.vue'
import ListCategory from '../components/categories/ListCategory.vue'
import AddCategory from '../components/categories/AddCategory.vue'
import EditCategory from '../components/categories/EditCategory.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login},
  { path: '/register', component: Register},
  { path: '/logout', component: Logout },
  { path: '/edit-annoncement/:id', name: 'EditAnnoncement', component: EditAnnoncement },
  { path: '/add-announcement', name: 'AddAnnouncement', component: AddAnnouncement },
  { path: '/list-announcement', name: 'ListAnnouncement', component: ListAnnouncement },
  {
    path: '/list-user',
    name: 'ListUser',
    component: ListUser,
  },
  {
    path: '/add-user',
    name: 'AddUser',
    component: AddUser,
  },
  {
    path: '/edit-user/:id',
    name: 'EditUser',
    component: EditUser,
    props: true, 
  },
  {
    path: '/list-category',
    name: 'ListCategory',
    component: ListCategory,
    meta: { title: 'Liste des Catégories' }
  },
  {
    path: '/add-category',
    name: 'AddCategory',
    component: AddCategory,
    meta: { title: 'Ajouter une Catégorie' }
  },
  {
    path: '/edit-category/:id',
    name: 'EditCategory',
    component: EditCategory,
    meta: { title: 'Modifier une Catégorie' },
    props: true  
  },
  {
    path: '/',
    redirect: '/list-category'  
  }

];

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = !!localStorage.getItem('userToken');
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     next('/login');
//   } else {
//     next();
//   }
// });


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;



