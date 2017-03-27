require.config({
	paths:{
		'jquery':'jquery-3.2.0.min',
		'jqueryUI':'jquery-ui.min'
	}
});
define(['jquery','jqueryUI'],function($,$UI){
	function Window(){
		this.cfg = {
			title:'系统消息',
			content: '',
			width: 400,
			height: 250,
			btntext:'确定',
			isDraggable:true,
			dragHandle:null,
			hasMask:true,
			handle: null,
			hasClosebtn:false,
			handle4closebtn:null,
			skinClassName:null
		};
		this.handlers = {}
	}
	Window.prototype = {
		on:function(type,handler){ //绑定事件
			if(typeof this.handlers[type] == 'undefined'){
				this.handlers[type] = [];
			}else{
				this.handlers[type].push(handler);
			}
		},
		fire:function(type,data){ //触发事件
			if(this.handlers[type] instanceof Array){
				var handlers = this.handlers[type];
				for(var i = 0,len = handlers.length; i<len; i++){
					handlers[i](data);
				}
			}
		},
		alert:function(cfg){
			var CFG = $.extend(this.cfg,cfg);
			var mask = null;
			if(CFG.hasMask){
				mask = $('<div class="mask-box"></div>');
				mask.appendTo('body');

			};
			
			var boxout = $('<div class="out-box">'
								+'<div class="tit-box"><span class="tit">'+ CFG.title +'</span></div>'
								+'<div class="content-box"><p>'+ CFG.content +'</p></div>'
								+'<div class="foot-box"><input class="btn" type="button" value="'+ CFG.btntext +'"/></div>'
						+'</div>');
			boxout.appendTo('body');

			if(CFG.isDraggable){
				if(CFG.dragHandle){
					boxout.draggable({handle:CFG.dragHandle});
				}else{
					boxout.draggable();
				}
				
			};
			
			$('.btn').click(function() {
				CFG.handle && CFG.handle();
				boxout.remove();
				mask.remove();
			});
			
			boxout.css({
				width:CFG.width +'px',
				height:CFG.height + 'px',
				left:(CFG.x || (window.innerWidth-CFG.width)/2) +'px',
				top:(CFG.y || (window.innerHeight-CFG.height)/2) + 'px'
			});

			if(CFG.hasClosebtn){
				var closebtn = '<span class="closebtn J-close"></span';
				$('.tit-box').append(closebtn);
				$('.J-close').on('click',function(){
					CFG.handle4closebtn && CFG.handle4closebtn();
					boxout.remove();
					mask.remove();
				});
			};

			if(CFG.skinClassName){
				boxout.addClass(CFG.skinClassName)
			};
			
		}
	}

	return {
		Window: Window
	}
});