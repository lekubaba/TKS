let mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child,Business} = require('../mongoose/modelSchema')
let express = require('express');
let router = express.Router();
let request = require('request');
let fs = require('fs');
let path = require('path');
let logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {WechatMessages} = require('../utils/WechatMessages');

//添加城市经理
router.post('/api/savecityjinli',async function(req,res){
	let agentID = req.body.userid;
	let productsId = req.body.productsId;
	
	try {
		let _child =  await Child.findOne({agentID:agentID,mainPromotionProducts:productsId}).select('openID isVIP isManager managerLevel').populate('agentID','agentNickname').lean();
		
		if(!_child){
			res.json({code:100});
			return;
		}
		if(_child.isVIP == true){
			res.json({code:101});
			return;
		}
		if(_child.isManager == true){
			res.json({code:102});
			return;
		}
		
		if(_child.managerLevel == 1){
			res.json({code:103});
			return;
		}
		let countDown = new Date().getTime()+86400000*30;
		await Child.update({agentID:agentID,mainPromotionProducts:productsId},{'$set':{managerLevel:1,countDown:countDown}});
		let agentName = _child.agentID.agentNickname;
		let level1 = '城市代理';
		let level2 = '城市经理';
		let _openID = _child.openID;
		WechatMessages.TemplateSix(agentName,level1,level2,_openID);
		res.json({code:200});
		return;
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})


module.exports = router;
