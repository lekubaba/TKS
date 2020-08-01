var http = require('http');
var https = require('https');
var express = require('express');
// var session = require('express-session');
// var RedisStore = require('connect-redis')(session);
var mongoose = require('./mongoose/connect.js');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var pug = require('pug');


var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true });
var app = express();
var options = {
	key:fs.readFileSync(__dirname+'/public/cert/214572188770669.key'),
	cert:fs.readFileSync(__dirname+'/public/cert/214572188770669.pem')
}
var multers=multer({dest: __dirname+'/public/images/picture'}).array("images");
var logger = require('./utils/logger.js').logger;
var cookieParser = require('cookie-parser');



app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));
app.use(multers);
app.use(cookieParser('im a secret for cookies'));





/*自动加载路由，引入自动加载路由模块*/
var route = require('./utils/route');

/*设置路由路径*/
var routesPath = __dirname +'/routes/'

/*初始化工具，传入参数*/

route.init(app,routesPath);


// http.createServer(app).listen(80);
http.createServer(app).listen(8099);
// https.createServer(options,app).listen(443);

logger.info('server is running:8099')
// logger.info('server is running:8084');







