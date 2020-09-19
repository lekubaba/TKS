var mongoose = require('mongoose');
let {User} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
/*首页*/



router.get('/thing',function(req,res){
	
	// let user = new User();
	// user._id = new mongoose.Types.ObjectId;
	// user.name = 'leku';
	// user.self1 = user._id;
	
	// user.save(function(err){
	// 	if(err) return logger.error(err);
	// 	res.send('heihei');
	// })
	
	User.
	findOne({name:'leku'}).
		populate({path:'self1',
			populate:{
				path:'self1',
				populate:{
					path:'self1',
					populate:{
						path:'self1',
						populate:{
							path:'self1',
							
						}
						
					}
					
				}
			}
		}).
		exec(function(err,user){
			if(err) return logger.error(err);
			res.send(user);
		})

})


module.exports = router;
