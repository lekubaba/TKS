var mongoose = require('./connect.js');

var Schema = mongoose.Schema;

var ChildSchema = new Schema({
		_id:{type:Schema.Types.ObjectId},
		isVIP:Boolean,
		isManager:{type:Boolean,default:false},  //设置是否是管理员
		isBusiness:{type:Boolean,default:false},  //是否是商户；
		mainPromotionProducts:{type:Schema.Types.ObjectId,ref:'Products',index:true},
		superLevel:{type:Schema.Types.ObjectId,ref:'Agent'},
		bigSuperLevel:{type:Schema.Types.ObjectId,ref:'Agent'},
		topSuperLevel:{type:Schema.Types.ObjectId,ref:'Agent'},
		agentID:{type:Schema.Types.ObjectId,ref:'Agent',index:true},
		openID:{type:String,index:true},
		agentWechat:String,
		agentAlipay:{type:String,default:'未绑定'},
		unionID:{type:String,index:true},
		sales:{type:Number,default:0},
		level:Number,
		relation:String,
		time:String,
		timeStamp:String,
		bindID:{type:Array,index:true},
		isBind:{type:Boolean,default:false},  //此产品是否已经满额绑定；
		bindNumber:{type:Number,default:0}, //已经绑定的二维码数量；
		maxBind:{type:Number,default:10}, //设置最大的绑定数
		activityNumber:{type:Number,default:0}, //针对城市经理的激活的二维码总数
		work:{type:String,index:true},
		managerLevel:{type:Number,default:0}, //0为城市代理,1为城市经理,2为城市总监,3为城市独家
		agentNum:{type:Number,default:0}, //名下代理数
		inviteNum:{type:Number,default:0}, //客户邀请数
		countDown:{type:Number,default:new Date().getTime()},//时间戳类型的职位降级时间
		heNum:{type:Number,default:0},//黑盒数量
		fenNum:{type:Number,default:0},//积分总额
},{versionKey:false})

var AgentSchema = new Schema({
		_id:{type:Schema.Types.ObjectId},
		agentName:{type:String,default:'未设置'},//注册非必须
		agentNickname:String,
		agentPhoneNumber:{type:String,index:true},//注册必须
		agentDesensitizationNumber:String,//注册非必须
		agentAvatarImg:String,
		agentSex:Number,
		agentProvince:String,
		agentCity:String,
		idCard:String,//注册非必须
		isPromotion:Boolean,
		isMember:{type:Boolean,default:false}, //是否是团队成员
		isBusiness:{type:Boolean,default:false}, //是否是商家
		subAPI:{type:Schema.Types.ObjectId,ref:'Child'},//代理推广产品的接口
		mainPromotionProducts:{type:Schema.Types.ObjectId,ref:'Products'},
		superLevel:{type:Schema.Types.ObjectId,ref:'Agent'},
		bigSuperLevel:{type:Schema.Types.ObjectId,ref:'Agent'},
		topSuperLevel:{type:Schema.Types.ObjectId,ref:'Agent'},
		beAgentTime:String,
		beAgentTimeStamp:String,
		isVIP:{type:Boolean,default:false}, //是不是VIP
		agentWechat:String,
		agentAlipay:{type:String,default:'未绑定'},//注册非必须
		openID:{type:String,index:true},
		unionID:{type:String,index:true},
		sales:{type:Number,default:0},
},{versionKey:false})

var CustomerSchema = new Schema({
		// 用户不归属谁，只有订单归属谁
		_id:Schema.Types.ObjectId,
		openID:{type:String,index:true},
		unionID:{type:String,index:true},
		customerNickname:String,
		customerName:String,
		customerPhoneNumber:String,
		customerDesensitizationNumber:String,
		customerAvatarImg:String,
		customerSex:Number,
		customerProvince:String,
		customerCity:String,
		selectedProducts:[{type:Schema.Types.ObjectId,ref:'Products'}],
		beCustomerTime:String,	
},{versionKey:false})

