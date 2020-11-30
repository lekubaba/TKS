import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userInfo:{
			agentName:localStorage['agentNickname']?localStorage['agentNickname']:'',
			agentAvatarImg:localStorage['agentAvatarImg']?localStorage['agentAvatarImg']:'',
			isVIP:localStorage['isVIP']==='false'?false:true,
			agentID:localStorage['agentID']?localStorage['agentID']:'',
			productsId:localStorage['productsId']?localStorage['productsId']:'',
		},
		color:localStorage['color']?localStorage['color']:'#1476FE',
		getAgentEndTime:'2020-10-01 00:59:59',
		isPromotion:localStorage['isPromotion']==='false'?false:true,
		isAddLevel:localStorage['isAddLevel']==='false'?false:true,
		
	},
	mutations: {
		updater(state,payload){
			state.userInfo.isVIP = payload.isVIP;
			state.isPromotion = payload.isPromotion;
			state.color = payload.color;
			state.isAddLevel = payload.isAddLevel;
		},
		updateProductsId(state,productsId){
			state.userInfo.productsId = productsId;
		},
		setVIP(state,isVIP){
			state.userInfo.isVIP = isVIP;
		},
		setPromotion(state,isPromotion){
			state.isPromotion = isPromotion;
		},
		setColor(state,color){
			state.color = color;
		},
		setLevel(state,isAddLevel){
			state.isAddLevel = isAddLevel;
		},
	},
	actions: {
	},
	modules: {
	}
})
