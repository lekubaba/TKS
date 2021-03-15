var mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child,Income,Cash} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
let {getKey} = require('../utils/CommonUtil');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let qiniu = require('qiniu');
let {WechatMessages} = require('../utils/WechatMessages');


router.post('/api/openThirdLevel',function(req,res){
	let agentID = req.body.agentID;
	Products.update({agentID:agentID},{$set:{isAddLevel:true,isLevel:true}},function(err){
		if(err){
			logger.error(err);
			res.json({code:500});
			return;
		}
		res.json({code:200});
	})
})

router.post('/api/islevel',async function(req,res){
	let agentID = req.body.agentID;
	try {
		let _islevel = await  Products.findOne({agentID:agentID}).select('isAddLevel').lean();
		if(_islevel.isAddLevel===true){
			res.json({code:100})
		}else{
			res.json({code:200})
		}
	}catch(err){
		logger.error(err);
		res.json({code:500});
		return;
	}
	
})

router.post('/api/saveColorToDatabase',function(req,res){
	let agentID = req.body.agentID;
	let color = req.body.color;
	Products.update({agentID:agentID},{$set:{color:color,isColor:true}},function(err){
		if(err){
			logger.error(err);
			res.json({code:500});
			return;
		}
		res.json({code:200});
	})
})

