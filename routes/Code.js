let mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child} = require('../mongoose/modelSchema')
let express = require('express');
let router = express.Router();
let request = require('request');
let fs = require('fs');
let path = require('path');
let logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {checkOpenID} = require('../utils/CheckID');
let {MNS} = require('../utils/MNS');



router.get('/api/code',async function(req,res){
	
	let tel = '15914132569';
	
	await MNS(req,res,tel);
	
})

router.post('/api/alicode',async function(req,res){
	
	let tel = req.body.tel;
	
	await MNS(req,res,tel);
	
})


module.exports = router;
