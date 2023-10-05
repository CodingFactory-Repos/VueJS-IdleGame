// inventory.ts
import { defineStore } from 'pinia';
import axios from 'axios';
import { getBearerToken } from '@/config/axios.config';


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

export const useInventoryStore = defineStore('inventory', {
  state: (): InventoryState => ({
    items: [],
    loading: false,
  }),
  getters: {
    getItems(): InventoryItem[] {
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
        const response = await axios.get('http://localhost:3001/user/inventory', getBearerToken()); // Remplacez l'URL par votre endpoint API
        this.items = response.data.items; // Mettez à jour les données de l'inventaire
        console.log(response.data.items); //
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'inventaire :', error);
        // Gérez les erreurs de manière appropriée
      }
      this.loading = false;
    },
    async claimReward(itemId: string, rowId: string) {
      try {
        const response = await axios.post(
          'http://localhost:3001/user/item  -reward',
          { itemId, rowId },
          getBearerToken()
        );
  
        // Mettez à jour les données de l'inventaire après avoir réclamé la récompense
        this.items = response.data.items;
  
        console.log('Récompense réclamée avec succès');
      } catch (error) {
        console.error('Erreur lors de la réclamation de la récompense :', error);
        // Gérez les erreurs de manière appropriée
      }
    },
  },
});
