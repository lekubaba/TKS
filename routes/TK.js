var mongoose = require('mongoose');
let {Agent,Customer} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
/*首页*/

router.get('/',function(req,res){
	res.render('tkWebSiteHome',{title:'将裂变的力量赋能销售'});
})

router.post('/api/openThirdLevel',function(req,res){
	console.log(req.body);
	res.send('hello axios');
})

router.post('/api/saveColorToDatabase',function(req,res){
	console.log(req.body);
	res.send('hello color');
})

router.post('/api/saveFeedback',function(req,res){
	console.log(req.body);
	res.send('hello:'+req.body.state);
})

router.post('/api/saveMoney',function(req,res){
	console.log(req.body);
	res.send('hello:'+req.body.money);
})

router.post('/api/userData',function(req,res){
	console.log(req.body);
	setTimeout(function(){
		res.send('hello:'+req.body.agentPhoneNumber);
	},100);
	
	
})

router.post('/api/promotion',function(req,res){
	console.log(req.url);
	res.send('hello:promotion');
	
})

router.post('/api/progressProfile',function(req,res){
	console.log(req.body.customerPhoneNumber);
	setTimeout(function(){
		res.send('hello:progressProfile');
	},100);
	
})

router.post('/api/saveWechat',function(req,res){
	console.log(req.body);
	res.send('hello:wechat');
})

router.post('/api/saveVerificationImformation',function(req,res){
	console.log(req.body);
	res.send('hello:saveVerificationImformation');
})

module.exports = router;
