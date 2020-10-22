let mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Code} = require('../mongoose/modelSchema')
let express = require('express');
let router = express.Router();
let request = require('request');
let fs = require('fs');
let path = require('path');
let logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {checkOpenID} = require('../utils/CheckID');
let {MNS} = require('../utils/MNS');












router.get('/api/test',async function(req,res){
	
	await MNS();
	
	res.send('ok');
	
})


module.exports = router;
