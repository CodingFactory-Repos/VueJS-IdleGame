import { defineStore } from "pinia";
import axios from "axios";
import { getBearerToken } from "@/config/axios.config";
import { useUserStore } from "./user";

export interface Marketplace {
    _id: string;
    name: string;
    image: string;
    price: number;
    generate_per_seconds: number;
    eur_to: string;
    level: number;
    selledBy: string;
}

interface MarketplaceState {
    products: Marketplace[];
    loading: boolean;
}

export const useMarketplaceStore = defineStore("marketplace", {
    state: (): MarketplaceState => ({
        products: [],
        loading: false,
    }),
    getters: {
        getMarketplaces(): Marketplace[] {
            return this.products;
        },
        isLoading(): boolean {
            return this.loading;
        },
    },
    actions: {
        async fetchMarketplaces() {
            this.loading = true;
            const response = await axios.get(
                "http://localhost:3001/marketplace",
                getBearerToken()
            );
            this.products = response.data;
            this.loading = false;

            return this.products;
        },

        async buyMarketplace(id: string) {
            const userStore = useUserStore();
            const response = await axios
                .post(
                    "http://localhost:3001/marketplace/buy-item",
                    { id },
                    getBearerToken()
                )
                .then(() => {
                    userStore.fetchUser();
                });

            return response;
        }
    },
});
