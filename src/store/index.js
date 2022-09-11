import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

// 配置项
// key：默认值是vuex
// storage：存储的方式，默认值是本地存储localstorage
// sessionstorage是只在当前会话生效，关闭窗口就清除了
// reducer：指定持久化哪些数据，函数，return一个对象，对象作为存储的value
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'HEIMA_TOUTIAO',
      reducer(state) {
        const { tokenObj } = state
        return { tokenObj }
      }
    })
  ],
  state: {
    tokenObj: {},
    a: 1
  },
  getters: {
    isLogin(state) {
      // 这里为了把token转成布尔值的形式，方便在其他地方用v-if
      return !!state.tokenObj.token
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.tokenObj = token
    }
  },
  actions: {},
  modules: {}
})
