require.config({
    paths: {
        'jquery': 'jquery-3.2.0.min',
    }
});
define(['jquery'], function($) {
    function Widget() {
        this.boundingbox = null; //属性，最外层容器
    }
    Widget.prototype = {

        //自定义事件可监听多个同名事件
        on: function(type, handler) { //绑定事件
            if (typeof this.handlers[type] == 'undefined') {
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
            return this; //连缀语法
        },

        fire: function(type, data) { //触发事件
            if (this.handlers[type] instanceof Array) { //instanceof返回的是布尔值，而typeof返回的是类型
                var handlers = this.handlers[type];
                for (var i = 0, len = handlers.length; i < len; i++) {
                    handlers[i](data);
                }
            }
        },

        render: function(container) {
            this.renderUI();
            this.handlers = {};
            this.bindUI();
            this.syncUI();
            $(container || document.body).append(this.boundingbox);
        },


        destroy: function() { //销毁组件
            this.destructor();
            this.boundingbox.off();
            this.boundingbox.remove();
        },
        renderUI: function() {

        },
        bindUI: function() {

        },
        syncUI: function() {

        },
        destructor: function() { //接口：销毁前的处理函数

        }


    }

    return {
        Widget: Widget
    }


});
