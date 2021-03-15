var mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Ten,Child,Income,Cash} = require('../mongoose/modelSchema');
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {APPID,SECRET} = require('../config');
let {accMul,totalRate,arrTop} = require('./CommonUtil.js');


/**
 * @计算单个的总管理奖金；
 */

async function TotalManagerCommissionS(agentID,productsId){


	let userid = mongoose.Types.ObjectId(agentID);
	let proid = mongoose.Types.ObjectId(productsId);
	let _date = formatDate('yyyy-MM-');
	
	try {
		
		let _child = await Child.findOne({agentID:agentID,mainPromotionProducts:productsId})
		.select('isManager isVIP managerLevel mainPromotionProducts level')
		.populate('mainPromotionProducts','salesLadder')
		.lean();
		
		
		/**
		 *  @是独家商户或总监 
		 */
		
		
		/* 第一步，算出总业绩 */
		
		// $macth里，id必须要转化，同时$regex必须是字符串形式；
		let result = await Order.aggregate([
							{ $match : {'relation':{'$regex':agentID},productsId:proid,successTime:{'$regex':_date}}},
							{$group : {_id:null, total: {$sum:"$orderMoney"}}},
					]);
		
		//如果还没产生任何业绩	
		if(!result[0]||result[0].total===0){
			
			/**
			 * @如果直接return,顶层的async函数反馈的promise对象一直处在pending状态；
			 */
			
			return 0;
			
		
		}
		
		/**
		 * @有业绩，则为总业绩
		 * 第一步，总业绩：算出管理层自身+名下所有层级的总放款额；
		*/
		
		let totalSalse = result[0].total;  //总业绩；
		
		
		/**
		 * 第二步，总佣金：根据总放款额查找出管理层对应的佣金比例，得出总佣金；
		 * @总佣金
		 * @佣金比率
		 * @与下一阶梯业绩差值
		 * */
		
		
		let _rets = totalRate(totalSalse,_child.mainPromotionProducts.salesLadder);
		
		let totalCommission = _rets.totalCommission;
		
		/**
		 * 第三步：计算总成本
		 * @$macth里，id必须要转化，同时$regex必须是字符串形式；
		 */
		
		let reta = await Income.aggregate([
							{ $match : {'orderRelation':{'$regex':agentID},productsId:proid,inTime:{'$regex':_date},isManagerCommission:false}},
							{$group : {_id:null, total: {$sum:"$howMuch"}}},
					]);
					
		let totalCost = reta[0]?reta[0].total:0;
		
		/**
		 * 第四步：总管理奖金
		 * @通过总佣金-总成本=总管理奖金
		 */
		
		let totalManagerCommission = totalCommission - totalCost;
		
		return totalManagerCommission;
		
		
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}


}

module.exports.TotalManagerCommissionS = TotalManagerCommissionS;





