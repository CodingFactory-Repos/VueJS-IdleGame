<template>
  <ion-card class="flex flex-col items-center justify-center">
    <img
        v-bind:src="'../../public/images/miners/' + product?.image"
        alt="product image"
    />
    <h5
        class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
    >
      {{ product?.name }}
    </h5>
    <p class="mt-2 text-gray-600 dark:text-gray-400 text-sm text-center mx-2">
      La machine {{ product?.name }} vous permet de miner {{ product?.generate_per_seconds_in_crypto.toFixed(5) }}
      {{ product?.eur_to }} (Soit {{ product?.generate_per_seconds }} € par seconde). Elle coûte {{ product?.price }} €.
      Pour la rentabiliser, il vous faudra environ
      {{ (((product?.price / product?.generate_per_seconds)) / 60).toFixed(0) }} minutes.
    </p>
    <div class="counter my-3">
      <span class="text-gray-700 flex-row flex">
        {{ product?.price_in_crypto.toFixed(5) }}
        <img
            v-bind:src="'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/svg/icon/' + product?.eur_to.toLowerCase() + '.svg'"
            class="w-5 h-5 mx-1"/>
        <span class="text-gray-500 text-xs">/ Soit {{ product?.price }} €</span>
      </span>
    </div>
    <button
        type="button"
        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="buyItem(product?._id)"
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
      Buy now
    </button>
  </ion-card>
</template>

<script setup lang="ts">
import {useShopStore} from "@/stores/shop";

const shopStore = useShopStore();

defineProps({
  product: Object,
});

const buyItem = (_id: string) => {
  shopStore.buyProduct(_id);
};
</script>
