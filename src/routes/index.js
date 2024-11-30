import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
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
import Dashboard from '../views/admin/Dashoard.vue';
import Profil from '../views/advertiser/Profil.vue';
import { useAuthStore } from '../store/authStore';
import UserProfile from '../components/users/UserProfile.vue'
import PublishPage from '../views/PublishPage.vue';
import AnnouncementDetails from '../components/announcements/AnnouncementDetails.vue';
import ChangePassword from '../components/ChangePassword..vue';
import Announcements from '../components/announcements/Announcements.vue';




const routes = [
  { path: '/', component: Home },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true },
   children: [
    { path: '/edit-announcement/:id', name: 'EditAnnoncement', component: EditAnnoncement },
    
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
      path: '/user-profil',
      name: 'UserProfil',
      component: UserProfile,
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
   ]
   

  },
  
  { path: '/put/password', component: ChangePassword },
  { path: '/profil/:id', component: Profil, children: [
    { path: '/add-announcement', name: 'AddAnnouncement', component: AddAnnouncement },
  ]},
  { path: '/login', component: Login},
  { path: '/', redirect: '/login' },
  { path: '/register', component: Register},
  { path: '/publish', component: PublishPage},
  {
    path: '/annonces/:id',
    name: 'AnnouncementDetails',
    component: AnnouncementDetails,
  },
  {
    path: '/announcements',
    name: 'Announcements',
    component: Announcements,
  },

];




const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach(async(to, from, next) => {
  const store = useAuthStore()
  await store.initialize();
  if (to.meta.requiresAuth && !store.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()
//   const userRole = authStore.role;
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!authStore.isAuthenticated) {

//       return next({ path: '/login' });
//     }
//     if (to.path.startsWith('/dashboard') && userRole !== 'admin') {
//       return next({ path: '/' });
//     }
//     else {
//       console.log('Accès autorisé à l\'interface admin');
//     }
    
    
//   }
//   next();
// });

export default router;



