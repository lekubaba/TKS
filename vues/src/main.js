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

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
