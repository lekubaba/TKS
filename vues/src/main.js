import Vue from 'vue';
import './assets/globalcss.css';
import App from './App.vue';
import router from './router';
import store from './store';
import vMessage from './components/Message/index';
import VLoading from './components/Loading/index';
import utils from './plugins/utils.js';
import VueClipboard from 'vue-clipboard2';

VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard)
Vue.use(vMessage);
Vue.use(VLoading);

Vue.config.productionTip = false;
Vue.prototype.$Utils = utils;

Vue.prototype.$baseURL = 'http://feige.tongkeapp.com';
Vue.prototype.$APPID = 'wx1d23498d4a220713'; //测试
// Vue.prototype.$APPID = 'wx473b861c5a5a8dbb';

Vue.prototype.$NumberMul = function(arg1, arg2) {
    var m = 0;
    var s1 = arg1.toString();
    var s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    } catch (e) {}
    try {
        m += s2.split(".")[1].length;
    } catch (e) {}
 
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
