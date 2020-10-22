var mongoose = require('mongoose');
let {Agent,Customer,Products,Order} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');




router.get('/addproducts',function(req,res){
	
	let products = new Products({
		_id:new mongoose.Types.ObjectId,
		mode:'line',
		openID:'oRMLE55mERNhqVWGmF6XtHKyGcwY',
		productsName:'统客',
		productsTitle:'统客分销系统',
		promotionCover:'http://qiniu.tongkeapp.com/promotion_cover_04.png',
		promotionQrcodeBackground:'http://qiniu.tongkeapp.com/agent_poster_04.png',
		agentQrcodeBackground:'http://qiniu.tongkeapp.com/agent_poster_04.png',
		promotionPoster:['http://qiniu.tongkeapp.com/agent_poster_04.png','http://qiniu.tongkeapp.com/promotion_cover_04.png'],
		agentPoster:['http://qiniu.tongkeapp.com/promotion_cover_04.png','http://qiniu.tongkeapp.com/agent_poster_04.png'],
		productsLink:'',
		color:'#1476FE',
		originalPrice:'6999',
		activityPrice:'899',
		summary:'统客分销一年服务',
		squareImg:'http://qiniu.tongkeapp.com/tkImgLogo.png'
	})
	
	products.save(function(err){
		if(err) {
			console.log(err);
			res.send('系统出错了');
			return;
		}
		Agent.update({openID:'oRMLE55mERNhqVWGmF6XtHKyGcwY'},{'$set':{'mainPromotionProducts':products._id},'$push':{'promotionProducts':products._id}},{upsert:true},function(err){
			if(err) {
				console.log(err);
				res.send('系统出错lalalla');
				return;
			}
			res.send('success')
		})
	})
	
});

router.get('/find',function(req,res){
	Agent.find({openID:'oRMLE55mERNhqVWGmF6XtHKyGcwY'})
	.lean()
	.populate('promotionProducts')
	.populate('mainPromotionProducts')
	.exec(function(err,val){
		if(err) {
			console.log(err);
			res.send('系统出错heiheihei');
			return;
		}
		console.log(val);
		res.send(val);
	})
})


module.exports = router;
