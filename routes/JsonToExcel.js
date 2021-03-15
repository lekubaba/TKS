var mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Ten,Income,Cash,Child} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');

router.get('/exportAgentDataProfile/:id1/:id2',async function(req,res){
	let agentID = req.params.id1;
	let productsId = req.params.id2;
	
	var reg = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
	
	if(!agentID||!productsId){
		res.send('ID不能为空');
		return;
	}
	if(!reg.test(agentID)||!reg.test(productsId)){
		res.send('ID格式错误');
		return;
	}
	
	try {
		let agent = await Child.find({relation:{'$regex':agentID},mainPromotionProducts:productsId}).populate('agentID','agentName agentNickname').select('agentID agentWechat time level managerLevel agentNum inviteNum bindNumber sales').lean();
		res.render('jsonToExcel',{datas:agent});
		return;
		
	}catch(err){
		logger.error(err);
		res.send('系统错误');
	}
	
	
})



module.exports = router;
