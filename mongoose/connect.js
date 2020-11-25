var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var logger = require('../utils/logger.js').logger;
let {DBURI} = require('../config');

var DB_URL   = DBURI;

// mongoose.Promise = require('bluebird');

mongoose.connect(DB_URL,{useMongoClient: true})
		.then(function(){
			logger.info('已与服务器连接');
		}).catch(function(err){
			logger.info('连接出错了');
		})

// mongoose.connection.on('connected',function(){
// 	logger.info('数据库连接成功');
// });
// mongoose.connection.on('error',function(){
// 	logger.error('连接异常');

// });
mongoose.connection.on('disconnected',function(){
	logger.info('连接已经断开');

});


module.exports = mongoose;