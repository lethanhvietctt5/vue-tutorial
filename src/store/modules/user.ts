import api from '@/api';
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';

export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
};

@Module({ namespaced: true, name: 'usersModule' })
export default class UsersModule extends VuexModule {
  users: User[] = [];
  loading: boolean = false;

  @Action
  async getUsers() {
    try {
      this.context.commit('setLoading', true);
      const users = await api.get('/users');
      this.context.commit('setUsers', users.data);
    } catch (err) {
      console.log(err);
    } finally {
      this.context.commit('setLoading', false);
    }
  }

  @Mutation
  setUsers(users: User[]) {
    this.users.length = 0;
    this.users.push(...users);
  }

  @Mutation
  setLoading(status: boolean) {
    this.loading = status;
  }
}
