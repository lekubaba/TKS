$(document).ready(function(){	

	// 用户点击登陆时出发click事件

	$('.tk-vips-items').click(function(e){
		
		let agentID = $('.tk-vips-items').attr('data-agentid');
		let productsId = $('.tk-vips-items').attr('data-productsid');
		let uri = '/api/rigisteragentpage/'+agentID+'/'+productsId;
		
		window.location.href= uri;
		
		
	})
	
	

})