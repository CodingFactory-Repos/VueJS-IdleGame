<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-card class="flex flex-col items-center justify-center">
                <h3
                    class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center w-full"
                >
                    <div class="flex items-center justify-center mb-4">
                        <div class="relative w-3/4 h-2 bg-gray-200 rounded-lg">
                            <div
                                class="absolute h-full bg-blue-500 transition-width duration-500 rounded-lg"
                                :style="{
                                    width:
                                        (userStore.getUser?.xp /
                                            userStore.getUser
                                                ?.xp_to_next_level) *
                                            100 +
                                        '%',
                                }"
                            ></div>
                        </div>
                    </div>
                    Level :
                    {{ userStore.getUser?.level }}
                    <br />
                    Slots :
                    {{ userStore.getUser?.used_slots }} /
                    {{ userStore.getUser?.slots_number }}
                </h3>
            </ion-card>
            <ion-card class="flex flex-col items-center justify-center">
                <h3
                    class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-center"
                >
                    Vous avez actuellement :
                    <br />
                    {{ userStore.getUser?.money.toFixed(8) }} BTC
                </h3>
            </ion-card>
            <FactoryContainer />
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
import FactoryContainer from "@/components/FactoryContainer.vue";
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";

const userStore = useUserStore();

onMounted(async () => {
    await userStore.fetchUser();
});
</script>

<style scoped>
ion-content {
    --background: #ffffff url("../../public/images/bg.png") no-repeat center
        center / cover;
}
</style>
