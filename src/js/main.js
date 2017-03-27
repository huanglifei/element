// main.js

require.config({
    paths: {
        'jquery': 'jquery-3.2.0.min'
    }
});
require(['jquery', 'window'], function($, w) {

    $('.J-btn').on('click', function() {
        new w.Window().alert({
        	// skinClassName:'windows-skin-a',
            title: '测试窗口标题',
            dragHandle:'.tit-box',
            btntext:'关闭',
            content: '这是【奋斗的菜鸟】自制的弹窗组件，如有疑问请致电：15296479365，或发送邮件至：654253289@qq.com！欢迎骚扰:-D',
            width: 350,
            height: 200,
            y:60,
            hasClosebtn: true,
            handle: function() {
                alert('你点击了--底部--的关闭按钮哦！');
            },
            handle4closebtn: function() {
                alert('你点击了--顶部--关闭按钮哦！');
            }
        });
    });

});
