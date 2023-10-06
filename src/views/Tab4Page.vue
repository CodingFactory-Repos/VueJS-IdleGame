<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Achievements</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Achievements</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ion-card class="flex flex-col items-center justify-center">
          <h3
            class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            Vous avez actuellement {{ user?.money.toFixed(5) }} BTC.
          </h3>
        </ion-card>

        <div
          class="bg-gray-300 shadow-md p-2 flex items-center space-x-2 rounded-lg cursor-pointer"
          :class="{ 'bg-green-700': user?.money >= 1000 }"
        >
          <img
            src="../../public/images/achivements/bitcoin-1.png"
            alt="Achievement"
            class="w-10 h-10"
          />
          <div class="flex-1">
            <h2 class="text-lg font-semibold">Posséder 1000 BTC</h2>
            <p class="text-gray-600">Félicitations ! Vous avez 1000 BTC.</p>
          </div>
        </div>

        <!-- Achievement pour être au niveau 10 -->
        <div
          class="bg-gray-300 shadow-md p-2 flex items-center space-x-2 rounded-lg cursor-pointer"
          :class="{ 'bg-green-700': user?.level >= 10 }"
        >
          <img
            src="../../public/images/achivements/bitcoin-1.png"
            alt="Achievement"
            class="w-10 h-10"
          />
          <div class="flex-1">
            <h2 class="text-lg font-semibold">Niveau 10 atteint</h2>
            <p class="text-gray-600">Bravo ! Vous avez atteint le niveau 10.</p>
          </div>
        </div>

        <!-- Le reste de votre code pour afficher d'autres achievements -->
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { User, useUserStore } from "@/stores/user";

const userStore = useUserStore();

const user = ref<User>();

onMounted(async () => {
  // Récupérez les données de l'utilisateur
  user.value = await userStore.fetchUser();
});
</script>

<style scoped></style>
