import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import App from '../App.vue';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Profile from '../views/ProgressProfile.vue';
import FeedBack from '../views/FeedBack.vue';
import SeeSales from '../views/SeeSales.vue';
import SeeTeam from '../views/SeeTeam.vue';
import BindWX from '../views/BindWX.vue';
import UserSetup from '../views/UserSetup.vue';
import VipEdit from '../views/VipEdit.vue';
import UserProtocol from '../views/UserProtocol.vue';
import PromotionGuide from '../views/PromotionGuide.vue';
import PromotionQrcode from '../views/PromotionQrcode.vue';
import AgentQrcode from '../views/AgentQrcode.vue';
import ContactBoss from '../views/ContactBoss.vue';
import MorePromotion from '../views/MorePromotion.vue';
import GetAgentPage from '../views/GetAgentPage.vue';
import GetCustomerPage from '../views/GetCustomerPage.vue';
import SetHomePage from '../views/SetHomePage.vue';
import AboutUs from '../views/AboutUs.vue';
import StatementComplaint from '../views/StatementComplaint.vue';
import SalesProfile from '../components/SalesProfile.vue';
import TeamProfile from '../components/TeamProfile.vue';
import Promotion from '../views/Promotion.vue';
import RealNameAuthentication from '../views/RealNameAuthentication.vue';
import PromotionCover from '../views/PromotionCover.vue';
import PromotionQrcodeBackground from '../views/PromotionQrcodeBackground.vue';
import AgentQrcodeBackground from '../views/AgentQrcodeBackground.vue';
import PromotionPoster from '../views/PromotionPoster.vue';
import AgentPoster from '../views/AgentPoster.vue';
import UnionPay from '../views/UnionPay.vue';
import OpenThirdLevel from '../views/OpenThirdLevel.vue';
import SuccessRemind from '../views/SuccessRemind.vue';
import AddressPay from '../views/AddressPay.vue';
import Theme from '../views/Theme.vue';
import RegisterAgent from '../views/RegisterAgent.vue';
import beforeEachGlobal from '../plugins/beforeEach.js';
const Data = ()=>import(/* webpackChunkName: "userdata" */ '../views/UserData.vue');
const Center = ()=>import(/* webpackChunkName: "usercenter" */ '../views/UserCenter.vue');

Vue.use(VueAxios, axios);
Vue.use(VueRouter);


