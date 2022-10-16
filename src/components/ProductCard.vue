<script setup lang="ts">
import type { Product } from '@/store/modules/product';
import { computed } from 'vue';

const props = defineProps<{ product: Product }>();
const formattedPrice = computed(() => {
  return props.product.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
});
</script>

<template>
  <RouterLink :to="`/products/${product.id}`" class="card">
    <img src="@/assets/logo.svg" alt="Product image" width="200" />
    <div class="card__title" :title="product.name">{{ product.name }}</div>
    <div class="card__category">{{ product.category }}</div>
    <div class="card__price">
      {{ formattedPrice }}
      <span class="card__price--discount" v-if="product.discount > 0">(-{{ product.discount }}%)</span>
    </div>
    <div>DFG: {{ product.mfg }}</div>
  </RouterLink>
</template>

<style lang="scss">
@use '@/assets/main.scss' as v;

.card {
  border: 1px rgb(184, 182, 182) solid;
  padding: 10px 20px;
  width: 220px;
  border-radius: 10px;
  margin: 20px 10px;
  cursor: pointer;

  &__title {
    font-size: 18px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &__category {
    background-color: v.$greenLight;
    width: fit-content;
    padding: 2px 10px;
    border-radius: 5px;
    color: black;
    margin: 5px 0;
  }

  &__price {
    color: red;
    font-weight: 800;

    &--discount {
      font-weight: 400;
    }
  }
}
</style>
