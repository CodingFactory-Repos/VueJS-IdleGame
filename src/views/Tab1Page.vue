<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <FactoryContainer />
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
import FactoryContainer from "@/components/FactoryContainer.vue";
</script>

<style scoped>
ion-content {
  --background: #ffffff url("../../public/images/bg.png") no-repeat center
    center / cover;
}
</style>
