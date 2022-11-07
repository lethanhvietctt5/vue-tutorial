<template>
  <main>
    <RouterLink to="/products">
      1. List products (nested route, reusable component, 2 way binding, directive, validate form with vuelidate )
    </RouterLink>
    <RouterLink to="/async-validate"> 2. Validate email (async validation) </RouterLink>
    <RouterLink to="/pinia-store"> 3. Pinia Store </RouterLink>
  </main>
</template>

<style scoped>
a {
  display: block;
  font-size: 18px;
}
</style>
