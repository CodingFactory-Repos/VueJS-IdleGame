import { defineStore } from "pinia";
import axios from "axios";
import { getBearerToken } from "@/config/axios.config";
import { useUserStore } from "./user";
import {useInventoryStore} from "@/stores/inventory";

export interface Product {
    _id: string;
    name: string;
    image: string;
    price: number;
    generate_per_seconds: number;
    eur_to: string;
    slots: number;
    xp: number;
}

interface ShopState {
    products: Product[];
    loading: boolean;
}

export const useShopStore = defineStore("shop", {
    state: (): ShopState => ({
        products: [],
        loading: false,
    }),
    getters: {
        getProducts(): Product[] {
            return this.products;
        },
        isLoading(): boolean {
            return this.loading;
        },
    },
    actions: {
        async fetchProducts() {
            this.loading = true;
            const response = await axios.get(
                "http://localhost:3001/shop",
                getBearerToken()
            );
            this.products = response.data;
            this.loading = false;

            return this.products;
        },

        async buyProduct(id: string) {
            const userStore = useUserStore();
            const inventoryStore = useInventoryStore();
            const response = await axios
                .post(
                    "http://localhost:3001/shop/buy-item",
                    { id },
                    getBearerToken()
                )
                .then(() => {
                    userStore.fetchUser();
                    inventoryStore.fetchInventory();
                });

            return response;
        },

        async fetchProduct(id: string) {
            const response = await axios.get(
                `http://localhost:3001/shop/item`,
                getBearerToken()
            );

            return response.data;
        },
    },
});
