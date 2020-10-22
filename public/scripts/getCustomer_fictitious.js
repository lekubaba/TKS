$(document).ready(function(){	
	
	$('.buy-tk-pay').click(function(e){
		let openID = $('.buy-tk-pay').attr('data-openid');
		let productsId = $('.buy-tk-pay').attr('data-productsid');
		
		window.location.href = '/api/paypage_fictitious/'+openID+'/'+productsId;
		
	})

})