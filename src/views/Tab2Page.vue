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

            <div class="grid grid-cols-2">
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
/* Style pour la mise en page de chaque carte */
.card-content {
    display: flex;
    flex-direction: column; /* Pour que le texte apparaisse sous l'image sur les appareils mobiles */
}

ion-card {
    background: #01062e; /* Remplacez cette couleur par celle de votre choix */
}

.card-image {
    text-align: center;
    padding-top: 1px;
}

.card-image img {
    max-width: 100%;
    height: auto;
    cursor: pointer; /* Curseur de type main pointer lorsqu'on survole l'image */
}

/* Styles pour les informations de l'usine en haut à droite */

.info-top-right {
    display: flex;
    justify-content: space-between; /* Alignement des informations à droite */
    align-items: center; /* Alignement vertical */
    /* margin-top: 10px; */
}

/* Style pour le compteur et les boutons */
.counter {
    display: flex;
    align-items: center;
}

.counter ion-button {
    /* background-color: #3498db; */
    color: #fff;
    border: none;
    font-size: 15px;
    padding: 2px 4px;
    cursor: pointer;
}

.counter span {
    font-size: 18px;
    margin: 0 10px;
}

/* Style pour le bouton "Acheter" */
ion-button[expand="full"] {
    margin-top: 10px;
    color: #fff;
    border: none;
    font-size: 20px;
    padding: 10px;
}

.image-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    /* margin-top: 2px; */
}

.image-info p {
    font-size: 16px;
    margin: 0;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Trois colonnes égales par ligne */
    grid-gap: 10px; /* Espacement entre les cartes */
}

/* Assurez-vous que les cartes ne dépassent pas la largeur de leur conteneur */
ion-card {
    max-width: 100%;
}

@media (max-width: 600px) {
    .card-grid {
        grid-template-columns: repeat(1, 1fr); /* Une colonne par ligne */
    }
}
</style>

<!-- <img src="../../public/images/miners/el_monstro.gif" :alt="'Image de l\'usine '" /> -->
