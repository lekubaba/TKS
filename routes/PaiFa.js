let mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child} = require('../mongoose/modelSchema');
let express = require('express');
let router = express.Router();
let request = require('request');
let fs = require('fs');
let path = require('path');
let logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {checkOpenID} = require('../utils/CheckID');
let {MNS} = require('../utils/MNS');



router.post('/api/getPaiFaNumber',async function(req,res){
	
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	try {
		let userid = mongoose.Types.ObjectId(agentID);
		let proid = mongoose.Types.ObjectId(productsId);
		let _child = await Child.findOne({agentID:agentID,mainPromotionProducts:productsId}).select('isVIP isManager managerLevel activityNumber').lean();
		if(!_child.isVIP&&!_child.isManager){
			_children = await Child.find({superLevel:agentID,mainPromotionProducts:productsId,bindNumber:{'$gte':1}})
						.limit(20).skip(0).sort({"_id":-1})
						.select('activityNumber time sales bindNumber agentNum inviteNum work')
						.populate('agentID','agentNickname agentDesensitizationNumber agentAvatarImg')
						.lean();
			// $macth里，id必须要转化，同时$regex必须是字符串形式；
			let result = await Child.aggregate([
						{ $match : {superLevel:userid,mainPromotionProducts:proid,bindNumber:{'$gte':1}}},
						{$group : {_id:null, total: {$sum:"$bindNumber"},count:{$sum:"$inviteNum"}}},
				]);
						
			let resData = {
				code:200,
				activityNumber:result[0]?result[0].total:0,
				inviteNum:result[0]?result[0].count:0,
				children:_children,
			}
			res.json(resData);
			return;
		}else{
			_children = await Child.find({relation:{'$regex':agentID},mainPromotionProducts:productsId,bindNumber:{'$gte':1}})
						.limit(20).skip(0).sort({"_id":-1})
						.select('activityNumber time sales bindNumber agentNum inviteNum work')
						.populate('agentID','agentNickname agentDesensitizationNumber agentAvatarImg')
						.lean();
			// $macth里，id必须要转化，同时$regex必须是字符串形式；
			let result = await Child.aggregate([
						{ $match : {'relation':{'$regex':agentID},mainPromotionProducts:proid,bindNumber:{'$gte':1}}},
						{$group : {_id:null, total: {$sum:"$bindNumber"},count:{$sum:"$inviteNum"}}},
				]);
			
			let resData = {
				code:200,
				activityNumber:result[0]?result[0].total:0,
				inviteNum:result[0]?result[0].count:0,
				children:_children,
			}
			res.json(resData);
			return;
			
			
		}
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})

router.post('/api/getPaiFaNumbers',async function(req,res){
	
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	let num = req.body.num;
	try {
		let _child = await Child.findOne({agentID:agentID,mainPromotionProducts:productsId}).select('isVIP isManager managerLevel activityNumber').lean();
		if(!_child.isVIP&&!_child.isManager){
			_children = await Child.find({superLevel:agentID,mainPromotionProducts:productsId,bindNumber:{'$gte':1}})
						.limit(20).skip(num).sort({"_id":-1})
						.select('activityNumber bindNumber time sales agentNum inviteNum work')
						.populate('agentID','agentNickname agentDesensitizationNumber agentAvatarImg')
						.lean();
			let resData = {
				code:200,
				children:_children,
			}
			res.json(resData);
			return;
		}else{
			_children = await Child.find({relation:{'$regex':agentID},mainPromotionProducts:productsId,bindNumber:{'$gte':1}})
						.limit(20).skip(num).sort({"_id":-1})
						.select('activityNumber bindNumber time sales agentNum inviteNum work')
						.populate('agentID','agentNickname agentDesensitizationNumber agentAvatarImg')
						.lean();

			
			let resData = {
				code:200,
				children:_children,
			}
			res.json(resData);
			return;
			
			
		}
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})


module.exports = router;
