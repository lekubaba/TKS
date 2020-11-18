var mongoose = require('mongoose');
var mongoose = require('mongoose');
let {Agent,Customer,Products,Order} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
/*首页*/

router.get('/',function(req,res){
	res.render('tongkeapp');
})

module.exports = router;
