let mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Child,Ten} = require('../mongoose/modelSchema')
let express = require('express');
let router = express.Router();
let request = require('request');
let fs = require('fs');
let path = require('path');
let logger = require('./logger').logger;
let {formatDate} = require('./DateUtil');

let Probability = {
	
	random(min,max){
	　　return (Math.random()*(max-min) + min).toFixed(2);    
	},
	boxa:{num:10006,boxName:'积分宝箱',boxPro:'100、500、1000、5000、20000积分随机一个',isNeed:false},
	boxb:{num:10004,boxName:'红包宝箱',boxPro:'1元、5元、10元、50元、200元红包随机一个',isNeed:false},
	boxc:{num:10003,boxName:'翻倍宝箱',boxPro:'中奖月1号至中奖时的直推佣金翻倍发放',isNeed:false},
	boxd:{num:10001,boxName:'手机宝箱',boxPro:'抽0-5折iphone 12、小米11',isNeed:true},
	boxe:{num:10005,boxName:'金牛钥匙',boxPro:'开启特殊宝箱的钥匙',isNeed:false},
	boxf:{num:10002,boxName:'旅游宝箱',boxPro:'抽0-5折张家界豪华游套餐',isNeed:false},
	
	/* 
		* ProbabilityOne 当用户还没中手机宝箱和金牛钥匙的时候且当月直推佣金为零时，
		* ProbabilityTwo 当用户还没中手机宝箱和金牛钥匙的时候且当月直推佣金不为零时，
		* ProbabilityThree 当用户中了手机没中金牛且直推佣金为零时，
		* ProbabilityFour 当用户中了手机没中金牛且直推佣金不为零时，
		* ProbabilityFive 当用户中了金牛没中手机且直推佣金为零时，
		* ProbabilitySix 当用户中了金牛没中手机且直推佣金不为零时；
		* ProbabilitySeven 开启红包宝箱；
		* ProbabilityEight 开启积分宝箱；
		* ProbabilityNine 开启旅游宝箱；
	*/
	
	one(){
		
		let ran = this.random(0,10000);
		if(ran<6700){
			return  this.boxa;
		}
		if(ran<8200){
			return  this.boxb;
		}
		if(ran<8700){
			return  this.boxc;
		}
		if(ran<8950){
			return  this.boxd;
		}
		if(ran<9000){
			return  this.boxe;
		}
		if(ran<10000){
			return  this.boxf;
		}
	},
	two(){
		
		let ran = this.random(0,10000);
		if(ran<7200){
			return  this.boxa;
		}
		if(ran<8700){
			return  this.boxb;
		}
		if(ran<8950){
			return  this.boxd;
		}
		if(ran<9000){
			return  this.boxe;
		}
		if(ran<10000){
			return  this.boxf;
		}
	},
	three(){
		
		let ran = this.random(0,10000);
		if(ran<7190){
			return  this.boxa;
		}
		if(ran<8690){
			return  this.boxb;
		}
		if(ran<8990){
			return  this.boxc;
		}
		if(ran<9000){
			return  this.boxd;
		}
		if(ran<10000){
			return  this.boxf;
		}
	},
	four(){
		
		let ran = this.random(0,10000);
		if(ran<7490){
			return  this.boxa;
		}
		if(ran<8990){
			return  this.boxb;
		}
		if(ran<9000){
			return  this.boxd;
		}
		if(ran<10000){
			return  this.boxf;
		}
	},
	five(){
		
		let ran = this.random(0,10000);
		if(ran<7190){
			return  this.boxa;
		}
		if(ran<8690){
			return  this.boxb;
		}
		if(ran<8990){
			return  this.boxc;
		}
		if(ran<9000){
			return  this.boxe;
		}
		if(ran<10000){
			return  this.boxf;
		}
	},
	six(){
		
		let ran = this.random(0,10000);
		if(ran<7490){
			return  this.boxa; //积分宝箱74.9%
		}
		if(ran<8990){
			return  this.boxb; //红包宝箱15%
		}
		if(ran<9000){
			return  this.boxe; //金牛钥匙0.10%
		}
		if(ran<10000){
			return  this.boxf;  //旅游宝箱10%
		}
	},
	seven(){
		let ran = this.random(0,10000);
		if(ran<9500){
			return  1;//1元红包
		}
		if(ran<9900){
			return  5;
		}
		if(ran<9990){
			return  10;
		}
		if(ran<10000){
			return  50;
		}
	},
	eight(){
		let ran = this.random(0,10000);
		if(ran<6000){
			return  100;//100积分
		}
		if(ran<8000){
			return  500;
		}
		if(ran<9550){
			return  1000;
		}
		if(ran<9950){
			return  5000;
		}
		if(ran<10000){
			return  20000;
		}
	},
	nine(){
		let ran = this.random(0,10000);
		if(ran<1500){
			return  1; //1折张家界旅游；
		}
		if(ran<8000){
			return  1.5;
		}
		if(ran<9550){
			return  2;
		}
		if(ran<9950){
			return  2.5;
		}
		if(ran<10000){
			return  3;
		}
	}
		
}

module.exports.Probability = Probability;
