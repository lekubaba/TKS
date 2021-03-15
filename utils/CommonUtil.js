/**
 * Created by Arvin on 2016/12/19.
 */
var requestIp = require('request-ip');
var URL = require('url');

var CommonUtil = {
    getNicknameFromMobile: function (str) {
        return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    },
    isNicknameForMobile: function (str) {
        return /(\d{3})\*\*\*\*(\d{4})/.test(str);
    },
    trim: function (str) {
        if (str) {
            return str.replace(/^\s+|\s+$/g,"");
        }
        return str;
    },
    /**
     * 获取客户端IP
     * @param req
     * @returns {*|string|string}
     */
    getClientIp: function(req) {
        var register_os = req.headers.os;
        var register_ip = requestIp.getClientIp(req) || "";
        return register_ip;
    },

    /**
     * 工具方法：将驼峰属性转为下划线属性
     * @param text
     * @returns {*}
     */
    CamelCaseToUnderline: function(text){
        for(var i = 0; i < text.length; i++){
            var c = text.charAt(i);
            if(c >= 'A' && c <= 'Z') {
                var r = "_" + c.toLowerCase();
                text = text.replace(new RegExp(c,'gm'),r);
            }
        }
        return text;
    },

    /**
     * 工具方法：将下划线属性转为驼峰属性
     * @param s 驼峰属性字符串
     * @returns {*} 下划线属性字符串
     */
    underlineToCamelCase: function(s) {
        for(var i = 0; i < s.length; i++) {
            if(s.charAt(i) == "_") {
                s = s.replace(new RegExp("_"+s.charAt(i+1),'gm'),s.charAt(i+1).toUpperCase())
            }
        }
        return s;
    },

    /**
     * 数组去重
     * @param arr
     * @returns {Array}
     */
    arrUnique: function(arr){
        var res = [];
        var obj = {};
        for(var i = 0; i < arr.length; i++){
            if(!obj[arr[i]]){
                res.push(arr[i]);
                obj[arr[i]] = 1;
            }
        }
        return res;
    },

    /**
     * 字符串出现的频率
     * @param s
     * @returns {{}}
     */
    strFre: function(s) {
        var obj = {};
        var temp = null;
        for(var i = 0; i < s.length; i++) {
            temp = s.charAt(i);
            if(typeof obj[temp] == "undefined") {
                obj[temp] = 1;
            }else {
                obj[temp] +=  1;
            }
        }
        return obj;
    },

    /**
     * 数组元素出现的次数
     * @param arr
     * @returns {{}}
     */
    arrFre: function(arr) {
        var obj = {};
        var temp = null;
        for(var i = 0; i < arr.length; i++) {
            temp = arr[i];
            if(typeof obj[temp] == "undefined") {
                obj[temp] = 1;
            }else {
                obj[temp] +=  1;
            }
        }
        return obj;
    },
	getKey:function(str){
		let strObject = URL.parse(str);
		let pathname = strObject.pathname;
		let key = pathname.split('/')[1];
		return key;
	},
	/* *
	  *让一个数保留两位小数点并四舍五入；
	 */
	floatNum :function(num){
		return Number(num.toFixed(2));
	},
	/* 
		乘法保留精度
	*/
	accMul:function(arg1,arg2) { 
		
		var m=0,s1=arg1.toString(),s2=arg2.toString(); 
		try{m+=s1.split(".")[1].length}catch(e){};
		try{m+=s2.split(".")[1].length}catch(e){};
		return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
		
	},
	
	/* 除法保留精度 */
	
	accDiv:function(arg1,arg2){ 
		
		var t1=0,t2=0,r1,r2; 
		try{t1=arg1.toString().split(".")[1].length}catch(e){} 
		try{t2=arg2.toString().split(".")[1].length}catch(e){} 
		with(Math){ 
			r1=Number(arg1.toString().replace(".","")) 
			r2=Number(arg2.toString().replace(".","")) 
			return accMul((r1/r2),pow(10,t2-t1)); 
		}
		
	},
	/* 加法保留精度 */
	accAdd:function(arg1,arg2){ 
		
		var r1,r2,m; 
		try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0} 
		try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0} 
		m=Math.pow(10,Math.max(r1,r2)) 
		return (arg1*m+arg2*m)/m 
		
	},
	/* 减法保留精度 */
	Subtr:function (arg1,arg2){ 
		
		var r1,r2,m,n; 
		try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0} 
		try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0} 
		m=Math.pow(10,Math.max(r1,r2)); 
		n=(r1>=r2)?r1:r2; 
		return ((arg1*m-arg2*m)/m).toFixed(n); 
		
	},
	/**
	 * 提供总业绩，和佣金阶梯数组
	 * @求总佣金
	 * @求当前佣金比例
	 * @求距离下一阶段还差多少业绩；
	 * @[50,150,500,1500,2500,5000,10000,10000];
	 */
	totalRate:function(sales,arr){
		
		
		let len = arr.length;
		let curRate,lessMuch,totalCommission;
		for(var i = 0;i<len;i++){
			let x = arr[i].sales*10000;
			/**
			 * 如果总业绩大于当前item的sales且不是最后一个item,说明要按照下一轮循环；
			 * @如果是最后一个item，则按照最后一个item的值和比例来计算；
			 * @如果不是最后一个，则按照当前
			 */
			if(sales>x){
				if(i!==len-1){
					continue;
				}else{
					curRate = arr[i].rate;
					lessMuch=0;
					totalCommission=sales*arr[i].rate;
					break;
				}
				
			}else{
		
				curRate = arr[i].rate;
				lessMuch=x - sales;
				totalCommission=sales*arr[i].rate;
				break;
			}
			
		}
		// 返回当前佣金比例，差距，总佣金；
		return {curRate:curRate,lessMuch:lessMuch,totalCommission:totalCommission};
		
	},
	/**
	 * 数组去重，并不是将重复的只留下一个，而是只要是重复的，都清理掉；
	 */
	
	arrTop:function(arr){
		let newArray = [];
		for(var i=0;i<arr.length;i++){
		    var count = 0;
		    for(var j=0;j<arr.length;j++){
		        if(arr[i]==arr[j]){
		            count++;
		        }
		    }
		    if(count==1){
		        newArray = newArray.concat(arr[i]);
		    }
		}
		return newArray;
	},
	
	/* 数组求和 */
	
	arrSum:function(arr){
		
		var s = 0;
		
		for (var i=arr.length-1; i>=0; i--) {
		s += arr[i];
		
		}
		
		return s;
	}
	
};


module.exports = CommonUtil;