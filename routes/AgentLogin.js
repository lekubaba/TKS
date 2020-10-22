var mongoose = require('mongoose');
let {Agent,Customer,Products} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let APPID = 'wx1d23498d4a220713';
let SECRET = '0cce653894d5654f1490bf4fd95af392';


// 客户端将微信code传入服务端,同时判断是否有openID和productsId传入；
router.post('/api/code',function(req,res){
	
	let CODE = req.body.code;
	let _openID = req.body.openID;  //上级的openID;
	let _productsId = req.body.productsId; //上级推广的产品ID
	let _wechat = req.body.agentWechat;
	let getTokenURL="https://api.weixin.qq.com/sns/oauth2/access_token?appid="+APPID+"&secret="+SECRET+"&code="+CODE+"&grant_type=authorization_code";
	
	// 注意：是否要检测_openID,_productsId是否有错误,1.0默认不检测；
	
	var options = {
	    	headers: {"Connection": "close"},
			url: getTokenURL,
			method: 'GET',
			json: true
	};
	
	function callback(error, response, data){
	
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
			
			// 数据库查询拿到的OPENID,此OPENID为登陆用户的，
			Agent.findOne({openID:OPENID})
			.lean()
			.populate('mainPromotionProducts')
			.exec(function(err,agent){
				if(err){
					logger.error(err);
					return res.json({code:500});
				}
				
				// 如果数据库没有OPENID
				
				if(!agent){
					
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
							let agentAvatarImg = data1.headimgurl;
							let sex = data1.sex;
							let province = data1.province;
							let city = data1.city;
							let unionid = data1.unionid;
							
							let agentNew = new Agent();
							// 如果是从公众号来的新用户
							if(!_productsId&&!_openID){
								
								agentNew._id = new mongoose.Types.ObjectId;
								agentNew.openID = openid;
								agentNew.unionID = unionid;
								agentNew.agentNickname = nickname;
								agentNew.agentAvatarImg = agentAvatarImg;
								agentNew.agentSex = sex;
								agentNew.agentProvince = province;
								agentNew.agentCity = city;
								agentNew.isPromotion = false;								
								agentNew.isVIP = false;								
								agentNew.color = '#1476FE';							
								agentNew.mainPromotionProducts = '5f6c5caca687a1236af74620'; //把统客作为默认主推
								// agentNew.topSuperLevel = agentNew._id;
								agentNew.beAgentTime = formatDate('yyyy-MM-dd hh:mm:ss');
								agentNew.beAgentTimeStamp = new Date().getTime();
								
								agentNew.save(function(err){
									if(err){
										logger.error(err);
										return res.json({code:500});
									}
									// 还有其他的数据；思考这里是否用cookies
									let agentData = {
										code:200,
										openID:openid,
										agentAvatarImg:agentAvatarImg,
										agentNickname:nickname,
										isPromotion:false,
										color:'#1476FE',
										isVIP:false,
									}
									return res.json(agentData);
								})
								
							// 如果是从招商代理页面来的新用户
							}else{
								
								// 通过上级OPENID，取上级_id;
								Agent.findOne({openID:_openID})
								.lean()
								.populate('mainPromotionProducts','color')
								.exec(function(err,_ret){
									if(err){
										logger.error(err);
										return res.json({code:500});
									}
									agentNew._id = new mongoose.Types.ObjectId;
									agentNew.openID = openid;
									agentNew.unionID = unionid;
									agentNew.agentNickname = nickname;
									agentNew.agentAvatarImg = agentAvatarImg;
									agentNew.agentSex = sex;
									agentNew.agentProvince = province;
									agentNew.agentCity = city;
									agentNew.isPromotion = true;
									agentNew.agentWechat = _wechat;
									agentNew.isVIP = false;								
									agentNew.color = _ret.mainPromotionProducts.color;				
									agentNew.mainPromotionProducts = _productsId;
									agentNew.beAgentTime = formatDate('yyyy-MM-dd hh:mm:ss');
									agentNew.beAgentTimeStamp = new Date().getTime();
									agentNew.superLevel = _ret._id;
									agentNew.bigSuperLevel =_ret.superLevel?_ret.superLevel:null;
									agentNew.topSuperLevel = _ret.topSuperLevel?_ret.topSuperLevel:null;
									
									agentNew.save(function(err){
										if(err){
											logger.error(err);
											return res.json({code:500});
										}
										// 还有其他的数据；思考这里是否用cookies
										let agentData = {
											code:200,
											openID:openid,
											agentAvatarImg:agentAvatarImg,
											agentNickname:nickname,
											isPromotion:true,
											color:_ret.mainPromotionProducts.color,
											isVIP:false,
										}
										return res.json(agentData);
									})
									
								})
								
							}
							
						}else{
							logger.info('获取微信数据错误');
							return res.json({code:500});
						}
					}
					
					request(option_s, callback_s);
				// 数据库有这个用户
				}else{
					
					// 如果是从公众号来的，直接返回登陆数据；
					
					if(!_productsId&&!_openID){
						
						let agentData = {
							code:200,
							openID:agent.openID,
							agentAvatarImg:agent.agentAvatarImg,
							agentNickname:agent.agentNickname,
							isPromotion:agent.isPromotion,
							color:agent.mainPromotionProducts.color,
							isVIP:agent.isVIP,
						}
						
						return res.json(agentData);
					}
					
					// 如果用户是从招商页面进来的，并且用户之前已加入推广，则提示
					if(agent.isPromotion){
						let agentData = {
							code:200,
							openID:agent.openID,
							agentAvatarImg:agent.agentAvatarImg,
							agentNickname:agent.agentNickname,
							isPromotion:agent.isPromotion,
							color:agent.mainPromotionProducts.color,
							isVIP:agent.isVIP,
						}
						return res.json(agentData);
					}else{
						
						// 通过上级OPENID，取上级_id;
						Agent.findOne({openID:_openID})
						.lean()
						.populate('mainPromotionProducts')
						.exec(function(err,_ret){
							if(err){
								logger.error(err);
								return res.json({code:500});
							}
							let _isPromotion = true;
							let _mainPromotionProducts = _productsId;
							let _beAgentTime = formatDate('yyyy-MM-dd hh:mm:ss');
							let _beAgentTimeStamp = new Date().getTime();
							let _superLevel = _ret._id;
							let _bigSuperLevel =_ret.superLevel?_ret.superLevel:null;
							let _topSuperLevel = _ret.topSuperLevel?_ret.topSuperLevel:null;
							
							// 用户通过招商页加入代理，且之前还没参与推广，更新用户信息且返回登陆信息；
							
							Agent.update(
								{openID:OPENID},
								{
									"$set":{
										isPromotion:_isPromotion,
										mainPromotionProducts:_mainPromotionProducts,
										beAgentTime:_beAgentTime,
										beAgentTimeStamp:_beAgentTimeStamp,
										superLevel:_superLevel,
										bigSuperLevel:_bigSuperLevel,
										topSuperLevel:_topSuperLevel,
										agentWechat:_wechat,
									},
								},
								function(err){
									if(err){
										logger.error(err);
										return res.json({code:500});
									}
									let agentData = {
										code:200,
										openID:agent.openID,
										agentAvatarImg:agent.agentAvatarImg,
										agentNickname:agent.agentNickname,
										isPromotion:_isPromotion,
										color:_ret.mainPromotionProducts.color,
										isVIP:agent.isVIP,
									}
									return res.json(agentData);
							});
							
							
						});
						
					}
					
				}
			})
			
		}else{
			logger.info('获取微信token出错');
			return res.json({code:500});
		}
	}
	
	// 	请求拿access_token
	
	request(options, callback);
})

module.exports = router;
