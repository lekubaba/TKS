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
let qiniu = require('qiniu');

router.post('/api/uploadToken',async function(req,res){
	
	let accessKey = 'e7h6DSy7QbFL4vZJ1GSPnLST5rWITlft_2Rq3W0k';
	let secretKey = 'poltBuskb_MljHT-vdOFRQs7pFV0mhVsR4G_juil';
	let openID = req.body.openID;
	
	let promotionQr = await Products.findOne({openID:openID}).select('promotionQrcodeBackground').lean();

	var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

	var options = {
		scope: 'tongkeapp',
		expires: 7200,
		returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
	};
	var putPolicy = new qiniu.rs.PutPolicy(options);
	var uploadToken=putPolicy.uploadToken(mac);

	if(uploadToken){
		res.json({uploadToken:uploadToken,promotionQr:promotionQr.promotionQrcodeBackground})
	}
	
})

router.post('/api/uploadTokenAgent',async function(req,res){
	
	let accessKey = 'e7h6DSy7QbFL4vZJ1GSPnLST5rWITlft_2Rq3W0k';
	let secretKey = 'poltBuskb_MljHT-vdOFRQs7pFV0mhVsR4G_juil';
	let openID = req.body.openID;
	
	let agentQr = await Products.findOne({openID:openID}).select('agentQrcodeBackground').lean();

	var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

	var options = {
	  scope: 'tongkeapp',
	  expires: 7200,
	  returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
	};
	var putPolicy = new qiniu.rs.PutPolicy(options);
	var uploadToken=putPolicy.uploadToken(mac);

	if(uploadToken){
		res.json({uploadToken:uploadToken,agentQr:agentQr.agentQrcodeBackground})
	}
	
})

router.post('/api/uploadTokenPPoster',async function(req,res){
	
	let accessKey = 'e7h6DSy7QbFL4vZJ1GSPnLST5rWITlft_2Rq3W0k';
	let secretKey = 'poltBuskb_MljHT-vdOFRQs7pFV0mhVsR4G_juil';
	let openID = req.body.openID;
	try{
		let poster = await Products.findOne({openID:openID}).select('promotionPoster').lean();
		await Products.update({openID:openID},{$set:{prePromotionPoster:[]}});

		var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

		var options = {
			scope: 'tongkeapp',
			expires: 7200,
			returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
		};
		var putPolicy = new qiniu.rs.PutPolicy(options);
		var uploadToken=putPolicy.uploadToken(mac);

		if(uploadToken){
			res.json({uploadToken:uploadToken,poster:poster.promotionPoster})
		}
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})

router.post('/api/uploadTokenAgentPoster',async function(req,res){
	
	let accessKey = 'e7h6DSy7QbFL4vZJ1GSPnLST5rWITlft_2Rq3W0k';
	let secretKey = 'poltBuskb_MljHT-vdOFRQs7pFV0mhVsR4G_juil';
	let openID = req.body.openID;
	try{
		let poster = await Products.findOne({openID:openID}).select('agentPoster').lean();
		await Products.update({openID:openID},{$set:{preAgentPoster:[]}});

		var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

		var options = {
			scope: 'tongkeapp',
			expires: 7200,
			returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
		};
		var putPolicy = new qiniu.rs.PutPolicy(options);
		var uploadToken=putPolicy.uploadToken(mac);

		if(uploadToken){
			res.json({uploadToken:uploadToken,poster:poster.agentPoster})
		}
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})

router.post('/api/uploadTokenRegularPoster',async function(req,res){
	
	let accessKey = 'e7h6DSy7QbFL4vZJ1GSPnLST5rWITlft_2Rq3W0k';
	let secretKey = 'poltBuskb_MljHT-vdOFRQs7pFV0mhVsR4G_juil';
	let openID = req.body.openID;
	try{
		let poster = await Products.findOne({openID:openID}).select('regularPoster').lean();
		await Products.update({openID:openID},{$set:{preRegularPoster:[]}});

		var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

		var options = {
			scope: 'tongkeapp',
			expires: 7200,
			returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}',
		};
		var putPolicy = new qiniu.rs.PutPolicy(options);
		var uploadToken=putPolicy.uploadToken(mac);

		if(uploadToken){
			res.json({uploadToken:uploadToken,poster:poster.regularPoster})
		}
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})

module.exports = router;