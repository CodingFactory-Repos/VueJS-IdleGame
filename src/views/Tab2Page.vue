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
        <ion-card v-for="(factory, index) in factories" :key="index">
          <img class="p-8 rounded-t-lg" src="../../public/images/miners/el_monstro.gif" alt="product image"/>
          <!-- <div class="px-5 pb-5">
              <a href="#"> -->
          <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ factory.name }}</h5>
          <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ factory.name }}</h5>
          <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{{ factory.name }}</h5>

          <!-- </a> -->
          <div class="flex items-center justify-between">
            <div class="counter">
              <ion-button @click="decrementCount(index)">-</ion-button>
              <span>{{ factory.count }}</span>
              <ion-button @click="incrementCount(index)">+</ion-button>
              <span>{{ factory.montant }} crédits</span>
            </div>

            <!-- <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a> -->
          </div>
          <button type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center w-full mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg class="w-3.5 h-3.5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                 viewBox="0 0 18 21">
              <path
                  d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175 .745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
            </svg>
            Buy now
          </button>


        </ion-card>
      </div>
      <!-- </div> -->
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import {ref} from 'vue';

// Créez une liste d'usines avec leurs données
const factories = ref([
  {
    name: 'dream_demolisher_3000',
    cost: 200,
    production: 2,
    count: 0,
    montant: 0,
  },
  {
    name: 'Usine 2',
    cost: 300,
    production: 3,
    count: 0,
    montant: 0,
  },
  // Ajoutez d'autres usines ici
]);

// Méthodes pour incrémenter et décrémenter le compteur
const incrementCount = (index: number) => {
  factories.value[index].count += 1;
  factories.value[index].montant += factories.value[index].cost;
};

const decrementCount = (index: number) => {
  if (factories.value[index].count > 0) {
    factories.value[index].count -= 1;
    factories.value[index].montant -= factories.value[index].cost;
  }
};
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
