import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userInfo:{
			agentName:'Don',
			agentAvatarImg:'http://qiniu.tongkeapp.com/lekubaba.jpeg',
			agentPhoneNumber:'15914132569',
			beAgentTime:'2020-08-22 16:23:56',
			isVIP:true,
		},
		color:'#1476FE',
		getAgentEndTime:'2020-10-01 00:59:59',
	},
	mutations: {
	},
	actions: {
	},
	modules: {
	}
})
