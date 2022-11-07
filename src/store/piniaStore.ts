import api from '@/api';
import { nanoid } from 'nanoid';
import { defineStore } from 'pinia';

export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
};

export const useUserStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
  }),

  actions: {
    addUser(name: string, email: string) {
      this.users.push({ name, email, username: email, phone: '+84xxxxxxx', website: 'www/x', id: nanoid() });
    },

    async getUsers() {
      this.users = await api.get('/users');
    },
  },
});