var ProductsSchema = new Schema({
	
		_id:Schema.Types.ObjectId,
		mode:String,//模式:传统，线上，链接，虚拟，tra,line,link,tongke,fictitious
		isLoan:{type:Boolean,default:true},
		isAddLevel:Boolean,//是否增加了层级，true,false
		companyName:String,
		openID:String,
		agentID:{type:Schema.Types.ObjectId,ref:'Agent',index:true},
		bossPhoneNumber:String,
		bossWechat:String,
		productsName:String,
		productsTitle:String,
		promotionCover:String,
		promotionQrcodeBackground:String,
		agentQrcodeBackground:String,
		promotionPoster:[String],
		agentPoster:[String],
		regularPoster:[String],
		productsLink:String,
		color:String,
		originalPrice:Number,
		activityPrice:Number,
		summary:String,//概要
		squareImg:String,//结算显示的图
		time:String,
		timeStamp:String,
		isAuth:Boolean,
		isPromotionQr:Boolean,
		isAgentQr:Boolean,
		isPromotionTxt:Boolean,
		isAgentTxt:Boolean,
		isRegular:Boolean,
		isLink:Boolean,
		isColor:Boolean,
		isLevel:Boolean,
		prePromotionPoster:[String], //用户上传的图片先放在这里，用户确定使用以后将这个域的资源复制到目标字段并清空这个域
		preAgentPoster:[String], //用户上传的图片先放在这里，用户确定使用以后将这个域的资源复制到目标字段并清空这个域
		preRegularPoster:[String], //用户上传的图片先放在这里，用户确定使用以后将这个域的资源复制到目标字段并清空这个域
		agentExtension:{type:Number,default:0},//代理直推比例
		agentExtensionSuper:{type:Number,default:0},//代理直推上级比例
		agentExtensionBigSuper:{type:Number,default:0},//代理直推上上级比例
		managerExtension:{type:Number,default:0},//经理直推比例
		managerExtensionSuper:{type:Number,default:0},//经理直推上级比例
		managerExtensionBigSuper:{type:Number,default:0},//经理直推上上级比例
		salesLadder:[{sales:Number,rate:Number}],//阶梯金额，按顺序依次增大
		commissionRate:[Number],//阶梯对应的佣金比例，按顺序依次增大
		
		
},{versionKey:false});

var OrderSchema = new Schema({
	
		_id:Schema.Types.ObjectId,
		mode:String,
		productsId:{type:Schema.Types.ObjectId,ref:'Products',index:true},
		agentID:{type:Schema.Types.ObjectId,ref:'Agent'},//归属代理
		superLevel:{type:Schema.Types.ObjectId,ref:'Agent'},
		bigSuperLevel:{type:Schema.Types.ObjectId,ref:'Agent'},
		topSuperLevel:{type:Schema.Types.ObjectId,ref:'Agent'},
		openID:String,  //归属代理
		customerID:{type:Schema.Types.ObjectId,ref:'Customer'},
		customerName:String,
		customerPhoneNumber:String,
		customerDesensitizationNumber:String,
		customerProgress:[{time:String,customerProgress:String}],
		orderAddress:String,
		orderMoney:{type:Number,default:0},
		eDu:{type:String,default:'暂未出额'},
		orderTime:String, //申请时间
		orderTimeStamp:String,
		successTime:String,  //借款时间
		contacted:Boolean,
		signed:Boolean,
		issued:Boolean,
		level:Number,
		relation:String,
		line:{type:Number,default:1},//默认线上
	
		
},{versionKey:false})

// 收入明细数据架构

var IncomeSchema = new Schema({
	_id:Schema.Types.ObjectId,
	relation:String, //用来计算整条线路领取的总佣金是多少
	orderRelation:String, //用来计算整条线路的订单成本，这里不管是上级还是上上级的收入，都应该插入直推者的relation,直接将order的relation复制过来即可
	agentID:{type:Schema.Types.ObjectId,ref:'Agent',index:true},//佣金归属的代理ID;
	productsId:{type:Schema.Types.ObjectId,ref:'Products',index:true},
	openID:String, //佣金归属的代理的openID;
	level:Number, //所属层级
	howMuch:Number, //金额
	isOut:{type:Boolean,default:false}, //是否提现了
	isArrival:{type:Boolean,default:false}, //是否到账了
	inTime:String, //这笔收入产生时间
	outTime:String, //这笔收入提现时间
	arrivalTime:String, //这笔收入到账时间
	timeStamp:Number,  //产生这笔收入的时间戳；
	orderID:{type:Schema.Types.ObjectId,ref:'Order',index:true},//是哪一笔业绩产生的佣金；
	types:String,//直推收入，一级，二级；
	cashID:{type:Schema.Types.ObjectId,ref:'Cash',index:true},//关联提现记录
	isManagerCommission:{type:Boolean,default:false}, //是否是管理佣金
	isShow:{type:Boolean,default:false}, //是否将这笔显示出来
	isValid:{type:Boolean,default:false}, //是否过了24小时，是否到了有效期；
	isBao:{type:Boolean,default:false}, //是否是活动红包；3月11日新增结构
	
},{versionKey:false});


