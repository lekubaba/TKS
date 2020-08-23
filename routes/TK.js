var mongoose = require('mongoose');
let {Story} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
/*首页*/

router.get('/',function(req,res){
	// res.render('tkWebSiteHome',{title:'将裂变的力量赋能销售'});
	// res.render('index');
	res.sendFile(path.resolve(__dirname,'../public/html/formdata.html'));
})

router.post('/formdata',function(req,res){
	console.log(req.files[0]);
	console.log(JSON.stringify(req.body));
	res.json({name:'helo'})
	
})


module.exports = router;
