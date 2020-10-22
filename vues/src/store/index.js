import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userInfo:{
			agentName:localStorage['agentNickname']?localStorage['agentNickname']:'',
			agentAvatarImg:localStorage['agentAvatarImg']?localStorage['agentAvatarImg']:'',
			isVIP:localStorage['isVIP']==='false'?false:true,
			openID:localStorage['openID']?localStorage['openID']:'',
		},
		color:localStorage['color']?localStorage['color']:'#1476FE',
		getAgentEndTime:'2020-10-01 00:59:59',
		isPromotion:localStorage['isPromotion']==='false'?false:true,
		isAddLevel:localStorage['isAddLevel']==='false'?false:true,
		
	},
	mutations: {
	},
	actions: {
	},
	modules: {
	}
})
