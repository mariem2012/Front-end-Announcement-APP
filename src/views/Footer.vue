<template>
    <footer class="footer">
      <div class="container text-center">
        <p>&copy; 2024 Votre Plateforme d'Annonces. Tous droits réservés.</p>
        <ul class="footer-links">
          <li><router-link to="/about">À propos</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
          <li><router-link to="/privacy">Politique de confidentialité</router-link></li>
        </ul>
      </div>
    </footer>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .footer {
    background-color: #070f69;
    color: #fff;
    padding: 20px 0;
    margin-top: 50px;
    box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .footer p {
    margin: 0;
    font-size: 14px;
  }
  
  .footer-links {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 10px;
  }
  
  .footer-links li {
    font-size: 14px;
  }
  
  .footer-links a {
    color: #fff;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .footer-links a:hover {
    color: #1e7e34;
  }
  </style>
  