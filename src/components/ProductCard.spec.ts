import router from '@/router';
import type { Product } from '@/store/modules/product';
import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import ProductCard, { type ProductCardProps } from './ProductCard.vue';

describe('ProductCard', () => {
  test('Render proper value', () => {
    const product: Product = {
      name: 'New product',
      category: 'Điện tử',
      discount: 10,
      price: 200_000,
      id: '29038479028304',
      mfg: '2022-09-20',
    };

    const wrapper = mount(ProductCard, {
      props: { product } as ProductCardProps,
      global: {
        plugins: [router],
      },
    });

    // Expect show proper data
    expect(wrapper.get('[data-test="title"]').text()).toBe(product.name);
    expect(wrapper.get('[data-test="category"]').text()).toBe(product.category);
    expect(wrapper.get('[data-test="discount"]').text()).toBe(`(-${product.discount}%)`);
    expect(wrapper.get('[data-test="price"]').text()).toBe(
      product.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
    );
    expect(wrapper.get('[data-test="mfg"]').text()).toBe(`MFG: ${product.mfg}`);
  });
});
