import {createApp} from 'vue';
import {createPinia} from 'pinia';
import vuetify from '../vuetify-plugin';

import App from '/@/App.vue';

const pinia = createPinia();

createApp(App).use(pinia).use(vuetify).mount('#app');
