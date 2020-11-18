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

router.get('/test',async function(req,res){
	let code = new Code();
	code._id = new mongoose.Types.ObjectId;
	code.tel = '15988889999';
	code.code = 3000;
	try {
		await code.save();
		await Code.update({code:3000},{$set:{code:4000}});
		let _code = await Code.findOne({tel:'15988889999'});
		res.json(_code);
		return;
	}catch(err){
		console.log(err);
		res.json({code:500});
	}
});
	


module.exports = router;
