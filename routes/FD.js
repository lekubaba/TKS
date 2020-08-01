var mongoose = require('mongoose');
let {Story} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');


/*首页*/

router.get('/',function(req,res){
	res.render('shenqing_enter')
})

router.get('/tom',function(req,res){

	var story = new Story({
		title:'HELLO WORLD!',
		tel:'15914132569'
	})

	story.save(function(err,doc){
		if(err){
			return res.send('ok');

		}else{
			console.log(doc.title);
			res.send('lowercase successfully!');			
		}
	

	})



})

router.get('/api',function(req,res){
	res.send('haha,你代理了我');
})





module.exports = router;