import router from '@/router';
import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import ProductFormViewVee from '../ProductFormViewVee.vue';

describe('Product form with veevalidate', () => {
  test('Show error when submit empty values', async () => {
    const wrapper = mount(ProductFormViewVee, {
      global: {
        plugins: [router],
      },
    });
    await wrapper.find('button').trigger('click');
    await wrapper.find('form').trigger('submit');
    await flushPromises();
    console.log(wrapper.html());
    const errorElements = wrapper.findAll('[data-test="error-message"]');
    expect(errorElements).toHaveLength(5);
    expect(errorElements[0].text()).equal('Name is required');
    expect(errorElements[1].text()).equal('Price is required');
    expect(errorElements[2].text()).equal('Category is required');
    expect(errorElements[3].text()).equal('MFG is required');
  });
});
