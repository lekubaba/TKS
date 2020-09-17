var mongoose = require('mongoose');
let {Re} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
/*首页*/

router.get('/adds',function(req,res){
	let re = new Re();
	re.name = '张三';
	re.tel = ['19966778822'];
	re.friend[0] = {name:'李四',tel:'13186784881',address:['长沙']};
	re.save(function(err){
		if(err) console.log(err);
		res.send('hello re');
	})
})


router.get('/find',function(req,res){
	Re.find({'friend.tel':'18322223333'},function(err,val){
		console.log(val);
		res.send(val);
	});
})
	
	
router.get('/update',function(req,res){
	Re.update({'tel':'15911223322'},{'$push':{'friend':{'name':'黄三','tel':'14444444444','adress':['邵阳','怀化']}}},function(err){
		if(err) return new Error('出错了');
		res.send('更新成功了');
	});
})




module.exports = router;
