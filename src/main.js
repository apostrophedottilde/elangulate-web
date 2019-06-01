import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Thumbnail from './components/ThumbnailImage'
import BBadge from 'bootstrap-vue/es/components/badge/badge'
import vBPopover from 'bootstrap-vue/es/directives/popover/popover'

import BMedia from 'bootstrap-vue/es/components/media/media'
import BImg from 'bootstrap-vue/es/components/image/img'

library.add(faCoffee);
library.add(faComment);

const VueCookie = require('vue-cookie');
Vue.use(VueCookie);

Vue.directive('b-popover', vBPopover)


Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('b-badge', BBadge)
Vue.component('thumbnail-image', Thumbnail)
Vue.component('b-media', BMedia)
Vue.component('b-img', BImg)





Vue.config.productionTip = false;

new Vue({
  router,
  components: {
    App,
  },
  render: h => h(App),
}).$mount('#app')
