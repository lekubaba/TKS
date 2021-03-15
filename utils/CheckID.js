/**
 * Created by lekubaba @2020
 */
var mongoose = require('mongoose');
let {Agent,Customer,Products} = require('../mongoose/modelSchema');
var logger = require('../utils/logger').logger;


var CheckID = {
	
	async checkOpenID(openid,proid){
	
		let isOpenID = await new Promise(function(YES,NOT){
			Agent.findOne({openID:openid})
			.lean()
			.exec(function(err,ret){
				if(err){
					NOT(false);
				}
				
				if(!ret){
					NOT(false);
				}else{
					YES(true);
				}
			})
		})

		
		return isOpenID;
		
	},
	
 
};


module.exports = CheckID;