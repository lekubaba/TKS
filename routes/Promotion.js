var mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child,Income,Cash} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {WechatMessages} = require('../utils/WechatMessages');

/*首页*/

router.post('/api/promotion',async function(req,res){
		
	let isPromotion = req.body.isPromotion;
	// 代理的agentID;
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	
	try {
		let userid = mongoose.Types.ObjectId(agentID);
		let proid = mongoose.Types.ObjectId(productsId);
		
		let result = await Income.aggregate([
			{$match:{agentID:userid,productsId:proid}},
			{$group : {_id:null, total: {$sum:"$howMuch"}}},
		]);
		
		// 如果满足条件，就升级为城市经理
		let _child = await Child.findOne({agentID:agentID,mainPromotionProducts:productsId}).select('openID managerLevel activityNumber agentNum countDown').populate('agentID','agentNickname').lean();
		
		let rets = await Agent.findOne({_id:agentID}).select('mainPromotionProducts isVIP isPromotion').populate('mainPromotionProducts','promotionPoster agentPoster isAddLevel color').populate('subAPI','managerLevel countDown').lean();
		
		if(!rets){
			res.json({code:100});
			return;
		}
		if(!result[0]){
			rets.code = 200;
			rets.total = 0;
			res.json(rets);
			return;
		}
		rets.code = 200;
		rets.total = result[0].total;
		res.json(rets);
		return;
	}catch(err){
		logger.error(err.message);
		res.json({code:500});
	}
})


router.post('/api/regularposter',async function(req,res){

	let productsID = req.body.productsID;
	try {
		let pro = await Products.findOne({_id:productsID}).select('regularPoster').lean();
		let data = {
			code:200,
			regularPoster:pro.regularPoster
		}
		
		res.json(data);
	}catch(err){
		logger.error(err);
		res.json({code:500});
	}
	
})

router.post('/api/getagentqrcode',async function(req,res){
	

	let agentID = req.body.agentID;
	try {
		let _agent = await Agent.findOne({_id:agentID}).select('openID mainPromotionProducts').populate('mainPromotionProducts','agentQrcodeBackground').lean();
		let data = {
			code:200,
			agentQrcodeBackground:_agent.mainPromotionProducts.agentQrcodeBackground,
		}
		
		return res.json(data);
	}catch(err){
		logger.error(err);
		res.json({code:500});
	}
	
})

router.post('/api/getpromotionqrcode',async function(req,res){
	

	let agentID = req.body.agentID;
	try {
		let _agent = await Agent.findOne({_id:agentID}).select('openID mainPromotionProducts').populate('mainPromotionProducts','promotionQrcodeBackground').lean();
		let data = {
			code:200,
			promotionQrcodeBackground:_agent.mainPromotionProducts.promotionQrcodeBackground,
		}
		
		return res.json(data);
	}catch(err){
		logger.error(err);
		res.json({code:500});
	}
	
})

router.post('/api/getBossInfo',async function(req,res){
	let _id = req.body.productsID;
	let agentID = req.body.agentID;
	
	
	try{
		
		let _child = await Child.findOne({agentID:agentID,mainPromotionProducts:_id}).select('superLevel bigSuperLevel').lean();
		let str = _child.superLevel?mongoose.Types.ObjectId(_child.superLevel).toString():'null';
		let str1 = _child.bigSuperLevel?mongoose.Types.ObjectId(_child.bigSuperLevel).toString():'null';
		
		if(agentID==='5ff9c93103bb5a65c0d5d56a'||str==='5ff9c93103bb5a65c0d5d56a'||str1==='5ff9c93103bb5a65c0d5d56a'){
			let bossInfo = {
				bossPhoneNumber:'13715972559',
				bossWechat:'13715972559'
			}
			res.json(bossInfo);
			return
		}else{
			
			let rets = await Products.findOne({_id:_id}).select('bossPhoneNumber bossWechat').lean();
			let bossInfo = {
				bossPhoneNumber:rets.bossPhoneNumber,
				bossWechat:rets.bossWechat
			}
			return res.json(bossInfo);
			
		}
		
	}catch(err){
		logger.error(err);
		res.json({code:500});
	}
	
		
	
})


/* 获得全部佣金比例 */

router.post('/api/getSelfCommissionRate', async function(req,res){
	let _agentID = req.body.agentID;
	let _productsId = req.body.productsId;
	try{
		let _child = await Child.findOne({agentID:_agentID,mainPromotionProducts:_productsId}).select('mainPromotionProducts managerLevel').populate('mainPromotionProducts','agentExtension agentExtensionSuper agentExtensionBigSuper managerExtension managerExtensionSuper managerExtensionBigSuper').lean();
		let datas = {
			code:200,
			managerLevel:_child.managerLevel,
			agentExtension:_child.mainPromotionProducts.agentExtension,
			agentExtensionSuper:_child.mainPromotionProducts.agentExtensionSuper,
			agentExtensionBigSuper:_child.mainPromotionProducts.agentExtensionBigSuper,
			managerExtension:_child.mainPromotionProducts.managerExtension,
			managerExtensionSuper:_child.mainPromotionProducts.managerExtensionSuper,
			managerExtensionBigSuper:_child.mainPromotionProducts.managerExtensionBigSuper,
		}
		res.json(datas);
	}catch(err){
		logger.error(err);
		res.json({code:500});
	}
})


