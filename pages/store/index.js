import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import user from './modules/user.js'
import rongYun from './modules/rongYun.js'
import chat from './modules/chat.js'
import boudDocter from './modules/boudDocter.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
	rongYun,
	chat,
	boudDocter
  },
  getters
})

export default store
