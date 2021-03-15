var mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');

// 到代理页面

router.get('/api/getagentpage/:agentID/:productsId',async function(req,res){
	
	// 需要检测传过来的ID合法性；
	let title = '限时免费代理';
	let agentID = req.params.agentID;
	let productsId = req.params.productsId;
	
	try {
		let isAgent = await Agent.findOne({_id:agentID}).select('openID').lean();
		let isProducts = await Products.findOne({_id:productsId}).select('agentPoster color').lean();
		
		if(!isAgent||!isProducts){
			return res.json({code:600});
		}
		
		let data = {
			title:title,
			Img:isProducts.agentPoster,
			color:isProducts.color,
			agentID:agentID,
			productsId:productsId
		}
		return res.render('getAgentPage',data);
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})

// 到代理注册页面

router.get('/api/rigisteragentpage/:agentID/:productsId',async function(req,res){
	
	// 需要检测传过来的ID合法性；
	let title = '免费代理';
	let agentID = req.params.agentID;
	let productsId = req.params.productsId;
	
	try{
		let isAgent = await Agent.findOne({_id:agentID}).select('openID').lean();
		let isProducts = await Products.findOne({_id:productsId}).select('companyName productsName color').lean();
		
		if(!isAgent||!isProducts){
			return res.json({code:600});
		}
			
		let data = {
			title:title,
			agentID:agentID,
			productsId:productsId,
			color:isProducts.color,
			companyName:isProducts.companyName,
			productsName:isProducts.productsName,
		}
			
		return res.render('registerAgent',data);
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
	
})


// 到推广页面
router.get('/api/getcustomerpage/:agentID/:productsId',async function(req,res){
	
	let agentID = req.params.agentID;
	let productsId = req.params.productsId;
	
	try {
		// 需要检测传过来的ID合法性；
		let _agent = await Agent.findOne({_id:agentID}).lean();
		let _products = await Products.findOne({_id:productsId}).lean();
		
		if(!_agent||!_products){
			return res.json({code:600});
		}
		
		let mode = _products.mode;
		let IMG = _products.promotionPoster;
		
		if(mode=='tra'){			
			let linkData = {
				title:'限时活动',
				Img:IMG,
				color:_products.color,
				agentID:agentID,
				productsId:productsId,
			}
			return res.render('getCustomerPage_tra',linkData);
			
		}else if(mode=='link'){
			
			let linkData = {
				title:'限时申请',
				Img:IMG,
				color:_products.color,
				agentID:agentID,
				productsId:productsId,
				productsLink:_products.productsLink,	
			}
			return res.render('getCustomerPage_link',linkData);
		}else if(mode=='line'){
			let linkData = {
				title:'限时抢购',
				Img:IMG,
				color:_products.color,
				agentID:agentID,
				productsId:productsId,
			}

			return res.render('getCustomerPage_line',linkData);
		}else if(mode=='tongke'){
			let linkData = {
				title:'统客分销系统',
				Img:IMG,
				color:_products.color,
				agentID:agentID,
				productsId:productsId,
			}
			return res.render('getCustomerPage_tongke',linkData);
		}else if(mode=='fictitious'){
			let linkData = {
				title:'限时活动',
				Img:IMG,
				color:_products.color,
				agentID:agentID,
				productsId:productsId,
			}
			return res.render('getCustomerPage_fictitious',linkData);
		}
	
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
			
})

router.get('/api/paypage_line/:agentID/:productsId',async function(req,res){
	
	let agentID = req.params.agentID;
	let productsId = req.params.productsId;
	
	try {
		// 需要检测传过来的ID合法性；
		let _agent = await Agent.findOne({_id:agentID}).lean();
		let _products = await Products.findOne({_id:productsId}).lean();
		
		if(!_agent||!_products){
			return res.json({code:600});
		}
		
		let linkData = {
			title:'收货信息并支付',
			color:_products.color,
			agentID:agentID,
			productsId:productsId,
		}
		
		return res.render('payPage_line',linkData);
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
	
})


router.get('/api/paypage_tongke/:agentID/:productsId',async function(req,res){
	
	let agentID = req.params.agentID;
	let productsId = req.params.productsId;
	
	try {
		// 需要检测传过来的ID合法性；
		let _agent = await Agent.findOne({_id:agentID}).lean();
		let _products = await Products.findOne({_id:productsId}).lean();
		
		if(!_agent||!_products){
			return res.json({code:600});
		}
	
		let linkData = {
			title:'确认并支付',
			color:'#1476FE',
			agentID:agentID,
			productsId:productsId,
		}
		
		return res.render('payPage_tongke',linkData);
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
})


router.get('/api/paypage_fictitious/:agentID/:productsId',async function(req,res){
	
	let agentID = req.params.agentID;
	let productsId = req.params.productsId;
	
	try {
		// 需要检测传过来的ID合法性；
		let _agent = await Agent.findOne({_id:agentID}).lean();
		let _products = await Products.findOne({_id:productsId}).lean();
		
		if(!_agent||!_products){
			return res.json({code:600});
		}
	
		let linkData = {
			title:'填写信息并支付',
			color:_products.color,
			agentID:agentID,
			productsId:productsId,
		}
		
		return res.render('payPage_fictitious',linkData);
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
})


router.get('/api/tkprotocol',function(req,res){
	return res.render('tkProtocol');
})


router.get('/api/followwechat',function(req,res){
	return res.render('followWechat');
})


module.exports = router;
