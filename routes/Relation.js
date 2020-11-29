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



router.get('/api/relation',async function(req,res){
	
	Agent.find({relation:{'$regex':'5fbeb65dfb1051f8e272f1dc'}},function(err,ret){
		res.json(ret);
	})
	
})


module.exports = router;
