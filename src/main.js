import Vue from 'vue'
import App from './App.vue'
import './assets/font/iconfont'
import vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
Vue.use(vant)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
