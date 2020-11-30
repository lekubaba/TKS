var mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');


// 进入用户中心页面，拿到销售额统计结果和代理统计结果

router.post('/api/usercenter',async function(req,res){
	
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	
	try {
		let userid = mongoose.Types.ObjectId(agentID);
		let proid = mongoose.Types.ObjectId(productsId);
		let _isBusiness = await Agent.findOne({_id:agentID}).select('isBusiness').lean();
		let _child = await Child.findOne({agentID:agentID,mainPromotionProducts:productsId}).lean().select('mainPromotionProducts isVIP sales isManager').populate('mainPromotionProducts','isAddLevel');
		if(!_child){
			let data = {
				code:200,
				agents:0,
				sales:0,
				isBusiness:_isBusiness.isBusiness,
			}
			res.json(data);	
			return;
		}
		if(!_child.isVIP&&!_child.isManager){
			// 商户没有开通三级分销，默认二级
			if(!_child.mainPromotionProducts.isAddLevel){
				let _agents = await Child.count({'$or':[{agentID:agentID,mainPromotionProducts:productsId},{superLevel:agentID,mainPromotionProducts:productsId},]});
				let result = await Order.aggregate([
					{ $match : {'$or':[{agentID:userid,productsId:proid},{superLevel:userid,productsId:proid}]}},
					{$group : {_id:null, total: {$sum:"$orderMoney"}}},
				]);
				
				//还没有订单
				if(!result[0]){
					let data = {
						code:200,
						agents:_agents,
						sales:0,
						isBusiness:_isBusiness.isBusiness,
					}
					return res.json(data);	
				}else{
					let total = result[0].total;
					let data = {
						code:200,
						agents:_agents,
						sales:total,
						isBusiness:_isBusiness.isBusiness,
					}
					return res.json(data);	
				}
			}else{
				let _agents = await Child.count({'$or':[{agentID:agentID,mainPromotionProducts:productsId},{superLevel:agentID,mainPromotionProducts:productsId},{bigSuperLevel:agentID,mainPromotionProducts:productsId},]});
				let result = await Order.aggregate([
					{ $match : {'$or':[{agentID:userid,productsId:proid},{superLevel:userid,productsId:proid},{bigSuperLevel:userid,productsId:proid}]}},
					{$group : {_id:null, total: {$sum:"$orderMoney"}}},
				]);
				
				//还没有订单
				if(!result[0]){
					let data = {
						code:200,
						agents:_agents,
						sales:0,
						isBusiness:_isBusiness.isBusiness,
					}
					return res.json(data);	
				}else{
					let total = result[0].total;
					let data = {
						code:200,
						agents:_agents,
						sales:total,
						isBusiness:_isBusiness.isBusiness,
					}
					return res.json(data);	
				}
			}
		}else{
			let _agents = await Child.count({relation:{'$regex':agentID},mainPromotionProducts:productsId});
			// $macth里，id必须要转化，同时$regex必须是字符串形式；
			let result = await Order.aggregate([
								{ $match : {'relation':{'$regex':agentID},productsId:proid}},
								{$group : {_id:null, total: {$sum:"$orderMoney"}}},
						]);
			//还没有订单
			if(!result[0]){
				let data = {
					code:200,
					agents:_agents,
					sales:0,
					isBusiness:_isBusiness.isBusiness,
				}
				return res.json(data);	
			}else{
				let total = result[0].total;
				let data = {
					code:200,
					agents:_agents,
					sales:total,
					isBusiness:_isBusiness.isBusiness,
				}
				return res.json(data);	
			}
		}
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})
// 进入推广页面获取推广模式；

router.post('/api/getmode',async function(req,res){
	
	let agentID = req.body.agentID;
	
	try {
		let _pro = await Products.findOne({agentID:agentID}).lean().select('mode isAuth isPromotionQr isAgentQr isPromotionTxt isAgentTxt isRegular isLink isColor isLevel');
		
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
	let agentID = req.body.agentID;
	Agent.findOne({_id:agentID})
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

router.post('/api/saveWechat',async function(req,res){
	
	let agentID = req.body.agentID;
	let agentName = req.body.agentName;
	let agentWechat = req.body.agentWechat;
	
	try{
		await Agent.update({_id:agentID},{'$set':{agentName:agentName,agentWechat:agentWechat}});
		await Child.update({agentID:agentID},{'$set':{agentWechat:agentWechat}},{multi:true});
		return res.json({code:200});
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
	
	
})

router.post('/api/getpromotionlist',async function(req,res){
	
	let agentID = req.body.agentID;
	
	try {
		let promotionList = await Child.find({agentID:agentID}).select('mainPromotionProducts').populate('mainPromotionProducts','productsName').lean();
		res.json({code:200,promotionList:promotionList});
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})

//设置主推，那么父信息需要做相应的更新；

router.post('/api/setmainpromotionproducts',async function(req,res){
	
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	
	try {
		let _child = await Child.findOne({agentID:agentID,mainPromotionProducts:productsId}).lean();
		await Agent.update({_id:agentID},{$set:{
			subAPI:_child._id,
			isVIP:_child.isVIP,
			isBusiness:_child.isBusiness,
			mainPromotionProducts:productsId,
			superLevel:_child.superLevel,
			bigSuperLevel:_child.bigSuperLevel,
			topSuperLevel:_child.topSuperLevel,
			sales:_child.sales,
		}})
		res.json({code:200});
		return;
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})




router.post('/api/seesales',async function(req,res){
	
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	try {
		let _child = await Child.findOne({agentID:agentID,mainPromotionProducts:productsId}).populate('mainPromotionProducts','isAddLevel').lean();
		//如果还没有child，也就是用户从公众号直接进来的；
		if(!_child){
			let data = {
				code:200,
				sales:0,
				isManager:false,
			}
			res.json(data);	
			return;
		}
		/* 
			*不是VIP,且也不是管理员；
		 */
		if(!_child.isVIP&&!_child.isManager){
			// $macth里，id必须要转化，同时$regex必须是字符串形式；
			let userid = mongoose.Types.ObjectId(agentID);
			let proid = mongoose.Types.ObjectId(productsId);
			/* 商户没有开通三级分销 */
			if(!_child.mainPromotionProducts.isAddLevel){
				
				let result = await Order.aggregate([
					{ $match : {'$or':[{agentID:userid,productsId:proid},{superLevel:userid,productsId:proid}]}},
					{$group : {_id:null, total: {$sum:"$orderMoney"}}},
				]);
				
				//还没有订单
				if(!result[0]){
					let data = {
						code:200,
						sales:0,
						isManager:_child.isManager
					}
					return res.json(data);	
				}else{
					let total = result[0].total;
					let data = {
						code:200,
						sales:total,
						isManager:_child.isManager
					}
					return res.json(data);	
				}
				
	
			}else{
				let result = await Order.aggregate([
					{ $match : {'$or':[{agentID:userid,productsId:proid},{superLevel:userid,productsId:proid},{bigSuperLevel:userid,productsId:proid}]}},
					{$group : {_id:null, total: {$sum:"$orderMoney"}}},
				]);
				
				//还没有订单
				if(!result[0]){
					let data = {
						code:200,
						sales:0,
						isManager:_child.isManager
					}
					return res.json(data);	
				}else{
					let total = result[0].total;
					let data = {
						code:200,
						sales:total,
						isManager:_child.isManager
					}
					return res.json(data);	
				}
			}
		}else{
			// $macth里，id必须要转化，同时$regex必须是字符串形式；
			let proid = mongoose.Types.ObjectId(productsId);
			let result = await Order.aggregate([
								{ $match : {'relation':{'$regex':agentID},productsId:proid}},
								{$group : {_id:null, total: {$sum:"$orderMoney"}}},
						]);
			//还没有订单
			if(!result[0]){
				let data = {
					code:200,
					sales:0,
					isManager:_child.isManager
				}
				return res.json(data);	
			}else{
				let total = result[0].total;
				let data = {
					code:200,
					sales:total,
					isManager:_child.isManager
				}
				return res.json(data);	
			}
		}
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})



// 各层级的销售业绩订单；

router.post('/api/seesaleslevel',async function(req,res){
	
	let level = req.body.level;
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	
	try {
		if(level=='zero'){
			let _order = await Order.find({agentID:agentID,productsId:productsId}).limit(20).skip(0).
						 lean().populate('agentID','agentNickname agentWechat').populate('customerID','customerAvatarImg').select('agentID customerID customerName customerDesensitizationNumber orderTime orderMoney');
			let data = {
				code:200,
				_order:_order
			}
			res.json(data);
			return;
		}
		if(level=='one'){
			let _order = await Order.find({superLevel:agentID,productsId:productsId}).limit(20).skip(0).
						 lean().populate('agentID','agentNickname agentWechat').populate('customerID','customerAvatarImg').select('agentID customerID customerName customerDesensitizationNumber orderTime orderMoney')
			let data = {
				code:200,
				_order:_order
			}
			res.json(data);
			return;
		}
		if(level=='two'){
			let _order = await Order.find({'bigSuperLevel':agentID,productsId:productsId}).limit(20).skip(0).
						 lean().populate('agentID','agentNickname agentWechat').populate('customerID','customerAvatarImg').select('agentID customerID customerName customerDesensitizationNumber orderTime orderMoney')
			let data = {
				code:200,
				_order:_order
			}
			res.json(data);
			return;
		}
		if(level=='allin'){
			let _order = await Order.find({relation:{'$regex':agentID},productsId:productsId}).limit(20).skip(0).
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
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	let skipNum = req.body.num;
	
	try {
		if(level=='zero'){
			let _order = await Order.find({agentID:agentID,productsId:productsId}).limit(10).skip(skipNum).
						 lean().populate('agentID','agentNickname agentWechat').populate('customerID','customerAvatarImg').select('agentID customerID customerName customerDesensitizationNumber orderTime orderMoney');
			let data = {
				code:200,
				_order:_order
			}
			res.json(data);
			return;
		}
		if(level=='one'){
			let _order = await Order.find({superLevel:agentID,productsId:productsId}).limit(10).skip(skipNum).
						 lean().populate('agentID','agentNickname agentWechat').populate('customerID','customerAvatarImg').select('agentID customerID customerName customerDesensitizationNumber orderTime orderMoney')
			let data = {
				code:200,
				_order:_order
			}
			res.json(data);
			return;
		}
		if(level=='two'){
			let _order = await Order.find({'bigSuperLevel':agentID,productsId:productsId}).limit(10).skip(skipNum).
							   lean().populate('agentID','agentNickname agentWechat').populate('customerID','customerAvatarImg').select('agentID customerID customerName customerDesensitizationNumber orderTime orderMoney')
			let data = {
				code:200,
				_order:_order
			}
			res.json(data);
			return;
		}
		if(level=='allin'){
			let _order = await Order.find({relation:{'$regex':agentID},productsId:productsId}).limit(10).skip(skipNum).
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
	
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;

	try {
		let userid = mongoose.Types.ObjectId(agentID);
		let proid = mongoose.Types.ObjectId(productsId);
		let _child = await Child.findOne({agentID:agentID,mainPromotionProducts:productsId}).lean().select('mainPromotionProducts isVIP sales isManager').populate('mainPromotionProducts','isAddLevel');
		
		if(!_child){
			let data = {
				code:200,
				team:0,
				isManager:false,
			}
			res.json(data);
			return;
		}
		
		if(!_child.isVIP&&!_child.isManager){
			if(!_child.mainPromotionProducts.isAddLevel){
				let _team = await Child.count({'$or':[{agentID:agentID,mainPromotionProducts:productsId},{superLevel:agentID,mainPromotionProducts:productsId},]});
				let data = {
					code:200,
					team:_team,
					isManager:_child.isManager
				}
				return res.json(data);	
			}else{
				let _team = await Child.count({'$or':[{agentID:agentID,mainPromotionProducts:productsId},{superLevel:agentID,mainPromotionProducts:productsId},{bigSuperLevel:agentID,mainPromotionProducts:productsId},]});
				let data = {
					code:200,
					team:_team,
					isManager:_child.isManager
				}
				return res.json(data);	
			}
		}else{
			let _team = await Child.count({relation:{'$regex':agentID},mainPromotionProducts:productsId});
			let data = {
				code:200,
				team:_team,
				isManager:_child.isManager
			}
			return res.json(data);
		}
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})

// 各层级的团队；

router.post('/api/seeteamlevel',async function(req,res){
	
	let level = req.body.level;
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	
	try {
		if(level=='one'){
			let _agents = await Child.find({superLevel:agentID,mainPromotionProducts:productsId}).limit(20).skip(0).
								lean().select('agentID superLevel time sales').populate('agentID','agentAvatarImg agentNickname agentWechat');
			let data = {
				code:200,
				_agents:_agents
			}
			res.json(data);
			return;
		}
		if(level=='two'){
			let _agents = await Child.find({bigSuperLevel:agentID,mainPromotionProducts:productsId}).limit(20).skip(0).
								lean().select('agentID bigSuperLevel time sales').populate('agentID','agentAvatarImg agentNickname agentWechat');
			let data = {
				code:200,
				_agents:_agents
			}
			res.json(data);
			return;
		}
		if(level=='allin'){
			let _agents = await Child.find({relation:{'$regex':agentID},mainPromotionProducts:productsId}).limit(20).skip(0).
								lean().select('agentID topSuperLevel time sales').populate('agentID','agentAvatarImg agentNickname agentWechat');
			
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
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	let skipNum = req.body.num;
	
	try {
		
		if(level=='one'){
			let _agents = await Child.find({superLevel:agentID,mainPromotionProducts:productsId}).limit(10).skip(skipNum).
								lean().select('agentID superLevel time sales').populate('agentID','agentAvatarImg agentNickname agentWechat');
			let data = {
				code:200,
				_agents:_agents
			}
			res.json(data);
			return;
		}
		if(level=='two'){
			let _agents = await Child.find({bigSuperLevel:agentID,mainPromotionProducts:productsId}).limit(10).skip(skipNum).
								lean().select('agentID superLevel time sales').populate('agentID','agentAvatarImg agentNickname agentWechat');
			let data = {
				code:200,
				_agents:_agents
			}
			res.json(data);
			return;
		}
		if(level=='allin'){
			let _agents = await Child.find({relation:{'$regex':agentID},mainPromotionProducts:productsId}).limit(10).skip(skipNum).
								lean().select('agentID superLevel time sales').populate('agentID','agentAvatarImg agentNickname agentWechat');
			
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

//判断是不是商户；

router.post('/api/getBusinessState',async function(req,res){
	
	let agentID = req.body.agentID;
	try{
		let _isBusiness = await Agent.findOne({_id:agentID}).select('isBusiness').lean();
		res.json({code:200,isBusiness:_isBusiness.isBusiness});
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})
//判断用户是否已经建立了产品；

router.post('/api/isbuildproducts',async function(req,res){
	
	let agentID = req.body.agentID;
	try{
		let _products = await Products.findOne({agentID:agentID}).select('openID').lean();
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
	
	let agentID = req.body.agentID;
	let mode = req.body.mode;
	try {
		
		let _agent = await Agent.findOne({_id:agentID}).select('openID unionID').lean();
		
		let products = new Products();
		products._id = new mongoose.Types.ObjectId;
		products.mode = mode;
		products.isAddLevel = false;
		products.companyName = '还没设置名字';
		products.openID = _agent.openID;
		products.agentID = agentID;
		products.bossPhoneNumber = '暂无';
		products.bossWechat = '暂无';
		products.productsName = '还没起名';
		products.productsTitle = '暂无标题';
		products.promotionCover = '';
		products.promotionQrcodeBackground = 'http://qiniu.tongkeapp.com/promotionqrcode.png?time=20201130';
		products.agentQrcodeBackground = 'http://qiniu.tongkeapp.com/agentqrcode.png?time=20201130';
		products.promotionPoster = ['http://qiniu.tongkeapp.com/tk_introduction_011.png?time=20201130','http://qiniu.tongkeapp.com/tk_introduction_022.png?time=20201130','http://qiniu.tongkeapp.com/tk_introduction_033.png?time=20201130','http://qiniu.tongkeapp.com/tk_introduction_044.png?time=20201130','http://qiniu.tongkeapp.com/tk_introduction_055.png?time=20201130','http://qiniu.tongkeapp.com/tk_introduction_066.png?time=20201130'];
		products.agentPoster = ['http://qiniu.tongkeapp.com/tk_introduction_011.png?time=20201130','http://qiniu.tongkeapp.com/tk_introduction_022.png?time=20201130','http://qiniu.tongkeapp.com/tk_introduction_033.png?time=20201130','http://qiniu.tongkeapp.com/tk_introduction_044.png?time=20201130','http://qiniu.tongkeapp.com/tk_introduction_055.png?time=20201130','http://qiniu.tongkeapp.com/tk_introduction_066.png?time=20201130'];
		products.regularPoster.push('http://qiniu.tongkeapp.com/default_20201010_01.png?time=20201130');
		products.productsLink = 'http://qiniu.tongkeapp.com/default_20201010_01.png?time=20201130';
		products.color = '#1476FE';
		products.originalPrice = 99999;
		products.activityPrice = 10000;
		products.summary = '暂无';
		products.squareImg = 'http://qiniu.tongkeapp.com/tkImgLogo.png?time=20201130';
		products.time = formatDate('yyyy-MM-dd hh:mm:ss');
		products.timeStamp = new Date().getTime();
		
		// 新建child
		let child = new Child();
		child._id = new mongoose.Types.ObjectId;
		child.isVIP = true;
		child.isBusiness = true;
		child.mainPromotionProducts = products._id;
		child.superLevel = null;
		child.bigSuperLevel = null;
		child.topSuperLevel = agentID;
		child.agentID = agentID;
		child.openID = _agent.openID;
		child.unionID = _agent.unionID;
		child.time = formatDate('yyyy-MM-dd hh:mm:ss');
		child.timeStamp = new Date().getTime();
		child.level = 0;
		child.relation = '/'+agentID;
		
		await products.save();
		await child.save();
		await Agent.update({_id:agentID},{$set:{isVIP:true,isBusiness:true,isPromotion:true,subAPI:child._id,mainPromotionProducts:products._id,superLevel:null,bigSuperLevel:null,topSuperLevel:_agent._id}});
		res.json({code:200,productsId:products._id});
		return;
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
	
})







module.exports = router;
