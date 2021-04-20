import App from './App'
import Vue from 'vue'

import uView from "uview-ui";
Vue.use(uView);
import store from 'pages/store/index.js' //vuex
Vue.config.productionTip = false 

App.mpType = 'app'

import ry from './common/RongIMLib-3.0.4-dev.min.js'

var im = ry.init({
  appkey: 'c9kqb3rdc2k7j'
});
Vue.prototype.$ry = ry
Vue.prototype.$im = im
App.mpType = 'app'


const app = new Vue({
    ...App,
	 store,  //store:store 和router一样，将我们创建的Vuex实例挂载到这个vue实例中
})
app.$mount()





