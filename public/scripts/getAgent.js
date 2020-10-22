$(document).ready(function(){	

	// 用户点击登陆时出发click事件

	$('.tk-vips-items').click(function(e){
		
		let openID = $('.tk-vips-items').attr('data-openid');
		let productsId = $('.tk-vips-items').attr('data-productsid');
		let uri = '/api/rigisteragentpage/'+openID+'/'+productsId;
		
		window.location.href= uri;
		
		
	})
	
	

})