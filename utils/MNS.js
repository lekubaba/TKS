let mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Code} = require('../mongoose/modelSchema')
const Core = require('@alicloud/pop-core');
let logger = require('../utils/logger').logger;
let {ID,Secret} = require('../config');

function MNS(req,res,tel){
	
	function rand(min,max) {
		return Math.floor(Math.random()*(max-min))+min;
	}
	
	let alicode = rand(1000,9999);

	var client = new Core({
		accessKeyId: ID,
		accessKeySecret: Secret,
		endpoint: 'https://dysmsapi.aliyuncs.com',
		apiVersion: '2017-05-25'
	});

	var params = {
		"RegionId": "cn-hangzhou",
		"PhoneNumbers": tel,
		"SignName": "统客",
		"TemplateCode": "SMS_204295272",
		"TemplateParam": "{\"code\":\""+alicode+"\"}"
	}

	var requestOption = {
	  method: 'POST'
	};

	client.request('SendSms', params, requestOption).then((result) => {
		let resp = JSON.stringify(result);
		resp = JSON.parse(resp);
		if(resp.Message=='OK'){
			Code.findOne({tel:tel}).lean().exec(function(err,ret){
				if(err){
					logger.error(err);
					res.json({code:500});
					return;
				}
				
				if(!ret){
					let code = new Code();
					code._id = new mongoose.Types.ObjectId;
					code.tel = tel;
					code.code = alicode
					code.save(function(err){
						if(err){
							logger.error(err);
							res.json({code:500});
							return;
						}
						res.json({code:200,alicode:alicode});  
					})
				}else{
					Code.update({tel:tel},{$set:{code:alicode}},function(err){
						if(err){
							logger.error(err);
							res.json({code:500});
							return;
						}
						res.json({code:200,alicode:alicode});  
					})
				}
				
			})	
			
		}else{
			res.json({code:500});
			return;
		}
	}, (err) => {
	  logger.error(err);
	  res.json({code:500});
	  return;
	})
	
}

module.exports.MNS = MNS;
