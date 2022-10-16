import type { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import ProductsModule, { type Product } from './modules/product';

export type RootState = {
  products: Product[];
};

export const key: InjectionKey<Store<RootState>> = Symbol();

const store = createStore({
  modules: {
    productsModule: ProductsModule,
  },
});

export function useStore() {
  return baseUseStore(key);
}

const productsModule = getModule(ProductsModule, store);
export { productsModule };

export default store;
