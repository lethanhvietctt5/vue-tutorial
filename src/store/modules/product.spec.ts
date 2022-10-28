import { nanoid } from 'nanoid';
import { describe, expect, test } from 'vitest';
import { getModule } from 'vuex-module-decorators';
import store from '..';
import ProductsModule, { initProducts, type Product } from './product';

describe('Product module', () => {
  const productModule = getModule(ProductsModule, store);

  const product: Product = {
    id: nanoid(),
    category: 'Thời trang',
    discount: 0,
    mfg: '2022/10/10',
    name: 'New product',
    price: 200_000,
  };

  test('Should be proper init value', () => {
    expect(productModule.products).toHaveLength(initProducts.length);
  });

  test('Add new product', () => {
    productModule.addProduct(product);
    expect(productModule.products[productModule.products.length - 1]).toStrictEqual(product);
  });

  test('Get a product', () => {
    expect(productModule.products[0]).toStrictEqual(initProducts[0]);
  });

  test('Edit a product', () => {
    const editedProduct = product;
    editedProduct.name = 'New product 2';

    productModule.editProduct({ id: editedProduct.id, product: editedProduct });
    expect(productModule.products[productModule.products.length - 1]).toStrictEqual(editedProduct);
  });
});
