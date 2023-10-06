<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-content-center">
      <div class="w-full h-full flex items-center justify-center">
        <div class="form-container">
          <h2>Login</h2>
          <form @submit.prevent="login">
            <div class="form-group">
              <label for="email">Username:</label>
              <input type="text" id="email" placeholder="example@example.com" v-model="email"/>
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" placeholder="Password" v-model="password"/>
            </div>

            <button class="btn-login" type="submit">Login</button>
            <router-link to="/register" class="btn-login">Register</router-link>
          </form>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonContent,
} from "@ionic/vue";
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
  data() {


    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      const userEmail = this.email;
      const userPassword = this.password;

      try {
        const response = await axios.post('http://localhost:3001/auth/login', {
          username: userEmail,
          password: userPassword
        });

        if (response.status === 200) {
          // Authentification réussie, vous pouvez rediriger l'utilisateur ou effectuer d'autres actions ici
          const responseData = response.data;
          const token = responseData.token;

          // Effectuer une nouvelle requête pour récupérer les informations de l'utilisateur
          const userResponse = await axios.get('http://localhost:3001/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (userResponse.status === 200) {
            // Informations de l'utilisateur récupérées avec succès
            const user = userResponse.data;
            console.log('User:', user);

            // Comparez les données de l'utilisateur, par exemple, le nom d'utilisateur ou d'autres informations
            if (user && user.username === this.email) {
              // L'utilisateur est correct, vous pouvez stocker le jeton ou effectuer d'autres actions
              localStorage.setItem("token", token);
              this.$router.push('/tabs/tab1');
            } else {
              // L'utilisateur n'est pas correct, affichez un message d'erreur
              this.errorMessage = 'Identifiants incorrects';

            }
          } else {
            // Erreur lors de la récupération des informations de l'utilisateur
            this.errorMessage = 'Identifiants incorrects';

          }
        } else {
          // Afficher un message d'erreur en cas d'échec de l'authentification
          this.errorMessage = 'Identifiants incorrects';

        }

      } catch (error) {
        console.error(error);
      }
    }
  },
  onMounted() {
    // Vérifiez si l'utilisateur est déjà connecté
    const token = localStorage.getItem("token");
    if (token) {
      // L'utilisateur est déjà connecté, vous pouvez le rediriger vers la page d'accueil
      this.$router.push('/tabs/tab1');
    }
  }
};

</script>

<style scoped>
.form-container {
  max-width: 400px;
  padding-top: 20px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
}

.ion-content-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.form-container {
  max-width: 400px;
  padding: 20px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-login {
  background-color: #0074E4;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-login:hover {
  background-color: #0055b3;
}
</style>
