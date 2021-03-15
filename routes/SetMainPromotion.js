let mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child} = require('../mongoose/modelSchema')
let express = require('express');
let router = express.Router();
let request = require('request');
let fs = require('fs');
let path = require('path');
let logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {APPID,SECRET} = require('../config');


// 获取到推广产品列表

router.post('/api/getpromotionlist',async function(req,res){
	
	let agentID = req.body.agentID;
	
	try {
		let promotionList = await Child.find({agentID:agentID}).select('mainPromotionProducts time').populate('mainPromotionProducts','productsName').lean();
		res.json({code:200,promotionList:promotionList});
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})


router.post('/api/getProductsInfos',async function(req,res){
	
	let productsId = req.body.productsId;
	
	try {
		let _pro = await Products.findOne({_id:productsId}).select('productsName companyName agentID bossPhoneNumber time').populate('agentID','agentNickname').lean();
		
		let datas = {
			code:200,
			productsName:_pro.productsName,
			companyName:_pro.companyName,
			agentNickname:_pro.agentID.agentNickname,
			bossPhoneNumber:_pro.bossPhoneNumber,
			time:_pro.time,
		}
		
		res.json(datas);
		return;
		
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


module.exports = router;
