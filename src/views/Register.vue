<template>
    <ion-page>
        <ion-content :fullscreen="true" class="ion-content-center">
            <div class="form-container">
                <h2>Register</h2>
                <form @submit.prevent="register">

                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="text" id="email" placeholder="example@example.com" v-model="email" />
                    </div>
                    <div class="form-group">
                        <label for="username">Username:</label>
                        <input type="text" id="username" placeholder="Username" v-model="username" />
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" placeholder="Password" v-model="password" />
                    </div>

                    <button class="btn-login" type="submit">Register</button>
                </form>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script lang="ts">
import {
    IonPage,
    IonContent,
} from "@ionic/vue";
import axios from "axios";

export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost:3001/auth/register', {
          username: this.username,
          email: this.email, 
          password: this.password
        });

        if (response.status === 200) {
          // L'inscription a réussi, redirigez vers la page de connexion
          this.$router.push('/tabs/tab1'); // Utilisez votre chemin de redirection réel
        } else {
          // L'inscription a échoué, affichez un message d'erreur
          console.error('Erreur d\'inscription:', response.data.error);
        }
      } catch (error) {
        // Gestion des erreurs réseau
        console.error('Erreur réseau:', error);
      }
    }
  }
};
</script>

<style scoped>
ion-content {
    --background: #ffffff url("../../public/images/bg.png") no-repeat center center / cover;
}
.ion-content-center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* 100% de la hauteur de la vue */
}

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
  