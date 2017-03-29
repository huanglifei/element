// main.js

require.config({
    paths: {
        'jquery': 'jquery-3.2.0.min'
    }
});
require(['jquery', 'window'], function($, w) {

    $('.J-btn').on('click', function() {

    	var win = new w.Window();
        win.alert({
        	// skinClassName:'windows-skin-a',
            title: '测试窗口标题',
            dragHandle:'.tit-box',
            btntext:'关闭',
            content: '这是【奋斗的菜鸟】自制的弹窗组件，该组件可换肤，定制窗口标题，按钮文字，右上角关闭按钮的显示隐藏，左下角按钮的文字定制，以及自定义事件，如有疑问请致电：15296479365，或发送邮件至：654253289@qq.com！欢迎骚扰:-D',
            width: 350,
            height: 200,
            y:60,
            hasClosebtn: true,
            handle4alertbtn: function() {
                alert('你点击了--底部--的关闭按钮哦！');
            },
            handle4closebtn: function() {
                alert('你点击了--顶部--关闭按钮哦！');
            }
        }).on('alert',function(){
        	alert('你--第二次--点击了底部按钮！');
        });
    });

    //
    $('.J-comfirm').on('click',function(){
    	var win_confirm = new w.Window();
    	win_confirm.comfirm({
    		  y:60,
    		  handler4comfirmBtn:function(){
    		  	alert('你点击了“是”！');
    		  },
    		  handler4cancleBtn:function(){
    		  	alert('你点击了“否”！')
    		  }
    	});
    });

    $('.J-prompt').on('click',function(){
    	var win_prompt = new w.Window();
    	win_prompt.prompt({
    		 y:60,
    		 handler4pYBtn:function(){
    		 	var str = $('.J-txt').val();
    		 	if(str !== null && str !=='' ){
    		 		alert('您输入了 '+ str);
    		 	}else {
    		 		alert('没有输入');
    		 	}

    		 }
    		
    	});
    });

});
