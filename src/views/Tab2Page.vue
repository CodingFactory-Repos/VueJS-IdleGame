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
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
} from "@ionic/vue";

import { useShopStore, Product } from "../stores/shop";
const shopStore = useShopStore();

const shop = ref<Product[]>([]);

onMounted(async () => {
    const products = await shopStore.fetchProducts();
    shop.value = products;
});
</script>

<style scoped>
</style>

<!-- <img src="../../public/images/miners/el_monstro.gif" :alt="'Image de l\'usine '" /> -->
