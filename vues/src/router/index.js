import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
// import App from '../App.vue';
import Login from '../views/Login.vue';
import MessageLogin from '../views/MessageLogin.vue';
import Home from '../views/Home.vue';
import Profile from '../views/ProgressProfile.vue';
import FeedBack from '../views/FeedBack.vue';
// const FeedBack = ()=>import(/* webpackChunkName: "management" */ '../views/FeedBack.vue');
import SeeSales from '../views/SeeSales.vue';
import SeeTeam from '../views/SeeTeam.vue';
import Account from '../views/Account.vue';
import BindAlipay from '../views/BindAlipay.vue';
import BindWX from '../views/BindWX.vue';
import MainPromotion from '../views/MainPromotion.vue';
import SetMainPromotion from '../views/SetMainPromotion.vue';
import UserSetup from '../views/UserSetup.vue';
import VipEdit from '../views/VipEdit.vue';
// const VipEdit = ()=>import(/* webpackChunkName: "management" */ '../views/VipEdit.vue');
import PaiFa from '../views/PaiFa.vue';
import ChoiseMode from '../views/ChoiseMode.vue';
// const ChoiseMode = ()=>import(/* webpackChunkName: "management" */ '../views/ChoiseMode.vue');
import UserProtocol from '../views/UserProtocol.vue';
import PromotionGuide from '../views/PromotionGuide.vue';
import PromotionQrcode from '../views/PromotionQrcode.vue';
import AgentQrcode from '../views/AgentQrcode.vue';
import ContactBoss from '../views/ContactBoss.vue';
import MorePromotion from '../views/MorePromotion.vue';
import AboutUs from '../views/AboutUs.vue';
import StatementComplaint from '../views/StatementComplaint.vue';
import SalesProfile from '../components/SalesProfile.vue';
import DataProfile from '../components/DataProfile.vue';
import TeamProfile from '../components/TeamProfile.vue';
import TraMode from '../components/TraMode.vue';
// const TraMode = ()=>import(/* webpackChunkName: "management" */ '../components/TraMode.vue');
import LinkMode from '../components/LinkMode.vue';
// const LinkMode = ()=>import(/* webpackChunkName: "management" */ '../components/LinkMode.vue');
import Promotion from '../views/Promotion.vue';
/* 探宝 */
import Interesting from '../views/bao/Interesting.vue';
import JiFen from '../views/bao/JiFen.vue';
import SeeBao from '../views/bao/SeeBao.vue';
import OpenBao from '../views/bao/OpenBao.vue';
import JiLu from '../views/bao/JiLu.vue';
import MoneyProfilePage from '../views/MoneyProfilePage.vue';
import InCome from '../components/InCome.vue';
import MoneyRecord from '../components/MoneyRecord.vue';
import CommissionCounter from '../views/CommissionCounter.vue';
import UpLevelPage from '../views/UpLevelPage.vue';
import ManagerCommission from '../views/ManagerCommission.vue';
import BonusProfile from '../views/BonusProfile.vue';
import EarnMoneyRoad from '../views/EarnMoneyRoad.vue';
import Join from '../views/Join.vue';
import RealNameAuthentication from '../views/RealNameAuthentication.vue';
// const RealNameAuthentication = ()=>import(/* webpackChunkName: "management" */ '../views/RealNameAuthentication.vue');
import CommissionRegular from '../views/CommissionRegular.vue';
// const CommissionRegular = ()=>import(/* webpackChunkName: "management" */ '../views/CommissionRegular.vue');
import CommissionRate from '../views/CommissionRate.vue';
import AgentCommissionRate from '../views/AgentCommissionRate.vue';
import ManagerCommissionRate from '../views/ManagerCommissionRate.vue';
import PromotionQrcodeBackground from '../views/PromotionQrcodeBackground.vue';
// const PromotionQrcodeBackground = ()=>import(/* webpackChunkName: "management" */ '../views/PromotionQrcodeBackground.vue');
import AgentQrcodeBackground from '../views/AgentQrcodeBackground.vue';
// const AgentQrcodeBackground = ()=>import(/* webpackChunkName: "management" */ '../views/AgentQrcodeBackground.vue');
import PromotionPoster from '../views/PromotionPoster.vue';
// const PromotionPoster = ()=>import(/* webpackChunkName: "management" */ '../views/PromotionPoster.vue');
import AgentPoster from '../views/AgentPoster.vue';
// const AgentPoster = ()=>import(/* webpackChunkName: "management" */ '../views/AgentPoster.vue');
import SetLink from '../views/SetLink.vue';
// const SetLink = ()=>import(/* webpackChunkName: "management" */ '../views/SetLink.vue');
import UnionPay from '../views/UnionPay.vue';
// const UnionPay = ()=>import(/* webpackChunkName: "management" */ '../views/UnionPay.vue');
import OpenThirdLevel from '../views/OpenThirdLevel.vue';
// const OpenThirdLevel = ()=>import(/* webpackChunkName: "management" */ '../views/OpenThirdLevel.vue');
import Theme from '../views/Theme.vue';
// const Theme = ()=>import(/* webpackChunkName: "management" */ '../views/Theme.vue');
import SetManager from '../views/SetManager.vue';
// const SetManager = ()=>import(/* webpackChunkName: "management" */ '../views/SetManager.vue');
import OtherTool from '../views/OtherTool.vue';
// const OtherTool = ()=>import(/* webpackChunkName: "management" */ '../views/OtherTool.vue');
import Audit from '../views/Audit.vue';
// const Audit = ()=>import(/* webpackChunkName: "management" */ '../views/Audit.vue');
import ManagerBonus from '../views/ManagerBonus.vue';
// const ManagerBonus = ()=>import(/* webpackChunkName: "management" */ '../views/ManagerBonus.vue');
import FindSuper from '../views/FindSuper.vue';
// const FindSuper = ()=>import(/* webpackChunkName: "management" */ '../views/FindSuper.vue');
import CashProfile from '../components/CashProfile.vue';
import CashRecord from '../components/CashRecord.vue';
import SetCityJinLi from '../views/SetCityJinLi.vue';
import UserData from '../views/UserData.vue';
import UserCenter from '../views/UserCenter.vue';
import SuccessRemind from '../views/SuccessRemind.vue';
import beforeEachGlobal from '../plugins/beforeEach.js';
// const UserData = ()=>import(/* webpackChunkName: "management" */ '../views/UserData.vue');
// const UserCenter = ()=>import(/* webpackChunkName: "usercenter" */ '../views/UserCenter.vue');
//在main.js设置全局的请求次数，请求的间隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 5000;
 
axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if(!config || !config.retry) return Promise.reject(err);
     
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;
     
    // Check if we've maxed out the total number of retries
    if(config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }
     
    // Increase the retry count
    config.__retryCount += 1;
     
    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
     
    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
        return axios(config);
    });
});

Vue.use(VueAxios, axios);
Vue.use(VueRouter);


const routes = [
	
	{
		path:'/login',
		name:'Login',
		component:Login,
		meta: {
			title: '登录',
			// requiresAuth:true
		}
		
	},{
		path:'/messagelogin',
		name:'MessageLogin',
		component:MessageLogin,
		meta: {
			title: '短信登录',
			// requiresAuth:true
		}
		
	},{
		path:'/',
		component:Home,
		meta:{
			title:'',
			requiresAuth:true,
			keepAlive:false,
		},
		children:[
			{
				path: '',
				name: 'Promotion',
				component: Promotion,
				meta:{
					title:'拿钱',
					requiresAuth:true,
					keepAlive:false,
				}
			},{
				path: '/interesting',
				name: 'Interesting',
				component: Interesting,
				meta:{
					title:'黑盒',
					requiresAuth:true,
					keepAlive:false,
				}
			},{
				path: '/userdata',
				component: UserData,
				meta:{
					title:'',
					requiresAuth:true,
					keepAlive:true,
					isBack:false, 
				},
				children:[
					{
						path:'',
						component:DataProfile,
						meta:{
							title:'全部',
							requiresAuth:true,
							code:100,
							keepAlive:true,
							isBack:false, 
						}
					},{
						path:'1',
						component:DataProfile,
						meta:{
							title:'今天',
							requiresAuth:true,
							code:101,
							keepAlive:true,
							isBack:false, 
						}
					},{
						path:'2',
						component:DataProfile,
						meta:{
							title:'昨天',
							requiresAuth:true,
							code:102,
							keepAlive:true,
							isBack:false, 
						}
					},{
						path:'3',
						component:DataProfile,
						meta:{
							title:'待申请',
							requiresAuth:true,
							code:103,
							keepAlive:true,
							isBack:false, 
						}
					},{
						path:'4',
						component:DataProfile,
						meta:{
							title:'已出额',
							requiresAuth:true,
							code:104,
							keepAlive:true,
							isBack:false, 
						}
					},{
						path:'5',
						component:DataProfile,
						meta:{
							title:'已借款',
							requiresAuth:true,
							code:105,
							keepAlive:true,
							isBack:false, 
						}
					},{
						path:'7',
						component:DataProfile,
						meta:{
							title:'已拒绝',
							requiresAuth:true,
							code:107,
							keepAlive:true,
							isBack:false, 
						}
					},
				]
			},{
				path: '/usercenter',
				name: 'UserCenter',
				component: UserCenter,
				meta:{
					title:'我的',
					requiresAuth:true,
					keepAlive:false,
				}
			},
		]
	},{
		path:'/join',
		name:'Join',
		component:Join,
		meta:{
			title:'成为商户',
			requiresAuth:true
		}
	},{
		path:'/moneyprofilepage',
		component:MoneyProfilePage,
		meta:{
			title:'',
			requiresAuth:true
		},
		children:[
			{
				path:'',
				component:InCome,
				meta:{
					title:'我的收入',
					requiresAuth:true,
				}
			},{
				path:'moneyRecord',
				component:MoneyRecord,
				meta:{
					title:'我的收入',
					requiresAuth:true,
				}
			},
		]
	},{
		path:'/commissioncounter',
		name:'CommissionCounter',
		component:CommissionCounter,
		meta:{
			title:'佣金计算工具',
			requiresAuth:true
		}
	},{
		path:'/uplevelpage',
		name:'UpLevelPage',
		component:UpLevelPage,
		meta:{
			title:'等级提升之路',
			requiresAuth:true
		}
	},{
		path:'/managercommission',
		name:'ManagerCommission',
		component:ManagerCommission,
		meta:{
			title:'管理佣金',
			requiresAuth:true
		}
	},{
		path:'/bonusprofile',
		name:'BonusProfile',
		component:BonusProfile,
		meta:{
			title:'如何计算',
			requiresAuth:true
		}
	},{
		path:'/earnmoneyroad',
		name:'EarnMoneyRoad',
		component:EarnMoneyRoad,
		meta:{
			title:'搞懂挣钱门路',
			requiresAuth:true
		}
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
			requiresAuth:true,
			keepAlive:false,
			isBack:false,
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
		path:'/account',
		name:'Account',
		component:Account,
		meta:{
			title:'收款与账户',
			requiresAuth:true
		}
	},{
		path:'/bindwx',
		name:'BindWX',
		component:BindWX,
		meta:{
			title:'绑定本人微信',
			requiresAuth:true
		}
	},{
		path:'/bindalipay',
		name:'BindAlipay',
		component:BindAlipay,
		meta:{
			title:'绑定支付宝',
			requiresAuth:true
		}
	},{
		path:'/mainpromotion',
		name:'MainPromotion',
		component:MainPromotion,
		meta:{
			title:'我的全部推广',
			requiresAuth:true
		}
	},{
		path:'/setmainpromotion',
		name:'SetMainPromotion',
		component:SetMainPromotion,
		meta:{
			title:'主推设置',
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
		path:'/paifa',
		name:'PaiFa',
		component:PaiFa,
		meta:{
			title:'统计',
			requiresAuth:true
		}
	},{
		path:'/choisemode/:mode',
		component:ChoiseMode,
		meta:{
			title:'模式选择',
			requiresAuth:true
		},
		children:[
			{
				path:'',
				name:'TraditionalMode',
				component:TraMode,
				meta:{
					title:'模式选择',
					requiresAuth:true
				},
			},{
				path:'/choisemode/:mode',
				name:'LinkMode',
				component:LinkMode,
				meta:{
					title:'模式选择',
					requiresAuth:true
				},
			}
		]
	},{
		path:'/userprotocol',
		name:'UserProtocol',
		component:UserProtocol,
		meta:{
			title:'统客使用协议',
		}
	},{
		path:'/promotionguide',
		name:'PromotionGuide',
		component:PromotionGuide,
		meta:{
			title:'佣金政策与规则',
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
			title:'联系客服',
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
			title:'完善信息',
			requiresAuth:true
		}
		
	},{
		path:'/commissionregular',
		name:'CommissionRegular',
		component:CommissionRegular,
		meta:{
			title:'上传佣金规则海报',
			requiresAuth:true
		},
	},{
		path:'/commissionrate',
		name:'CommissionRate',
		component:CommissionRate,
		meta:{
			title:'配置佣金比例',
			requiresAuth:true
		},		
	},{
		path:'/agentcommissionrate',
		name:'AgentCommissionRate',
		component:AgentCommissionRate,
		meta:{
			title:'城市代理佣金分配',
			requiresAuth:true
		}
		
	},{
		path:'/managercommissionrate',
		name:'ManagerCommissionRate',
		component:ManagerCommissionRate,
		meta:{
			title:'城市经理佣金分配',
			requiresAuth:true
		}
		
	},{
		path:'/setlink',
		name:'SetLink',
		component:SetLink,
		meta:{
			title:'保存第三方链接',
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
		path:'/setmanager',
		name:'SetManager',
		component:SetManager,
		meta:{
			title:'管理员配置',
			requiresAuth:true
		}
		
	},{
		path:'/othertool',
		name:'OtherTool',
		component:OtherTool,
		meta:{
			title:'常用工具',
			requiresAuth:true
		}
		
	},{
		path:'/audit',
		component:Audit,
		meta:{
			title:'提现审核与佣金发放',
			requiresAuth:true
		},
		children:[
			{
				path:'',
				component:CashProfile,
				meta:{
					title:'佣金审核',
					requiresAuth:true,
					code:100,
				}
			},{
				path:'1',
				component:CashProfile,
				meta:{
					title:'佣金审核',
					requiresAuth:true,
					code:101,
				}
			}
		]
		
	},{
		path:'/managerbonus',
		name:'ManagerBonus',
		component:ManagerBonus,
		meta:{
			title:'上月管理佣金',
			requiresAuth:true
		}
		
	},{
		path:'/findsuper',
		name:'FindSuper',
		component:FindSuper,
		meta:{
			title:'查上级',
			requiresAuth:true
		}
		
	},{
		path:'/cashrecord',
		name:'CashRecord',
		component:CashRecord,
		meta:{
			title:'该笔提现详情',
			requiresAuth:true
		}
		
	},{
		path:'/setcitylinli',
		name:'SetCityJinLi',
		component:SetCityJinLi,
		meta:{
			title:'添加城市经理',
			requiresAuth:true
		}
		
	},{
		path:'/successremind',
		name:'SuccessRemind',
		component:SuccessRemind,
		meta:{
			title:'提交成功',
			requiresAuth:true
		}
		
	},
	{
		path: '/jifen',
		name: 'JiFen',
		component: JiFen,
		meta:{
			title:'获取积分途径',
			requiresAuth:true,
			keepAlive:false,
		}
	},{
		path: '/seebao',
		name: 'SeeBao',
		component: SeeBao,
		meta:{
			title:'黑盒概率',
			requiresAuth:true,
			keepAlive:false,
		}
	},{
		path: '/openbao',
		name: 'OpenBao',
		component: OpenBao,
		meta:{
			title:'开黑盒',
			requiresAuth:true,
			keepAlive:false,
		}
	},{
		path: '/jilu',
		name: 'JiLu',
		component: JiLu,
		meta:{
			title:'拆宝箱',
			requiresAuth:true,
			keepAlive:false,
		}
	}
	
	
]

const router = new VueRouter({
	mode:'hash',
	scrollBehavior (to, from, savedPosition) {
	  if (savedPosition) {
	    return savedPosition
	  } else {
	    return { x: 0, y: 0 }
	  }
	},
	routes:routes,
});

router.beforeEach((to, from, next) => {
	beforeEachGlobal(to,from,next);
})

export default router
