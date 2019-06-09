import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight, faChevronLeft, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faCoffee, faComment } from '@fortawesome/free-solid-svg-icons'
import Thumbnail from './components/ThumbnailImage'
import VueCookie from 'vue-cookie'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);
Vue.use(VueCookie);

library.add(faCoffee);
library.add(faComment);
library.add(faChevronRight);
library.add(faChevronLeft);
library.add(faChevronDown);
library.add(faChevronUp);

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
