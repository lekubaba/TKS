let mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child,Box,Dui,Income} = require('../mongoose/modelSchema');
let express = require('express');
let router = express.Router();
let request = require('request');
let fs = require('fs');
let path = require('path');
let logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {checkOpenID} = require('../utils/CheckID');
let {MNS} = require('../utils/MNS');
let {Probability} = require('../utils/HeiHe.js');
let {WechatMessages} = require('../utils/WechatMessages');



/* 打开黑盒首页 */
router.post('/api/heihe',async function(req,res){
	
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	try {
		
		let child_ = await Child.findOne({agentID:agentID,mainPromotionProducts:productsId}).select('fenNum').lean();
		let data = {
			fenNum:child_.fenNum,
			code:200,
		}
		return res.json(data);
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})


/* 兑换黑盒 */
router.post('/api/duihuan',async function(req,res){
	
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	try {
		
		let child_ = await Child.findOne({agentID:agentID,mainPromotionProducts:productsId}).select('fenNum').lean();
		
		let duiNum = Math.floor(child_.fenNum/1000);
		let fenx = duiNum*1000;
		let fenNum = child_.fenNum - fenx;
		
		await Child.update({agentID:agentID,mainPromotionProducts:productsId},{'$inc':{'heNum':duiNum,'fenNum':-fenx}});
		
		/* 保存兑换记录 */
		let dui = new Dui();
		dui._id = new mongoose.Types.ObjectId;
		dui.agentID = agentID;
		dui.productsId = productsId;
		dui.duiNum = duiNum;
		dui.fenNum = fenx;
		dui.time = formatDate('yyyy-MM-dd hh:mm:ss');
		dui.timeStamp = new Date().getTime();
		
		await dui.save();
		
		return res.json({code:200,fenNum:fenNum});
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})

/* 打开开黑盒页面，获取剩余黑盒数量 */
router.post('/api/kaihe',async function(req,res){
	
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	try {
		
		let child_ = await Child.findOne({agentID:agentID,mainPromotionProducts:productsId}).select('heNum').lean();
		let data = {
			heNum:child_.heNum,
			code:200,
		}
		return res.json(data);
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})


/* 用户点击开黑盒，获得宝箱 */
router.post('/api/getbao',async function(req,res){
	
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	try {
		let _date = formatDate('yyyy-MM-');
		let _timeStamp = new Date().getTime() - 86400000*60;
		let child = await Child.findOne({agentID:agentID,mainPromotionProducts:productsId}).select('agentWechat heNum').lean();
		
		if(child.heNum===0){
			res.json({code:100});
			return;
		}
		//查看本月是否有直推佣金
		let income = await Income.findOne({agentID:agentID,productsId:productsId,types:{'$regex':'直推'},inTime:{'$regex':_date}}).select('howMuch').lean();
		//查看60天内是否有手机宝箱或金牛钥匙；
		let phone = await Box.findOne({agentID:agentID,productsId:productsId,boxName:'手机宝箱',timeStamp:{'$gt':_timeStamp}}).select('boxName').lean();
		let key = await Box.findOne({agentID:agentID,productsId:productsId,boxName:'金牛钥匙',timeStamp:{'$gt':_timeStamp}}).select('boxName').lean();
		
		let box = new Box();
		box._id = new mongoose.Types.ObjectId;
		box.agentID = agentID;
		box.productsId = productsId;
		box.time = formatDate('yyyy-MM-dd hh:mm:ss');
		box.timeStamp = new Date().getTime();
		
		/* one */
		if(!income&&!phone&&!key){
			/* 当用户还没中手机宝箱和金牛钥匙的时候且当月直推佣金为零时 */
			let bar = Probability.one();
			box.num = bar.num;
			box.boxName = bar.boxName;
			box.boxPro = bar.boxPro;
			box.isNeed = bar.isNeed;
			
		}
		/* two */
		if(income&&!phone&&!key){
			/* 当用户还没中手机宝箱和金牛钥匙的时候且当月直推佣金不为零时 */
			let bar = Probability.two();
			box.num = bar.num;
			box.boxName = bar.boxName;
			box.boxPro = bar.boxPro;
			box.isNeed = bar.isNeed;
		}
		/* three */
		if(!income&&phone&&!key){
			/* 当用户中了手机没中金牛且直推佣金为零时 */
			let bar = Probability.three();
			box.num = bar.num;
			box.boxName = bar.boxName;
			box.boxPro = bar.boxPro;
			box.isNeed = bar.isNeed;
		}
		/* four */
		if(income&&phone&&!key){
			/* 当用户中了手机没中金牛且直推佣金不为零时 */
			let bar = Probability.four();
			box.num = bar.num;
			box.boxName = bar.boxName;
			box.boxPro = bar.boxPro;
			box.isNeed = bar.isNeed;
		}
		/* five */
		if(!income&&!phone&&key){
			/* 当用户中了金牛没中手机且直推佣金为零时 */
			let bar = Probability.five();
			box.num = bar.num;
			box.boxName = bar.boxName;
			box.boxPro = bar.boxPro;
			box.isNeed = bar.isNeed;
		}
		
		/* six */
		
		if(income&&!phone&&key){
			/* 当用户中了金牛没中手机且直推佣金不为零时 */
			let bar = Probability.six();
			box.num = bar.num;
			box.boxName = bar.boxName;
			box.boxPro = bar.boxPro;
			box.isNeed = bar.isNeed;
		}
		
		await box.save();
		await Child.update({agentID:agentID,mainPromotionProducts:productsId},{'$inc':{heNum:-1}});
		
		
		let data = {
			code:200,
			agentWechat:child.agentWechat?child.agentWechat:'您自己',
			heNum:child.heNum - 1,
			boxName:box.boxName,
		}
		return res.json(data);
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})



/* 开宝箱的记录加载*/
router.post('/api/kaibaojilu',async function(req,res){
	
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	try {
		let _timeStamp = new Date().getTime() - 86400000*60;
		let box = await Box.find({agentID:agentID,isShow:true,productsId:productsId,timeStamp:{'$gt':_timeStamp}}).limit(20).skip(0).sort({isOpen:1}).lean();
		
		res.json({code:200,box:box});
		return;
		
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})

/* 开宝箱的记录下拉加载*/
router.post('/api/kaibaojiluplus',async function(req,res){
	
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	let num = req.body.num;
	try {
		let _timeStamp = new Date().getTime() - 86400000*60;
		let box = await Box.find({agentID:agentID,isShow:true,productsId:productsId,timeStamp:{'$gt':_timeStamp}}).limit(20).skip(num).sort({isOpen:1}).lean();
		
		res.json({code:200,box:box});
		return;
		
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})


/* 开宝箱获取宝贝*/
router.post('/api/getbaobei',async function(req,res){
	
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	let id = req.body.id;
	let times = formatDate('yyyy-MM-dd hh:mm:ss');
	
	try {
		
		let box = await Box.findOne({_id:id}).select('_id num isOpen').lean();
		let child = await Child.findOne({agentID:agentID,mainPromotionProducts:productsId}).select('relation openID level').lean();
		
		/* 如果通过id没有查到相关或者盒子已经打开过了 */
		
		if(!box||box.isOpen){
			return res.json({code:500});
		}
		
		/* 如果是红包 */
		
		if(box.num===10004){
			
			let bar = Probability.seven();
			let income = new Income();
			income._id = new mongoose.Types.ObjectId;
			income.relation = child.relation;
			income.orderRelation = 'not';
			income.agentID = agentID;
			income.productsId = productsId;
			income.openID = child.openID;
			income.orderID ='5fe492441e06beb1f00d1d8e';
			income.level = child.level;
			income.howMuch = bar;
			income.inTime = formatDate('yyyy-MM-dd hh:mm:ss');
			income.timeStamp = new Date().getTime();
			income.types = '黑盒红包';
			income.isBao = true; //新域
			await income.save();
			await Box.update({_id:id},{'$set':{baoName:bar+'元红包',isOpen:1,opentime:times,isShow:false}});
			await WechatMessages.TemplateSeven('黑盒红包',bar,child.openID);
			res.json({code:200,baoName:bar+'元红包'});
			return;
			
		}
		
		/* 积分 */
		if(box.num===10006){
			let bar = Probability.eight();
			await Box.update({_id:id},{'$set':{baoName:bar+'积分',isOpen:1,opentime:times,isShow:false}});
			await Child.update({agentID:agentID,mainPromotionProducts:productsId},{'$inc':{fenNum:bar}});
			res.json({code:200,baoName:bar+'积分'});
			return;
		}
		
		/* 旅游 */
		if(box.num===10002){
			let bar = Probability.nine();
			await Box.update({_id:id},{'$set':{baoName:'张家界'+bar+'折游',isOpen:1,opentime:times}});
			res.json({code:200,baoName:'张家界'+bar+'折游'});
			return;
		}
		
		
		return res.json({code:200});
		
		
		
		
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})




module.exports = router;
