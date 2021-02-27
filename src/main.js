import Vue from 'vue'
import App from './App.vue'
import utils from './util/utils'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router/index'
import 'font-awesome/css/font-awesome.min.css'
Vue.use(ElementUI)
Vue.prototype.formatTime = utils.formatTime
Vue.prototype.formatTimeEach = utils.formatTimeEach

new Vue({
  el: '#app',
  router,

  render: h => h(App)
})
