import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInputVee, { type BaseInputVeeProps } from './BaseInputVee.vue';

describe('BaseInput', () => {
  test('Render proper label', async () => {
    const wrapper = mount(BaseInputVee, {
      props: {
        type: 'text',
        label: 'Name',
        name: 'name',
      } as BaseInputVeeProps,
    });

    expect(wrapper.get('[data-test="label"]').text()).toBe('Name');
  });
});