const routes = [
	{
		path:'/',
		name:'App',
		component:App,
		redirect:'/promotion',
		children:[
			{
				path:'/login',
				name:'Login',
				component:Login,
				meta: {
					title: '登录',
					// requiresAuth:true
				}
				
			},
			{
				path:'/home',
				name:'Home',
				component:Home,
				redirect:'/promotion',
				meta: {
					title: '首页',
					requiresAuth:true,
				},
				children:[
					{
						path: '/promotion',
						name: 'Promotion',
						component: Promotion,
						meta:{
							title:'推广',
							requiresAuth:true
						}
					},
					{
						path: '/userdata',
						name: 'UserData',
						component: Data,
						meta:{
							title:'客户分析',
							requiresAuth:true
						}
					},
					{
						path: '/usercenter',
						name: 'UserCenter',
						component: Center,
						meta:{
							title:'我的',
							requiresAuth:true
						}
					},	
				]
				
			},{
				path:'/profile',
				name:'Profile',
				component:Profile,
				meta:{
					title:'客户进度',
					requiresAuth:true
				}
			},{
				path:'/feedback',
				name:'FeedBack',
				component:FeedBack,
				meta:{
					title:'进度反馈',
					requiresAuth:true
				}
			},{
				path:'/seesales/:userId',
				name:'SeeSales',
				component:SeeSales,
				meta:{
					title:'销售明细',
					requiresAuth:true
				},
				children:[
					{
						path:'/seesales/:userId',
						name:'OwnLevelSales',
						component:SalesProfile,
						meta:{
							title:'自推业绩',
							requiresAuth:true
						},
						
					},{
						path:'/seesales/:userId',
						name:'OneLevelSales',
						component:SalesProfile,
						meta:{
							title:'一级业绩',
							requiresAuth:true
						},
					},{
						path:'/seesales/:userId',
						name:'TwoLevelSales',
						component:SalesProfile,
						meta:{
							title:'二级业绩',
							requiresAuth:true
						},
					},{
						path:'/seesales/:userId',
						name:'TotalLevelSales',
						component:SalesProfile,
						meta:{
							title:'全部业绩',
							requiresAuth:true
						},
					},
				]
			},{
				path:'/seeteam/:userId',
				name:'SeeTeam',
				component:SeeTeam,
				meta:{
					title:'团队明细',
					requiresAuth:true
				},
				children:[
					{
						path:'/seeteam/:userId',
						name:'OneLevelTeam',
						component:TeamProfile,
						meta:{
							title:'一级团队',
							requiresAuth:true
						},
					},{
						path:'/seeteam/:userId',
						name:'TwoLevelTeam',
						component:TeamProfile,
						meta:{
							title:'二级团队',
							requiresAuth:true
						},
					},{
						path:'/seeteam/:userId',
						name:'TotalLevelTeam',
						component:TeamProfile,
						meta:{
							title:'全部',
							requiresAuth:true
						},
					}
				]
			},{
				path:'/bindwx',
				name:'BindWX',
				component:BindWX,
				meta:{
					title:'绑定收款微信',
					requiresAuth:true
				}
			},{
				path:'/usersetup',
				name:'UserSetup',
				component:UserSetup,
				meta:{
					title:'设置',
					requiresAuth:true
				}
			},{
				path:'/vipedit',
				name:'VipEdit',
				component:VipEdit,
				meta:{
					title:'推广配置',
					requiresAuth:true
				}
			},{
				path:'/userprotocol',
				name:'UserProtocol',
				component:UserProtocol,
				meta:{
					title:'统客使用协议',
					requiresAuth:true
				}
			},{
				path:'/promotionguide',
				name:'PromotionGuide',
				component:PromotionGuide,
				meta:{
					title:'推广入门指南',
					requiresAuth:true
				}
			},{
				path:'/promotionqrcode',
				name:'PromotionQrcode',
				component:PromotionQrcode,
				meta:{
					title:'专属推广二维码',
					requiresAuth:true
				}
			},{
				path:'/agentqrcode',
				name:'AgentQrcode',
				component:AgentQrcode,
				meta:{
					title:'专属招商二维码',
					requiresAuth:true
				}
			},{
				path:'/contactboss',
				name:'ContactBoss',
				component:ContactBoss,
				meta:{
					title:'联系老板',
					requiresAuth:true
				}
			},{
				path:'/morepromotion',
				name:'MorePromotion',
				component:MorePromotion,
				meta:{
					title:'更多推广',
					requiresAuth:true
				}
			},{
				path:'/getagentpage',
				name:'GetAgentPage',
				component:GetAgentPage,
				meta:{
					title:'免费代理',
				}
				
			},{
				path:'/registeragent',
				name:'RegisterAgent',
				component:RegisterAgent,
				meta:{
					title:'免费代理',
				}
			},{
				path:'/getcustomerpage',
				name:'GetCustomerPage',
				component:GetCustomerPage,
				
			},{
				path:'/sethomepage',
				name:'SetHomePage',
				component:SetHomePage,
				meta:{
					title:'推广',
					requiresAuth:true
				}
				
			},{
				path:'/aboutus',
				name:'AboutUs',
				component:AboutUs,
				meta:{
					title:'关于我们',
					requiresAuth:true
				}
				
			},{
				path:'/statementcomplaint',
				name:'StatementComplaint',
				component:StatementComplaint,
				meta:{
					title:'声明投诉',
					requiresAuth:true
				}
				
			},{
				path:'/realnameauthentication',
				name:'RealNameAuthentication',
				component:RealNameAuthentication,
				meta:{
					title:'实名认证',
					requiresAuth:true
				}
				
			},{
				path:'/promotioncover',
				name:'PromotionCover',
				component:PromotionCover,
				meta:{
					title:'上传推广封面',
					requiresAuth:true
				}
				
			},{
				path:'/promotionqrcodebackground',
				name:'PromotionQrcodeBackground',
				component:PromotionQrcodeBackground,
				meta:{
					title:'上传推广码背景图',
					requiresAuth:true
				}
				
			},{
				path:'/agentqrcodebackground',
				name:'AgentQrcodeBackground',
				component:AgentQrcodeBackground,
				meta:{
					title:'上传招商码背景图',
					requiresAuth:true
				}
				
			},{
				path:'/promotionposter',
				name:'PromotionPoster',
				component:PromotionPoster,
				meta:{
					title:'上传推广海报',
					requiresAuth:true
				}
				
			},{
				path:'/agentposter',
				name:'AgentPoster',
				component:AgentPoster,
				meta:{
					title:'上传招商海报',
					requiresAuth:true
				}
				
			},{
				path:'/unionpay',
				name:'UnionPay',
				component:UnionPay,
				meta:{
					title:'支付配置',
					requiresAuth:true
				}
				
			},{
				path:'/openthirdlevel',
				name:'OpenThirdLevel',
				component:OpenThirdLevel,
				meta:{
					title:'开通三级返佣',
					requiresAuth:true
				}
				
			},{
				path:'/theme',
				name:'Theme',
				component:Theme,
				meta:{
					title:'设置主题颜色',
					requiresAuth:true
				}
				
			},{
				path:'/successremind',
				name:'SuccessRemind',
				component:SuccessRemind,
				meta:{
					title:' ',
					// requiresAuth:true
				}
				
			},{
				path:'/addresspay',
				name:'AddressPay',
				component:AddressPay,
				meta:{
					title:'收货信息并支付',
					requiresAuth:false
				}
				
			},
			
		]
	}
]

const router = new VueRouter({
	routes
});

router.beforeEach((to, from, next) => {
	beforeEachGlobal(to,from,next);
})

export default router
