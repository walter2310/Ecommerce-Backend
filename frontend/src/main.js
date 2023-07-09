import { createApp , defineAsyncComponent} from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store'
import Toaster from "@meforma/vue-toaster";

const AsyncProductDetails = defineAsyncComponent(() =>
  import('./views/ProductDetails.vue')
);

const app = createApp(App)
app.use(VueAxios, axios)
app.use(store)
app.use(router)
app.use(Toaster)
app.component('AsyncProductDetails', AsyncProductDetails);
app.mount('#app')