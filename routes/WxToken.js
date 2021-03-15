var mongoose = require('mongoose');
let {Agent,Customer,Products,Order,Ten} = require('../mongoose/modelSchema')
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var path = require('path');
var logger = require('../utils/logger').logger;
let {formatDate} = require('../utils/DateUtil');
let {getToken} = require('../utils/GetToken.js');

getToken();

setInterval(function(e){
	getToken();
},90*60*1000);


module.exports = router;
