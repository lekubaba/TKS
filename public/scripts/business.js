$(document).ready(function(){	
	
	
	function removeContent(element){
		setTimeout(function(){
			element.innerHTML = '';
		},3000);
	}
	function removeMask(idname){
		setTimeout(function(){
			$('#'+idname).css('display','none');
		},5000);
	}
	$('.commit').click(function(e){
		var reg = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
		var message = document.getElementById('message');
		// reg.test(str);
		var businessID = $('.isbusiness').val();
		var memberID = $('.ismember').val();
		if(!businessID||!memberID){
			message.innerHTML = '内容不能为空';
			removeContent(message);
			return;
		}
		if(!reg.test(businessID)||!reg.test(memberID)){
			message.innerHTML = '格式不正确';
			removeContent(message);
			return;
		}
		
		var options = {businessID:businessID,memberID:memberID};
		
		$.post('/api/tongkebusiness_add',options,function(data,status){
			if(data.code===500){
				message.innerHTML = '系统故障，请稍后再试';
				removeContent(message);
				return;
			}
			if(data.code===100){
				message.innerHTML = 'ID不正确';
				removeContent(message);
				return;
			}
			if(data.code===101){
				message.innerHTML = '无权限添加';
				removeContent(message);
				return;
			}
			if(data.code===102){
				message.innerHTML = '名额已满，限30名；';
				removeContent(message);
				return;
			}
			if(data.code===103){
				message.innerHTML = '已经是商户，不能重复设置！';
				removeContent(message);
				return;
			}
			if(data.code===200){
				$('#mask').css('display','');
				removeMask('mask');
				$('.isbusiness').val('');
			}
			
		})

	})
	
	

})