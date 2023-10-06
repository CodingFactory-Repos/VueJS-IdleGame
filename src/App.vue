<template>
  <ion-app>
    <audio autoplay loop>
      <source src="../../public/sounds/ambiance.mp3" type="audio/mpeg" />
    </audio>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>
