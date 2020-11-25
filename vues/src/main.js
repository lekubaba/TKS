import Vue from 'vue';
import './assets/globalcss.css';
import App from './App.vue';
import router from './router';
import store from './store';
import vMessage from './components/Message/index';
import VLoading from './components/Loading/index';
import utils from './plugins/utils.js';

Vue.use(vMessage);
Vue.use(VLoading);

Vue.config.productionTip = false;
Vue.prototype.$Utils = utils;
Vue.prototype.$baseURL = 'http://wx.tongkeapp.com';
// Vue.prototype.$APPID = 'wx1d23498d4a220713'; //测试
Vue.prototype.$APPID = 'wx473b861c5a5a8dbb';

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