/**
 * @获得可提现金额数字和不可提现的金额的数字
 */

router.post('/api/getNotWithdrawalTotal', async function(req,res){
	let _agentID = req.body.agentID;
	let _productsId = req.body.productsId;
	try{
		let userid = mongoose.Types.ObjectId(_agentID);
		let proid = mongoose.Types.ObjectId(_productsId);
		let _timeStamp = new Date().getTime() - 86400000;
		
		//统计有效的且没有提现的金额；
		
		let result = await Income.aggregate([
			{$match:{agentID:userid,productsId:proid,isOut:false,timeStamp:{'$lt':_timeStamp}}},
			{$group : {_id:null, total: {$sum:"$howMuch"}}},
		]);
		
		// 统计还没到时间的；
		
		let resulta = await Income.aggregate([
			{$match:{agentID:userid,productsId:proid,isOut:false,timeStamp:{'$gte':_timeStamp}}},
			{$group : {_id:null, total: {$sum:"$howMuch"}}},
		]);
		
		
		res.json({
			code:200,
			total:result[0]?result[0].total:0,
			totala:resulta[0]?resulta[0].total:0,
		});
		
	}catch(err){
		logger.error(err);
		res.json({code:500});
	}
})





/* 获得收入明细 */

router.post('/api/getIncome', async function(req,res){
	let _agentID = req.body.agentID;
	let _productsId = req.body.productsId;
	try{
		let _incomes = await Income.find({agentID:_agentID,productsId:_productsId})
		.limit(20).skip(0).sort({"_id":-1})
		.select('types howMuch inTime orderID')
		.populate({path:'orderID',select:'agentID',populate:{path:'agentID',select:'agentNickname'}}).lean();
		res.json({code:200,data:_incomes});
	}catch(err){
		logger.error(err);
		res.json({code:500});
	}
})

/* 下拉加载获得更多收入明细 */

router.post('/api/getIncomes', async function(req,res){
	let _agentID = req.body.agentID;
	let _productsId = req.body.productsId;
	let _num = req.body.num;
	try{
		let _incomes = await Income.find({agentID:_agentID,productsId:_productsId})
		.limit(20).skip(_num).sort({"_id":-1})
		.select('types howMuch inTime orderID')
		.populate({path:'orderID',select:'agentID',populate:{path:'agentID',select:'agentNickname'}}).lean();
		res.json({code:200,data:_incomes});
	}catch(err){
		logger.error(err);
		res.json({code:500});
	}
})


/* 获得提现记录 */

router.post('/api/getWithdrawalRecord', async function(req,res){
	let _agentID = req.body.agentID;
	let _productsId = req.body.productsId;
	try{
		let _incomes = await Income.find({agentID:_agentID,productsId:_productsId,isOut:true})
		.limit(20).skip(0).sort({"_id":-1})
		.select('types howMuch outTime orderID')
		.populate({path:'orderID',select:'agentID',populate:{path:'agentID',select:'agentNickname'}}).lean();
		res.json({code:200,data:_incomes});
	}catch(err){
		logger.error(err);
		res.json({code:500});
	}
})


/* 下拉加载获得更多提现记录 */

router.post('/api/getWithdrawalRecords', async function(req,res){
	let _agentID = req.body.agentID;
	let _productsId = req.body.productsId;
	let _num = req.body.num;
	try{
		let _incomes = await Income.find({agentID:_agentID,productsId:_productsId,isOut:true})
		.limit(20).skip(_num).sort({"_id":-1})
		.select('types howMuch outTime orderID')
		.populate({path:'orderID',select:'agentID',populate:{path:'agentID',select:'agentNickname'}}).lean();
		res.json({code:200,data:_incomes});
	}catch(err){
		logger.error(err);
		res.json({code:500});
	}
})


/* 确认提现 */

router.post('/api/confirmWithdrawal', async function(req,res){
	
	let _agentID = req.body.agentID;
	let _productsId = req.body.productsId;
	try{
		let _agent = await Agent.findOne({_id:_agentID}).select('openID').lean();
		let userid = mongoose.Types.ObjectId(_agentID);
		let proid = mongoose.Types.ObjectId(_productsId);
		let _timeStamp = new Date().getTime() - 86400000;
		
		// 将过了24小时的统计出来
		let result = await Income.aggregate([
			{$match:{agentID:userid,productsId:proid,isOut:false,timeStamp:{'$lt':_timeStamp}}},
			{$group : {_id:null, total: {$sum:"$howMuch"}}},
		]);
		
		let cash = new Cash();
		cash._id = new mongoose.Types.ObjectId;
		cash.agentID = _agentID;
		cash.productsId = _productsId;
		cash.openID = _agent.openID;
		cash.howMuch = result[0].total;
		cash.time = formatDate('yyyy-MM-dd hh:mm:ss');
		cash.timeStamp = new Date().getTime();
		
		await cash.save();
		//将过了24小时的，客户提现的设置为true,并且将cashID插入到income里；
		await Income.update({agentID:_agentID,productsId:_productsId,isOut:false,timeStamp:{'$lt':_timeStamp}},{'$set':{isOut:true,outTime:formatDate('yyyy-MM-dd hh:mm:ss'),cashID:cash._id}},{multi:true});
		
		
		res.json({code:200});
	}catch(err){
		logger.error(err);
		res.json({code:500});
	}
})


module.exports = router;
