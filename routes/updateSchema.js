let mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child,Income,Code} = require('../mongoose/modelSchema')
let express = require('express');
let router = express.Router();
let request = require('request');
let fs = require('fs');
let path = require('path');
let logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {APPID,SECRET} = require('../config');



/* 设置佣金阶梯 */

// router.get('/api/set_15914132569___', async function(req,res){
	
// 	let arr = [
// 		{sales:50,rate:0.028},
// 		{sales:150,rate:0.0315},
// 		{sales:500,rate:0.033},
// 		{sales:1500,rate:0.034},
// 		{sales:2500,rate:0.0365},
// 		{sales:5000,rate:0.038},
// 		{sales:10000,rate:0.04},
// 		{sales:10000,rate:0.0417},
// 	]               
	
// 	await Products.update({},{'$set':{salesLadder:arr}},{multi:true});
// 	res.json({code:200});

// })

/* 修改操作 */

router.get('/api/set', async function(req,res){
	await Child.update({},{'$set':{heNum:0,fenNum:500000}},{multi:true});
	res.json({code:200});

})




module.exports = router;
