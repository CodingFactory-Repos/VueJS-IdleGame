<template>
  <div>
    <div v-if="inventoryStore.isLoading">Loading...</div>
    <div v-else>
      <!-- Render the inventory items here -->
      <div v-for="item in inventoryStore.getItems" :key="item._id">
        <ion-card class="rounded-lg shadow-md p-4">
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
              <h1 class="text-2xl text-white font-bold">
                {{ item.shop_data.name }}
              </h1>
              <!-- Texte "price: 1" -->
              <p class="ml-2 text-xl">
                Votre GPU vous rapporte
                {{ (item.shop_data.generate_per_seconds + (item.inventory_data.level - 1) * 0.1 * item.shop_data.generate_per_seconds).toFixed(2) }} €/s
              </p>
            </div>
          </ion-card-content>
          <!-- Bouton Acheter -->
          <div class="flex items-center justify-center mt-4">
            <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center justify-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Collecter les gains
            </button>
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
              Level up to {{
                item.inventory_data.level + 1
              }}
            </button>
            <button type="button"
                    class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center justify-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
              Sell Miner
            </button>
          </div>
          <div class="flex items-center justify-center mt-4">
            <div class="relative w-3/4 h-2 bg-gray-200">
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
import {useInventoryStore} from "@/stores/inventory";
import {onMounted} from "vue";

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
