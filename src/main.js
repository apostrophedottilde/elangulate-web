import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Thumbnail from './components/ThumbnailImage'
import VueCookie from 'vue-cookie'
import BootstrapVue from 'bootstrap-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight, faChevronLeft, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faCoffee, faComment } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(VueCookie);
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('thumbnail-image', Thumbnail)
Vue.config.productionTip = false;

library.add(faCoffee);
library.add(faComment);
library.add(faChevronRight);
library.add(faChevronLeft);
library.add(faChevronDown);
library.add(faChevronUp);

new Vue({
  router,
  components: {
    App,
  },
  render: h => h(App),
}).$mount('#app')
