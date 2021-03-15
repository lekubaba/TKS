let mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child} = require('../mongoose/modelSchema')
let express = require('express');
let router = express.Router();
let request = require('request');
let fs = require('fs');
let path = require('path');
let logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {APPID,SECRET} = require('../config');
let {WechatMessages} = require('../utils/WechatMessages');


router.get('/api/bind/:id',async function(req,res){
	
	let _bindID = req.params.id;
	let reg = /^[0-9]{16}/;
	if(!reg.test(_bindID)){
		res.send('页面不存在');
		return;
	}
	let isBind = await Child.findOne({bindID:_bindID}).lean();
	if(!isBind){
		/* 如果没有绑定,跳转到绑定界面*/
		res.render('whitePage');
		return;
	}
	/* 如果绑定了，跳转到申请界面 */
	res.redirect('/api/getcustomerpage/'+isBind.agentID+'/'+isBind.mainPromotionProducts+'?line=0');
	
})


// 客户端获取到微信Code，判断用户有没有要绑定的产品，并且将用户的ID返回到客户端；

router.post('/api/bindcode',async function(req,res){
	let CODE = req.body.code;
	let getTokenURL="https://api.weixin.qq.com/sns/oauth2/access_token?appid="+APPID+"&secret="+SECRET+"&code="+CODE+"&grant_type=authorization_code";
	var options = {
	    	headers: {"Connection": "close"},
			url: getTokenURL,
			method: 'GET',
			json: true
	};
	try {
		async function callback(error, response, data){
			
			let openID = data.openid;
			let _child = await Child.findOne({openID:openID,isBind:false}).select('agentID').lean();
			// 扫码用户没有要绑定的产品或者还不是代理；
			if(!_child){
				res.json({code:100});
				return;
			}
			res.json({code:200,agentID:_child.agentID});
			return;
		}
		request(options, callback);
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
})

router.get('/api/bindpage/:id',async function(req,res){
	
	let _agentID = req.params.id;
	try {
		// 查询还没有达到最大绑定数的推广产品；
		
		let _children = await Child.find({agentID:_agentID,isBind:false}).select('agentID isBind mainPromotionProducts').populate('mainPromotionProducts','productsName color').populate('agentID','agentNickname agentAvatarImg').lean();
		if(!_children||_children.length===0){
			/* 当agentID被人恶意修改时*/
			res.json({code:400});
			return;
		}
		/* 正确的 */
		res.render('bindIdToAgent',{_children:_children,});
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})

router.post('/api/bindandupdate',async function(req,res){
	
	let bindID = req.body.bindID;
	let agentID = req.body.agentID;
	let productsId =req.body.productsId;
	let work = req.body.work;
	try {
		let _child = await Child.findOne({agentID:agentID,mainPromotionProducts:productsId}).lean();
		
		if(!_child){
			res.json({code:100});
			return;
		}
		// 最大绑定数减去1
		let len = _child.maxBind - 1;
		// 判断有没有上级，如果没有，则说明是代理自己绑定自己，不计推广绑定数
		if(!_child.superLevel){
			if(_child.bindID.length==len){
				await Child.update({agentID:agentID,mainPromotionProducts:productsId},{'$set':{isBind:true,work:work},'$push':{'bindID':bindID},'$inc':{'bindNumber':1}})
				res.json({code:200});
				return;
			}
			await Child.update({agentID:agentID,mainPromotionProducts:productsId},{'$set':{work:work},'$push':{'bindID':bindID},'$inc':{'bindNumber':1}});
			res.json({code:200});
			return;
		}else{
			
			let _ret = await Child.findOne({agentID:_child.superLevel,mainPromotionProducts:productsId}).select('openID managerLevel activityNumber agentNum countDown').populate('agentID','agentNickname').lean();
			let countDown = new Date().getTime()+86400000*15;
			let _countDown = new Date().getTime()+86400000;
			let time_stamp = new Date().getTime();
			//判断上级是否满足晋升条件；
			if(_ret.managerLevel===0){
				
				if(_ret.activityNumber>=49||_ret.agentNum>=20){
					
					let agentName = _ret.agentID.agentNickname;
					let level1 = '代理';
					let level2 = '城市经理';
					let _openID = _ret.openID;
					await Child.update({agentID:_child.superLevel,mainPromotionProducts:productsId},{'$set':{managerLevel:1,countDown:countDown}});
					await WechatMessages.TemplateSix(agentName,level1,level2,_openID);
					
				}
				
			//还没过期，增加一个代理增加一天的有效期；
			}else if(_ret.countDown>=time_stamp){
				await Child.update({agentID:_child.superLevel,mainPromotionProducts:productsId},{'$inc':{'countDown':86400000}});
			}else{
				//如果过期，就将有效期设置为一天；
				await Child.update({agentID:_child.superLevel,mainPromotionProducts:productsId},{'$set':{'countDown':_countDown}});
			}
			
			if(_child.bindID.length==len){
				await Child.update({agentID:agentID,mainPromotionProducts:productsId},{'$set':{isBind:true,work:work},'$push':{'bindID':bindID},'$inc':{'bindNumber':1}})
				await Child.update({agentID:_child.superLevel,mainPromotionProducts:productsId},{'$inc':{'activityNumber':1}});
				res.json({code:200});
				return;
			}
			await Child.update({agentID:agentID,mainPromotionProducts:productsId},{'$set':{work:work},'$push':{'bindID':bindID},'$inc':{'bindNumber':1}});
			await Child.update({agentID:_child.superLevel,mainPromotionProducts:productsId},{'$inc':{'activityNumber':1}});
			res.json({code:200});
			return;
			
		}
		
	}catch(err){
		logger.error(err);
		return res.json({code:500});
	}
	
})

router.get('/api/bindsuccessremind',function(req,res){
	
	res.render('bindSuccess',{title:'绑定成功'});
	return;
	
})


module.exports = router;
