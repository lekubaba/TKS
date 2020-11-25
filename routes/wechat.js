var mongoose = require('mongoose');
let {Agent,Customer,Products,Order} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {WxApiCheck} = require('../utils/WxApiCheck');
let {token} = require('../config');


/* 微信验证服务器用途 */
router.get('/api/wx',function(req,res){

	let ret =  WxApiCheck(req.query,token);
	
	if(ret){
		res.send(req.query.echostr);
		return;
	}
	
	res.send('错误');
	
	
})

module.exports = router;