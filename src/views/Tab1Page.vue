<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ExploreContainer />
      <h1 class="bg-blue-600 text-9xl">Hello</h1>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
</script>

<style scoped>
ion-content {
  --background: #ffffff url("../../public/images/bg.png") no-repeat center
    center / cover;
}
</style>
