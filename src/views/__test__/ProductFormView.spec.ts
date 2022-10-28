import router from '@/router';
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import ProductFormView from '../ProductFormView.vue';

describe('Product form with vuelidate', async () => {
  let wrapper: ReturnType<typeof mount<any>>;

  beforeEach(() => {
    wrapper = mount(ProductFormView, {
      global: {
        plugins: [router],
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  const getErrorElements = () => wrapper.findAll('[data-test="error-message"]');
  const triggerSubmitForm = () => wrapper.find('form').trigger('submit');

  test('Show error when submit empty value', async () => {
    await triggerSubmitForm();
    const errorElements = getErrorElements();
    expect(errorElements).toHaveLength(4);
    expect(errorElements[0].text()).equal('Name is required');
    expect(errorElements[1].text()).equal('Price is required');
    expect(errorElements[2].text()).equal('Category is required');
    expect(errorElements[3].text()).equal('MFG is required');
  });

  test('Invalid price', async () => {
    await wrapper.findAll('input')[1].setValue(-1);
    await triggerSubmitForm();
    const errorElements = getErrorElements();
    expect(errorElements[1].text()).equal('Min value of price is 1$');
  });

  test('Invalid discount percent', async () => {
    await wrapper.findAll('input')[2].setValue(-1);
    await triggerSubmitForm();
    const errorElements = getErrorElements();
    expect(errorElements[2].text()).equal('%Discount must be greater than 0.');
  });
});
