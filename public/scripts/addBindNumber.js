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
		var reg2 = /^\+?[1-9][0-9]*$/; 
		var message = document.getElementById('message');
		// reg.test(str);
		var maxBind = $('.ismaxbind').val();
		maxBind = Number(maxBind);
		var agentID = $('.isagentid').val();
		if(!maxBind||!agentID){
			message.innerHTML = '内容不能为空';
			removeContent(message);
			return;
		}
		
		if(!reg2.test(maxBind)||!reg.test(agentID)){
			message.innerHTML = '格式不正确';
			removeContent(message);
			return;
		}
		
		if(maxBind>500){
			message.innerHTML = '单次申请不能超过500';
			removeContent(message);
			return;
		}
		
		var options = {maxBind:maxBind,agentID:agentID};
		
		$.post('/api/tongkeaddmaxbind_add',options,function(data,status){
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
				message.innerHTML = '超了，还剩余'+data.spaceBind+',单人最多3000';
				removeContent(message);
				return;
			}
			if(data.code===200){
				$('#mask').css('display','');
				removeMask('mask');
				$('.ismaxbind').val('');
				$('.isagentid').val('');
			}
			
		})

	})
	
	

})