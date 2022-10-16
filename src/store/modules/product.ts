import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

export type Product = {
  id: string;
  name: string;
  price: number;
  discount: number;
  category: string;
  mfg: string;
};

const initProducts = [
  {
    name: 'Màn Hình MSI Optix MAG251RX 240Hz (24.5 inch, 1920 x 1080, 240Hz, IPS, 1ms) -Hàng Chính Hãng',
    price: 8990000,
    category: 'Điện tử',
    discount: 10,
    id: 'nqn8YC7Q11K4AJ4-p1k9y',
    mfg: '2022-09-25',
  },
  {
    name: 'Big Step TOEIC 1 (LC + RC) - Kèm CD Hoặc File MP3',
    price: 125000,
    category: 'Sách',
    discount: 10,
    id: 'AAAcXPwVOcGe3BgYdDeUQ',
    mfg: '2022-09-25',
  },
  {
    name: 'Luyện Thi TOEIC Cấp Tốc Trong 30 Ngày - Plan B - Nghe Hiểu',
    price: 299000,
    category: 'Sách',
    discount: 10,
    id: 'lUpFFte1wrc1i-6pwv8Sj',
    mfg: '2022-09-25',
  },
  {
    name: 'Áo sơ mi nam trơn tay dài cao cấp Lados - 779 chất kate lụa mềm mát, thấm hút mồ hôi',
    price: 299000,
    category: 'Thời trang',
    discount: 10,
    id: 'wHiFGLkj7C-XOnzZrCcg8',
    mfg: '2022-09-25',
  },
  {
    name: 'Quần shorts thể thao nam dạng sọt sport đùi chất thun lạnh 4 chiều cao cấp phù hợp tập gym hay mặc nhà có màu trắng và đen DUI-P101',
    price: 299000,
    category: 'Thời trang',
    discount: 10,
    id: 'hapUJHeH0SIS8LMZwnNRn',
    mfg: '2022-09-25',
  },
];

@Module({ namespaced: true, name: 'productsModule' })
export default class ProductsModule extends VuexModule {
  products: Product[] = initProducts;

  @Mutation
  addProduct(product: Product) {
    this.products.push(product);
  }

  @Mutation
  editProduct(payload: { id: string; product: Product }) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === payload.id) {
        this.products[i] = payload.product;
      }
    }
  }

  get getProduct() {
    return (id: string) => {
      const filtered = this.products.filter(product => product.id === id);
      if (filtered.length > 0) return filtered[0];
      return null;
    };
  }
}
