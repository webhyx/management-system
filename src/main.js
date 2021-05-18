import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import http from '@/api/config' //什么时候用@,怎么用
import './mock'  //会自动去找这个文件下的index.js文件
 
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.prototype.$http = http   // 挂载到vue原型上面，在vue组件中使用this.$htpp就可以调用http的axios实例

// 路由守卫
router.beforeEach((to,from,next) => {
  store.commit('user/getToken')
  let token = store.state.user.token
  if(!token && to.name !== 'login') {
    next({name:'login'})
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  // 刷新
  created() {
    store.commit('tab/addMenu',router)
  },
}).$mount('#app')
