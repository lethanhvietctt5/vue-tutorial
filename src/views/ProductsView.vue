<script setup lang="ts">
import { useStore } from "@/store";
import ProductCard from "../components/ProductCard.vue";

const store = useStore();
</script>

<template>
  <div class="group-buttons">
    <button class="button--add">
      <RouterLink to="/products/add">Add product</RouterLink>
    </button>
  </div>
  <div>
    <Teleport to="body">
      <RouterView />
    </Teleport>
  </div>
  <div class="products">
    <ProductCard v-for="(product, index) in store.state.products" :key="index" :product="product" />
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/main.scss" as v;

.group-buttons {
  margin-bottom: 20px;
}

.button--add {
  background-color: v.$green;
  border: 0;
  color: white;
  padding: 6px 10px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;

  a {
    color: white;
  }
}

.products {
  display: flex;
  flex-wrap: wrap;
}
</style>
