'use strict'

var Koa = require('koa');
var sha1 = require('sha1');

var config = {
    wechat:{
        appID:'wx1d23498d4a220713', //填写你自己的appID
        appSecret:'0cce653894d5654f1490bf4fd95af392',  //填写你自己的appSecret
        token:'lekubaba'  //填写你自己的token
    }
};

var app = new Koa();

app.use(function *(next){
    var token = config.wechat.token;
    var signature = this.query.signature;
    var nonce = this.query.nonce;
    var timestamp = this.query.timestamp;
    var echostr = this.query.echostr;
    var str = [token,timestamp,nonce].sort().join(''); //按字典排序，拼接字符串
    var sha = sha1(str); //加密
    this.body = (sha === signature)? echostr + '' : 'failed';  //比较并返回结果
});
app.listen(8080);
