let mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child,Business} = require('../mongoose/modelSchema')
let express = require('express');
let router = express.Router();
let request = require('request');
let fs = require('fs');
let path = require('path');
let logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');


router.get('/tongkebusiness',function(req,res){
	res.render('business');
})

router.post('/api/tongkebusiness_add',async function(req,res){
	
	let _businessID = req.body.businessID;
	let _memberID = req.body.memberID;
	try{
		let _agent1 = await Agent.findOne({_id:_businessID}).select('isMember isBusiness').lean();
		let _agent2 = await Agent.findOne({_id:_memberID}).select('agentNickname isMember isBusiness').lean();
		
		if(!_agent1||!_agent2){
			res.json({code:100});
			return;
		}
		if(!_agent2.isMember){
			res.json({code:101});
			return;
		}
		
		let _count = await Business.count({memberID:_memberID});
		if(_count>=30){
			res.json({code:102});
			return;
		}
		let _pro = await Products.findOne({agentID:_businessID}).select('agentID').lean();
		
		if(_pro||_agent1.isBusiness){
			res.json({code:103});
			return;
		}
		
		
		let business = new Business();
		business._id = new mongoose.Types.ObjectId;
		business.businessID = _businessID;
		business.memberID = _memberID;
		business.memberName = _agent2.agentNickname;
		business.time = formatDate('yyyy-MM-dd hh:mm:ss');
		
		await Agent.update({_id:_businessID},{isBusiness:true});
		await business.save();
		
		res.json({code:200});
		return;
		
		
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
	
})


// 增加绑定数量

router.get('/api/toaddbindnumber',function(req,res){
	res.render('addBindNumber');
})

router.post('/api/tongkeaddmaxbind_add',async function(req,res){
	
	let _maxBind = Number(req.body.maxBind);
	let agentID = req.body.agentID;
	try {
		
		let _child = await Child.findOne({agentID:agentID}).lean();
		
		if(!_child){
			res.json({code:100});
			return;
		}
		
		let maxBind_ = _child.maxBind;
		let allMaxBind = _maxBind +maxBind_;
		
		if(allMaxBind>3000){
			let spaceBind = 3000 - maxBind_;
			res.json({code:101,spaceBind:spaceBind});
			return;
		}
		
		await Child.update({agentID:agentID},{'$set':{isBind:false},'$inc':{'maxBind':_maxBind}},{multi:true});
		res.json({code:200});
		return;
		
		
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})


module.exports = router;
