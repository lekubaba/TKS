let mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child,Income,Cash} = require('../mongoose/modelSchema');
let express = require('express');
let router = express.Router();
let request = require('request');
let logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {lastMonth} = require('../utils/DateLastMonth.js');
let {WechatMessages} = require('../utils/WechatMessages');
let {accMul,totalRate,arrTop,arrSum} = require('../utils/CommonUtil.js');
let {AutomaticSingleBonus} = require('../utils/AutomaticSingleBonus.js');
let {AutomaticCommissionUtil} = require('../utils/AutomaticCommissionUtil.js');


router.post('/api/batchComputingBonus',async function(req,res){
	let _agentID = req.body.agentID;
	let _productsId = req.body.productsId;
	let _date = formatDate('yyyy-MM-');
	
	try {
		
		/**
		 * 各商户点击按钮一次性将上个月所有管理层的管理佣金自动计算好：
		 * @通过日期匹配，判断是否已经产生了管理佣金，如果产生说明已经计算过了，返回true; 比如是2021-1月，2021-01-；
		 * @通过isManager = 查出所有名下管理层，并将各自的agentID，productsId打包成一个总的数组；
		 * @封装一个A方法，传入ID就能计算单个管理佣金；
		 * @批量计算数组成员的管理佣金，并将管理佣金记录在Income里，暂时只能让商户看到，等审核通过以后再显示给所有管理；
		 */
		
		let bonus = await Income.count({productsId:_productsId,isManagerCommission:true,inTime:{'$regex':_date}});
		// bonus 不为零,则说明已经产生过管理奖金了，无论是有业绩没业绩的，都产生；
		if(bonus){
			res.json({code:100});
			return;
		}
		
		/**
		 * 等于零有两种情况，一种是没有生成
		 */
		
		/**
		 * 查全部管理员，
		 * @假如有10000个管理员，怎么分批处理；
		 * @如果是
		 */
		
		let managers = await Child.find({mainPromotionProducts:_productsId,isManager:true}).select('agentID').lean();
		// 没有管理员
		if(!managers[0]){
			res.json({code:101});
			return;
		}
		
		for(var i=0;i<managers.length;i++){
			
			let z = await AutomaticCommissionUtil(managers[i].agentID.toString(),_productsId)
			let _childs = await Child.findOne({agentID:managers[i].agentID.toString(),mainPromotionProducts:_productsId}).lean();
			
			let incomea = new Income();
			
			incomea._id = new mongoose.Types.ObjectId;
			incomea.relation = _childs.relation;
			incomea.orderRelation = _childs.relation;
			incomea.agentID = _childs.agentID;
			incomea.productsId = _childs.mainPromotionProducts;
			incomea.openID = _childs.openID;
			incomea.level = _childs.level;
			incomea.howMuch = z.toFixed(2);
			incomea.inTime = formatDate('yyyy-MM-dd hh:mm:ss');
			incomea.timeStamp = new Date().getTime();
			incomea.types = lastMonth(formatDate('yyyy-MM-dd hh:mm:ss'))+'月份管理收益';
			incomea.isManagerCommission = true;
			
			await incomea.save();
		}
		
		
		
		
		
		
		res.json({code:200});
		return;
		
		
		
		
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})


/**
 * @商户打开管理佣金生成页面，
 * 查询上个月的管理佣金明细
 */

router.post('/api/getManagerCommissionProfile',async function(req,res){
	let _agentID = req.body.agentID;
	let _productsId = req.body.productsId;
	let _date = formatDate('yyyy-MM-');
	// let _date = '2021-01-'
	
	try {
		let userid = mongoose.Types.ObjectId(_agentID);
		let proid = mongoose.Types.ObjectId(_productsId);
		
		let bonus = await Income.find({productsId:_productsId,isManagerCommission:true,inTime:{'$regex':_date}})
		.select('howMuch isOut inTime')
		.populate('agentID','agentAvatarImg agentName agentNickname agentPhoneNumber')
		.limit(20).skip(0).sort({'howMuch':-1})
		.lean();
		
		// $macth里，id必须要转化，同时$regex必须是字符串形式；
		let result = await Income.aggregate([
							{ $match : {productsId:proid,isManagerCommission:true,inTime:{'$regex':_date}}},
							{$group : {_id:null, total: {$sum:"$howMuch"}}},
					]);
					
		
		res.json({
			code:200,
			bonus:bonus,
			total:result[0]?result[0].total:0,
			});
		return;
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})


/**
 * @下拉加载管理佣金；
 */

router.post('/api/getManagerCommissionProfile_plus',async function(req,res){
	let _agentID = req.body.agentID;
	let _productsId = req.body.productsId;
	let _num = req.body.num; 
	let _date = formatDate('yyyy-MM-');
	// let _date = '2021-01-'
	
	try {
		let userid = mongoose.Types.ObjectId(_agentID);
		let proid = mongoose.Types.ObjectId(_productsId);
		
		let bonus = await Income.find({productsId:_productsId,isManagerCommission:true,inTime:{'$regex':_date}})
		.select('howMuch isOut inTime')
		.populate('agentID','agentAvatarImg agentName agentNickname agentPhoneNumber')
		.limit(20).skip(_num).sort({'howMuch':-1})
		.lean();
		
		// $macth里，id必须要转化，同时$regex必须是字符串形式；
		let result = await Income.aggregate([
							{ $match : {productsId:proid,isManagerCommission:true,inTime:{'$regex':_date}}},
							{$group : {_id:null, total: {$sum:"$howMuch"}}},
					]);
					
		
		res.json({
			code:200,
			bonus:bonus,
			});
		return;
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})


module.exports = router;
