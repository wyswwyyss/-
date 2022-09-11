import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// SPA
// 首屏加载速度很慢
// 路由懒加载
// -使用到了路由页面，再去请求他
const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    // 设置重定向让浏览器开始就直接跳转到home
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName:"base" */ '@/views/Video')
      },
      {
        path: '/qa',
        component: () => import(/* webpackChunkName:"base" */ '@/views/QA')
      },
      {
        path: '/profile',
        component: () => import('@/views/My')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
