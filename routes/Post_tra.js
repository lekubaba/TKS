var mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');

// tra 模式用户提交申请信息
router.post('/api/getcustomerinfo_tra', async function(req,res){
	
	let customerID = req.body.customerID;
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	let customerName = req.body.customerName;
	let customerPhoneNumber = req.body.customerPhoneNumber;
	let customerDesensitizationNumber = customerPhoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
	
	try{
		let _agent = await Agent.findOne({_id:agentID}).lean().populate('mainPromotionProducts');
		let _child = await Child.findOne({agentID:agentID,mainPromotionProducts:productsId}).lean();
		let newOrder = new Order();
		
		newOrder._id = new mongoose.Types.ObjectId;
		newOrder.mode = _agent.mainPromotionProducts.mode;
		newOrder.customerID = customerID;
		newOrder.openID = _agent.openID;
		newOrder.agentID = _agent._id;
		newOrder.superLevel = _agent.superLevel?_agent.superLevel:null;
		newOrder.bigSuperLevel = _agent.bigSuperLevel?_agent.bigSuperLevel:null;
		newOrder.topSuperLevel = _agent.topSuperLevel;
		newOrder.productsId = productsId;
		newOrder.customerName = customerName;
		newOrder.customerPhoneNumber = customerPhoneNumber;
		newOrder.customerDesensitizationNumber = customerDesensitizationNumber;
		newOrder.orderTime = formatDate('yyyy-MM-dd hh:mm:ss');
		newOrder.orderTimeStamp = new Date().getTime();
		newOrder.contacted = false;
		newOrder.signed = false;
		newOrder.issued = false;
		newOrder.level = _child.level;
		newOrder.relation = _child.relation;
		
		newOrder.save(function(err){
			if(err){
				logger.error(err);
				return res.json({code:500});
			}
			
			Customer.update({_id:customerID},{'$set':{
				customerName:customerName,
				customerPhoneNumber:customerPhoneNumber,
				customerDesensitizationNumber:customerDesensitizationNumber,
			}},function(err){
				if(err){
					logger.error(err);
					return res.json({code:500});
				}
				
				return res.json({code:200});
			})
			
		})
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})

// 传统模式下的提醒
router.get('/api/successremind',function(req,res){
	return res.render('successRemind_tra');
})




module.exports = router;
