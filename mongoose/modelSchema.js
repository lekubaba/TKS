var mongoose = require('./connect.js');

var Schema = mongoose.Schema;


var AgentSchema = new Schema({
		_id:{type:Schema.Types.ObjectId},
		agentName:String,//注册非必须
		agentNickname:String,
		agentPhoneNumber:{type:String,index:true},//注册非必须
		agentDesensitizationNumber:String,//注册非必须
		agentAvatarImg:String,
		agentSex:Number,
		agentProvince:String,
		agentCity:String,
		idCard:String,//注册非必须
		isPromotion:Boolean,
		mainPromotionProducts:{type:Schema.Types.ObjectId,ref:'Products'},
		superLevel:{type:Schema.Types.ObjectId,ref:'Agent'},
		bigSuperLevel:{type:Schema.Types.ObjectId,ref:'Agent'},
		topSuperLevel:{type:Schema.Types.ObjectId,ref:'Agent'},
		beAgentTime:String,
		beAgentTimeStamp:String,
		isVIP:Boolean,
		agentWechat:String,
		agentAlipay:String,//注册非必须
		openID:{type:String,index:true},
		unionID:{type:String,index:true},
		color:String,
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
		isAddLevel:Boolean,//是否增加了层级，true,false
		companyName:String,
		openID:String,
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
		
},{versionKey:false});

var OrderSchema = new Schema({
	
		_id:Schema.Types.ObjectId,
		mode:String,
		productsId:{type:Schema.Types.ObjectId,ref:'Products'},
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
		orderTime:String,
		orderTimeStamp:String,
		contacted:Boolean,
		signed:Boolean,
		issued:Boolean,
		
},{versionKey:false})

var CodeSchema = new Schema({
	_id:Schema.Types.ObjectId,
	tel:String,
	code:Number,
},{versionKey:false});

var Agent = mongoose.model('Agent',AgentSchema,'agent');
var Customer = mongoose.model('Customer',CustomerSchema,'customer');
var Products = mongoose.model('Products',ProductsSchema,'products');
var Order = mongoose.model('Order',OrderSchema,'order');
var Code = mongoose.model('Code',CodeSchema,'code');

module.exports.Agent = Agent;
module.exports.Customer = Customer;
module.exports.Products = Products;
module.exports.Order = Order;
module.exports.Code = Code;

