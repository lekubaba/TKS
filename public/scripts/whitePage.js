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
	
	function removeContent(element){
		setTimeout(function(){
			element.innerHTML = '';
		},3000);
	}
	
	// 页面加载判断是否有code,
	
	(function onLoad(){
		let redirect_uri = window.location.href;
		let code = parseURL(redirect_uri).params.code;
		
		// 没有code,获取CODE
		if(!code){
			let redirect_url = window.location.href;
			let APPID = 'wx1d23498d4a220713'; //测试
			// let APPID = 'wx473b861c5a5a8dbb';
			redirect_url = encodeURIComponent(redirect_url);
			let bindIDS = redirect_uri.split('/');
			let bindID = bindIDS[bindIDS.length - 1];
			window.localStorage.setItem('bindID',bindID);
			window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+APPID+'&redirect_uri='+redirect_url+'&response_type=code&scope=snsapi_base&state=lekubaba#wechat_redirect';
		}else{
			let options = {code:code,}
			$.post('/api/bindcode',options,function(data,status){
				if(data.code===500){
					alert('系统出错了');
					return;
				}
				if(data.code===100){
					$('#container').css('display','');
					return;
				}
				
				window.location.href = '/api/bindpage/'+data.agentID
				return;
				
			})
		}
	})();
	

})