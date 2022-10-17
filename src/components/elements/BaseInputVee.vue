<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps<{ label: string; type: string; name: string }>();
const { value, errorMessage } = useField(props.name);
</script>

<template>
  <div class="wrapper">
    <label class="wrapper__label">{{ label }}</label>

    <div class="wrapper__input-group">
      <select v-if="type == 'select'" class="wrapper__input-group__input" v-model="value">
        <slot></slot>
      </select>

      <input v-else :type="type" class="wrapper__input-group__input" v-model="value" />
      <div v-if="errorMessage" class="wrapper__input-group--error">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', sans-serif;
  margin: 10px 0;

  &__input-group {
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    &__input {
      flex: 1 1 0%;
      outline-width: 0px;
      padding: 10px 10px;
      font-size: 16px;
      border: 1px solid grey;
      border-radius: 4px;
      font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans',
        'Droid Sans', 'Helvetica Neue', sans-serif;
    }

    &--error {
      color: rgb(241, 75, 75);
      font-size: 15px;
    }
  }

  &__label {
    font-weight: 500;
    text-align: start;
    width: 20%;
  }
}

input {
  height: 20px;
}
</style>
