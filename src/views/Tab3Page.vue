<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Marketplace</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Marketplace</ion-title>
        </ion-toolbar>
      </ion-header>

      <div>
        <MarketplaceCard
              v-for="(product, index) in marketplace"
              :key="index"
              :product="product"
          />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import ShopCard from "@/components/ShopCard.vue";

import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar,} from "@ionic/vue";

import {Product, useShopStore} from "@/stores/shop";
import {User, useUserStore} from "@/stores/user";
import {Marketplace, useMarketplaceStore} from "@/stores/marketplace";
import MarketplaceCard from "@/components/MarketplaceCard.vue";

const shopStore = useShopStore();
const userStore = useUserStore();
const marketplaceStore = useMarketplaceStore();

const shop = ref<Product[]>([]);
const user = ref<User>();
const marketplace = ref<Marketplace[]>([]);

onMounted(async () => {
  marketplace.value = await marketplaceStore.fetchMarketplaces();

  shop.value = await shopStore.fetchProducts();

  user.value = await userStore.fetchUser();
});
</script>
