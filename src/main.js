import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
import uView from 'uview-ui'
import { http } from './request/index';
import store from '@/store';
Vue.use(uView)
// 如此配置即可
uni.$u.config.unit = 'rpx'

Vue.config.productionTip = false
Vue.prototype.$http = http;
Vue.prototype.$store = store;
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
