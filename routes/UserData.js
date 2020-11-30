var mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');


// 客户数据初始化数据
router.post('/api/userData',async function(req,res){

	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	
	try {
		let _date = formatDate('yyyy-MM-dd');
		let _child = await Child.findOne({agentID:agentID,mainPromotionProducts:productsId}).select('openID isVIP isManager').lean();
		if(!_child){
			res.json({code:200,count:0,dayCount:0,orders:[]});
			return;
		}
		//不是vip
		if(!_child.isVIP&&!_child.isManager){
			let _dayCount = await Order.count({agentID:agentID,productsId:productsId,orderTime:{'$regex':_date}});
			let _count = await Order.count({agentID:agentID,productsId:productsId});
			let _order = await Order.find({agentID:agentID,productsId:productsId}).limit(20).skip(0).
							   lean().populate('customerID','customerAvatarImg').
							   select('customerName customerID orderTime customerDesensitizationNumber orderMoney mode');
			
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
			let _order = await Order.find({relation:{'$regex':agentID},productsId:productsId}).limit(20).skip(0).
							   lean().populate('customerID','customerAvatarImg').
							   select('customerName customerID orderTime customerDesensitizationNumber orderMoney mode');
			
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
	
	try {
		let _date = formatDate('yyyy-MM-dd');
		let _child = await Child.findOne({agentID:agentID,mainPromotionProducts:productsId}).select('openID isVIP isManager').lean();
		
		if(!_child){
			res.json({code:200,orders:[]});
			return;
		}
		
		if(!_child.isVIP&&!_child.isManager){
			let _order = await Order.find({agentID:agentID,productsId:productsId}).limit(20).skip(skipNum).
							   lean().populate('customerID','customerAvatarImg').
							   select('customerName customerID orderTime customerDesensitizationNumber orderMoney mode');
			
			if(!_order){
				res.json({code:200,orders:[]});
				return;
			}
			
			res.json({code:200,orders:_order});
			return;
		}else{
			let _order = await Order.find({relation:{'$regex':agentID},productsId:productsId}).limit(20).skip(skipNum).
							   lean().populate('customerID','customerAvatarImg').
							   select('customerName customerID orderTime customerDesensitizationNumber orderMoney mode');
			
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
		
		let data = {
			code:200,
			customerAvatarImg:_order.customerID.customerAvatarImg,
			customerName:_order.customerName,
			customerPhoneNumber:_order.customerPhoneNumber,
			contacted:_order.contacted,
			signed:_order.signed,
			issued:_order.issued
		}
		
		
		res.json(data)
		return;	
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
	
		
})

router.post('/api/saveMoney',async function(req,res){
	
	let orderID = req.body.orderID;
	let orderMoney = Number(req.body.money);
	try{
		let _order = await Order.findOne({_id:orderID}).select('openID orderMoney productsId agentID').lean();
		await Order.update({_id:orderID},{'$set':{'orderMoney':orderMoney}});
		let value = orderMoney - _order.orderMoney;
		await Agent.update({openID:_order.openID},{$inc:{sales:value}});
		await Child.update({agentID:_order.agentID,mainPromotionProducts:_order.productsId},{$inc:{sales:value}});
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
	.populate('agentID','agentNickname agentWechat')
	.populate('superLevel','agentNickname agentWechat')
	.populate('bigSuperLevel','agentNickname agentWechat')
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
	let _order = await Order.findOne({_id:orderID}).lean().select('contacted signed issued');
	
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
			
			return res.json({code:200});
			
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
	.select('customerName customerDesensitizationNumber orderTime customerProgress productsId customerID')
	.exec(function(err,ret){
		if(err){
			logger.error(err);
			return res.json({code:500});
		}
		
		return res.json(ret);
		
	})
	
})


module.exports = router;
