import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { formatTime, relativeTime } from '@/utils/format'

// 引入字体图标
import '@/assets/fonts/iconfont.css'

// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入amfe-flexible
import 'amfe-flexible/index.min.js'

Vue.prototype.$formatTime = formatTime
Vue.prototype.$relativeTime = relativeTime

// 过滤器
Vue.filter('relativeTime', relativeTime)
Vue.filter('formatTime', formatTime)

Vue.config.productionTip = false
Vue.use(Vant)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
