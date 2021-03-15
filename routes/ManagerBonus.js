let mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child,Income,Cash} = require('../mongoose/modelSchema')
let express = require('express');
let router = express.Router();
let request = require('request');
let fs = require('fs');
let path = require('path');
let logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {lastMonth} = require('../utils/DateLastMonth');
let {checkOpenID} = require('../utils/CheckID');
let {MNS} = require('../utils/MNS');
let {WechatMessages} = require('../utils/WechatMessages');
let {accMul,totalRate,arrTop,arrSum} = require('../utils/CommonUtil.js');
let {TotalManagerCommissionS} = require('../utils/TotalCommission.js');

/**
 * @accMul 用来将两个数相乘得到稳定精度的值；
 * @totalRate 用来计算差值，佣金比例，总佣金
 * @arrTop 用来将数组重复项全部清理掉；
 */


/* 

	* 计算管理奖金：
	
	 * 自身管理佣金计算思路：
		第一步，总业绩：算出管理层自身+名下所有层级的总放款额；
		第二步，总佣金：根据总放款额查找出管理层对应的佣金比例，得出总佣金；
		第三步：总成本：算出管理层总放款额对应的全部成本，已经发放出去的佣金总和；
		第四步：总管理奖金：通过总佣金-总成本，得出总管理奖金；
		第五步：自身管理奖金：总管理奖金-自身往下每一条支线最近的管理层的总管理奖金；

		寻找各路线最近的管理层思路：

		1，通过isManager = true,找出名下管理层总数，然后批量存储ID；
		2，通过ID，将每个人自身以及名下的管理层查出来组成一个数组；
		3，通过数组匹配，去掉交集的部分；
		4，最后得到的数组就是最近的管理层；
	 * 
	*

	
*/



router.post('/api/counterManagerBonus',async function(req,res){
	
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	
	try {
		
		let userid = mongoose.Types.ObjectId(agentID);
		let proid = mongoose.Types.ObjectId(productsId);
		let _date = formatDate('yyyy-MM-');

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
		
			
			
		/**
		 * result为空的情况为，没有任何申请；
		 * result.total为零，说明有申请，但没有借款；
		 */			
		/* 业绩为零，或result为空时 */
					
		if(!result[0]||result[0].total===0){
			
			let resData = {
				code:200,
				managerLevel:_child.managerLevel,
				salesLadder:_child.mainPromotionProducts.salesLadder,
				myCommission:0,
				curRate:_child.mainPromotionProducts.salesLadder[0].rate,
				totalSalse:0,
				lessMuch:0,
			}
			
			res.json(resData);
			return;
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
					
		let totalCost = reta[0].total;
		
		
		/**
		 * 第四步：总管理奖金
		 * @通过总佣金-总成本=总管理奖金
		 */
		
		let totalManagerCommission = totalCommission - totalCost;
		
		
		
		/**
		 * @判断不是VIP或者
		 * @不是管理员的情况，展示总管理奖金；
		 */
		
		if(!_child.isManager&&!_child.isVIP){
			
			let resData = {
				code:200,
				managerLevel:_child.managerLevel,
				salesLadder:_child.mainPromotionProducts.salesLadder,
				myCommission:totalManagerCommission,
				curRate:_rets.curRate,
				totalSalse:totalSalse,
				lessMuch:_rets.lessMuch,
			}
			
			res.json(resData);
			return;
		}
		
		
		
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
		 * 如果名下管理人数为零，则直接反馈总管理奖金；
		 */
		
		if(!_childx[0]){
			
			let resData = {
				code:200,
				managerLevel:_child.managerLevel,
				salesLadder:_child.mainPromotionProducts.salesLadder,
				myCommission:totalManagerCommission,
				curRate:_rets.curRate,
				totalSalse:totalSalse,
				lessMuch:_rets.lessMuch,
			}
			
			res.json(resData);
			return;
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
		
		/**
		 * async函数返回一个promise实例；
		 * @通过map，将实例组成一个实例数组供Promise.all()消化；
		 */
		
		
		
		let x =  topManager.map(function(item){
			return TotalManagerCommissionS(item,productsId);
		})
		
		
		Promise.all(x).then(function(v){
			let y = arrSum(v);

			let _myCommission = totalManagerCommission - y;
			
			let resData = {
				code:200,
				managerLevel:_child.managerLevel,
				salesLadder:_child.mainPromotionProducts.salesLadder,
				myCommission:_myCommission,
				curRate:_rets.curRate,
				totalSalse:totalSalse,
				lessMuch:_rets.lessMuch,
			}
			
			res.json(resData);
			return;
			
		})
		
		
		
		
		
		
		
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})


module.exports = router;
