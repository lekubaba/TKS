var mongoose = require('mongoose');
let {Agent,Customer,Products,Order} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');


// 客户数据初始化数据
router.post('/api/userData',async function(req,res){

	let openID = req.body.openID;
	
	try {
		let _date = formatDate('yyyy-MM-dd');
		let _dayCount = await Order.count({openID:openID,orderTime:{'$regex':_date}});
		let _count = await Order.count({openID:openID});
		let _order = await Order.find({openID:openID}).limit(20).skip(0).
						   lean().populate('customerID','customerAvatarImg').
						   select('customerName customerID orderTime customerDesensitizationNumber orderMoney mode');
		
		if(!_order){
			res.json({code:200,count:0,dayCount:0,orders:[]});
			return;
		}
		
		res.json({code:200,count:_count,dayCount:_dayCount,orders:_order});
		return;
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
		
})

// 下拉加载数据
router.post('/api/userDatas',async function(req,res){

	let openID = req.body.openID;
	let skipNum = req.body.num;
	
	try {
		let _date = formatDate('yyyy-MM-dd');
		let _order = await Order.find({openID:openID}).limit(10).skip(skipNum).
						   lean().populate('customerID','customerAvatarImg').
						   select('customerName customerID orderTime customerDesensitizationNumber orderMoney mode');
		
		if(!_order){
			res.json({code:200,orders:[]});
			return;
		}
		
		res.json({code:200,orders:_order});
		return;
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
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
		let _order = await Order.findOne({_id:orderID}).select('openID orderMoney').lean();
		Order.update({_id:orderID},{'$set':{'orderMoney':orderMoney}},function(err){
			
			if(err){
				logger.error(err);
				return res.json({code:500});
			}
			let value = orderMoney - _order.orderMoney;
			Agent.update({openID:_order.openID},{$inc:{sales:value}},function(err){
				
				if(err){
					logger.error(err);
					return res.json({code:500});
				}
				
				let data = {
					code:200,
				}
				res.json(data)
				return;	
			})
			
		})
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
	

})

router.post('/api/getAccount',async function(req,res){
	
	let orderID = req.body.orderID;
	
	let _order = await Order.findOne({_id:orderID}).lean().select('agentID');
	
	Agent.findOne({_id:_order.agentID})
	.lean()
	.select('superLevel bigSuperLevel agentNickname agentWechat')
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
