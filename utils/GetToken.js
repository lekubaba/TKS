var mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Ten} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {APPID,SECRET} = require('../config');



async function getToken(){

	let getTokenURL="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+APPID+"&secret="+SECRET;
	var option_s = {
			headers: {"Connection": "close"},
			url: getTokenURL,
			method: 'GET',
			json: true
	};
	try{
		async function callback_s(error, response, data){
			let ACCESS_TOKEN = data.access_token;
			let _ten = await Ten.findOne({}).lean();
			let ten = new Ten();
			ten._id = new mongoose.Types.ObjectId;
			ten.token = ACCESS_TOKEN;
			ten.timeStamp = new Date().getTime();
			if(!_ten){
				await ten.save();
			}else{
				await Ten.update({},{'$set':{token:ACCESS_TOKEN,timeStamp:new Date().getTime()}});
			}
		}
		request(option_s, callback_s);
		
	}catch(err){
		logger.error(err);
	}
	
}

module.exports.getToken = getToken;





