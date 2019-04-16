import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Thumbnail from './components/ThumbnailImage'

library.add(faCoffee);
library.add(faComment);

const VueCookie = require('vue-cookie');


Vue.use(VueCookie);

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('thumbnail-image', Thumbnail)


Vue.config.productionTip = false;

new Vue({
  router,
  components: {
    App,
  },
  render: h => h(App),
}).$mount('#app')
