$(document).ready(function(){	
	
	 /* 
	 * 思路：进入执行load函数，判断是否有code,有则限时填写信息页面，没有则什么都不做，
	 * 只有用户点击了登陆才会显示code;
	 */
	
	// url解析；
	function parseURL(url) {  
		var a =  document.createElement('a');  
		a.href = url;  
		return {  
			source: url,  
			protocol: a.protocol.replace(':',''),  
			host: a.hostname,  
			port: a.port,  
			query: a.search,  
			params: (function(){  
				var ret = {},  
				seg = a.search.replace(/^\?/,'').split('&'),  
				len = seg.length, i = 0, s;  
				for (;i<len;i++) {  
					if (!seg[i]) { continue; }  
					s = seg[i].split('=');  
					ret[s[0]] = s[1];  
				}  
				return ret;  
			})(),  
			file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],  
			hash: a.hash.replace('#',''),  
			path: a.pathname.replace(/^([^\/])/,'/$1'),  
			relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],  
			segments: a.pathname.replace(/^\//,'').split('/')  
		};  
	}
	
	//60秒倒计时；
	
	function countDownSixty(){
		
		var oBtn = document.getElementsByTagName('button')[0];
		var time = 60;
		var timer = null;
		oBtn.innerHTML = time;
		oBtn.setAttribute('disabled', 'disabled');  
		// oBtn.setAttribute('class', 'disabled');   
		timer = setInterval(function(){
		// 定时器到底了 兄弟们回家啦
		if(time == 1){
			clearInterval(timer);       
			oBtn.innerHTML = '获取验证码';  
			oBtn.removeAttribute('disabled'); 
		  // oBtn.removeAttribute('class');  
		}else{
			time--;
			oBtn.innerHTML = time;
		}
		}, 1000)
	}
	
	function removeContent(element){
		setTimeout(function(){
			element.innerHTML = '';
		},3000);
	}
	
	function checkTel(str){ //检测手机号吗
		let reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/; 
		return reg.test(str);
	}
	function checkCName(str){ //检测中文名
		  let reg= /^(([\u4e00-\u9fa5+\·?\u4e00-\u9fa5+]{2,6}$))/;
		  return reg.test(str);
	}
	
	function checkVC(str){ //检测四位验证码
		let reg = /^\d{4}$/;
		return reg.test(str);
	}
	
	// 页面加载判断是否有code,
	
	(function onLoad(){
		let redirect_uri = window.location.href;
		let code = parseURL(redirect_uri).params.code;
		// 没有code,则什么都不做
		if(!code){
			window.localStorage.removeItem('customerID'); //新进入页面清理用户ID,
			return;
		// 有code，则说明用户点击了申请按钮
		}else{
			
			let agentID = $('.mask-confirm').attr('data-agentid');
			let productsId = $('.mask-confirm').attr('data-productsid');
			
			let options = {
				code:code,
				agentID:agentID,
				productsId:productsId,
			}
			
			$.post('/api/customer/code',options,function(data,status){
				
				if(data.code===200){
					let customerID = data.customerID;
					window.localStorage.setItem('customerID',customerID);
					$('#mask').css('display','');
					return;
				}else if(data.code===500){
					return alert('系统出错了');
					
					//用户带code刷新页面，这是code已经失效，服务端返回失效码900；
				}else if(data.code===900){
					
					window.location.href =document.location.pathname;
					return;
				}
				
			})
		}
	})();
	
	// 用户点触发click事件
	$('.tk-vip-item').click(function(e){
		
		let customerID = window.localStorage['customerID']?window.localStorage['customerID']:null;
		if(customerID){
			$('#mask').css('display','');
			return;
		}
		
		let redirect_url = window.location.href;
		// let APPID = 'wx1d23498d4a220713'; //测试
		let APPID = 'wx473b861c5a5a8dbb';
		redirect_url = encodeURIComponent(redirect_url);
		window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+APPID+'&redirect_uri='+redirect_url+'&response_type=code&scope=snsapi_userinfo&state=lekubaba#wechat_redirect';
		
		
		
			
	})
	
	$('.mask-cancel').click(function(e){
		
		window.location.href =document.location.pathname;
		
		$('#mask').css('display','none');
			
	})
	
	// 获取验证码
	
	$('.get-check-number').click(function(e){
		
		let message = document.getElementById('message');
		let customerPhoneNumber = $('.customer-tel').val();
		// 手机号为空
		if(customerPhoneNumber===''){
			message.innerHTML = '手机号不能为空';
			removeContent(message);
			return;
		}
		// 手机号格式错误
		if(!checkTel(customerPhoneNumber)){
			message.innerHTML = '手机号格式错误';
			removeContent(message);
			return;
		}
		// 60秒倒计时提醒；60秒以后可重新获取验证码；
		countDownSixty();
		let infoData = {
			tel:customerPhoneNumber,
		}
		$.post('/api/alicode',infoData,function(data,status){
			if(data.code===500){
				message.innerHTML = '系统出错了';
				removeContent(message);
				return;
			}
			let dataset = document.getElementById('dataset');
			dataset.dataset.code = data.alicode;
			message.innerHTML = '验证码已发送';
			removeContent(message);
			return;
		})
		
	
	})
	
	
	$('.mask-confirm').click(function(e){
		
		let customerID = window.localStorage['customerID'];
		let agentID = $('.mask-confirm').attr('data-agentid');
		let productsId = $('.mask-confirm').attr('data-productsid');
		let link = $('.mask-confirm').attr('data-link');
		let alicode = $('.mask-confirm').attr('data-code');
		
		let message = document.getElementById('message');
		let customerName = $('.customer-name').val();
		let customerPhoneNumber = $('.customer-tel').val();
		let verificationCode = $('.rna-input-check').val();
		
		if(!customerPhoneNumber||!customerName||!verificationCode){
			message.innerHTML = '内容不能为空';
			removeContent(message);
			return;
		}
		
		if(!checkCName(customerName)||!checkTel(customerPhoneNumber)||!checkVC(verificationCode)){
			message.innerHTML = '输入格式错误';
			removeContent(message);
			return;
		}
		
		if(alicode!==verificationCode){
			message.innerHTML = '验证码错误';
			removeContent(message);
			return;
		}
		
		let dataset = document.getElementById('dataset');
		dataset.dataset.code = '';
		
		let infoData = {
			customerID:customerID, //用户自身ID,
			agentID:agentID, //订单归属人agentID
			productsId:productsId, //客户申请了那个产品
			customerName:customerName, //客户名字
			customerPhoneNumber:customerPhoneNumber, //客户手机号
			verificationCode:verificationCode, //验证码
		}
		
		$.post('/api/getcustomerinfo_link',infoData,function(data,status){
			if(data.code===200){
				window.location.href = link;
			}
		})
	
	})	

})