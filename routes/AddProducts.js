var mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');




router.get('/addproducts_15914132569',async function(req,res){
	
	let openID = 'oRMLE55mERNhqVWGmF6XtHKyGcwY';
	try {
		let _agent = await Agent.findOne({openID:openID}).select('openID').lean();
		let products = new Products();
			products._id = "5f6c5caca687a1236af74620";
			products.mode = 'link';
			products.isAddLevel = false;
			products.companyName = '乘法表科技';
			products.openID = 'oRMLE55mERNhqVWGmF6XtHKyGcwY';
			products.agentID = '5f6c5caca687a1236af74622';
			products.bossPhoneNumber = '暂无';
			products.bossWechat = '暂无';
			products.productsName = '统客';
			products.productsTitle = '统客分销系统';
			products.promotionCover = '';
			products.promotionQrcodeBackground = 'http://qiniu.tongkeapp.com/promotionqrcode.png?time=20201130';
			products.agentQrcodeBackground = 'http://qiniu.tongkeapp.com/agentqrcode.png?time=20201130';
			products.promotionPoster = ['http://qiniu.tongkeapp.com/tk_introduction_011.png?time=20201130','http://qiniu.tongkeapp.com/tk_introduction_022.png?time=20201130','http://qiniu.tongkeapp.com/tk_introduction_033.png?time=20201130','http://qiniu.tongkeapp.com/tk_introduction_044.png?time=20201130','http://qiniu.tongkeapp.com/tk_introduction_055.png?time=20201130','http://qiniu.tongkeapp.com/tk_introduction_066.png?time=20201130'];
			products.agentPoster = ['http://qiniu.tongkeapp.com/tk_introduction_011.png?time=20201130','http://qiniu.tongkeapp.com/tk_introduction_022.png?time=20201130','http://qiniu.tongkeapp.com/tk_introduction_033.png?time=20201130','http://qiniu.tongkeapp.com/tk_introduction_044.png?time=20201130','http://qiniu.tongkeapp.com/tk_introduction_055.png?time=20201130','http://qiniu.tongkeapp.com/tk_introduction_066.png?time=20201130'];
			products.regularPoster.push('http://qiniu.tongkeapp.com/default_20201010_01.png?time=20201130');
			products.productsLink = 'http://qiniu.tongkeapp.com/default_20201010_01.png?time=20201130';
			products.color = '#1476FE';
			products.originalPrice = 99999;
			products.activityPrice = 10000;
			products.summary = '暂无';
			products.squareImg = 'http://qiniu.tongkeapp.com/tkImgLogo.png?time=20201130';
			products.time = formatDate('yyyy-MM-dd hh:mm:ss');
			products.timeStamp = new Date().getTime();
		
		await products.save();	
		res.json({code:200});
	}catch(err){
		logger.error(err);
		res.json({code:500});
	}
});

module.exports = router;
