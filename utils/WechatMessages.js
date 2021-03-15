let mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child,Ten} = require('../mongoose/modelSchema')
let express = require('express');
let router = express.Router();
let request = require('request');
let fs = require('fs');
let path = require('path');
let logger = require('./logger').logger;
let {formatDate} = require('./DateUtil');
let {APPID,SECRET,template1,template2,template3,template4,template5,template6,template7,template8} = require('../config');

let WechatMessages = {
	
	/* 
		* TemplateOne 邀请成功通知，
		* TemplateTwo 出额通知，
		* TemplateThree 结算成功通知，
		* TemplateFour 系统出错，
		* TemplateFive 代理成功通知，
		* TemplateSix 代理升级成功通知；
		* TemplateSeven 收益发放通知
		* TemplateEight 职位过期提醒
	*/
	
	async TemplateOne(title,nickName,count,openid){
		try{
			let token = await Ten.findOne({}).lean();
			let getTokenURL="https://api.weixin.qq.com/cgi-bin/message/template/send?access_token="+token.token;
			let BODY = {
					"touser":openid,
					"template_id":template1,
					"url":"http://wx.tongkeapp.com/",  
					"topcolor":"#666",
					"data":{
						"first":{
							"value":title,
							"color":"#999",
						},
						"keyword1":{
							"value":nickName,
							"color":"#999",
						},
						"keyword2":{
							"value":count,
							"color":"#999",
						},
						"keyword3":{
							"value":formatDate('yyyy-MM-dd hh:mm:ss'),
							"color":"#999",
						},
						"remark":{
							"value":"速去邀请代理进群学习！",
							"color":"#1476FE",
						}
					}
				
			}
			var option_s = {
					headers: {"Connection": "close"},
					url: getTokenURL,
					method: 'POST',
					json: true,
					body:BODY,
			};
		
			async function callback_s(error, response, data){
				return;
			}
			request(option_s, callback_s);
			
		}catch(err){
			logger.error(err);
			return;
		}
	},
	
	async TemplateTwo(title,nickName,tel,edutitle,openid,proName){
		try{
			let token = await Ten.findOne({}).lean();
			let getTokenURL="https://api.weixin.qq.com/cgi-bin/message/template/send?access_token="+token.token;
			let BODY = {
					"touser":openid,
					"template_id":template2,
					"url":"http://wx.tongkeapp.com/",  
					"topcolor":"#666",
					"data":{
						"first":{
							"value":title,
							"color":"#999",
						},
						"keyword1":{
							"value":nickName,
							"color":"#999",
						},
						"keyword2":{
							"value":tel,
							"color":"#999",
						},
						"keyword3":{
							"value":formatDate('yyyy-MM-dd hh:mm:ss'),
							"color":"#999",
						},
						"keyword4":{
							"value":edutitle,
							"color":"#999",
						},
						"remark":{
							"value":proName,
							"color":"#1476FE",
						}
					}
				
			}
			var option_s = {
					headers: {"Connection": "close"},
					url: getTokenURL,
					method: 'POST',
					json: true,
					body:BODY,
			};
		
			async function callback_s(error, response, data){
				return;
			}
			request(option_s, callback_s);
			
		}catch(err){
			logger.error(err);
			return;
		}
	},
	
	async TemplateThree(openid){
		try{
			let token = await Ten.findOne({}).lean();
			let getTokenURL="https://api.weixin.qq.com/cgi-bin/message/template/send?access_token="+token.token;
			let BODY = {
					"touser":openid,
					"template_id":template3,
					"url":"http://wx.tongkeapp.com/",  
					"topcolor":"#666",
					"data":{
						"first":{
							"value":"有一笔佣金已经结算成功！",
							"color":"#999",
						},
						"keyword1":{
							"value":"城市独家",
							"color":"#999",
						},
						"keyword2":{
							"value":formatDate('yyyy-MM-dd hh:mm:ss'),
							"color":"#999",
						},
						"keyword3":{
							"value":"直推佣金",
							"color":"#999",
						},
						"keyword4":{
							"value":"推广佣金",
							"color":"#999",
						},
						"keyword5":{
							"value":"以实际到账为准！",
							"color":"#999",
						},
						"remark":{
							"value":"如有疑问，请联系客服!",
							"color":"",
						}
					}
				
			}
			var option_s = {
					headers: {"Connection": "close"},
					url: getTokenURL,
					method: 'POST',
					json: true,
					body:BODY,
			};
		
			async function callback_s(error, response, data){
				return;
			}
			request(option_s, callback_s);
			
		}catch(err){
			logger.error(err);
			return;
		}
	},
	
	async TemplateFour(title1,errlevel,errmessage,openid){
		try{
			let token = await Ten.findOne({}).lean();
			let getTokenURL="https://api.weixin.qq.com/cgi-bin/message/template/send?access_token="+token.token;
			let BODY = {
					"touser":openid,
					"template_id":template4,
					"url":"http://wx.tongkeapp.com/",  
					"topcolor":"#666",
					"data":{
						"first":{
							"value":title1,
							"color":"#999",
						},
						"keyword1":{
							"value":'出错了',
							"color":"#999",
						},
						"keyword2":{
							"value":errlevel,
							"color":"#999",
						},
						"keyword3":{
							"value":formatDate('yyyy-MM-dd hh:mm:ss'),
							"color":"#999",
						},
						"keyword4":{
							"value":errmessage,
							"color":"#999",
						},
						"remark":{
							"value":" ",
							"color":"",
						}
					}
				
			}
			var option_s = {
					headers: {"Connection": "close"},
					url: getTokenURL,
					method: 'POST',
					json: true,
					body:BODY,
			};
		
			async function callback_s(error, response, data){
				return;
			}
			request(option_s, callback_s);
			
		}catch(err){
			logger.error(err);
			return;
		}
	},
	
	async TemplateFive(agentName,agentWechat,openid){
		try{
			let token = await Ten.findOne({}).lean();
			let getTokenURL="https://api.weixin.qq.com/cgi-bin/message/template/send?access_token="+token.token;
			let BODY = {
					"touser":openid,
					"template_id":template5,
					"url":"http://wx.tongkeapp.com/",  
					"topcolor":"#666",
					"data":{
						"first":{
							"value":"恭喜您，您提交的代理资料经审批已获通过，您已成为推广代理。",
							"color":"#999",
						},
						"keyword1":{
							"value":agentName,
							"color":"#999",
						},
						"keyword2":{
							"value":agentWechat,
							"color":"#999",
						},
						"keyword3":{
							"value":"未知",
							"color":"#999",
						},
						"remark":{
							"value":"点击“详情”登陆代理后台，如微信有误，立即前往后台修改哦！",
							"color":"#999",
						}
					}
			}
			var option_s = {
					headers: {"Connection": "close"},
					url: getTokenURL,
					method: 'POST',
					json: true,
					body:BODY,
			};
		
			async function callback_s(error, response, data){
				return;
			}
			request(option_s, callback_s);
			
		}catch(err){
			logger.error(err);
			return;
		}
	},
	
	async TemplateSix(agentName,level1,level2,openid){
		try{
			let token = await Ten.findOne({}).lean();
			let getTokenURL="https://api.weixin.qq.com/cgi-bin/message/template/send?access_token="+token.token;
			let BODY = {
					"touser":openid,
					"template_id":template6,
					"url":"http://wx.tongkeapp.com/",  
					"topcolor":"#666",
					"data":{
						"first":{
							"value":"你好，您已升级成功!",
							"color":"#999",
						},
						"keyword1":{
							"value":agentName,
							"color":"#999",
						},
						"keyword2":{
							"value":level1,
							"color":"#999",
						},
						"keyword3":{
							"value":level2,
							"color":"#999",
						},
						"keyword4":{
							"value":formatDate('yyyy-MM-dd hh:mm:ss'),
							"color":"#999",
						},
						"remark":{
							"value":"如有疑问，请联系客服!",
							"color":"#999",
						}
					}
			}
			var option_s = {
					headers: {"Connection": "close"},
					url: getTokenURL,
					method: 'POST',
					json: true,
					body:BODY,
			};
		
			async function callback_s(error, response, data){
				return;
			}
			request(option_s, callback_s);
			
		}catch(err){
			logger.error(err);
			return;
		}
	},
	
	/* 收益发放成功通知 */
	async TemplateSeven(types,commission,openid){
		try{
			let token = await Ten.findOne({}).lean();
			let getTokenURL="https://api.weixin.qq.com/cgi-bin/message/template/send?access_token="+token.token;
			let BODY = {
					"touser":openid,
					"template_id":template7,
					"url":"http://wx.tongkeapp.com/",  
					"topcolor":"#666",
					"data":{
						"first":{
							"value":"恭喜您有一笔收益到账！",
							"color":"#999",
						},
						"keyword1":{
							"value":commission+' 元',
							"color":"#1476FE",
						},
						"keyword2":{
							"value":formatDate('yyyy-MM-dd hh:mm:ss'),
							"color":"#999",
						},
						"remark":{
							"value":"收益说明："+types,  //直推，下级，下下级
							"color":"#1476FE",
						}
					}
			}
			var option_s = {
					headers: {"Connection": "close"},
					url: getTokenURL,
					method: 'POST',
					json: true,
					body:BODY,
			};
		
			async function callback_s(error, response, data){
				return;
			}
			request(option_s, callback_s);
			
		}catch(err){
			logger.error(err);
			return;
		}
	},
	/* 职位过期提醒 */
	async TemplateEight(expirationTime,openid){
		try{
			let token = await Ten.findOne({}).lean();
			let getTokenURL="https://api.weixin.qq.com/cgi-bin/message/template/send?access_token="+token.token;
			let BODY = {
					"touser":openid,
					"template_id":template8,
					"url":"http://wx.tongkeapp.com/",  
					"topcolor":"#666",
					"data":{
						"first":{
							"value":"由于您长期没有参与推广，总监职位即将过期！",
							"color":"#999",
						},
						"keyword1":{
							"value":'城市总监',
							"color":"#1476FE",
						},
						"keyword2":{
							"value":expirationTime,//过期时间
							"color":"#1476FE",
						},
						"remark":{
							"value":"如还需保留职位，请联系客服延长时间。",
							"color":"#1476FE",
						}
					}
			}
			var option_s = {
					headers: {"Connection": "close"},
					url: getTokenURL,
					method: 'POST',
					json: true,
					body:BODY,
			};
		
			async function callback_s(error, response, data){
				return;
			}
			request(option_s, callback_s);
			
		}catch(err){
			logger.error(err);
			return;
		}
	},
	
}
	



module.exports.WechatMessages = WechatMessages;
