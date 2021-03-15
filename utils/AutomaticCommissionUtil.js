var mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Ten,Child,Income,Cash} = require('../mongoose/modelSchema');
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('./logger').logger;
let {formatDate} = require('./DateUtil');
let {lastMonth} = require('./DateLastMonth');
let {APPID,SECRET} = require('../config');
let {accMul,totalRate,arrTop,arrSum} = require('./CommonUtil.js');
let {AutomaticSingleBonus} = require('./AutomaticSingleBonus.js');

async function AutomaticCommissionUtil(agentID,productsId){
	
	let userid = mongoose.Types.ObjectId(agentID);
	let proid = mongoose.Types.ObjectId(productsId);
	let _date = lastMonth(formatDate('yyyy-MM-dd'));
	// let _date = '2021-01-';
	
	try {
		
		
		
		let _child = await Child.findOne({agentID:agentID,mainPromotionProducts:productsId})
		.select('isManager isVIP managerLevel mainPromotionProducts level')
		.populate('mainPromotionProducts','salesLadder')
		.lean();
		
		
	
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
			 * return 出去的就是管理佣金；
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
							{ $match : {'orderRelation':{'$regex':agentID},productsId:proid,isManagerCommission:false,inTime:{'$regex':_date}}},
							{$group : {_id:null, total: {$sum:"$howMuch"}}},
					]);
					
		let totalCost = reta[0]?reta[0].total:0;
		
		/**
		 * 第四步：总管理奖金
		 * @通过总佣金-总成本=总管理奖金
		 */
		
		let totalManagerCommission = totalCommission - totalCost;
		
		
		/**
		 * 第五步：自身管理佣金计算 = 总管理奖金-各线路最近的管理者总管理奖金；
		 * 找出最近的管理者思路：
		 * @1，通过isManager = true,找出名下管理层总数，然后批量存储ID，这个数组包括了管理员自身的ID,
		 * @2，通过ID，将每个人自身以及名下的管理层查出来组成一个数组,不包含自己；
		 * @3，通过公式将数组重复出现的都删掉；
		 * @4，最后得到的数组就是最近的管理层；
		 */
		
		/**
		 * 第一步：通过isManager = true,找出名下管理层总数，然后批量存储ID；
		 */
		
		let _childx = await Child.find({relation:{'$regex':agentID},mainPromotionProducts:productsId,isManager:true,level:{'$gt':_child.level}}).select('agentID').lean();
		
		/**
		 * 如果名下管理人数为零，则直接反馈总管理奖金作为自身管理佣金；
		 */
		if(!_childx[0]){
			return totalManagerCommission;
		}
		
		/**
		 * 第二步：通过ID，将每个人自身以及名下的管理层查出来组成一个数组；
		 * @ 顺便将ID提取出来
		 */
		
		let allArr = [];
		for(var i=0;i<_childx.length;i++){
			
			let childa = await Child.find({relation:{'$regex':_childx[i].agentID},mainPromotionProducts:productsId,isManager:true}).select('agentID').lean();
			allArr = allArr.concat(childa);
		}
		/* 提取ID */
		
		let allManagerID = allArr.map(function(item){
			return item.agentID.toString()
		})
		
		/**
		 * 第三步：通过数组匹配，去掉交集的部分；；
		 */
		
		let topManager =  arrTop(allManagerID);
	
		
		let ztotal = 0;
		
		// 计算名下管理全部管理佣金；
		
		for(var i=0;i<topManager.length;i++){
			ztotal += await AutomaticSingleBonus(topManager[i],productsId);
		}
		
		let _myCommission = totalManagerCommission - ztotal;
		
		return _myCommission;
		
		
	}catch(err){
		logger.error(err);
	}


}

module.exports.AutomaticCommissionUtil = AutomaticCommissionUtil;





