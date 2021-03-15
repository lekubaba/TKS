let mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child} = require('../mongoose/modelSchema')
let express = require('express');
let router = express.Router();
let request = require('request');
let fs = require('fs');
let path = require('path');
let logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {checkOpenID} = require('../utils/CheckID');
let {MNS} = require('../utils/MNS');



router.post('/api/findSuperFunction',async function(req,res){
	
	let tel = req.body.tel; //代理手机号或微信号；
	let _id = req.body.productsId;//产品ID;
	
	try {
		
		let _child = await Child.findOne({agentWechat:tel,mainPromotionProducts:_id}).select('agentID relation').lean();
		
		//无此用户；
		if(!_child){
			res.json({code:100});
			return;
		}
		
		let _relation = _child.relation;
		
		let arrRe = _relation.split('/')
		arrRe.shift();
		
		let _children = await Child.find({mainPromotionProducts:_id,agentID:{'$in':arrRe}})
		.sort({"level":-1})
		.select('level managerLevel time sales')
		.populate('agentID','agentNickname agentAvatarImg agentCity agentWechat')
		.lean();
		
		let resData = {
			code:200,
			userList:_children,
		}
		
		
		res.json(resData);
		
		
		
		
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
	
})


module.exports = router;
