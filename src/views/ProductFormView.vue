<script setup lang="ts">
import { ref } from 'vue';
import { productsModule } from '@/store';
import { useVuelidate } from '@vuelidate/core';
import { required, minValue, helpers } from '@vuelidate/validators';
import { useRoute, useRouter } from 'vue-router';
import { nanoid } from 'nanoid';
import BaseInput from '../components/elements/BaseInput.vue';

const router = useRouter();
const route = useRoute();
const { id } = route.params;
const product = productsModule.getProduct(id as string);

const name = ref(product ? product.name : '');
const price = ref(product ? product.price : '');
const discount = ref(product ? product.discount : '');
const category = ref(product ? product.category : '');
const mfg = ref(product ? product.mfg : '');

const rules = {
  name: {
    required: helpers.withMessage('Name is required', required),
  },
  price: {
    required: helpers.withMessage('Price is required', required),
    minValue: helpers.withMessage('Min value of price is 1$', minValue(1)),
  },
  discount: {
    minValue: helpers.withMessage('%Discount must be greater than 0.', minValue(0)),
  },
  category: {
    required: helpers.withMessage('Category is required', required),
  },
  mfg: {
    required: helpers.withMessage('MFG is required', required),
  },
};

const v = useVuelidate(rules, { name, price, category, mfg, discount });

async function onSubmit() {
  const validateResult = await v.value.$validate();
  if (!validateResult) return;

  if (product) {
    productsModule.editProduct({
      id: product.id,
      product: {
        ...product,
        name: name.value,
        price: price.value as number,
        category: category.value,
        mfg: mfg.value,
        discount: Number(discount.value) || 0,
      },
    });
  } else {
    productsModule.addProduct({
      name: name.value,
      price: price.value as number,
      category: category.value,
      mfg: mfg.value,
      discount: Number(discount.value) || 0,
      id: nanoid(),
    });
  }
  router.back();
}
</script>

<template>
  <div class="background--grey"></div>
  <form class="modal" @submit.prevent="onSubmit">
    <BaseInput type="text" label="Name" v-model="v.name.$model" :errors="v.name.$errors" />
    <BaseInput type="number" label="Price" v-model="v.price.$model" :errors="v.price.$errors" />
    <BaseInput type="number" label="% Discount" v-model="v.discount.$model" :errors="v.discount.$errors" />
    <BaseInput type="select" label="Category" v-model="v.category.$model" :errors="v.category.$errors">
      <option value="">Select category</option>
      <option value="??i???n t???">??i???n t???</option>
      <option value="S??ch">S??ch</option>
      <option value="Th???i trang">Th???i trang</option>
    </BaseInput>
    <BaseInput type="date" label="MFG" v-model="v.mfg.$model" :errors="v.mfg.$errors" />
    <button type="submit" class="btn-submit">Submit</button>
  </form>
</template>

<style lang="scss">
@use '@/assets/main.scss' as v;
.background--grey {
  position: fixed;
  z-index: 998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(61, 61, 61);
  opacity: 50%;
}

.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 500px;
  margin-left: -150px;
  background-color: white;
  padding: 60px 50px;
  border-radius: 10px;
}

.btn-submit {
  background-color: v.$green;
  border: 0px;
  padding: 10px 20px;
  font-size: 20px;
  border-radius: 5px;
  color: white;
  width: 100%;
  margin: 30px 0px;
}
</style>
