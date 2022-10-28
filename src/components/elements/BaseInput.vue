<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core';
import type { Ref } from 'vue';

export type BaseInputProps = {
  label: string;
  modelValue: string | number | Ref<any>;
  type: string;
  errors?: ErrorObject[];
};
export type EventEmitter = {
  (event: 'update:modelValue', payload: string): void;
};

defineProps<BaseInputProps>();
const emit = defineEmits<EventEmitter>();
</script>

<template>
  <div class="wrapper">
    <label class="wrapper__label" data-test="label">{{ label }}</label>

    <div class="wrapper__input-group">
      <select
        v-if="type == 'select'"
        class="wrapper__input-group__input"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        data-test="input-value"
      >
        <slot></slot>
      </select>

      <input
        v-else
        :type="type"
        :value="modelValue"
        class="wrapper__input-group__input"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        data-test="input-value"
      />
      <div v-if="errors && errors.length > 0" class="wrapper__input-group--error" data-test="error-message">
        {{ errors[0].$message }}
      </div>
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
