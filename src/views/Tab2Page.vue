<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 2</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="card-grid">
        <ion-card v-for="(factory, index) in factories" :key="index">
          <ion-card-content>
            <div class="card-content">
              <div class="card-image">
                <img src="factory.../../public/images/miners/dream_demolisher_3000.gif" />
              </div>
              <div class="card-info">
                <ion-card-header>
                  <ion-card-title>{{ factory.name }}</ion-card-title>
                </ion-card-header>
                <!-- Informations de l'usine en haut à droite -->
                <div class="info-top-right">
                  <ion-card-content>
                    <p>Coût : {{ factory.cost }} crédits</p>
                    <p>Production par seconde : {{ factory.production }} unités</p>
                  </ion-card-content>
                  <!-- Boutons + et - avec compteur et montant spécifiques à chaque carte -->
                  <div class="counter">
                    <ion-button @click="decrementCount(index)">-</ion-button>
                    <span>{{ factory.count }}</span>
                    <ion-button @click="incrementCount(index)">+</ion-button>
                    <span>{{ factory.montant }} crédits</span>
                  </div>
                  <!-- Bouton "Acheter" en bas de la carte -->
                  <ion-button expand="full" color="primary">Acheter</ion-button>
                </div>
              </div>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Créez une liste d'usines avec leurs données
const factories = ref([
  {
    name: 'Usine 1',
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
</script>

<style scoped>
/* ion-content {
  --background: #ffffff url("../../public/images/bg.png") no-repeat center
    center / cover;
} */
.card-content {
  display: flex;
  flex-direction: column; 
}
.card-image {
  text-align: center; 
  padding: 10px;
}

.card-image img {
  max-width: 100%;
  height: auto;
  cursor: pointer; 
}

@media (max-width: 768px) {
  .card-info {
    margin-top: 10px; 
  } 
}
</style>
