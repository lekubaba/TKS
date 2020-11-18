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
	
	
	function checkWX(str){
		let reg1 = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
		let reg2 = /^[1-9]\d{4,9}$/;
		let reg3 = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
		
		let is1 = reg1.test(str);
		let is2 = reg2.test(str);
		let is3 = reg3.test(str);
		
		return is1||is2||is3;
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
				agentWechat:localStorage['agentWechat']?localStorage['agentWechat']:'还没设置微信'
			}
			$.post('/api/code',options,function(data,status){
				// 将服务端响应的数据存储到Storage,并记录登陆状态；
				if(data.code===500){
					return alert('系统出错了');
				}
				window.localStorage.setItem('agentAvatarImg',data.agentAvatarImg);
				window.localStorage.setItem('agentNickname',data.agentNickname);
				window.localStorage.setItem('isPromotion',data.isPromotion);
				window.localStorage.setItem('isAddLevel',data.isAddLevel);
				window.localStorage.setItem('isVIP',data.isVIP);
				window.localStorage.setItem('color',data.color);
				window.localStorage.setItem('agentID',data.agentID);
				window.localStorage.setItem('productsId',data.productsId);
				window.localStorage.setItem('isLogin',true);
				window.location.href = '/api/followwechat';
				return;
				
			})
		}
	})();
		
	
	// 用户点击登陆时触发click事件

	$('.register-confirm').click(function(e){
		
		let message = document.getElementById('message');
		let agentWechat = $('.register-input').val();
		
		if(!agentWechat){
			message.innerHTML = '内容不能为空';
			removeContent(message);
			return;
		}
		
		if(!checkWX(agentWechat)){
			message.innerHTML = '微信格式错误';
			removeContent(message);
			return;
		}
		window.localStorage.setItem('agentWechat',agentWechat);
			
		let redirect_url = window.location.href;
		// let APPID = 'wx1d23498d4a220713'; //测试
		let APPID = 'wx9e1db1b2a18b4a3d';
		redirect_url = encodeURIComponent(redirect_url);
		window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+APPID+'&redirect_uri='+redirect_url+'&response_type=code&scope=snsapi_userinfo&state=lekubaba#wechat_redirect';
	})
	
	

})