import Vue from 'vue'
import Vuex from 'vuex'
import tab from './modules/tab'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {tab,user}
})
