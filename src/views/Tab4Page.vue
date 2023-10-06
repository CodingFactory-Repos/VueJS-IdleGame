<template>
  <div class="min-h-screen">
    <div class="py-10">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-semibold text-center mb-5">Achievements</h1>
        <div class="space-y-4">
          <div
            v-for="(achievement, index) in achievements"
            :key="index"
            class="bg-gray-800 shadow-md p-2 flex items-center space-x-2 rounded-lg cursor-pointer"
            :class="{ 'bg-green-700': achievement.unlocked }"
            @click="showAchievementAlert(achievement)"
          >
            <img
              v-if="achievement.image"
              :src="achievement.image"
              alt="Achievement"
              class="w-10 h-10"
            />
            <div class="flex-1">
              <h2 class="text-lg font-semibold text-white">
                {{ achievement.title }}
              </h2>
              <p class="text-gray-300">{{ achievement.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const achievements = ref([
  {
    title: "Première réalisation",
    description: "Débloquez votre première réalisation",
    unlocked: true,
    image: "../../public/images/achivements/bitcoin-1.png",
  },
  {
    title: "Réalisation avancée",
    description:
      "Accomplissez une tâche avancée pour débloquer cette réalisation",
    unlocked: false,
    image: "../../public/images/achivements/bitcoin-1.png",
  },
  // Ajoutez d'autres réalisations ici
]);

const showAchievementAlert = (achievement: any) => {
  alert(achievement.description);
};
</script>
