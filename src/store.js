import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
    // strict: true,
    state: {
        threads: []
    },
    actions: {

    },
    mutations: {

    }
})
