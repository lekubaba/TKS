var mongoose = require('mongoose');
let {Agent,Customer,Products,Order} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {floatNum} = require('../utils/CommonUtil.js');

/*首页*/

router.get('/',function(req,res){
	res.render('tongkeapp');
})

router.get('/tongke',function(req,res){
	res.render('tkWebSiteHome',{title:"拿钱，让天下没有难做的销售"});
})


module.exports = router;
