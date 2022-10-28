<script setup lang="ts">
import { productsModule } from '@/store';
import { useRoute, useRouter } from 'vue-router';
import { nanoid } from 'nanoid';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import BaseInputVee from '../components/elements/BaseInputVee.vue';

const router = useRouter();
const route = useRoute();
const { id } = route.params;
const product = productsModule.getProduct(id as string);

const schema = yup.object({
  name: yup.string().trim().required(),
  price: yup.number().min(1).required(),
  discount: yup.number().min(0).max(100).required(),
  category: yup.string().trim().required(),
  mfg: yup.string().trim().required(),
});

const { values, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    name: product ? product.name : '',
    price: product ? product.price : 0,
    discount: product ? product.discount : 0,
    category: product ? product.category : '',
    mfg: product ? product.mfg : '',
  },
});

const onSubmit = handleSubmit(async () => {
  {
    if (product) {
      productsModule.editProduct({
        id: product.id,
        product: {
          ...product,
          name: values.name,
          price: values.price,
          category: values.category,
          mfg: values.mfg,
          discount: values.discount,
        },
      });
    } else {
      productsModule.addProduct({
        name: values.name,
        price: values.price,
        category: values.category,
        mfg: values.mfg,
        discount: values.discount,
        id: nanoid(),
      });
    }
    router.back();
  }
});
</script>

<template>
  <div class="background--grey"></div>
  <form class="modal" @submit="onSubmit">
    <BaseInputVee type="text" label="Name" name="name" />
    <BaseInputVee type="number" label="Price" name="price" />
    <BaseInputVee type="number" label="% Discount" name="discount" />
    <BaseInputVee type="select" label="Category" name="category">
      <option value="">Select category</option>
      <option value="Điện tử">Điện tử</option>
      <option value="Sách">Sách</option>
      <option value="Thời trang">Thời trang</option>
    </BaseInputVee>
    <BaseInputVee type="date" label="MFG" name="mfg" />
    <button type="submit" class="btn-submit">Submit</button>
  </form>
</template>

<style lang="scss">
@use '@/assets/main.scss' as v;
.background--grey {
  position: fixed;
  z-index: 998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(61, 61, 61);
  opacity: 50%;
}

.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 500px;
  margin-left: -150px;
  background-color: white;
  padding: 60px 50px;
  border-radius: 10px;
}

.btn-submit {
  background-color: v.$green;
  border: 0px;
  padding: 10px 20px;
  font-size: 20px;
  border-radius: 5px;
  color: white;
  width: 100%;
  margin: 30px 0px;
}

.input--error {
  color: rgb(241, 75, 75);
  font-size: 15px;
  width: 80%;
  right: 0;
}
</style>
