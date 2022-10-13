import type { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { ProductsModule } from "./modules/product";

export type RootState = {
  products: ReturnType<typeof ProductsModule.state>;
};

export const key: InjectionKey<Store<RootState>> = Symbol();

const store = createStore({
  modules: {
    products: ProductsModule,
  },
});

export function useStore() {
  return baseUseStore(key);
}

export default store;
