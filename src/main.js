import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router/index'
import 'font-awesome/css/font-awesome.min.css'
Vue.use(ElementUI)
Vue.prototype.formatTime = (v,sep) => {
  return v.split('T').join(sep||' ').split('+')[0];
}
Vue.prototype.formatTimeEach = (rows,keys,sep) => {
  if(rows) for (var i = 0; i < rows.length; i++) {
    for(var k in keys) rows[i][k] = this.formatTime(rows[i][k],sep);
  }
}

new Vue({
  el: '#app',
  router,

  render: h => h(App)
})
