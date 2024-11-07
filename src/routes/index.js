import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Logout from '../views/Logout.vue';
import Register from '../views/Register.vue';
import AnnouncementDetail from '../components/announcements/AnnouncementDetail.vue';
import AddAnnouncement from '../components/announcements/AddAnnouncement.vue';
import ListUser from '../components/users/ListUser.vue'
import EditUser from '../components/users/EditUser.vue'
import AddUser from '../components/users/AddUser.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login},
  { path: '/register', component: Register},
  { path: '/logout', component: Logout },
  { path: '/announcements/:id', name: 'AnnouncementDetail', component: AnnouncementDetail },
  { path: '/add-announcement', name: 'AddAnnouncement', component: AddAnnouncement },
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



