let mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child,Ten} = require('../mongoose/modelSchema')
let express = require('express');
let router = express.Router();
let request = require('request');
let fs = require('fs');
let path = require('path');
let logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {WechatMessages} = require('../utils/WechatMessages.js');



router.get('/api/getMessage',async function(req,res){
	
	WechatMessages.TemplateFive('杨锦旋','wechatnumber',);
	res.json({code:200});
	
})


module.exports = router;
