class Utils {
	constructor() {
	    
	}
	removeSpace(str){  //去除字符串全部空格
		return str.replace(/\s+/g,"");
	}
	checkColor(str){ //检测是否是6位16进制颜色代码
		let reg = /#([0-9a-fA-F]{6})$/g;
		str = str.replace(/\s+/g,"");
		return reg.test(str);
	}
	checkTel(str){ //检测手机号吗
		let reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/; 
		str = str.replace(/\s+/g,"");
		return reg.test(str);
	}
	checkCN(str){ //检测中文
		let reg = /^[\u2E80-\u9FFF]+$/;
		str = str.replace(/\s+/g,"");
		return reg.test(str);
	}
	checkCName(str){ //检测中文名
		  let reg= /^(([\u4e00-\u9fa5+\·?\u4e00-\u9fa5+]{2,6}$))/;
		  str = str.replace(/\s+/g,"");
		  return reg.test(str);
	}
	checkCompanyName(str){ //检测公司名字
		  let reg= /^(([\u4e00-\u9fa5+\·?\u4e00-\u9fa5+]{4,20}$))/;
		  str = str.replace(/\s+/g,"");
		  return reg.test(str);
	}
	checkID(str){ //检测身份证
		let reg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/
		str = str.replace(/\s+/g,"");
		return reg.test(str);
	}
	checkVC(str){ //检测四位验证码
		let reg = /^\d{4}$/;
		str = str.replace(/\s+/g,"");
		return reg.test(str);
	}
	checkMoney(str){
		let reg = /^[1-9]\d*$/;
		str = str.replace(/\s+/g,"");
		return reg.test(str);
	}
	encodeURL(str){
		return encodeURIComponent(str);
	}
	checkURL(str){
		let reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
		return reg.test(str);
	}
}

let utils = new Utils();

export default utils