import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInput, { type BaseInputProps } from '../BaseInput.vue';
import { ref } from 'vue';

describe('BaseInput', () => {
  test('Label and emit event', async () => {
    const name = ref('');
    const wrapper = mount(BaseInput, {
      props: {
        type: 'text',
        label: 'Name',
        modelValue: name,
      } as BaseInputProps,
    });

    // Proper label
    expect(wrapper.get('[data-test="label"]').text()).toBe('Name');

    // Emit event to change value
    await wrapper.get('[data-test="input-value"]').setValue('This is product name');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
  });
});
