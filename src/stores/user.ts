import { defineStore } from "pinia";
import axios from "axios";
import {getBearerToken} from "@/config/axios.config";

export class User {
    username: string;
    createdAt: Date;
    money: number;
    slots_number: number;
    used_slots: number;
    level: number;
    xp: number;
    xp_to_next_level: number;
    last_daily: number;
    hasTenBTC: boolean;
    hasGraphicsCard: boolean;


    constructor() {
        this.username = "";
        this.createdAt = new Date();
        this.money = 0;
        this.slots_number = 0;
        this.used_slots = 0;
        this.level = 0;
        this.xp = 0;
        this.xp_to_next_level = 0;
        this.last_daily = 0;
        this.hasTenBTC = false;
        this.hasGraphicsCard = false;
    }
}

interface UserState {
    user: User;
    loading: boolean;
}

export const useUserStore = defineStore("user", {
    state: (): UserState => ({
        user: new User(),
        loading: false,
    }),
    getters: {
        getUser(): User {
            return this.user;
        },
        isLoading(): boolean {
            return this.loading;
        },
    },
    actions: {
        async fetchUser() {
            this.loading = true;
            const response = await axios.get("http://localhost:3001/auth/me", getBearerToken());
            this.user = response.data;
            this.loading = false;

            return this.user;
        }
    },
});
