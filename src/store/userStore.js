

// import { defineStore } from 'pinia';
// import api from '../api.js';

// export const useUserStore = defineStore('userStore', {
//   state: () => ({
//     users: [],
//   }),
//   actions: {
//     async fetchUsers() {
//       try {
//         const response = await api.get('/users');
//         this.users = response.data;
//         console.log("Users fetched successfully", this.users);
//       } catch (error) {
//         console.error('Erreur lors de la récupération des utilisateurs:', error);
//       }
//     },

//     async fetchUserById(id) {
//       try {
//         const response = await api.get(`/${id}`);
//         return response.data;
//       } catch (error) {
//         console.error('Erreur lors de la récupération de l\'utilisateur:', error);
//       }
//     },

//     async addUser(user) {
//       try {
//         await api.post('/users', user);
//         await this.fetchUsers(); // Recharger la liste des utilisateurs
//       } catch (error) {
//         console.error('Erreur lors de l’ajout de l’utilisateur:', error);
//       }
//     },

//     // async updateUser(id, userData) {
//     //   try {
//     //     await api.put(`/${id}`, userData);
//     //     this.fetchUsers(); // Rafraîchir la liste après la mise à jour
//     //   } catch (error) {
//     //     console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
//     //   }
//     // },

//     async editUser(id, updatedData) {
//       try {
//         const response = await api.put(`/users/${id}`, updatedData);
//         const index = this.users.findIndex(user => user.id === id);
//         if (index !== -1) {
//           this.users[index] = response.data; 
//         }
//       } catch (error) {
//         console.error("Erreur lors de la modification de l'utilisateur:", error);
//         throw error;
//       }
//     },

//     async deleteUser(id) {
//       try {
//         await api.delete(`/users/${id}`); 
//         await this.fetchUsers(); 
//       } catch (error) {
//         console.error('Erreur lors de la suppression de l’utilisateur:', error);
//       }
//     },
//   },
// });


// userStore.js
import { defineStore } from 'pinia';
import api from '../api.js';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: []
  }),

  actions: {
    async fetchUsers() {
      try {
        const response = await api.get('/users');
        this.users = response.data;
        console.log("Users fetched successfully", this.users);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
      }
    },

    
    async fetchUserById(userId) {
      try {
        const response = await api.get(`/users/${userId}`); // Assurez-vous que l'endpoint est correct ici
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
        throw error;
      }
    },

    async addUser(userData) {
      try {
        console.log("Sending user data:", userData); 
    
        const response = await api.post('/users/add', userData);
        this.users.push(response.data);
        console.log("User added successfully", response.data);
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur:", error.response ? error.response.data : error);
        throw error;
      }
    },
    
    

    async updateUser(userId, userData) {
  try {
    const response = await api.put(`/users/${userId}`, userData);
    // Met à jour l'utilisateur dans le store local, si nécessaire
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    throw error;
  }
},

    async deleteUser(id) {
      try {
        await api.delete(`/users/${id}`);
        this.users = this.users.filter(user => user.id !== id);
        console.log("User deleted successfully");
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur:", error);
        throw error;
      }
    }
  }
});
