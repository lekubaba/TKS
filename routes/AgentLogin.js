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
let {WechatMessages} = require('../utils/WechatMessages');


// 客户端将微信code传入服务端,同时判断是否有agentID和productsId传入；
router.post('/api/code',async function(req,res){

	let CODE = req.body.code;
	let _agentID = req.body.agentID;  //上级的_id;
	let _productsId = req.body.productsId; //上级推广的产品ID
	let _agentPhoneNumber = req.body.agentPhoneNumber;
	let _agentProvince = req.body.province;
	let _agentCity = req.body.city;
	let _wechat = req.body.agentPhoneNumber;
	let getTokenURL = "https://api.weixin.qq.com/sns/oauth2/access_token?appid="+APPID+"&secret="+SECRET+"&code="+CODE+"&grant_type=authorization_code";
	
	// 注意：是否要检测_agentID,_productsId是否有错误,1.0默认不检测；
	var options = {
	    	headers: {"Connection": "close"},
			url: getTokenURL,
			method: 'GET',
			json: true
	};
	try {
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
				
				let getUserInfoUrl = "https://api.weixin.qq.com/sns/userinfo?access_token="+ACCESS_TOKEN+"&openid="+OPENID+"&lang=zh_CN";
				
				var option_s = {
						headers: {"Connection": "close"},
						url: getUserInfoUrl,
						method: 'GET',
						json: true
				};
				async function callback_s(error1, response1, data1){
					if (!error1 && response1.statusCode == 200) {
						
						let openid = data1.openid;
						let nickname = data1.nickname;
						let agentAvatarImg = data1.headimgurl;
						let sex = data1.sex;
						let province = data1.province;
						let city = data1.city;
						let unionid = data1.unionid;
					
						// 数据库查询拿到的unionid,此unionid为登陆用户的，
						let agent = await Agent.findOne({unionID:unionid}).populate('mainPromotionProducts').lean();
						if(!agent){
							let agentNew = new Agent();
							let child = new Child();
							// 如果是从公众号来的新用户
							if(!_productsId&&!_agentID){
								
								agentNew._id = new mongoose.Types.ObjectId;
								agentNew.openID = openid;
								agentNew.unionID = unionid;
								agentNew.agentNickname = nickname;
								agentNew.agentAvatarImg = agentAvatarImg;
								agentNew.agentSex = sex;
								agentNew.agentProvince = province;
								agentNew.agentCity = city;
								agentNew.agentWechat = '';
								agentNew.isPromotion = false;								
								agentNew.mainPromotionProducts = '5f6c5caca687a1236af74620'; //把统客作为默认主推
								agentNew.beAgentTime = formatDate('yyyy-MM-dd hh:mm:ss');
								agentNew.beAgentTimeStamp = new Date().getTime();
								
								await agentNew.save();
								// 响应的数据
								let agentData = {
									code:200,
									agentID:agentNew._id,
									productsId:agentNew.mainPromotionProducts,
									agentAvatarImg:agentAvatarImg,
									agentNickname:nickname,
									isPromotion:false,
									isAddLevel:false,
									color:'#1476FE',
									isVIP:false,
								}
								return res.json(agentData);
								
							// 如果是从招商代理页面来的新用户
							}else{
								
								// 通过上级_agentID，取上级_id;
								let _ret =  await Child.findOne({agentID:_agentID,mainPromotionProducts:_productsId}).populate('mainPromotionProducts','color isAddLevel').populate('agentID','agentNickname').lean();
								
								agentNew._id = new mongoose.Types.ObjectId;
								agentNew.openID = openid;
								agentNew.unionID = unionid;
								agentNew.agentNickname = nickname;
								agentNew.agentPhoneNumber = _agentPhoneNumber;
								agentNew.agentAvatarImg = agentAvatarImg;
								agentNew.agentSex = sex;
								agentNew.agentProvince = _agentProvince;
								agentNew.agentCity = _agentCity;
								agentNew.isPromotion = true;
								agentNew.agentWechat = _wechat;
								agentNew.mainPromotionProducts = _productsId;
								agentNew.beAgentTime = formatDate('yyyy-MM-dd hh:mm:ss');
								agentNew.beAgentTimeStamp = new Date().getTime();
								agentNew.superLevel = _ret.agentID._id;
								agentNew.bigSuperLevel =_ret.superLevel?_ret.superLevel:null;
								agentNew.topSuperLevel = _ret.topSuperLevel?_ret.topSuperLevel:null;
								
								// 新建child
								
								child._id = new mongoose.Types.ObjectId;
								agentNew.subAPI = child._id;	//存储接口
								child.isVIP = false;
								child.mainPromotionProducts = _productsId;
								child.superLevel = _ret.agentID._id;
								child.bigSuperLevel = _ret.superLevel?_ret.superLevel:null;
								child.topSuperLevel = _ret.topSuperLevel?_ret.topSuperLevel:null;
								child.agentID = agentNew._id;
								child.openID = openid;
								child.agentWechat = _wechat;
								child.unionID = unionid;
								child.time = formatDate('yyyy-MM-dd hh:mm:ss');
								child.timeStamp = new Date().getTime();
								child.level = _ret.level +1;
								child.relation = _ret.relation + '/'+agentNew._id;
								
								await agentNew.save();
								await child.save();
								await Child.update({agentID:_agentID,mainPromotionProducts:_productsId},{'$inc':{'agentNum':1}});
								let countDown = new Date().getTime()+86400000*15;
								let _countDown = new Date().getTime()+86400000;
								let time_stamp = new Date().getTime();
								//判断上级是否满足晋升条件；
								if(_ret.managerLevel===0){
									
									if(_ret.activityNumber>=50||_ret.agentNum>=19){
										let agentName = _ret.agentID.agentNickname;
										let level1 = '代理';
										let level2 = '城市经理';
										let _openID = _ret.openID;
										await Child.update({agentID:_agentID,mainPromotionProducts:_productsId},{'$set':{managerLevel:1,countDown:countDown}});
										await WechatMessages.TemplateSix(agentName,level1,level2,_openID);
									}
								//还没过期，增加一个代理增加一天的有效期；
								}else if(_ret.countDown>=time_stamp){
									await Child.update({agentID:_agentID,mainPromotionProducts:_productsId},{'$inc':{'countDown':86400000}});
								}else{
									//如果过期，就将有效期设置为一天；
									await Child.update({agentID:_agentID,mainPromotionProducts:_productsId},{'$set':{'countDown':_countDown}});
								}
								// 提醒上级，邀请代理成功
								let _title_ = '您已成功邀请一名城市代理注册，快去联系吧！';
								let _nickname_ = nickname;
								let _count_ = '***去后台查看***';
								let _openid_ = _ret.openID;
								await WechatMessages.TemplateOne(_title_,_nickname_,_count_,_openid_);
								
								// 还有其他的数据；思考这里是否用cookies
								let agentData = {
									code:200,
									agentID:agentNew._id,
									productsId:agentNew.mainPromotionProducts,
									agentAvatarImg:agentAvatarImg,
									agentNickname:nickname,
									isPromotion:true,
									isAddLevel:_ret.mainPromotionProducts.isAddLevel,
									color:_ret.mainPromotionProducts.color,
									isVIP:false,
								}
								
								return res.json(agentData);
							}
							//数据库有这个客户	
							
						}else{
							// 如果是从公众号来的，直接返回登陆数据；
							
							if(!_productsId&&!_agentID){
								
								let agentData = {
									code:200,
									agentID:agent._id,
									productsId:agent.mainPromotionProducts._id,
									agentAvatarImg:agent.agentAvatarImg,
									agentNickname:agent.agentNickname,
									isPromotion:agent.isPromotion,
									color:agent.mainPromotionProducts.color,
									isAddLevel:agent.mainPromotionProducts.isAddLevel,
									isVIP:agent.isVIP,
								}
								
								return res.json(agentData);
							}
							
							// 如果用户是从招商页面进来的，并且用户之前已加入推广
							if(agent.isPromotion){
								//如果这次扫码的产品ID与已推广的产品ID是同一个
								let _child = await Child.findOne({agentID:agent._id,mainPromotionProducts:_productsId}).select('openID').lean();
								if(_child){
									let agentData = {
										code:200
									}
									res.json(agentData);
									return;
								}else{
									// 通过上级_agentID，取上级_id;
									let _ret =  await Child.findOne({agentID:_agentID,mainPromotionProducts:_productsId}).populate('mainPromotionProducts','color isAddLevel').populate('agentID','agentNickname').lean();
									// 新建child
									let child = new Child();
									child._id = new mongoose.Types.ObjectId;
									child.isVIP = false;
									child.mainPromotionProducts = _productsId;
									child.superLevel = _ret.agentID._id;
									child.bigSuperLevel = _ret.superLevel?_ret.superLevel:null;
									child.topSuperLevel = _ret.topSuperLevel?_ret.topSuperLevel:null;
									child.agentID = agent._id;
									child.agentWechat = _wechat;
									child.openID = agent.openID;
									child.unionID = agent.unionID;
									child.time = formatDate('yyyy-MM-dd hh:mm:ss');
									child.timeStamp = new Date().getTime();
									child.level = _ret.level +1;
									child.relation = _ret.relation + '/'+agent._id;
									
									await child.save();
									await Agent.update({unionID:unionid},{'$set':{agentProvince:_agentProvince,agentCity:_agentCity,agentPhoneNumber:_agentPhoneNumber,agentWechat:_wechat}});
									await Child.update({agentID:_agentID,mainPromotionProducts:_productsId},{'$inc':{'agentNum':1}});
									
									let countDown = new Date().getTime()+86400000*15;
									let _countDown = new Date().getTime()+86400000;
									let time_stamp = new Date().getTime();
									//判断上级是否满足晋升条件；
									if(_ret.managerLevel===0){
										
										if(_ret.activityNumber>=50||_ret.agentNum>=19){
											let agentName = _ret.agentID.agentNickname;
											let level1 = '代理';
											let level2 = '城市经理';
											let _openID = _ret.openID;
											await Child.update({agentID:_agentID,mainPromotionProducts:_productsId},{'$set':{managerLevel:1,countDown:countDown}});
											await WechatMessages.TemplateSix(agentName,level1,level2,_openID);
										}
									//还没过期，增加一个代理增加一天的有效期；
									}else if(_ret.countDown>=time_stamp){
										await Child.update({agentID:_agentID,mainPromotionProducts:_productsId},{'$inc':{'countDown':86400000}});
									}else{
										//如果过期，就将有效期设置为一天；
										await Child.update({agentID:_agentID,mainPromotionProducts:_productsId},{'$set':{'countDown':_countDown}});
									}
									
									// 提醒上级，邀请代理成功
									let _title_ = '您已成功邀请一名城市代理注册，快去联系吧！';
									let _nickname_ = nickname;
									let _count_ = '***去后台查看***';
									let _openid_ = _ret.openID;
									await WechatMessages.TemplateOne(_title_,_nickname_,_count_,_openid_);
									
									let agentData = {
										code:200,
									}
									res.json(agentData);
									return;
								}
								
							//还没加入任何推广的用户	
							}else{
								
								// 通过上级_agentID，取上级_id;
								let _ret =  await Child.findOne({agentID:_agentID,mainPromotionProducts:_productsId}).populate('mainPromotionProducts','color isAddLevel').populate('agentID','agentNickname').lean();
								let _isPromotion = true;
								let _mainPromotionProducts = _productsId;
								let _beAgentTime = formatDate('yyyy-MM-dd hh:mm:ss');
								let _beAgentTimeStamp = new Date().getTime();
								let _superLevel = _ret.agentID._id;
								let _bigSuperLevel =_ret.superLevel?_ret.superLevel:null;
								let _topSuperLevel = _ret.topSuperLevel?_ret.topSuperLevel:null;
								
								
								// 新建child
								let child = new Child();
								child._id = new mongoose.Types.ObjectId;
								child.isVIP = false;
								child.mainPromotionProducts = _productsId;
								child.superLevel = _ret.agentID._id;
								child.bigSuperLevel = _ret.superLevel?_ret.superLevel:null;
								child.topSuperLevel = _ret.topSuperLevel?_ret.topSuperLevel:null;
								child.agentID = agent._id;
								child.agentWechat = _wechat;
								child.openID = agent.openID;
								child.unionID = agent.unionID;
								child.time = formatDate('yyyy-MM-dd hh:mm:ss');
								child.timeStamp = new Date().getTime();
								child.level = _ret.level +1;
								child.relation = _ret.relation + '/'+agent._id;
								
								
								await child.save();
								await Child.update({agentID:_agentID,mainPromotionProducts:_productsId},{'$inc':{'agentNum':1}});
								
								let countDown = new Date().getTime()+86400000*15;
								let _countDown = new Date().getTime()+86400000;
								let time_stamp = new Date().getTime();
								
								//判断上级是否满足晋升条件；
								if(_ret.managerLevel===0){
									
									if(_ret.activityNumber>=50||_ret.agentNum>=19){
										let agentName = _ret.agentID.agentNickname;
										let level1 = '代理';
										let level2 = '城市经理';
										let _openID = _ret.openID;
										await Child.update({agentID:_agentID,mainPromotionProducts:_productsId},{'$set':{managerLevel:1,countDown:countDown}});
										await WechatMessages.TemplateSix(agentName,level1,level2,_openID);
									}
								//还没过期，增加一个代理增加一天的有效期；
								}else if(_ret.countDown>=time_stamp){
									await Child.update({agentID:_agentID,mainPromotionProducts:_productsId},{'$inc':{'countDown':86400000}});
								}else{
									//如果过期，就将有效期设置为一天；
									await Child.update({agentID:_agentID,mainPromotionProducts:_productsId},{'$set':{'countDown':_countDown}});
								}
								
								
								// 提醒上级，邀请代理成功
								let _title_ = '您已成功邀请一名城市代理注册，快去联系吧！';
								let _nickname_ = nickname;
								let _count_ = '***去后台查看***';
								let _openid_ = _ret.openID;
								await WechatMessages.TemplateOne(_title_,_nickname_,_count_,_openid_);
								
								// 用户通过招商页加入代理，且之前还没参与推广，更新用户信息且返回登陆信息；
								await Agent.update({unionID:unionid},
									{
										"$set":{
											subAPI:child._id,
											isPromotion:_isPromotion,
											mainPromotionProducts:_mainPromotionProducts,
											beAgentTime:_beAgentTime,
											beAgentTimeStamp:_beAgentTimeStamp,
											superLevel:_superLevel,
											bigSuperLevel:_bigSuperLevel,
											topSuperLevel:_topSuperLevel,
											agentWechat:_wechat,
											agentPhoneNumber:_agentPhoneNumber,
											agentProvince:_agentProvince,
											agentCity:_agentCity,
										},
									},
								);
								let agentData = {
									code:200,
								}
								return res.json(agentData);
								
							}
						}
						
						
					}else{
						logger.info('微信接口出错');
						return res.json({code:500});
					}
				}
					
				request(option_s, callback_s);
				
			}else{
				logger.info('获取微信token出错');
				return res.json({code:500});
			}
		}
		
		// 	请求拿access_token
		request(options, callback);
	
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
})


router.post('/api/toMessageLogin/login',async function(req,res){
	
	let tel = req.body.tel;
	
	try {
		let _agent = await Agent.findOne({agentPhoneNumber:tel}).populate('mainPromotionProducts','isAddLevel color').lean()
		
		if(!_agent){
			res.json({code:101});
			return;
		}
		
		let agentData = {
			code:200,
			agentID:_agent._id,
			productsId:_agent.mainPromotionProducts._id,
			agentAvatarImg:_agent.agentAvatarImg,
			agentNickname:_agent.agentNickname,
			isPromotion:true,
			isAddLevel:true,
			color:_agent.mainPromotionProducts.color,
			isVIP:_agent.isVIP,
		}
		
		res.json(agentData);
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})

module.exports = router;
