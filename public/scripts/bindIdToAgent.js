$(document).ready(function(){
	
	$('.b-submit').click(function(element){
		let agentID = element.currentTarget.dataset.agentid;
		let productsId = element.currentTarget.dataset.productsid;
		window.localStorage.setItem('bind_agentID',agentID);
		window.localStorage.setItem('bind_productsId',productsId);
		$('#mask').css('display','');
	})
	
	$('.mask-cancel').click(function(element){
		$('#mask').css('display','none');
	})
	
	$('.mask-confirm').click(function(element){
		 let reg= /^(([\u4e00-\u9fa5+\·?\u4e00-\u9fa5+]{2,16}$))/;
		let bindID = window.localStorage['bindID'];
		let agentID = window.localStorage['bind_agentID'];
		let productsId = window.localStorage['bind_productsId'];
		let work = $('.m-class').val();
		if(!reg.test(work)){
			alert('请正确填写!');
			return;
		}
		let options = {
			bindID:bindID,
			agentID:agentID,
			productsId:productsId,
			work:work,
		}
		
		$.post('/api/bindandupdate',options,function(data,status){
			if(data.code===500){
				alert('系统出错了');
				return;
			}
			if(data.code===100){
				alert('出错了，请稍后再试');
				return;
			}
			window.history.replaceState(null, '', '/api/bindsuccessremind');
			window.location.href = '/api/bindsuccessremind';
			
		})
		
	})

})