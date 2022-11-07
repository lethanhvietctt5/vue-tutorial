import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

import './assets/main.scss';
import store, { key } from './store';

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(store, key);
app.use(pinia);

app.mount('#app');
