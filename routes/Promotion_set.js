var mongoose = require('mongoose');
var mongoose = require('mongoose');
let {Agent,Customer,Products,Order} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
let {getKey} = require('../utils/CommonUtil');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let qiniu = require('qiniu');


router.post('/api/openThirdLevel',function(req,res){
	let openID = req.body.openID;
	Products.update({openID:openID},{$set:{isAddLevel:true,isLevel:true}},function(err){
		if(err){
			logger.error(err);
			res.json({code:500});
			return;
		}
		res.json({code:200});
	})
})

router.post('/api/islevel',async function(req,res){
	let openID = req.body.openID;
	try {
		let _islevel = await  Products.findOne({openID:openID}).select('isAddLevel').lean();
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
	let openID = req.body.openID;
	let color = req.body.color;
	Products.update({openID:openID},{$set:{color:color,isColor:true}},function(err){
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
	let openID = req.body.openID;
	let agentName = req.body.agentName;
	let idCard = req.body.idCard;
	let agentWechat = req.body.agentWechat;
	let companyName = req.body.companyName;
	let productsName = req.body.productsName;
	let agentDesensitizationNumber = agentWechat.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
	try{
		await Agent.update({openID:openID},{$set:{agentName:agentName,idCard:idCard,agentWechat:agentWechat,agentPhoneNumber:agentWechat,agentDesensitizationNumber:agentDesensitizationNumber}});
		await Products.update({openID:openID},{$set:{isAuth:true,companyName:companyName,productsName:productsName,bossPhoneNumber:agentWechat,bossWechat:agentWechat}});
		res.json({code:200});
		return;
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})

router.post('/api/saveAddress',function(req,res){
	console.log(req.body);
	res.send('hello:saveAddress');
})

router.post('/api/getlink',async function(req,res){
	let openID = req.body.openID;
	try {
		let _link = await Products.findOne({openID:openID}).select('productsLink').lean();
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
	let openID = req.body.openID;
	let productsLink = req.body.productsLink;
	Products.update({openID:openID},{$set:{productsLink:productsLink,isLink:true}},function(err){
		if(err){
			logger.error(err);
			return res.json({code:500});
		}
		
		res.json({code:200});
		
	})
	
	
})

// 客户端上传了推广二维码背景图

router.post('/api/savepromotionqrcode',async function(req,res){
	let openID = req.body.openID;
	let url = req.body.url;
	let _pro = await Products.findOne({openID:openID}).select('promotionQrcodeBackground isPromotionQr').lean();
	
	if(url==_pro.promotionQrcodeBackground){
		res.json({code:200});
		return;
	}
	if(!_pro.isPromotionQr){
		Products.update({openID:openID},{$set:{promotionQrcodeBackground:url,isPromotionQr:true}},function(err){
			if(err){
				logger.error(err);
				return res.json({code:500});
			}
			
			res.json({code:200});
			
		})
	}else{
		Products.update({openID:openID},{$set:{promotionQrcodeBackground:url}},function(err){
			if(err){
				logger.error(err);
				return res.json({code:500});
			}
			
			res.json({code:200});
			
		})
	}
})

// 客户端上传了招商二维码背景图

router.post('/api/saveagentqrcode',async function(req,res){
	let openID = req.body.openID;
	let url = req.body.url;
	let _pro = await Products.findOne({openID:openID}).select('agentQrcodeBackground isAgentQr').lean();
	
	if(url==_pro.agentQrcodeBackground){
		res.json({code:200});
		return;
	}
	if(!_pro.isAgentQr){
		
		Products.update({openID:openID},{$set:{agentQrcodeBackground:url,isAgentQr:true}},function(err){
			if(err){
				logger.error(err);
				return res.json({code:500});
			}
			
			res.json({code:200});
			
		})
	}else{
		
		Products.update({openID:openID},{$set:{agentQrcodeBackground:url}},function(err){
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
	let openID = req.body.openID;
	let url = req.body.url;
	Products.update({openID:openID},{$push:{prePromotionPoster:url}},function(err){
		if(err){
			logger.error(err);
			return res.json({code:500});
		}
		res.json({code:200});
	})
})

// 将预备推广正文用于正式推广

router.post('/api/changeprepromotionposter',async function(req,res){
	let openID = req.body.openID;
	let _pre = await Products.findOne({openID:openID}).select('prePromotionPoster').lean();
	if(_pre.prePromotionPoster.length==0){
		return res.json({code:300});
	}
	Products.update({openID:openID},{$set:{promotionPoster:_pre.prePromotionPoster,isPromotionTxt:true}},function(err){
		if(err){
			logger.error(err);
			return res.json({code:500});
		}
		res.json({code:200});
	})
})


// 客户端上传了招商正文

router.post('/api/saveagentposter',async function(req,res){
	let openID = req.body.openID;
	let url = req.body.url;
	Products.update({openID:openID},{$push:{preAgentPoster:url}},function(err){
		if(err){
			logger.error(err);
			return res.json({code:500});
		}
		res.json({code:200});
	})
})

// 将预备招商正文用于正式招商

router.post('/api/changepreagentposter',async function(req,res){
	let openID = req.body.openID;
	let _pre = await Products.findOne({openID:openID}).select('preAgentPoster').lean();
	if(_pre.preAgentPoster.length==0){
		return res.json({code:300});
	}
	Products.update({openID:openID},{$set:{agentPoster:_pre.preAgentPoster,isAgentTxt:true}},function(err){
		if(err){
			logger.error(err);
			return res.json({code:500});
		}
		res.json({code:200});
	})
})

// 客户端上传了佣金关于规则正文海报

router.post('/api/saveregularposter',async function(req,res){
	let openID = req.body.openID;
	let url = req.body.url;
	Products.update({openID:openID},{$push:{preRegularPoster:url}},function(err){
		if(err){
			logger.error(err);
			return res.json({code:500});
		}
		res.json({code:200});
	})
})

// 将预备招佣金文用于正式佣金正文

router.post('/api/changepreregularposter',async function(req,res){
	let openID = req.body.openID;
	let _pre = await Products.findOne({openID:openID}).select('preRegularPoster').lean();
	if(_pre.preRegularPoster.length==0){
		return res.json({code:300});
	}
	Products.update({openID:openID},{$set:{regularPoster:_pre.preRegularPoster,isRegular:true}},function(err){
		if(err){
			logger.error(err);
			return res.json({code:500});
		}
		res.json({code:200});
	})
})





module.exports = router;
