require.config({
    paths: {
        'jquery': 'jquery-3.2.0.min',
        'jqueryUI': 'jquery-ui.min'
    }
});
define(['widget', 'jquery', 'jqueryUI'], function(widget, $, $UI) {
    function Window() {
        this.cfg = {
            title: '系统消息',
            content: '这是默认消息，你可以在main中定制你要展示的消息',
            width: 350,
            height: 200,
            text4alertBtn: '确定',
            text4comfirmBtn:'是',
            text4cancelBtn:'否',
            text4YpromptBtn:'确定',
            text4CpromptBtn:'取消',
            handler4comfirmBtn:null,
            handler4cancleBtn:null,
            isDraggable: true,
            dragHandle: null,
            hasMask: true,
            handle4alertbtn: null,
            hasClosebtn: false,
            handle4closebtn: null,
            skinClassName: null,
            defauleval4promptinput:'',
            handler4pYBtn:null,
            handler4pCBtn:null,
            isFocus:true,
        };
        this.handlers = {}
    }


    Window.prototype = $.extend({}, new widget.Widget(), { //extendhee合并操作

        renderUI: function() {

        	var footbox = '';
        	var contentbox = '<p>' + this.cfg.content + '</p>';

        	switch (this.cfg.wintype) {
        		case 'alert':
        			footbox = '<input class="btn alertbtn window_alertBtn" type="button" value="' + this.cfg.text4alertBtn + '"/>'
        			break;
        		case 'comfirm':
        			footbox = '<input class="btn confirmbtn1 window_comfirmBtn" type="button" value="' + this.cfg.text4comfirmBtn + '"/><input class="btn confirmbtn2 window_cancelBtn" type="button" value="' + this.cfg.text4cancelBtn + '"/>'
        			break;
        		case 'prompt':
        			contentbox = '<p>请输入您的姓名：</p><input id="J-txt" class="inp-box " type="text" value="'+ this.cfg.defauleval4promptinput +'"/>';
        			footbox = '<input class="btn confirmbtn1 window_ypromptBtn" type="button" value="' + this.cfg.text4YpromptBtn + '"/><input class="btn confirmbtn2 window_cpromptBtn" type="button" value="' + this.cfg.text4CpromptBtn + '"/>'
        			break;
        		default:
        			
        			break;

        	}

            this.boundingbox = $(
                '<div class="out-box">'
                	+ '<div class="tit-box"><span class="tit">' + this.cfg.title + '</span></div>' 
                	+ '<div class="content-box">'+ contentbox +'</div>' 
                	+ '<div class="foot-box">'+ footbox +'</div>' 
                + '</div>'
            );



            // 是否含有关闭按钮
            if (this.cfg.hasClosebtn) {
                var closebtn = '<span class="closebtn window_closeBtn"></span>';
                this.boundingbox.find('.tit-box').append(closebtn);
            };

            //是否是模态
            if (this.cfg.hasMask) {
               this. _mask = $('<div class="mask-box"></div>');
                this._mask.appendTo('body');
                // console.log('_mask'+_mask);
            };

            //输入框是否自动获取焦点
            if(this.cfg.isFocus){

            	$(document).ready(function(){ 
            		$('#J-txt').focus();
            	console.log('要获取焦点的'+$('#J-txt'));
            	});
            	
            }


        },
        bindUI: function() {
            var that = this;

            this.boundingbox.delegate('.window_alertBtn', 'click', function() {
                that.fire('alert');
                that.destroy();
            }).delegate('.window_closeBtn', 'click', function() {
                that.fire('close');
                that.destroy();
            }).delegate('.window_comfirmBtn', 'click', function() {
            	that.fire('comfirm');
                that.destroy();
            }).delegate('.window_cancelBtn', 'click', function() {
            	that.fire('cancle');
                that.destroy();
            }).delegate('.window_ypromptBtn', 'click', function() {
            	that.fire('prompt');
                that.destroy();
            }).delegate('.window_cpromptBtn', 'click', function() {
            	that.fire('promptc');
                that.destroy();
            });

            if (this.cfg.handle4closebtn) {
                that.on('close', this.cfg.handle4closebtn);
            };

            if (this.cfg.handle4alertbtn) {
                that.on('alert', this.cfg.handle4alertbtn);
            };

            if (this.cfg.handler4comfirmBtn) {
                that.on('comfirm', this.cfg.handler4comfirmBtn);
            };

            if (this.cfg.handler4cancleBtn) {
                that.on('cancle', this.cfg.handler4cancleBtn);
            };
             if (this.cfg.handler4pYBtn) {
                that.on('prompt', this.cfg.handler4pYBtn);
            };

            if (this.cfg.handler4pCBtn) {
                that.on('promptc', this.cfg.handler4pCBtn);
            };
        },
        syncUI: function() {
            // 基础样式
            this.boundingbox.css({
                width: this.cfg.width + 'px',
                height: this.cfg.height + 'px',
                left: (this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + 'px',
                top: (this.cfg.y || (window.innerHeight - this.cfg.height) / 2) + 'px'
            });

            //是否定制皮肤
            if (this.cfg.skinClassName) {
                this.boundingbox.addClass(this.cfg.skinClassName)
            };

            // 是否可拖动
            if (this.cfg.isDraggable) {
                if (this.cfg.dragHandle) {
                    this.boundingbox.draggable({ handle: this.cfg.dragHandle });
                } else {
                    this.boundingbox.draggable();
                }

            };


        },
        destructor: function() {
        	console.log('有执行到这里哦'+ this._mask );
            this._mask && this._mask.remove();
        },

        alert: function(cfg) {
            $.extend(this.cfg,cfg,{wintype:'alert'});
            this.render();
            return this;

        },

        comfirm: function(cfg){
        	$.extend(this.cfg,cfg,{wintype:'comfirm'});
            this.render();
            return this;
        },

        prompt: function(cfg){
        	$.extend(this.cfg,cfg,{wintype:'prompt'});
            this.render();
            return this;
        }




    });





    return {
        Window: Window
    }
});
