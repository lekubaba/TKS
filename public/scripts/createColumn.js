$(document).ready(function(){   
    (function(){  
        var pHtmlStr = '';  
        for(var name in pc){  
            pHtmlStr = pHtmlStr + '<option>'+name+'</option>';  
        }  
        $("#province").html(pHtmlStr);  
        $("#province").change(function(){  
            var pname = $("#province option:selected").text();           
            var pHtmlStr = '';  
            var cityList = pc[pname];  
            for(var index in cityList){  
                pHtmlStr = pHtmlStr + '<option>'+cityList[index]+'</option>';  
            }  
            $("#city").html(pHtmlStr);
            
        });  
        $("#province").change()
    })();

    uploadInit()

    function uploadInit(){
        // 获取相关 DOM 节点的 ID
        var btnId = document.getElementById('icon-img');
        // var containerId = document.getElementById('icon-img');
        // 创建上传对象
        var uploader = Qiniu.uploader({
            runtimes: 'html5,flash,html4',    //上传模式,依次退化
            browse_button: btnId,       //上传选择的点选按钮，**必需**
            uptoken_url: '/uptoken',
            domain:'http://up.xiaohongxian.com/',
            // container: containerId,           //上传区域DOM ID，默认是browser_button的父元素，
            flash_swf_url: './Moxie.swf',  //引入flash,相对路径
            filters: {
                mime_types: [
                  //只允许上传图片文件 （注意，extensions中，逗号后面不要加空格）
                  { title: "图片文件", extensions: "jpg,gif,png,bmp" }
                ],
                max_file_size: '2048kb',           //最大文件体积限制
                prevent_duplicates:true  //不允许选区重复的图片
            },
            max_retries: 3,                   //上传失败最大重试次数
            multi_selection:false,
            chunk_size: '4mb',                //分块上传时，每片的体积
            resize:{crop:false,quality: 60,preserve_headers:false},
            auto_start: true,             //选择文件后自动上传，若关闭需要自己绑定事件触发上传
            unique_names:true,
 
            init: {
                'FilesAdded': function(up, files) {
                    plupload.each(files, function(file) {
                        // 文件添加进队列后,处理相关的事情
                        printLog('on FilesAdded');
                    });
                },
                'BeforeUpload': function(up, file) {
                    console.log(file)
                    // 每个文件上传前,处理相关的事情
                    printLog('on BeforeUpload');
                },
                'UploadProgress': function(up, file) {
                    // 显示进度
                    // $('#progress-bar').css({'width':file.percent+'vw'}).text('上传进度'+file.percent+'%')
                    // if(file.percent===100){
                    //     $('#progress-bar').text('上传完成')
                    // }
                },
                'FileUploaded': function(up, file, info) {
                    // 每个文件上传成功后,处理相关的事情
                    // 其中 info 是文件上传成功后，服务端返回的json，形式如
                    // {
                    //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                    //    "key": "gogopher.jpg"
                    //  }
                    printLog(info);
                    // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
                    
                    var domain = up.getOption('domain');
                    var res = $.parseJSON(info);
                    var sourceLink = domain + res.key; //获取上传成功后的文件的Url

                    printLog(sourceLink);
                    $('#icon-img').attr('src',sourceLink);
                    // 插入图片到editor
                    // editor.cmd.do('insertHtml', '<img src="' + sourceLink + '" style="max-width:100%;"/>')
                },
                'Error': function(up, err, errTip) {
                    //上传出错时,处理相关的事情
                    if(err.file.size>2097152){
                        $('.remind-kit').text('图片过大，不超过2MB');
                    }else{
                        $('.remind-kit').text('图片上传出错啦');
                    }
                    // console.log(err)
                    
                    printLog('on Error');
                },
                'UploadComplete': function() {
                    $('.remind-kit').text('');
                    setTimeout(function(){
                        $('#progress-bar').animate({'width':'0vw'},'slow')
                    },2000);
                    
                    //队列文件处理完毕后,处理相关的事情
                    printLog('on UploadComplete');
                }
                // Key 函数如果有需要自行配置，无特殊需要请注释
                // ,
                // 'Key': function(up, file) {
                //     // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                //     // 该配置必须要在 unique_names: false , save_key: false 时才生效
                //     var key = "";
                //     // do something with key here
                //     return key
                // }
            }
            // domain 为七牛空间（bucket)对应的域名，选择某个空间后，可通过"空间设置->基本设置->域名设置"查看获取
            // uploader 为一个plupload对象，继承了所有plupload的方法，参考http://plupload.com/docs


        })
    }
    // 封装 console.log 函数
    function printLog(title, info) {
        window.console && console.log(title, info);
    }


	$('.column-buttons').click(function(e){
        var loanImg = $('#icon-img').attr('src');
		var loanName= $('#loanName').val().replace(/\s/ig,'');
        var company = $('#company').val().replace(/\s/ig,'');
		var zone = $("#city option:selected").text().split('市')[0];
        var data = {company:company,loanName:loanName,zone:zone,loanImg:loanImg}
        if(loanImg.split('.').length<4){
            return $('.icon-img').text('请添加logo').css({'color':'#ff5545'});
        }else if(loanName.length<2){
            return $('#loanName').val('名称不全').css({'color':'#ff5545'})
        }else if(company.length<3){
            return $('#company').val('名称不全').css({'color':'#ff5545'})
        }else if(zone==='城'){
            return $('#zone').text('请选择城市').css({'color':'#ff5545'})
        }else{
            $.post('/addcolumn',data,function(result,status){
                return window.location.href='home';
            });
        }
    })

});