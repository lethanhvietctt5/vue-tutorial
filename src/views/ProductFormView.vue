<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import BaseInput from "../components/elements/BaseInput.vue";
import { useStore } from "@/store";
import { useRoute, useRouter } from "vue-router";
import { nanoid } from "nanoid";
import type { Product } from "@/store/modules/product";

const store = useStore();
const router = useRouter();
const route = useRoute();
const { id } = route.params;
const product: Product = store.getters["products/getProduct"](id);

const name = ref(product ? product.name : "");
const price = ref(product ? product.price : 0);
const discount = ref(product ? product.discount : 0);
const category = ref(product ? product.category : "");
const mfg = ref(product ? product.mfg : "");

const rules = {
  name: {
    required,
  },
  price: {
    required,
    minValue: minValue(1),
  },
  discount: {
    minValue: minValue(0),
  },
  category: {
    required,
  },
  mfg: {
    required,
  },
};

const v = useVuelidate(rules, { name, price, category, mfg, discount });

async function onSubmit(e: Event) {
  const validateResult = await v.value.$validate();
  for (let i = 0; i < 5; i++) {
    console.log(nanoid());
  }
  if (!validateResult) return;

  if (product) {
    store.commit("products/editProduct", {
      id: product.id,
      product: { ...product, name, price, category, mfg, discount },
    });
  } else store.commit("products/addProduct", { name, price, category, mfg, discount, id: nanoid() });
  router.replace("/products");
}
</script>

<template>
  <div class="background--grey"></div>
  <form class="modal" @submit.prevent="onSubmit">
    <BaseInput type="text" label="Name" v-model="name" :errors="v.name.$errors" />
    <BaseInput type="number" label="Price" v-model="price" :errors="v.price.$errors" />
    <BaseInput type="number" label="% Discount" v-model="discount" :errors="v.discount.$errors" />
    <BaseInput type="select" label="Category" v-model="category" :errors="v.category.$errors">
      <option value="">Select category</option>
      <option value="Điện tử">Điện tử</option>
      <option value="Sách">Sách</option>
      <option value="Thời trang">Thời trang</option>
    </BaseInput>
    <BaseInput type="date" label="MFG" v-model="mfg" :errors="v.mfg.$errors" />
    <button type="submit" class="btn-submit">Submit</button>
  </form>
</template>

<style lang="scss">
@use "@/assets/main.scss" as v;
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
