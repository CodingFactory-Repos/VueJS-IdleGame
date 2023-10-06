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

      <!-- Liste des réalisations -->
      <ion-list>
        <ion-item
          v-for="(achievement, index) in achievements"
          :key="index"
          :class="{ 'achievement-unlocked': achievement.unlocked }"
        >
          <ion-icon
            :name="
              achievement.unlocked ? 'checkmark-circle' : 'ellipse-outline'
            "
            :color="achievement.unlocked ? 'success' : 'medium'"
            slot="start"
          ></ion-icon>
          <ion-label>
            <h2>{{ achievement.title }}</h2>
            <p>{{ achievement.description }}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { ref } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
} from "@ionic/vue";
import { checkmarkCircleOutline, ellipseOutline } from "ionicons/icons";

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
  },
  setup() {
    // Liste des réalisations (à adapter avec vos données réelles)
    const achievements = ref([
      {
        title: "Première réalisation",
        description: "Débloquez votre première réalisation",
        unlocked: true, // Changez à false pour simuler une réalisation non débloquée
      },
      {
        title: "Réalisation avancée",
        description:
          "Accomplissez une tâche avancée pour débloquer cette réalisation",
        unlocked: false,
      },
      // Ajoutez d'autres réalisations ici
    ]);

    return {
      achievements,
    };
  },
};
</script>

<style scoped>
/* Style pour les réalisations débloquées */
.achievement-unlocked {
  --ion-item-background: var(--ion-color-success);
  color: white;
}
</style>
