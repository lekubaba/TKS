$(document).ready(function(){
	
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
	
	
	function checkWX(str){
		let reg1 = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
		let reg2 = /^[1-9]\d{4,9}$/;
		let reg3 = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
		
		let is1 = reg1.test(str);
		let is2 = reg2.test(str);
		let is3 = reg3.test(str);
		
		return is1||is2||is3;
	}
	function checkTel(str){ //检测手机号吗
		let reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/; 
		return reg.test(str);
	}
	
	function checkVC(str){ //检测四位验证码
		let reg = /^\d{4}$/;
		return reg.test(str);
	}
	
	function removeContent(element){
		setTimeout(function(){
			element.innerHTML = '';
		},3000);
	}
	
	// 页面加载判断是否有code,
	
	(function onLoad(){
		let redirect_uri = window.location.href;
		let code = parseURL(redirect_uri).params.code;
		// 没有code,则什么都不做
		if(!code){
			return;
		// 有code，则说明用户点击了注册代理按钮
		}else{
			
			let agentID = $('.register-confirm').attr('data-agentid');
			let productsId = $('.register-confirm').attr('data-productsid');
			let options = {
				code:code,
				agentID:agentID,
				productsId:productsId,
				agentPhoneNumber:window.localStorage['agentPhoneNumber']?window.localStorage['agentPhoneNumber']:'未设置',
				province:window.localStorage['province']?window.localStorage['province']:'未设置',
				city:window.localStorage['city']?window.localStorage['city']:'未设置',
			}
			$.post('/api/code',options,function(data,status){
				// 将服务端响应的数据存储到Storage,并记录登陆状态；
				if(data.code===500){
					return alert('系统出错了');
				}
				
				//清理保存的数据；
				window.localStorage.removeItem('agentPhoneNumber');
				window.localStorage.removeItem('province');
				window.localStorage.removeItem('city');
				window.location.href = '/api/followwechat';
				return;
				
			})
		}
	})();
		
	
	// 用户点击登陆时触发click事件

	$('.register-confirm').click(function(e){
		let regTel = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
		let regCode = /^\d{4}$/;
		let message2 = document.getElementById('message2');
		let message = document.getElementById('message');
		let verificationCode = $('.rna-input-check').val();
		let province = window.localStorage['province'];
		let city = window.localStorage['city'];
		let alicode = $('.register-confirm').attr('data-code');
		let agentPhoneNumber = window.localStorage['agentPhoneNumber'];
		
		if(!province||!city){
			message.innerHTML = '请选择所在地区';
			removeContent(message);
			return;
		}
		
		if(!agentPhoneNumber||!verificationCode){
			message2.innerHTML = '请填写内容';
			removeContent(message2);
			return;
		}
		
		if(!regTel.test(agentPhoneNumber)||!regCode.test(verificationCode)){
			message2.innerHTML = '输入格式错误';
			removeContent(message2);
			return;
		}
		if(alicode!==verificationCode){
			message2.innerHTML = '验证码错误';
			removeContent(message2);
			return;
		}
			
		let redirect_url = window.location.href;
		let APPID = 'wx1d23498d4a220713'; //测试
		// let APPID = 'wx473b861c5a5a8dbb';
		redirect_url = encodeURIComponent(redirect_url);
		window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+APPID+'&redirect_uri='+redirect_url+'&response_type=code&scope=snsapi_userinfo&state=lekubaba#wechat_redirect';
	})
	
	$('.close-city').click(function(e){
		$('.mask-city').css('display','none');
		
	})
	
	$('.container').click(function(e){
		$('.mask-city').css('display','');
	})
	
	$('.sure-city').click(function(e){
		var province = $("#province").find("option:selected").text();
		var city = $("#city").find("option:selected").text();
		if(province=='所在省'||city=='所在市'){
			let message = document.getElementById('message1');
			message.innerHTML = '请选择所在地区';
			removeContent(message);
			return;
		}
		let address = document.getElementById('address-a');
		address.innerHTML = province+','+city;
		window.localStorage.setItem('province',province);
		window.localStorage.setItem('city',city);
		$('.mask-city').css('display','none');
		
	})
	
	// 获取验证码
	
	$('.get-check-number').click(function(e){
		
		let message2 = document.getElementById('message2');
		let agentPhoneNumber = $('.register-input').val();
		// 手机号为空
		if(agentPhoneNumber===''){
			message2.innerHTML = '手机号不能为空';
			removeContent(message2);
			return;
		}
		// 手机号格式错误
		if(!checkTel(agentPhoneNumber)){
			message2.innerHTML = '手机号格式错误';
			removeContent(message2);
			return;
		}
		
		// 60秒倒计时提醒；60秒以后可重新获取验证码；
		countDownSixty();
		let infoData = {
			tel:agentPhoneNumber,
		}
		$.post('/api/alicode',infoData,function(data,status){
			if(data.code===500){
				message2.innerHTML = '系统出错了';
				removeContent(message2);
				return;
			}
			let dataset = document.getElementById('dataset');
			dataset.dataset.code = data.alicode;
			message2.innerHTML = '验证码已发送';
			removeContent(message2);
			window.localStorage.setItem('agentPhoneNumber',agentPhoneNumber);
			return;
		})
		
	
	})
	
	

})