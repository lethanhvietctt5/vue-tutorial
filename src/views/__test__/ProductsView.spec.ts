import router from '@/router';
import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import ProductsView from '../ProductsView.vue';

describe('Products view', () => {
  test('Show proper number of product', () => {
    const wrapper = mount(ProductsView, {
      global: {
        plugins: [router],
      },
    });

    // Init 5 items from vuex
    expect(wrapper.findAll('[data-test="product-item"]')).toHaveLength(5);
  });
});
