

import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './routers'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import PrimeVue from 'primevue/config';
import Lara from './preset/lara'; 


const app = createApp(App)

app.use(router)
app.use(VueSweetalert2)
app.use(PrimeVue, {
    unstyled: true,
    pt: Lara  
});



app.mount('#app')
 