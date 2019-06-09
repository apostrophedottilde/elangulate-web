import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { faCoffee, faComment } from '@fortawesome/free-solid-svg-icons'
import { FortAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Thumbnail from './components/ThumbnailImage'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import { library } from '@fortawesome/fontawesome-svg-core'


library.add(faCoffee);
library.add(faComment);
Vue.component('font-awesome-icon', FortAwesomeIcon)
Vue.component('thumbnail-image', Thumbnail)


const VueCookie = require('vue-cookie');
Vue.use(VueCookie);


Vue.config.productionTip = false;

new Vue({
  router,
  components: {
    App,
  },
  render: h => h(App),
}).$mount('#app')