// 实名认证
router.post('/api/saveVerificationImformation',async function(req,res){
	let agentID = req.body.agentID;
	let agentName = req.body.agentName;
	let idCard = req.body.idCard;
	let agentWechat = req.body.agentWechat;
	let companyName = req.body.companyName;
	let productsName = req.body.productsName;
	let agentDesensitizationNumber = agentWechat.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
	try{
		await Agent.update({_id:agentID},{$set:{agentName:agentName,idCard:idCard,agentWechat:agentWechat,agentPhoneNumber:agentWechat,agentDesensitizationNumber:agentDesensitizationNumber}});
		await Products.update({agentID:agentID},{$set:{isAuth:true,companyName:companyName,productsName:productsName,bossPhoneNumber:agentWechat,bossWechat:agentWechat}});
		res.json({code:200});
		return;
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})

router.post('/api/saveAddress',function(req,res){
	res.send('hello:saveAddress');
})

router.post('/api/getlink',async function(req,res){
	let agentID = req.body.agentID;
	try {
		let _link = await Products.findOne({agentID:agentID}).select('productsLink').lean();
		let data = {
			code:200,
			productsLink:_link.productsLink,
		}
		res.json(data);
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
})


router.post('/api/savelink',function(req,res){
	let agentID = req.body.agentID;
	let productsLink = req.body.productsLink;
	Products.update({agentID:agentID},{$set:{productsLink:productsLink,isLink:true}},function(err){
		if(err){
			logger.error(err);
			return res.json({code:500});
		}
		
		res.json({code:200});
		
	})
	
	
})

// 客户端上传了推广二维码背景图

router.post('/api/savepromotionqrcode',async function(req,res){
	let agentID = req.body.agentID;
	let url = req.body.url;
	
	try {
		let _pro = await Products.findOne({agentID:agentID}).select('promotionQrcodeBackground isPromotionQr').lean();
		
		if(url==_pro.promotionQrcodeBackground){
			res.json({code:200});
			return;
		}
		if(!_pro.isPromotionQr){
			await Products.update({agentID:agentID},{$set:{promotionQrcodeBackground:url,isPromotionQr:true}});
			res.json({code:200});
		}else{
			await Products.update({agentID:agentID},{$set:{promotionQrcodeBackground:url}});
			res.json({code:200});
		}
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
})

// 客户端上传了招商二维码背景图

router.post('/api/saveagentqrcode',async function(req,res){
	let agentID = req.body.agentID;
	let url = req.body.url;
	let _pro = await Products.findOne({agentID:agentID}).select('agentQrcodeBackground isAgentQr').lean();
	
	if(url==_pro.agentQrcodeBackground){
		res.json({code:200});
		return;
	}
	if(!_pro.isAgentQr){
		
		Products.update({agentID:agentID},{$set:{agentQrcodeBackground:url,isAgentQr:true}},function(err){
			if(err){
				logger.error(err);
				return res.json({code:500});
			}
			
			res.json({code:200});
			
		})
	}else{
		
		Products.update({agentID:agentID},{$set:{agentQrcodeBackground:url}},function(err){
			if(err){
				logger.error(err);
				return res.json({code:500});
			}
			
			res.json({code:200});
			
		})
	}
})

// 客户端上传了推广正文

router.post('/api/savepromotionposter',async function(req,res){
	let agentID = req.body.agentID;
	let url = req.body.url;
	Products.update({agentID:agentID},{$push:{prePromotionPoster:url}},function(err){
		if(err){
			logger.error(err);
			return res.json({code:500});
		}
		res.json({code:200});
	})
})

// 将预备推广正文用于正式推广

router.post('/api/changeprepromotionposter',async function(req,res){
	let agentID = req.body.agentID;
	let _pre = await Products.findOne({agentID:agentID}).select('prePromotionPoster').lean();
	if(_pre.prePromotionPoster.length==0){
		return res.json({code:300});
	}
	Products.update({agentID:agentID},{$set:{promotionPoster:_pre.prePromotionPoster,isPromotionTxt:true}},function(err){
		if(err){
			logger.error(err);
			return res.json({code:500});
		}
		res.json({code:200});
	})
})


// 客户端上传了招商正文

router.post('/api/saveagentposter',async function(req,res){
	let agentID = req.body.agentID;
	let url = req.body.url;
	try {
		await Products.update({agentID:agentID},{$push:{preAgentPoster:url}});
		res.json({code:200});
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
})

// 将预备招商正文用于正式招商

router.post('/api/changepreagentposter',async function(req,res){
	let agentID = req.body.agentID;
	try {
		let _pre = await Products.findOne({agentID:agentID}).select('preAgentPoster').lean();
		if(_pre.preAgentPoster.length==0){
			return res.json({code:300});
		}
		await Products.update({agentID:agentID},{$set:{agentPoster:_pre.preAgentPoster,isAgentTxt:true}});
		res.json({code:200});
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
})

// 客户端上传了佣金关于规则正文海报

router.post('/api/saveregularposter',async function(req,res){
	let agentID = req.body.agentID;
	let url = req.body.url;
	Products.update({agentID:agentID},{$push:{preRegularPoster:url}},function(err){
		if(err){
			logger.error(err);
			return res.json({code:500});
		}
		res.json({code:200});
	})
})

// 将预备招佣金文用于正式佣金正文

router.post('/api/changepreregularposter',async function(req,res){
	let agentID = req.body.agentID;
	let _pre = await Products.findOne({agentID:agentID}).select('preRegularPoster').lean();
	if(_pre.preRegularPoster.length==0){
		return res.json({code:300});
	}
	Products.update({agentID:agentID},{$set:{regularPoster:_pre.preRegularPoster,isRegular:true}},function(err){
		if(err){
			logger.error(err);
			return res.json({code:500});
		}
		res.json({code:200});
	})
})


//设置管理员
router.post('/api/savemanager',async function(req,res){
	let agentID = req.body.userid;
	let productsId = req.body.productsId;
	
	try {
		let _child =  await Child.findOne({agentID:agentID,mainPromotionProducts:productsId}).select('openID isVIP isManager').populate('agentID','agentNickname').lean();
		
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
		let countDown = new Date().getTime()+86400000*60;
		await Child.update({agentID:agentID,mainPromotionProducts:productsId},{'$set':{isManager:true,managerLevel:2,countDown:countDown}});
		
		let agentName = _child.agentID.agentNickname;
		let level1 = '代理';
		let level2 = '城市总监';
		let _openID = _child.openID;
		WechatMessages.TemplateSix(agentName,level1,level2,_openID);
		
		res.json({code:200});
		return;
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})


//获取提现数据用来审核
router.post('/api/getCashProfile',async function(req,res){
	
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	let pathCode = req.body.pathCode;
	
	try {
		
		let isFa = pathCode===100?false:true;
		
		let _cash = await Cash.find({productsId:productsId,isFa:isFa})
		.limit(20).skip(0).sort({"_id":-1})
		.populate('agentID','agentName agentAvatarImg agentNickname agentAlipay')
		.lean();
		
		res.json({code:200,cashs:_cash});
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})


//下拉刷新获取提现数据用来审核
router.post('/api/getCashProfiles',async function(req,res){
	let agentID = req.body.agentID;
	let productsId = req.body.productsId;
	let pathCode = req.body.pathCode;
	let _num = req.body.num;
	
	try {
		
		let isFa = pathCode===100?false:true;
		
		let _cash = await Cash.find({productsId:productsId,isFa:isFa})
		.limit(20).skip(_num).sort({"_id":-1})
		.populate('agentID','agentName agentAvatarImg agentNickname agentAlipay')
		.lean();
		
		res.json({code:200,cashs:_cash});
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})


/* 通过CashID获取到某一笔提现包含的所有记录 */

router.post('/api/getIncomeByCashID', async function(req,res){
	let _cashID = req.body.cashID;
	try{
		let _incomes = await Income.find({cashID:_cashID})
		.limit(20).skip(0).sort({"_id":-1})
		.select('types howMuch inTime orderID')
		.populate({path:'orderID',select:'agentID',populate:{path:'agentID',select:'agentNickname'}}).lean();
		res.json({code:200,data:_incomes});
	}catch(err){
		logger.error(err);
		res.json({code:500});
	}
})

/* 下拉加载通过CashID获取到某一笔提现包含的所有记录 */

router.post('/api/getIncomeByCashIDs', async function(req,res){
	let _cashID = req.body.cashID;
	let _num = req.body.num;
	try{
		let _incomes = await Income.find({cashID:_cashID})
		.limit(20).skip(_num).sort({"_id":-1})
		.select('types howMuch inTime orderID')
		.populate({path:'orderID',select:'agentID',populate:{path:'agentID',select:'agentNickname'}}).lean();
		res.json({code:200,data:_incomes});
	}catch(err){
		logger.error(err);
		res.json({code:500});
	}
})

/* 结算完毕,保存记录 */
router.post('/api/saveSettlementRecord', async function(req,res){
	let _cashID = req.body.cashID;
	try{
		await Cash.update({_id:_cashID},{'$set':{isFa:true}});
		res.json({code:200});
	}catch(err){
		logger.error(err);
		res.json({code:500});
	}
})





module.exports = router;
