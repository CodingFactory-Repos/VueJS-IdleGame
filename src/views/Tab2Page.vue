<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Shop</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Shop</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ion-card class="flex flex-col items-center justify-center">
          <h3
            class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
          >
            Vous avez actuellement
            {{ userStore.getUser?.money.toFixed(5) }} BTC.
          </h3>
        </ion-card>
        <div v-if="!shopStore.isLoading">
          <ShopCard
            v-for="(product, index) in shop"
            :key="index"
            :product="product"
          />
        </div>
        <div v-else>
          <p>No shop store</p>
        </div>
      </div>
      <!-- </div> -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import ShopCard from "@/components/ShopCard.vue";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";

import { Product, useShopStore } from "@/stores/shop";
import { User, useUserStore } from "@/stores/user";

const shopStore = useShopStore();
const userStore = useUserStore();

const shop = ref<Product[]>([]);

onMounted(async () => {
  shop.value = await shopStore.fetchProducts();
  userStore.fetchUser();
});
</script>

<style scoped></style>

<!-- <img src="../../public/images/miners/el_monstro.gif" :alt="'Image de l\'usine '" /> -->
