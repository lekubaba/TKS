var mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {APPID,SECRET} = require('../config');


// 客户端将微信code传入服务端,
router.post('/api/customer/code',async function(req,res){
	
	let CODE = req.body.code; //code只能使用一次，获取一次客户后失效；
	let _agentID = req.body.agentID;  //上级的openID;
	let _productsId = req.body.productsId; //上级推广的产品ID
	let getTokenURL="https://api.weixin.qq.com/sns/oauth2/access_token?appid="+APPID+"&secret="+SECRET+"&code="+CODE+"&grant_type=authorization_code";
	
	// 注意：是否要检测_agentID,_productsId是否有错误,1.0默认不检测；
	
	var options = {
	    	headers: {"Connection": "close"},
			url: getTokenURL,
			method: 'GET',
			json: true
	};
	
	async function callback(error, response, data){
	
		if (!error && response.statusCode == 200) {	
			let ACCESS_TOKEN = data.access_token;
			// let expires_in = data.expires_in;
			// let refresh_token = data.refresh_token;
			let OPENID = data.openid;  //当code过期，拿到的OPENDI为空；
			let scope = data.scope;
			
			//如果code过期，则终止；
			
			if(!OPENID){
				return res.json({code:900});
			}
			try {
				// 数据库查询拿到的OPENID,此OPENID为客户的，
				let _customer = await Customer.findOne({openID:OPENID}).lean();
				
				if(!_customer){
					
					let getUserInfoUrl = "https://api.weixin.qq.com/sns/userinfo?access_token="+ACCESS_TOKEN+"&openid="+OPENID+"&lang=zh_CN";
					
					var option_s = {
							headers: {"Connection": "close"},
							url: getUserInfoUrl,
							method: 'GET',
							json: true
					};
					function callback_s(error1, response1, data1){
						
						if (!error1 && response1.statusCode == 200) {	
							let openid = data1.openid;
							let nickname = data1.nickname;
							let customerAvatarImg = data1.headimgurl;
							let sex = data1.sex;
							let province = data1.province;
							let city = data1.city;
							let unionid = data1.unionid;
							
							let customerNew = new Customer();
							
							customerNew._id = new mongoose.Types.ObjectId;
							customerNew.openID = openid;
							customerNew.unionID = unionid;
							customerNew.customerNickname = nickname;
							customerNew.customerAvatarImg = customerAvatarImg;
							customerNew.customerSex = sex;
							customerNew.customerProvince = province;
							customerNew.customerCity = city;
							customerNew.beCustomerTime = formatDate('yyyy-MM-dd hh:mm:ss');
							
							// 存储到数据库；
							customerNew.save(function(err){
								if(err) {
									logger.error(err);
									return res.json({code:500});
								}
								
								let data_ = {
									
									code:200,
									customerID:customerNew._id,
								}
								
								return res.json(data_);
					
								
							})
							
							
						}else{
							return res.json({code:500});
						}
					}
					
					request(option_s, callback_s);
					
				}else{
					// 如果这个客户曾经授权过，数据库存在
					
					let data_ = {
						code:200,
						customerID:_customer._id,
					}
					
					return res.json(data_);
				}
			}catch(err){
				logger.error(err);
				return res.json({code:500});
			}
			
		}else{
			return res.json({code:500});
		}
	}
	
	// 	请求拿access_token
	
	request(options, callback);
})

module.exports = router;
