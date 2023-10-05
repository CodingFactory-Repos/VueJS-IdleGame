// inventory.ts
import { defineStore } from "pinia";
import axios from "axios";
import { getBearerToken } from "@/config/axios.config";
import { Product } from "./shop";

// InventoryItem.ts
export interface InventoryItem {
    _id: string;
    user_id: string;
    item_id: string;
    level: number;
    total_farmed: number;
    canLevelUp: boolean;
    level_up_cost: number;
    generate_per_second: string;
}

interface InventoryState {
    items: InventoryItem[]; // Utilisez le type InventoryItem pour les objets d'inventaire
    loading: boolean;
}

export const useInventoryStore = defineStore("inventory", {
    state: (): InventoryState => ({
        items: [],
        loading: false,
    }),
    getters: {
        getItems(): any {
            return this.items;
        },
        isLoading(): boolean {
            return this.loading;
        },
    },
    actions: {
        async fetchInventory() {
            this.loading = true;
            try {
                // Effectuez ici l'appel API pour récupérer l'inventaire de l'utilisateur
                const inventory = await axios.get(
                    "http://localhost:3001/user/inventory",
                    getBearerToken()
                );

                const items = await Promise.all(
                    inventory.data.items.map(async (item: InventoryItem) => {
                        const response = await axios.get(
                            `http://localhost:3001/shop/item/${item.item_id}`,
                            getBearerToken()
                        );

                        return {
                            inventory_data: item,
                            shop_data: response.data,
                        };
                    })
                );

                this.items = items;
                this.loading = false;
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération de l'inventaire :",
                    error
                );
            }
            this.loading = false;
        },

        async claimReward(itemId: string, rowId: string) {
            try {
                const response = await axios.post(
                    "http://localhost:3001/user/item  -reward",
                    { itemId, rowId },
                    getBearerToken()
                );

                // Mettez à jour les données de l'inventaire après avoir réclamé la récompense
                this.items = response.data.items;

                console.log("Récompense réclamée avec succès");
            } catch (error) {
                console.error(
                    "Erreur lors de la réclamation de la récompense :",
                    error
                );
            }
        },

        async levelUpItem(item_id: string, row_id: string) {
            const inventory = await axios.post(
                "http://localhost:3001/inventory/item-level-up",
                { item_id, row_id },
                getBearerToken()
            );

            if (inventory.data.message) {
                console.log(inventory.data.message);
                return;
            }

            // Mettez à jour les données de l'inventaire après avoir réclamé la récompense
            const items = await Promise.all(
                inventory?.data?.map(async (item: InventoryItem) => {
                    const response = await axios.get(
                        `http://localhost:3001/shop/item/${item.item_id}`,
                        getBearerToken()
                    );

                    return {
                        inventory_data: item,
                        shop_data: response.data,
                    };
                })
            );

            this.items = items;
        },

        async sellItem(item_id: string) {
            const inventory = await axios.post(
                "http://localhost:3001/marketplace/sell-item",
                { id: item_id },
                getBearerToken()
            );

            if (inventory.data.message) {
                console.log(inventory.data.message);
                return;
            }

            // Mettez à jour les données de l'inventaire après avoir réclamé la récompense
            const items = await Promise.all(
                inventory?.data?.map(async (item: InventoryItem) => {
                    const response = await axios.get(
                        `http://localhost:3001/shop/item/${item.item_id}`,
                        getBearerToken()
                    );

                    return {
                        inventory_data: item,
                        shop_data: response.data,
                    };
                })
            );

            this.items = items;
        }
    },
});
