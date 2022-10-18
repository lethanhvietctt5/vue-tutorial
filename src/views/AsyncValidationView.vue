<script setup lang="ts">
import { ref } from 'vue';
import { required, email, helpers } from '@vuelidate/validators';
import api from '@/api';
import useVuelidate from '@vuelidate/core';

const emailValue = ref('');
const rules = {
  email: {
    required,
    email,
    isUnique: helpers.withAsync(async (value: any) => {
      const res = await api.get(`/users?email=${value}`);
      if (res.data && (res.data as Array<any>).length > 0) return true;
      return false;
    }),
  },
};

const v = useVuelidate(rules, { email: emailValue });
</script>

<template>
  <div>
    <div>Validate email:</div>
    <input type="text" v-model="v.email.$model" />
    <div v-if="v.email.$errors.length > 0">{{ v.email.$errors[0].$message }}</div>
    <div v-if="v.email.$pending">pending</div>
  </div>
</template>
