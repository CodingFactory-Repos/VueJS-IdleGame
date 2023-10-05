<template>
    <ion-page>
        <ion-content :fullscreen="true" class="ion-content-center">
            <div class="form-container">
                <h2>Login</h2>
                <form @submit.prevent="login">
                    <div v-if="errorMessage"
                        class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert">
                        <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span class="sr-only">Info</span>
                        <div>
                            <span class="font-medium"></span> {{ errorMessage }}
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" placeholder="example@example.com" />
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" placeholder="Password" />
                    </div>
                    <button class="btn-login" type="submit">Login</button>
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

export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessage: ''
        };
    },
    methods: {
        login() {

            if (this.email === "is@gmail.com" && this.password === "a") {
                console.log("Reuissi");
                this.$router.push('/tabs/tab1');
            } else {
                this.errorMessage = 'Identifiants incorrects';
                this.email = '';
                this.password = '';
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

input[type="email"],
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
}</style>
  