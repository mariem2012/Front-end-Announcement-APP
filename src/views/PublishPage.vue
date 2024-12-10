<template>
    <div class="publish-page">
      <nav class="navbar navbar-light bg-light">
        <div class="container">
          <router-link to="/" class="navbar-brand">
            <img src="../assets/images/logo.svg" alt="Logo" class="logo" />
          </router-link>
          <div>
            <router-link to="/" class="btn btn-outline-primary">Quitter</router-link>
          </div>
        </div>
      </nav>
  
      <div class="container text-center mt-5">
        <div class="row align-items-center">
          <div class="col-md-6 text-start">
            <h1>Bonjour !</h1>
            <p>Connectez-vous ou créez un compte pour déposer votre annonce.</p>
            <div class="buttons">
              <router-link to="/login" class="btn btn-primary me-3">
                Me connecter
              </router-link>
              <router-link to="/register" class="btn btn-outline-primary">
                Créer un compte
              </router-link>
            </div>
          </div>
          <div class="col-md-6">
           
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>

  </script>
  
  <style scoped>
  .publish-page {
    background-color: #f8f9fa;
    min-height: 100vh;
  }
  
  .navbar {
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  /* .logo {
    height: 40px;
  } */
  
  .buttons .btn-primary {
    background-color: #FFA500;
    border: none;
  }
  
  .buttons .btn-outline-primary {
    border-color: #FFA500;
    color: #FFA500;
    
  }
  
  .buttons .btn-outline-primary:hover {
    background-color: #070f69;
    border: none;
    color: #fff;
  }

  .container.text-center.mt-5 {
  background-color: #ffffff; 
  padding: 30px; 
  border-radius: 10px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  max-width: 800px; 
  margin: 0 auto; 
}
  
  h1 {
    color: #333;
    font-weight: bold;
  }
  
  p {
    color: #555;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  </style>
  