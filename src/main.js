import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './assets/font/iconfont.css'
import vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
Vue.use(vant)
Vue.use(router)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
