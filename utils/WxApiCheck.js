const crypto = require('crypto');
const hash = crypto.createHash('sha1');


/* 
	验证是否是微信服务端发送来的结果
*/

function WxApiCheck(query,token){
	let signature = query.signature;
	let timestamp = query.timestamp;
	let nonce = query.nonce;
	let echostr = query.echostr;
	//按字典进行排序
	let oriArray = new Array();
	oriArray[0] = nonce;
	oriArray[1] = timestamp;
	oriArray[2] = token;
	oriArray.sort();
	let original = oriArray.join('');
	hash.update(original);
	let signature1 = hash.digest('hex');
	if(signature == signature1){
		return true;
	}else{
		return false;
	}
}

module.exports.WxApiCheck = WxApiCheck;