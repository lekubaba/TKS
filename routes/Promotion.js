var mongoose = require('mongoose');
let {Agent,Customer,Products} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
/*首页*/

router.post('/api/promotion',function(req,res){
		
	let isPromotion = req.body.isPromotion;
	// 代理的openID;
	let openID = req.body.openID;
		
	Agent.findOne({openID:openID},{mainPromotionProducts:1,isVIP:1,isPromotion})
	.lean()
	.populate('mainPromotionProducts','promotionPoster agentPoster isAddLevel')
	.exec(function(err,rets){
		if(err) {
			logger.error(err);
			res.json({code:500});
			return;
		}
		rets.code=200;
		res.json(rets);
		return;
		
	})
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
	

	let openID = req.body.openID;
	try {
		let _agent = await Agent.findOne({openID:openID}).select('openID mainPromotionProducts').populate('mainPromotionProducts','agentQrcodeBackground').lean();
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
	

	let openID = req.body.openID;
	try {
		let _agent = await Agent.findOne({openID:openID}).select('openID mainPromotionProducts').populate('mainPromotionProducts','promotionQrcodeBackground').lean();
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

router.post('/api/getBossInfo',function(req,res){
	let _id = req.body.productsID;
	Products.findOne({_id:_id},{bossPhoneNumber:1,bossWechat:1})
	.lean()
	.exec(function(err,rets){
		if(err) {
			logger.error(err);
			res.json({code:500});
			return;
		}
		let bossInfo = {
			bossPhoneNumber:rets.bossPhoneNumber,
			bossWechat:rets.bossWechat
		}
		return res.json(bossInfo);
	})
})


module.exports = router;
