import {createApp} from 'vue';

// Vuetify
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import {createVuetify} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Components

const vuetify = createVuetify({
  components,
  directives,
});

import App from '/@/App.vue';

createApp(App).use(vuetify).mount('#app');
