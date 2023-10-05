<template>
    <div class="bg-gray-800">
        <div v-if="inventoryStore.isLoading">Loading...</div>
        <div v-else>
            <!-- Render the inventory items here -->
            <div v-for="item in inventoryStore.getItems" :key="item._id">
                <ion-card class="bg-gray-800 rounded-lg shadow-md p-4">
                    <ion-card-content class="flex items-center">
                        <!-- Image de l'usine avec cadre foncé -->
                        <div class="relative w-1/3 h-1/3 mr-8">
                            <img
                                :src="`../../public/images/miners/${item.shop_data.image}`"
                                :alt="`Image de ${item.shop_data.name}`"
                                class="w-full h-full"
                            />
                            <div
                                class="absolute inset-0 bg-black opacity-30 rounded-lg"
                            ></div>
                        </div>
                        <div class="flex-1">
                            <!-- Titre -->
                            <strong class="text-l font-semibold text-white">{{
                                item.name
                            }}</strong>
                            <div class="flex items-center">
                                <p class="text-lg text-white">
                                    {{ item.shop_data.generate_per_second }}
                                </p>
                            </div>
                            <!-- Texte "price: 1" -->
                            <p class="ml-2 text-xl text-white">
                                Price: {{ item.shop_data.price }}
                            </p>
                            <!-- Boutons +/- -->
                            <div class="flex items-center mt-2">
                                <button
                                    type="button"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center justify-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    @click="
                                        inventoryStore.levelUpItem(
                                            item.inventory_data.item_id,
                                            item.inventory_data.row_id
                                        )
                                    "
                                >
                                    Level up
                                    <svg
                                        class="w-4 h-4 ml-2 text-gray-800 dark:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M5 13V1m0 0L1 5m4-4 4 4"
                                        ></path>
                                    </svg>
                                </button>
                                <p class="text-3xl mx-4">
                                    {{ item.inventory_data.level }}
                                </p>
                            </div>
                        </div>
                    </ion-card-content>
                    <!-- Bouton Acheter -->
                    <div class="flex items-center justify-center mt-4">
                        <button
                            type="button"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center justify-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            <svg
                                class="w-3.5 h-3.5 mr-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 21"
                            >
                                <path
                                    d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175 .745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"
                                />
                            </svg>
                            Buy Miner
                        </button>
                        <!-- Barre de chargement raccourcie -->
                        <div class="relative w-1/2 h-2 bg-gray-200 ml-4">
                            <!-- <div
                    class="absolute h-full bg-teal-500 transition-width duration-500"
                    :style="{ width: item.loadingPercentage + '%' }"
                ></div> -->
                        </div>
                    </div>
                    <div class="flex items-center justify-center mt-4"></div>
                </ion-card>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useInventoryStore } from "@/stores/inventory";
import { onMounted } from "vue";

const inventoryStore = useInventoryStore();

onMounted(async () => {
    try {
        await inventoryStore.fetchInventory();
        console.log(inventoryStore.getItems);
    } catch (error) {
        console.error("Error fetching inventory:", error);
        // Handle the error as needed
    }
});
</script>
