<script setup lang="ts">
import { ref } from 'vue';
import { required, email, helpers } from '@vuelidate/validators';
import api from '@/api';
import useVuelidate from '@vuelidate/core';
import { usersModule } from '@/store';
import IcLoading from '../components/icons/IcLoading.vue';

const emailValue = ref('');
const rules = {
  email: {
    required,
    email,
    isUnique: helpers.withAsync(async (value: any) => {
      const res = await api.get(`/users?email=${value}`);
      if (res.data && (res.data as Array<any>).length > 0) return false;
      return true;
    }),
  },
};

const v = useVuelidate(rules, { email: emailValue });
</script>

<template>
  <div class="validate-wrapper">
    <div>
      <div>Validate email:</div>
      <input type="text" v-model="v.email.$model" />
      <div v-if="v.email.$dirty">
        <div v-if="v.email.$pending">pending</div>
        <div v-else-if="v.email.$dirty && v.email.isUnique.$invalid" class="message--error" data-test="message-error">
          Email has already existed
        </div>
        <div v-else-if="v.email.$errors.length > 0" class="message--error" data-test="message-error">
          {{ v.email.$errors[0].$message }}
        </div>
        <div v-else class="message--success" data-test="message--success">Email is valid</div>
      </div>
    </div>
  </div>

  <div class="list-user">
    <div v-if="usersModule.loading" class="loading" data-test="loading-icon">
      <IcLoading />
    </div>
    <div v-else class="list-wrapper">
      <button @click="usersModule.getUsers()">Get list users</button>
      <div v-for="(user, index) in usersModule.users" :key="user.id">
        {{ index }} - {{ user.name }} - {{ user.email }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/main.scss' as v;

input {
  padding: 5px 10px;
  outline: none;
  font-size: 18px;
}

button {
  padding: 10px 10px;
  font-size: 16px;
  background-color: v.$green;
  border: 0;
  color: white;
  border-radius: 5px;
  margin: 40px 0px;
}

.loading {
  color: v.$green;
  margin-top: 20px;
  width: 80px;
}

.validate-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.list-user {
  width: 100%;
  display: flex;
  justify-content: center;
}

.list-wrapper {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.message--error {
  color: red;
}

.message--success {
  color: v.$green;
}
</style>
