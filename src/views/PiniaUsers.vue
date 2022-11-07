<script lang="ts" setup>
import { useUserStore } from '@/store/piniaStore';
import { ref } from 'vue';

const store = useUserStore();
const name = ref('');
const email = ref('');

function onSubmit() {
  if (!name.value || !email.value) return;
  store.addUser(name.value, email.value);
  name.value = '';
  email.value = '';
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="field">
      <label for="name">Name</label>
      <input class="field__input" type="text" name="name" v-model="name" placeholder="Enter user name" />
    </div>

    <div class="field">
      <label for="email">Email</label>
      <input type="text" name="email" v-model="email" placeholder="Enter user email" />
    </div>

    <button type="submit">Add</button>
  </form>

  <div>
    <div v-for="(user, index) in store.users" :key="index">{{ index + 1 }}. {{ user.name }} - {{ user.email }}</div>
  </div>
</template>

<style lang="scss">
@use '@/assets/main.scss' as v;

.field {
  width: 13%;
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

button {
  background-color: v.$green;
  border: 0px;
  padding: 5px 10px;
  font-size: 20px;
  border-radius: 5px;
  color: white;
}
</style>