/* 商户查看的提现明细，用来发放佣金使用 */

var CashSchema = new Schema({
	_id:Schema.Types.ObjectId,
	agentID:{type:Schema.Types.ObjectId,ref:'Agent',index:true},//提现人的agentID
	productsId:{type:Schema.Types.ObjectId,ref:'Products',index:true},//是哪个产品的
	openID:String, //提现人的openID;
	howMuch:Number, //提现金额
	time:String, //提现时间
	timeStamp:String,  //提现时间戳
	isFa:{type:Boolean,default:false}, //是否发放了
	
},{versionKey:false});


/**
 *宝箱 宝贝成品
 */

var BoxSchema = new Schema({
	
	_id:Schema.Types.ObjectId,
	agentID:{type:Schema.Types.ObjectId,ref:'Agent',index:true},//代理的agentID
	productsId:{type:Schema.Types.ObjectId,ref:'Products',index:true},//是哪个产品的
	time:String, //时间
	opentime:{type:String,default:'2021年'}, //拆时间
	timeStamp:Number,  //时间戳
	num:Number,//宝箱编号：10001～；
	boxName:String,//宝箱名称：手机宝箱（60天内没开就过期）、翻倍宝箱、积分宝箱等；
	boxPro:String,//名次解释:苹果12，小米11随机一款
	baoName:{type:String,default:'待'},//宝贝名称：1元红包，苹果12，20000积分等；
	isOpen:{type:Number,default:0},//没拆为零，拆掉了为1；
	isNeed:{type:Boolean,default:false},//是否需要金牛钥匙打开；
	isShow:{type:Boolean,default:true},//是否需要显示；

},{versionKey:false});

/* 兑换记录 */
var DuiSchema = new Schema({
	_id:Schema.Types.ObjectId,
	agentID:{type:Schema.Types.ObjectId,ref:'Agent',index:true},//代理的agentID
	productsId:{type:Schema.Types.ObjectId,ref:'Products',index:true},//是哪个产品的
	duiNum:Number,//兑换数量
	fenNum:Number,//消耗的积分额
	time:String, //时间
	timeStamp:Number,
},{versionKey:false});


var CodeSchema = new Schema({
	_id:Schema.Types.ObjectId,
	tel:String,
	code:Number,
	timeStamp:Number,
},{versionKey:false});

var TokenSchema = new Schema({
	_id:Schema.Types.ObjectId,
	token:String,
	timeStamp:Number,
},{versionKey:false});

var BusinessSchema = new Schema({
	_id:Schema.Types.ObjectId,
	businessID:{type:Schema.Types.ObjectId,ref:'Agent',index:true},//商户ID;
	memberID:{type:Schema.Types.ObjectId,ref:'Agent',index:true}, //招商经理的ID;
	memberName:String,
	time:String,
},{versionKey:false});

var Child = mongoose.model('Child',ChildSchema,'child');
var Agent = mongoose.model('Agent',AgentSchema,'agent');
var Customer = mongoose.model('Customer',CustomerSchema,'customer');
var Products = mongoose.model('Products',ProductsSchema,'products');
var Order = mongoose.model('Order',OrderSchema,'order');
var Code = mongoose.model('Code',CodeSchema,'code');
var Ten = mongoose.model('Ten',TokenSchema,'ten'); //保存微信的access_token
var Business = mongoose.model('Business',BusinessSchema,'business'); //保存微信的access_token
var Income = mongoose.model('Income',IncomeSchema,'income'); //佣金明细
var Cash = mongoose.model('Cash',CashSchema,'cash'); //佣金明细
var Box = mongoose.model('Box',BoxSchema,'box'); //宝箱记录和宝贝记录；
var Dui = mongoose.model('Dui',DuiSchema,'dui'); //兑换记录

module.exports.Child = Child;
module.exports.Agent = Agent;
module.exports.Customer = Customer;
module.exports.Products = Products;
module.exports.Order = Order;
module.exports.Code = Code;
module.exports.Ten = Ten;
module.exports.Business = Business;
module.exports.Income = Income;
module.exports.Cash = Cash;
module.exports.Box = Box;
module.exports.Dui = Dui;