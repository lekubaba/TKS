var mongoose = require('mongoose');
let {Agent,Customer,Products,Order} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');


// 进入用户中心页面，拿到销售额统计结果和自身一级代理统计结果

router.post('/api/usercenter',async function(req,res){
	let openID = req.body.openID;
	
	try {
		let _sales = await Agent.findOne({openID:openID}).lean().select('sales');
		let _agents = await Agent.count({superLevel:_sales._id});
		
		let data = {
			code:200,
			agents:_agents,
			sales:_sales.sales
		}
		
		return res.json(data);
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})
// 进入推广页面获取推广模式；

router.post('/api/getmode',async function(req,res){
	let openID = req.body.openID;
	
	try {
		let _pro = await Products.findOne({openID:openID}).lean().select('mode isAuth isPromotionQr isAgentQr isPromotionTxt isAgentTxt isRegular isLink isColor isLevel');
		
		let data = {
			code:200,
			pro:_pro
		}
		
		return res.json(data);
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
})

// 绑定微信获取用户绑定前微信

router.post('/api/getwechat',function(req,res){
	let openID = req.body.openID;
	Agent.findOne({openID:openID})
	.lean()
	.select('agentWechat')
	.exec(function(err,_agent){
		if(err){
			logger.error(err);
			return res.json({code:500});
		}
		
		let data = {
			code:200,
			agentWechat:_agent.agentWechat
		}
		return res.json(data);
		
		
	})
})

router.post('/api/saveWechat',function(req,res){
	
	let openID = req.body.openID;
	let agentName = req.body.agentName;
	let agentWechat = req.body.agentWechat;
	
	Agent.update({openID:openID},{'$set':{agentName:agentName,agentWechat:agentWechat}},function(err){
		
		if(err){
			logger.error(err);
			return res.json({code:500});
		}
		
		return res.json({code:200});
		
	})
	
})


router.post('/api/seesales',async function(req,res){
	
	let openID = req.body.openID;
	try {
		let _agent = await Agent.findOne({openID:openID}).lean().select('sales');
		let data = {
			code:200,
			sales:_agent.sales,
		}
		return res.json(data);
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})



// 各层级的销售业绩订单；

router.post('/api/seesaleslevel',async function(req,res){
	
	let level = req.body.level;
	let openID = req.body.openID;
	
	try {
		let _agent = await Agent.findOne({openID:openID}).lean().select('_id');
		
		
		if(level=='zero'){
			let _order = await Order.find({openID:openID}).limit(20).skip(0).
						 lean().populate('agentID','agentNickname agentWechat').populate('customerID','customerAvatarImg').select('agentID customerID customerName customerDesensitizationNumber orderTime orderMoney');
			let data = {
				code:200,
				_order:_order
			}
			res.json(data);
			return;
		}
		if(level=='one'){
			let _order = await Order.find({superLevel:_agent._id}).limit(20).skip(0).
						 lean().populate('agentID','agentNickname agentWechat').populate('customerID','customerAvatarImg').select('agentID customerID customerName customerDesensitizationNumber orderTime orderMoney')
			let data = {
				code:200,
				_order:_order
			}
			res.json(data);
			return;
		}
		if(level=='two'){
			let _order = await Order.find({'bigSuperLevel':_agent._id}).limit(20).skip(0).
						 lean().populate('agentID','agentNickname agentWechat').populate('customerID','customerAvatarImg').select('agentID customerID customerName customerDesensitizationNumber orderTime orderMoney')
			let data = {
				code:200,
				_order:_order
			}
			res.json(data);
			return;
		}
		if(level=='allin'){
			let _order = await Order.find({'topSuperLevel':_agent._id}).limit(20).skip(0).
						 lean().populate('agentID','agentNickname agentWechat').populate('customerID','customerAvatarImg').select('agentID customerID customerName customerDesensitizationNumber orderTime orderMoney')
			let data = {
				code:200,
				_order:_order
			}
			res.json(data);
			return;
			
	
			
		}
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
		
	
	
})


// 各层级的下拉加载销售业绩订单；

router.post('/api/seesalesplus',async function(req,res){
	
	let level = req.body.level;
	let openID = req.body.openID;
	let skipNum = req.body.num;
	
	try {
		let _agent = await Agent.findOne({openID:openID}).lean().select('_id');
		
		
		if(level=='zero'){
			let _order = await Order.find({openID:openID}).limit(10).skip(skipNum).
						 lean().populate('agentID','agentNickname agentWechat').populate('customerID','customerAvatarImg').select('agentID customerID customerName customerDesensitizationNumber orderTime orderMoney');
			let data = {
				code:200,
				_order:_order
			}
			res.json(data);
			return;
		}
		if(level=='one'){
			let _order = await Order.find({superLevel:_agent._id}).limit(10).skip(skipNum).
						 lean().populate('agentID','agentNickname agentWechat').populate('customerID','customerAvatarImg').select('agentID customerID customerName customerDesensitizationNumber orderTime orderMoney')
			let data = {
				code:200,
				_order:_order
			}
			res.json(data);
			return;
		}
		if(level=='two'){
			let _order = await Order.find({'bigSuperLevel':_agent._id}).limit(10).skip(skipNum).
							   lean().populate('agentID','agentNickname agentWechat').populate('customerID','customerAvatarImg').select('agentID customerID customerName customerDesensitizationNumber orderTime orderMoney')
			let data = {
				code:200,
				_order:_order
			}
			res.json(data);
			return;
		}
		if(level=='allin'){
			let _order = await Order.find({'topSuperLevel':_agent._id}).limit(10).skip(skipNum).
						 lean().populate('agentID','agentNickname agentWechat').populate('customerID','customerAvatarImg').select('agentID customerID customerName customerDesensitizationNumber orderTime orderMoney')
			let data = {
				code:200,
				_order:_order
			}
			res.json(data);
			return;
			
	
			
		}
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
		
	
	
})



// 查看代理页面

router.post('/api/seeteam',async function(req,res){
	
	let openID = req.body.openID;
	try {
		let _agent = await Agent.findOne({openID:openID}).lean().select('_id');
		let _team = await Agent.count({superLevel:_agent._id});
		let data = {
			code:200,
			team:_team
		}
		return res.json(data);
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})

// 各层级的团队；

router.post('/api/seeteamlevel',async function(req,res){
	
	let level = req.body.level;
	let openID = req.body.openID;
	
	try {
		
		let _agent = await Agent.findOne({openID:openID}).lean().select('_id');
		
		if(level=='one'){
			let _agents = await Agent.find({superLevel:_agent._id}).limit(20).skip(0).
								lean().select('agentAvatarImg agentNickname agentWechat beAgentTime sales')
			let data = {
				code:200,
				_agents:_agents
			}
			res.json(data);
			return;
		}
		if(level=='two'){
			let _agents = await Agent.find({'bigSuperLevel':_agent._id}).limit(20).skip(0).
						  lean().select('agentAvatarImg agentNickname agentWechat beAgentTime sales')
			let data = {
				code:200,
				_agents:_agents
			}
			res.json(data);
			return;
		}
		if(level=='allin'){
			let _agents = await Agent.find({'topSuperLevel':_agent._id}).limit(20).skip(0).
						  lean().select('agentAvatarImg agentNickname agentWechat beAgentTime sales')
			
			let data = {
				code:200,
				_agents:_agents
			}
			res.json(data);
			return;
			
	
			
		}
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
		
	
	
})

// 各层级下拉加载团队；

router.post('/api/seeteamplus',async function(req,res){
	
	let level = req.body.level;
	let openID = req.body.openID;
	let skipNum = req.body.num;
	
	try {
		
		let _agent = await Agent.findOne({openID:openID}).lean().select('_id');
		
		if(level=='one'){
			let _agents = await Agent.find({superLevel:_agent._id}).limit(10).skip(skipNum).
						  lean().select('agentAvatarImg agentNickname agentWechat beAgentTime sales')
			let data = {
				code:200,
				_agents:_agents
			}
			res.json(data);
			return;
		}
		if(level=='two'){
			let _agents = await Agent.find({'bigSuperLevel':_agent._id}).limit(10).skip(skipNum).
						  lean().select('agentAvatarImg agentNickname agentWechat beAgentTime sales')
			let data = {
				code:200,
				_agents:_agents
			}
			res.json(data);
			return;
		}
		if(level=='allin'){
			let _agents = await Agent.find({'topSuperLevel':_agent._id}).limit(10).skip(skipNum).
						  lean().select('agentAvatarImg agentNickname agentWechat beAgentTime sales')
			
			let data = {
				code:200,
				_agents:_agents
			}
			res.json(data);
			return;
			
	
			
		}
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
		
	
	
})


//判断用户是否已经建立了产品；

router.post('/api/isbuildproducts',async function(req,res){
	
	let openID = req.body.openID;
	try{
		let _products = await Products.findOne({openID:openID}).select('openID').lean();
		if(!_products){
			res.json({code:400})
			return;
		}else{
			res.json({code:200})
			return;
		}
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})

router.post('/api/buildproductsmode',async function(req,res){
	
	let openID = req.body.openID;
	let mode = req.body.mode;
	
	let _agent = await Agent.findOne({openID:openID}).select('openID').lean();
	
	let products = new Products();
	products._id = new mongoose.Types.ObjectId;
	products.mode = mode;
	products.isAddLevel = false;
	products.companyName = '还没设置名字';
	products.openID = openID;
	products.bossPhoneNumber = '暂无';
	products.bossWechat = '暂无';
	products.productsName = '还没起名';
	products.productsTitle = '暂无标题';
	products.promotionCover = 'http://qiniu.tongkeapp.com/default_20201010_01.png';
	products.promotionQrcodeBackground = 'http://qiniu.tongkeapp.com/default_20201010_01.png';
	products.agentQrcodeBackground = 'http://qiniu.tongkeapp.com/default_20201010_01.png';
	products.promotionPoster.push('http://qiniu.tongkeapp.com/default_20201010_01.png');
	products.agentPoster.push('http://qiniu.tongkeapp.com/default_20201010_01.png');
	products.regularPoster.push('http://qiniu.tongkeapp.com/default_20201010_01.png');
	products.productsLink = 'http://qiniu.tongkeapp.com/default_20201010_01.png';
	products.color = '#1476FE';
	products.originalPrice = 99999;
	products.activityPrice = 10000;
	products.summary = '暂无';
	products.squareImg = 'http://qiniu.tongkeapp.com/tkImgLogo.png';
	products.time = formatDate('yyyy-MM-dd hh:mm:ss');
	products.timeStamp = new Date().getTime();
	
	products.save(function(err){
		if(err){
			logger.error(err);
			return res.json({code:500});
		}
		
		Agent.update({openID:openID},{$set:{mainPromotionProducts:products._id,topSuperLevel:_agent._id}},function(err){
			if(err){
				logger.error(err);
				return res.json({code:500});
			}
			return res.json({code:200});
		})
		
		
		
	})
	
})







module.exports = router;
