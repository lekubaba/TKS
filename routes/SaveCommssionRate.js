var mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {WxApiCheck} = require('../utils/WxApiCheck');
let {token} = require('../config');




// 获取城市代理，上级，上上级佣金比率

router.post('/api/toGetAgentExtension',async function(req,res){

	let productsId = req.body.productsId;
	
	try {
		let _pro = await Products.findOne({_id:productsId}).select('agentID agentExtension agentExtensionSuper agentExtensionBigSuper').lean();
		if(!_pro){
			res.json({code:100});
			return;
		}
		let datas = {
			code:200,
			agentExtension:_pro.agentExtension?_pro.agentExtension:'未配置',
			agentExtensionSuper:_pro.agentExtensionSuper?_pro.agentExtensionSuper:'未配置',
			agentExtensionBigSuper:_pro.agentExtensionBigSuper?_pro.agentExtensionBigSuper:'未配置'
		}
		res.json(datas);
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}	
	
})




// 保存城市代理佣金直推比例

router.post('/api/toSaveExtension',async function(req,res){

	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	let extension = req.body.extension;
	
	try {
		let _pro = await Products.findOne({_id:productsId,agentID:agentID}).select('agentID').lean();
		if(!_pro){
			res.json({code:100});
			return;
		}
		
		await Products.update({_id:productsId,agentID:agentID},{'$set':{agentExtension:extension}});
		res.json({code:200});
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}	
	
})

// 保存城市代理直推上级佣金比例

router.post('/api/toSaveSuperExtension',async function(req,res){

	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	let extension = req.body.extension;
	
	try {
		let _pro = await Products.findOne({_id:productsId,agentID:agentID}).select('agentID').lean();
		if(!_pro){
			res.json({code:100});
			return;
		}
		
		await Products.update({_id:productsId,agentID:agentID},{'$set':{agentExtensionSuper:extension}});
		res.json({code:200});
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}	
	
})

// 保存城市代理直推上上级佣金比例

router.post('/api/toSaveBigSuperExtension',async function(req,res){

	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	let extension = req.body.extension;
	
	try {
		let _pro = await Products.findOne({_id:productsId,agentID:agentID}).select('agentID').lean();
		if(!_pro){
			res.json({code:100});
			return;
		}
		
		await Products.update({_id:productsId,agentID:agentID},{'$set':{agentExtensionBigSuper:extension}});
		res.json({code:200});
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}	
	
})


/* 
	1,获取城市经理佣金比例
	2,保存城市经理的
	3,保存上级的
	4,保存上上级的
 */


// 获取城市代理，上级，上上级佣金比率

router.post('/api/toGetManagerExtension',async function(req,res){

	let productsId = req.body.productsId;
	
	try {
		let _pro = await Products.findOne({_id:productsId}).select('agentID managerExtension managerExtensionSuper managerExtensionBigSuper').lean();
		if(!_pro){
			res.json({code:100});
			return;
		}
		let datas = {
			code:200,
			managerExtension:_pro.managerExtension?_pro.managerExtension:'未配置',
			managerExtensionSuper:_pro.managerExtensionSuper?_pro.managerExtensionSuper:'未配置',
			managerExtensionBigSuper:_pro.managerExtensionBigSuper?_pro.managerExtensionBigSuper:'未配置'
		}
		res.json(datas);
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}	
	
})




// 保存城市经理佣金直推比例

router.post('/api/toSaveExtension_leader',async function(req,res){

	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	let extension = req.body.extension;
	
	try {
		let _pro = await Products.findOne({_id:productsId,agentID:agentID}).select('agentID').lean();
		if(!_pro){
			res.json({code:100});
			return;
		}
		
		await Products.update({_id:productsId,agentID:agentID},{'$set':{managerExtension:extension}});
		res.json({code:200});
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}	
	
})


// 保存城市经理直推上级佣金比例

router.post('/api/toSaveSuperExtension_leader',async function(req,res){

	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	let extension = req.body.extension;
	
	try {
		let _pro = await Products.findOne({_id:productsId,agentID:agentID}).select('agentID').lean();
		if(!_pro){
			res.json({code:100});
			return;
		}
		
		await Products.update({_id:productsId,agentID:agentID},{'$set':{managerExtensionSuper:extension}});
		res.json({code:200});
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}	
	
})

// 保存城市经理直推上上级佣金比例

router.post('/api/toSaveBigSuperExtension_leader',async function(req,res){

	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	let extension = req.body.extension;
	
	try {
		let _pro = await Products.findOne({_id:productsId,agentID:agentID}).select('agentID').lean();
		if(!_pro){
			res.json({code:100});
			return;
		}
		
		await Products.update({_id:productsId,agentID:agentID},{'$set':{managerExtensionBigSuper:extension}});
		res.json({code:200});
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}	
	
})



module.exports = router;