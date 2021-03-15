var mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child,Income} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate,_preDate} = require('../utils/DateUtil');
let {WechatMessages} = require('../utils/WechatMessages');
let {accMul} = require('../utils/CommonUtil.js');


// 客户数据初始化数据
router.post('/api/userData',async function(req,res){


	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	let pathCode = req.body.pathCode;
	let reName,result,sortx;
	
	switch(pathCode){
		case 100:
		reName = null;
		result = null;
		sortx = '_id';
		break;
		case 101:
		reName = 'orderTime';
		result = {'$regex':formatDate('yyyy-MM-dd')};
		sortx = '_id';
		break;
		case 102:
		reName = 'orderTime';
		result = {'$regex':_preDate(formatDate('yyyy-MM-dd'))};
		sortx = '_id';
		break;
		case 103:
		reName = 'eDu';
		result = '暂未出额';
		sortx = '_id';
		break;
		case 104:
		// reName = 'eDu';
		reName = '$and';
		// result = {'$ne':'暂未出额'};
		result = [{'eDu':{'$ne':'暂未出额'}},{'eDu':{'$ne':'0'}}];
		sortx = '_id';
		break;
		case 105:
		reName = 'orderMoney';
		result = {'$gt':0};
		sortx = 'successTime';
		break;
		case 106:
		reName = 'issued';
		result = true;
		sortx = '_id';
		break;
		case 107:
		reName = 'eDu';
		result = '0';
		sortx = '_id';
		break;
		default:
		reName = null;
		result = null;
		sortx = '_id';
		
	}
	
	try {
		let _date = formatDate('yyyy-MM-dd');
		let _child = await Child.findOne({agentID:agentID,mainPromotionProducts:productsId}).select('openID isVIP isManager superLevel').lean();
		if(!_child){
			res.json({code:200,count:0,dayCount:0,orders:[]});
			return;
		}
		//不是vip
		if(!_child.isVIP&&!_child.isManager){
			let _dayCount = await Order.count({'$or':[{agentID:agentID},{superLevel:agentID}],productsId:productsId,orderTime:{'$regex':_date}});
			let _count = await Order.count({'$or':[{agentID:agentID},{superLevel:agentID}],productsId:productsId});
			let _order = await Order.find({'$or':[{agentID:agentID},{superLevel:agentID}],productsId:productsId,[reName]:result}).limit(20).skip(0).sort({[sortx]:-1}).
							   lean().populate('customerID','customerAvatarImg customerNickname').
							   populate({
								   path:'agentID',
								   select:'subAPI',
								   populate:{
									   path:'subAPI',
									   select:'work',
								   }
							   }).
							   select('agentID customerName customerID line successTime orderTime customerDesensitizationNumber orderMoney eDu mode');
			
			if(!_order){
				res.json({code:200,count:0,dayCount:0,orders:[]});
				return;
			}
			
			res.json({code:200,count:_count,dayCount:_dayCount,orders:_order});
			return;
		//vip
		}else{
			
			let _dayCount = await Order.count({relation:{'$regex':agentID},productsId:productsId,orderTime:{'$regex':_date}});
			let _count = await Order.count({relation:{'$regex':agentID},productsId:productsId});
			let _order = await Order.find({relation:{'$regex':agentID},productsId:productsId,[reName]:result})
			.limit(20).skip(0).sort({[sortx]:-1})
			.populate('customerID','customerAvatarImg customerNickname')
			.populate({
			   path:'agentID',
			   select:'subAPI',
			   populate:{
				   path:'subAPI',
				   select:'work',
			   }
			})
			.select('agentID customerName customerID orderTime line successTime customerDesensitizationNumber orderMoney eDu mode')
			.lean();
			
			if(!_order){
				res.json({code:200,count:0,dayCount:0,orders:[]});
				return;
			}
			
			res.json({code:200,count:_count,dayCount:_dayCount,orders:_order});
			return;
		}
		
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
		
})

// 下拉加载数据
router.post('/api/userDatas',async function(req,res){
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	let skipNum = req.body.num;
	let pathCode = req.body.pathCode;

	let reName,result,sortx;
	
	switch(pathCode){
		case 100:
		reName = null;
		result = null;
		sortx = '_id';
		break;
		case 101:
		reName = 'orderTime';
		result = {'$regex':formatDate('yyyy-MM-dd')};
		sortx = '_id';
		break;
		case 102:
		reName = 'orderTime';
		result = {'$regex':_preDate(formatDate('yyyy-MM-dd'))};
		sortx = '_id';
		break;
		case 103:
		reName = 'eDu';
		result = '暂未出额';
		sortx = '_id';
		break;
		case 104:
		// reName = 'eDu';
		reName = '$and';
		// result = {'$ne':'暂未出额'};
		result = [{'eDu':{'$ne':'暂未出额'}},{'eDu':{'$ne':'0'}}];
		sortx = '_id';
		break;
		case 105:
		reName = 'orderMoney';
		result = {'$gt':0};
		sortx = 'successTime';
		break;
		case 106:
		reName = 'issued';
		result = true;
		sortx = '_id';
		break;
		case 107:
		reName = 'eDu';
		result = '0';
		sortx = '_id';
		break;
		default:
		reName = null;
		result = null;
		sortx = '_id';
		
	}
	try {
		let _date = formatDate('yyyy-MM-dd');
		let _child = await Child.findOne({agentID:agentID,mainPromotionProducts:productsId}).select('openID isVIP isManager').lean();
		
		if(!_child){
			res.json({code:200,orders:[]});
			return;
		}
		
		if(!_child.isVIP&&!_child.isManager){
			let _order = await Order.find({'$or':[{agentID:agentID},{superLevel:agentID}],productsId:productsId,[reName]:result}).limit(20).skip(skipNum).sort({[sortx]:-1}).
							   lean().populate('customerID','customerAvatarImg customerNickname').
							   populate({
							      path:'agentID',
							      select:'subAPI',
							      populate:{
							   	   path:'subAPI',
							   	   select:'work',
							      }
							   }).
							   select('agentID customerName customerID orderTime line successTime customerDesensitizationNumber orderMoney eDu mode');
			
			if(!_order){
				res.json({code:200,orders:[]});
				return;
			}
			
			res.json({code:200,orders:_order});
			return;
		}else{
			let _order = await Order.find({relation:{'$regex':agentID},productsId:productsId,[reName]:result}).limit(20).skip(skipNum).sort({[sortx]:-1}).
							   lean().populate('customerID','customerAvatarImg customerNickname').
							   populate({
							      path:'agentID',
							      select:'subAPI',
							      populate:{
							   	   path:'subAPI',
							   	   select:'work',
							      }
							   }).
							   select('agentID customerName customerID orderTime line successTime customerDesensitizationNumber orderMoney eDu mode');
			
			if(!_order){
				res.json({code:200,orders:[]});
				return;
			}
			
			res.json({code:200,orders:_order});
			return;
		}
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
		
})


router.post('/api/realVip',async function(req,res){
	let productsId = req.body.productsId;
	let agentID = req.body.agentID;
	_products = await Products.findOne({_id:productsId,agentID:agentID}).select('_id').lean();
	if(_products){
		res.json({code:1});
	}else{
		res.json({code:2});
	}
})


router.post('/api/feedback',async function(req,res){

	let orderID = req.body.orderID;
	
	try {
		
		let _order = await Order.findOne({_id:orderID}).lean().populate('customerID','customerAvatarImg');
		let _child = await Child.findOne({agentID:_order.agentID,mainPromotionProducts:_order.productsId}).select('managerLevel').lean();
		
		let data = {
			code:200,
			customerAvatarImg:_order.customerID.customerAvatarImg,
			customerName:_order.customerName,
			customerPhoneNumber:_order.customerPhoneNumber,
			orderTime:_order.orderTime,
			contacted:_order.contacted,
			signed:_order.signed,
			issued:_order.issued,
			managerLevel:_child.managerLevel,
			eDu:_order.eDu,
			orderMoney:_order.orderMoney,
		}
		
		
		res.json(data)
		return;	
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
	
		
})


/* 
	* 借款成功以后做的工作
	* 1，商户将借款金额保存到数据库；做一次性保存，判断借款额度是不是默认的零，如果是零，则做如下的工作；
	* 2，算出直推佣金，将佣金明细保存到数据库，同时反馈给直推代理；
	* 3，算出上级佣金，将佣金明细保存到数据库，同时反馈给上级代理；
	* 4，算出上上级佣金，将佣金明细保存到数据库，同时反馈给上上级代理；
 */

router.post('/api/saveMoney',async function(req,res){
	
	let orderID = req.body.orderID;
	let orderMoney = Number(req.body.money);
	try{
		//拿openID等
		let _order = await Order.findOne({_id:orderID})
		.select('relation level openID superLevel bigSuperLevel orderMoney productsId agentID customerDesensitizationNumber')
		.populate('customerID','customerNickname')
		.populate('productsId','productsName')
		.populate('superLevel','openID')
		.populate('bigSuperLevel','openID')
		.lean();
		//拿佣金政策
		let _products = await Products.findOne({_id:_order.productsId._id})
		.select('agentExtension agentExtensionSuper agentExtensionBigSuper managerExtension managerExtensionSuper managerExtensionBigSuper').lean();
		//拿当前登记
		let _child = await Child.findOne({agentID:_order.agentID,mainPromotionProducts:_order.productsId._id})
		.select('relation openID superLevel bigSuperLevel managerLevel agentID')
		.populate({path:'superLevel',select:'subAPI',populate:{path:'subAPI',select:'relation level agentID openID'}})
		.populate({path:'bigSuperLevel',select:'subAPI',populate:{path:'subAPI',select:'relation level agentID openID'}})
		.lean();
		//当superLevel bigSuperLevel 为null,populate以后也是null,
		
		let incomea = new Income();
		let incomeb = new Income();
		let incomec = new Income();
		
		
		// 查这笔借款是否已经反馈插入过收入明细；
		let _income = await Income.find({orderID:orderID}).lean();
		/* 
			* 如果还没有插入收入明细的
			* 判断是城市代理还是城市经理
		 */
		if(_income.length===0){
			let successTime = formatDate('yyyy-MM-dd hh:mm:ss');
			await Order.update({_id:orderID},{'$set':{'orderMoney':orderMoney,successTime:successTime}});
			let value = orderMoney - _order.orderMoney;
			await Child.update({agentID:_order.agentID,mainPromotionProducts:_order.productsId._id},{$inc:{sales:value}});
			let title = "您推荐的用户已成功借款，佣金将在一个工作日内到账！";
			let _nickName_ = _order.customerID.customerNickname;
			let _tel_ = _order.customerDesensitizationNumber;
			let _edutitle_ = "已借款，借款金额为"+orderMoney+"元";
			let _openID = _order.openID;
			let _proName = _order.productsId.productsName;
			
			// 告知借款提醒，仅直推本人
			WechatMessages.TemplateTwo(title,_nickName_,_tel_,_edutitle_,_openID,_proName);
			// 如果是城市代理，
			if(_child.managerLevel===0){
				
				incomea._id = new mongoose.Types.ObjectId;
				incomea.relation = _order.relation;
				incomea.orderRelation = _order.relation;
				incomea.agentID = _order.agentID;
				incomea.productsId = _order.productsId._id;
				incomea.openID = _order.openID;
				incomea.level = _order.level;
				incomea.howMuch = accMul(orderMoney,_products.agentExtension).toFixed(2);
				incomea.inTime = formatDate('yyyy-MM-dd hh:mm:ss');
				incomea.timeStamp = new Date().getTime();
				incomea.orderID = _order._id;
				incomea.types = '直推收入';
				await incomea.save();
				
				WechatMessages.TemplateSeven('直推收益',accMul(orderMoney,_products.agentExtension).toFixed(2),_openID);
				
				if(_child.superLevel){
					
					incomeb._id = new mongoose.Types.ObjectId;
					incomeb.relation = _child.superLevel.subAPI.relation;
					incomeb.orderRelation = _order.relation;
					incomeb.agentID = _child.superLevel.subAPI.agentID;
					incomeb.productsId = _order.productsId._id;
					incomeb.openID = _child.superLevel.subAPI.openID;
					incomeb.level = _child.superLevel.subAPI.level;
					incomeb.howMuch = accMul(orderMoney,_products.agentExtensionSuper).toFixed(2);
					incomeb.inTime = formatDate('yyyy-MM-dd hh:mm:ss');
					incomeb.timeStamp = new Date().getTime();
					incomeb.orderID = _order._id;
					incomeb.types = '得下级收益的50%';
					await incomeb.save();
					
					WechatMessages.TemplateSeven('得下级收益的50%',accMul(orderMoney,_products.agentExtensionSuper).toFixed(2),_order.superLevel.openID);
				}
				if(_child.bigSuperLevel){
					
					incomec._id = new mongoose.Types.ObjectId;
					incomec.relation = _child.bigSuperLevel.subAPI.relation;
					incomec.orderRelation = _order.relation;
					incomec.agentID = _child.bigSuperLevel.subAPI.agentID;
					incomec.productsId = _order.productsId._id;
					incomec.openID = _child.bigSuperLevel.subAPI.openID;
					incomec.level = _child.bigSuperLevel.subAPI.level;
					incomec.howMuch = accMul(orderMoney,_products.agentExtensionBigSuper).toFixed(2);
					incomec.inTime = formatDate('yyyy-MM-dd hh:mm:ss');
					incomec.timeStamp = new Date().getTime();
					incomec.orderID = _order._id;
					incomec.types = '得下下级收益的15%';
					await incomec.save();
					
					WechatMessages.TemplateSeven('得下下级收益的15%',accMul(orderMoney,_products.agentExtensionBigSuper).toFixed(2),_order.bigSuperLevel.openID);
				}
			}else{
				
				incomea._id = new mongoose.Types.ObjectId;
				incomea.relation = _order.relation;
				incomea.orderRelation = _order.relation;
				incomea.agentID = _order.agentID;
				incomea.productsId = _order.productsId._id;
				incomea.openID = _order.openID;
				incomea.level = _order.level;
				incomea.howMuch = accMul(orderMoney,_products.managerExtension).toFixed(2);
				incomea.inTime = formatDate('yyyy-MM-dd hh:mm:ss');
				incomea.timeStamp = new Date().getTime();
				incomea.orderID = _order._id;
				incomea.types = '直推2.5%';
				await incomea.save();
				
				WechatMessages.TemplateSeven('直推收益',accMul(orderMoney,_products.managerExtension).toFixed(2),_openID);
				if(_child.superLevel){
					
					incomeb._id = new mongoose.Types.ObjectId;
					incomeb.relation = _child.superLevel.subAPI.relation;
					incomeb.orderRelation = _order.relation;
					incomeb.agentID = _child.superLevel.subAPI.agentID;
					incomeb.productsId = _order.productsId._id;
					incomeb.openID = _child.superLevel.subAPI.openID;
					incomeb.level = _child.superLevel.subAPI.level;
					incomeb.howMuch = accMul(orderMoney,_products.managerExtensionSuper).toFixed(2);
					incomeb.inTime = formatDate('yyyy-MM-dd hh:mm:ss');
					incomeb.timeStamp = new Date().getTime();
					incomeb.orderID = _order._id;
					incomeb.types = '得下级收益的8%';
					await incomeb.save();
					
					WechatMessages.TemplateSeven('得下级收益的8%',accMul(orderMoney,_products.managerExtensionSuper).toFixed(2),_order.superLevel.openID);
				}
				if(_child.bigSuperLevel){
					
					incomec._id = new mongoose.Types.ObjectId;
					incomec.relation = _child.bigSuperLevel.subAPI.relation;
					incomec.orderRelation = _order.relation;
					incomec.agentID = _child.bigSuperLevel.subAPI.agentID;
					incomec.productsId = _order.productsId._id;
					incomec.openID = _child.bigSuperLevel.subAPI.openID;
					incomec.level = _child.bigSuperLevel.subAPI.level;
					incomec.howMuch = accMul(orderMoney,_products.managerExtensionBigSuper).toFixed(2);
					incomec.inTime = formatDate('yyyy-MM-dd hh:mm:ss');
					incomec.timeStamp = new Date().getTime();
					incomec.orderID = _order._id;
					incomec.types = '得下下级收益的4%';
					await incomec.save();
					
					WechatMessages.TemplateSeven('得下下级收益的4%',accMul(orderMoney,_products.managerExtensionBigSuper).toFixed(2),_order.bigSuperLevel.openID);
				}
			}
			res.json({code:200})
			return;	
		}else{
			res.json({code:100})
			return;	
		}
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}

})

router.post('/api/saveedu',async function(req,res){
	
	let orderID = req.body.orderID;
	let eDu = req.body.edu;
	try{
		
		let _order_ = await Order.findOne({_id:orderID}).select('openID productsId customerDesensitizationNumber eDu').populate('customerID','customerNickname').populate('productsId','productsName').lean();
		await Order.update({_id:orderID},{'$set':{'eDu':eDu}});
		let title = "您推荐的用户已成功获得额度，请及时跟进用户申请借款！";
		let _nickName_ = _order_.customerID.customerNickname;
		let _tel_ = _order_.customerDesensitizationNumber;
		let _edutitle_ = "已授信，授信金额为"+eDu+"元";
		let _openID = _order_.openID;
		let _proName_ = _order_.productsId.productsName;
		
		/* 只有在第一次反馈得时候才会公众号提醒通知 */
		
		if(eDu == '0'){
			res.json({code:200})
			return;	
		}
		
		if(_order_.eDu=='暂未出额'){
			WechatMessages.TemplateTwo(title,_nickName_,_tel_,_edutitle_,_openID,_proName_);
			res.json({code:200})
			return;	
		}
		res.json({code:200})
		return;		
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}

})

router.post('/api/getAccount',async function(req,res){
	
	let orderID = req.body.orderID;
	
	let _order = await Order.findOne({_id:orderID}).lean().select('agentID productsId');
	
	Child.findOne({agentID:_order.agentID,mainPromotionProducts:_order.productsId})
	.lean()
	.select('agentID superLevel bigSuperLevel')
	.populate('agentID','agentName agentAlipay agentNickname agentWechat')
	.populate('superLevel','agentName agentAlipay agentNickname agentWechat')
	.populate('bigSuperLevel','agentName agentAlipay agentNickname agentWechat')
	.exec(function(err,ret){
		if(err) {
			logger.error(err);
			return res.json({code:500});
		}
		res.json(ret);
		
	})	
})

// 反馈的进度

router.post('/api/saveFeedback', async function(req,res){
	
	let state = req.body.state;
	let orderID = req.body.orderID;
	let _order = await Order.findOne({_id:orderID}).lean().select('openID contacted signed issued');
	
	if(state==='contacted'&&!_order.contacted){
		let data = {
			time:formatDate('MM-dd'),
			customerProgress:'销售正在跟进客户',
		}
		
		Order.update({_id:orderID},{'$set':{contacted:true},'$push':{'customerProgress':data}},function(err){
			if(err){
				logger.error(err);
				return res.json({code:500});
			}
			
			return res.json({code:200});
			
		})
	}else if(state==='signed'&&!_order.signed){
		let data = {
			time:formatDate('MM-dd'),
			customerProgress:'客户已签约',
		}
		
		Order.update({_id:orderID},{'$set':{signed:true},'$push':{'customerProgress':data}},function(err){
			if(err){
				logger.error(err);
				return res.json({code:500});
			}
			
			return res.json({code:200});
			
		})
	}else if(state==='issued'&&!_order.issued){
		let data = {
			time:formatDate('MM-dd'),
			customerProgress:'佣金已发放',
		}
		
		Order.update({_id:orderID},{'$set':{issued:true},'$push':{'customerProgress':data}},function(err){
			if(err){
				logger.error(err);
				return res.json({code:500});
			}
			WechatMessages.TemplateThree(_order.openID);
			res.json({code:200});
			return;
		})
	}else{
		
		return res.json({code:200});
	}
	
	
	
})


router.post('/api/progressProfile',function(req,res){
	let orderID = req.body.orderID;
	Order.findOne({_id:orderID})
	.lean()
	.populate('productsId','productsName bossPhoneNumber bossWechat')
	.populate('customerID','customerNickname customerAvatarImg')
	.populate('agentID','agentNickname agentWechat')
	.select('customerName customerDesensitizationNumber orderTime customerProgress productsId customerID agentID')
	.exec(function(err,ret){
		if(err){
			logger.error(err);
			return res.json({code:500});
		}
		
		return res.json(ret);
		
	})
	
})


module.exports = router;
