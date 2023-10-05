// inventory.ts

import { defineStore } from 'pinia';
import axios from 'axios';

interface InventoryState {
  items: any[]; // Remplacez "any[]" par le type approprié de vos articles d'inventaire
  loading: boolean;
}

export const useInventoryStore = defineStore('inventory', {
  state: (): InventoryState => ({
    items: [],
    loading: false,
  }),
  getters: {
    getItems(): any[] {
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
        const response = await axios.get('http://localhost:3001/user/inventory'); // Remplacez '/api/inventory' par l'URL de votre API
        this.items = response.data.items; // Mettez à jour les données de l'inventaire
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'inventaire :', error);
        // Gérez les erreurs de manière appropriée
      }
      this.loading = false;
    },
  },
});
