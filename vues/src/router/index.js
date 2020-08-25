import Vue from 'vue';
import VueRouter from 'vue-router';
import Promotion from '../views/customerPromotion.vue';
const Data = ()=>import(/* webpackChunkName: "customerdata" */ '../views/customerData.vue');
const Center = ()=>import(/* webpackChunkName: "customercenter" */ '../views/customerCenter.vue');

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Promotion',
		component: Promotion
	},
	{
		path: '/customer_data',
		name: 'customerData',
		component: Data
	},
	{
		path: '/customer_center',
		name: 'customerCenter',
		component: Center
	}
]

const router = new VueRouter({
	routes
})

export default router
