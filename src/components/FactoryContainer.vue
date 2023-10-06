<template>
    <ion-alert
        header="Vendre un mineur"
        :buttons="alertButtons"
        :inputs="alertInputs"
    ></ion-alert>

    <div>
        <div v-if="inventoryStore.isLoading">Loading...</div>
        <div v-else>
            <!-- Render the inventory items here -->
            <div v-for="item in inventoryStore.getItems" :key="item._id">
                <ion-card class="rounded-lg shadow-md p-4">
                    <span
                        class="font-bold text-xl flex items-center justify-center"
                    >
                        {{ item.shop_data.name }}
                    </span>
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
                        <div class="flex-1 gap-1 flex flex-col">
                            <p class="text-xs">
                                Rapport:
                                <span class="font-bold text-xs">
                                    {{
                                        (
                                            item.shop_data
                                                .generate_per_seconds +
                                            (item.inventory_data.level - 1) *
                                                0.1 *
                                                item.shop_data
                                                    .generate_per_seconds
                                        ).toFixed(2)
                                    }}
                                    €/s
                                </span>
                            </p>
                            <p class="text-xs">
                                Level Up Price:
                                <span class="font-bold">
                                    {{ item.inventory_data.upgrade_price }}
                                    BTC
                                </span>
                            </p>
                            <p class="text-xs">
                                Last Collect:
                                <span class="font-bold">
                                    {{
                                        // calculate the time left until the next collect
                                        // last_reward = 2023-10-06T08:21:20.177+00:00
                                        // now = 2023-10-06T08:21:20.177+00:00
                                        // next_collect = 2023-10-06T08:21:20.177+00:00 + 30min

                                        moment(item.inventory_data.last_reward)
                                            .add(
                                                new Date(
                                                    item.shop_data
                                                        .generate_per_seconds *
                                                        1000
                                                ).getMinutes(),
                                                "seconds"
                                            )
                                            .fromNow()
                                    }}
                                </span>
                            </p>
                        </div>
                    </ion-card-content>
                    <!-- Bouton Acheter -->
                    <div class="flex items-center justify-center mt-4">
                        <button
                            type="button"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center justify-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            @click="
                                onClaimReward(
                                    item.inventory_data.item_id,
                                    item.inventory_data.row_id
                                )
                            "
                        >
                            Collecter les gains
                        </button>
                        <button
                            type="button"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center justify-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            @click="
                                onLevelUp(
                                    item.inventory_data.item_id,
                                    item.inventory_data.row_id
                                )
                            "
                        >
                            <svg
                                class="w-4 h-4 mr-2 text-gray-800 dark:text-white"
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
                            Level up to {{ item.inventory_data.level + 1 }}
                        </button>
                        <button
                            type="button"
                            class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center justify-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                            @click="showSellAlert"
                        >
                            Sell Miner
                        </button>
                    </div>
                    <!-- <div class="flex items-center justify-center mt-4">
                        <div class="relative w-3/4 h-2 bg-gray-200 rounded-lg">
                            <div
                                class="absolute h-full bg-teal-500 transition-width duration-500 rounded-lg"
                                :style="{ width: loadingPercentage + '%' }"
                            ></div>
                        </div>
                    </div> -->
                    <div class="flex items-center justify-center mt-4"></div>
                </ion-card>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useInventoryStore } from "@/stores/inventory";
import { useUserStore } from "@/stores/user";
import { IonAlert } from "@ionic/vue";
import { onMounted, ref } from "vue";
import moment from "moment";

const inventoryStore = useInventoryStore();
const userStore = useUserStore();

const alertInputs = [
    {
        name: "price",
        type: "number",
        placeholder: "Prix de vente",
    },
];

const alertButtons = [
    {
        text: "Annuler",
        role: "cancel",
        cssClass: "secondary",
    },
    {
        text: "Vendre",
        handler: (data: { price: number }) => {
            const itemId = inventoryStore.getItems[0]?.inventory_data.item_id;
            if (itemId) {
                inventoryStore.sellItem(itemId, data.price);

                // Refresh the inventory
                inventoryStore.fetchInventory();
            }
        },
    },
];

const showSellAlert = () => {
    // Utilisez IonAlert comme un composant Vue
    const alert = document.querySelector("ion-alert");
    if (alert) {
        alert.present();
    }
};

const loadingPercentage = ref(0);

// const startProgressBar = () => {
//     loadingPercentage.value = 0;
//     let timer = setInterval(() => {
//         loadingPercentage.value += (1000 / 50000) * 100;
//         if (loadingPercentage.value >= 100) {
//             clearInterval(timer);
//             setTimeout(() => {
//                 loadingPercentage.value = 0;
//                 startProgressBar();
//             }, 1000);
//         }
//     }, 100);
// };

const onClaimReward = async (item_id: string, row_id: string) => {
    await inventoryStore.claimReward(item_id, row_id);
    await userStore.fetchUser();
};

const onLevelUp = async (item_id: string, row_id: string) => {
    await inventoryStore.levelUpItem(item_id, row_id);
    await userStore.fetchUser();
};

onMounted(async () => {
    // startProgressBar();

    try {
        await inventoryStore.fetchInventory();
        console.log(inventoryStore.getItems);
    } catch (error) {
        console.error("Error fetching inventory:", error);
        // Handle the error as needed
    }
});
</script>
