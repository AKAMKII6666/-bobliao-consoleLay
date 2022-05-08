/*!
 * console.js
 * (c) 2013-2021 bobliao
 * Released under the MIT License.
 */

import "./console.css";
import useJquery, { isRunningInServer } from "@bobliao/use-jquery-hook";
const $ = useJquery();

var _consoleLay = function (_config) {
	var self = this;
	self.parent = _config.parent;
	//选项参数
	this.option = {
		//每条message之间的距离
		messagePadding: 10,
	};
	//配置参数
	var config = {
		//指示在哪个元素上打印
		e: null,
		topMove: -50,
		//消息文本
		m: "[blank]",
		//消失时间
		time: 8000,
		style: "",
		borderColor: "",
		classAdd: "arrow-consoleLay-white",
		closeBut: null,
		closeBtn: true,
		closeCall: function () {},
	};
	//消息数组
	this.logArray = [];
	//初始化
	this.write = function (_config) {
		//请求模版
		var c = JSON.parse(JSON.stringify(config));
		//如果是竖屏 消息只停留两秒
		//if(self.parent.parent.browserDetection.screenState === "V"){
		//	c.time = 2000;
		//}
		//配置信息
		if (typeof _config === "string") {
			this.config = $.extend(true, c, { m: _config });
		} else {
			this.config = $.extend(true, c, _config);
		}
		//检查是元素打印还是消息打印
		if (this.config.e) {
			//这是指在元素上打印
			return this.elementsPrint();
		} else {
			//这是指在品目左下方打印
			return this.print();
		}
	};
	//在元素上打印一条信息
	this.elementsPrint = function () {
		//1.载入元素
		var elements = $(this.config.e);
		for (var i = 0; i < elements.length; i++) {
			var tElement = elements[i];

			//2.取得元素的html
			var element = this.createHtmlElements();
			element.appendTo("body");

			if ($(tElement).outerHeight() > element.outerHeight()) {
				element.css(
					"top",
					$(tElement).offset().top +
						($(tElement).outerHeight() / 2 - element.outerHeight() / 2) +
						"px"
				);
			} else {
				element.css("top", $(tElement).offset().top + "px");
			}

			if ($(tElement).outerWidth() > element.outerWidth()) {
				element.css(
					"left",
					$(tElement).offset().left +
						($(tElement).outerWidth() / 2 - element.outerWidth() / 2) +
						"px"
				);
			} else {
				element.css("left", $(tElement).offset().left + "px");
			}

			element.animate(
				{ top: $(element).offset().top + this.config.topMove, opacity: 0 },
				{
					duration: this.config.time,
					easing: "easeInOutExpo",
					step: function () {},
					complete: function () {
						$(this).remove();
					},
				}
			);
		}
		return function () {};
	};
	//打印一条信息
	this.print = function () {
		var self = this;
		//1.构建消息模型
		var messageModal = {
			htmlElement: "",
			timeOutInterval: null,
			setPosition: function () {
				self.printPosition.call(this, self);
			},
			setStartPosition: function () {
				self.printSetStartPosition.call(this, self);
			},
			startTimeOut: function () {
				self.printStartTimeOut.call(this, self);
			},
			closeCall: self.config.closeCall,
		};
		this.logArray.push(messageModal);
		//2.获得消息样式
		messageModal.htmlElement = this.createHtmlElements();
		messageModal.htmlElement.appendTo("body");
		//增加关闭层按钮
		if (self.config.closeBtn) {
			messageModal.closeBut = $("<div class='arrow-console-close' title='close' ></div>").appendTo(
				"body"
			);
			var self = this;
			messageModal.closeBut.click(function () {
				clearInterval(messageModal.timeOutInterval);
				self.closeItem.call(messageModal, self, messageModal, self);
			});
		}

		//3.设置消息的初始位置
		messageModal.setStartPosition();

		//4.重新调整一下所有log的位置
		this.position();

		//5.开始消失计时
		messageModal.startTimeOut();

		return function () {
			self.closeItem.call(messageModal, self, messageModal, self);
		};
	};
	//计算该消息应该处于当前什么位置
	this.printPosition = function (self) {
		if (!this.removeFlg) {
			$(this.htmlElement).stop();
		}
		//记录开关
		var recorderSwitch = false;
		var totalHeight = 0;
		for (var i = 0; i < self.logArray.length; i++) {
			//循环到当前项目，就将其记录开关打开，开始记录应该堆积的高度
			if (self.logArray[i] == this) {
				recorderSwitch = true;
			}
			if (recorderSwitch) {
				totalHeight +=
					$(self.logArray[i].htmlElement).outerHeight() + self.option.messagePadding;
			}
		}
		var _self = self;
		(function (self) {
			//检测到竖屏
			//if(_self.parent.parent.browserDetection.screenState === "V"){
			//	//得到当前自己所处的top 并用动画将自己移动到该top处
			//    $(self.htmlElement).animate({ top: ($(window).height()/2 - $(self.htmlElement).height()/2) - totalHeight, left: ($(window).width()/2 - $(self.htmlElement).outerWidth()/2) },{duration:300,easing:'easeInOutExpo',
			//    	step:function(){
			//    		if (self.closeBut) {
			//	            $(self.closeBut).css('top',$(this).position().top);
			//	            $(self.closeBut).css('left',$(this).position().left+$(this).outerWidth() - $(self.closeBut).width());
			//	        }
			//		},
			//		complete:function(){
			//			if (self.closeBut) {
			//	            $(self.closeBut).css('top',$(this).position().top);
			//	            $(self.closeBut).css('left',$(this).position().left+$(this).outerWidth() - $(self.closeBut).width());
			//	            if($(self.closeBut).css('opacity') === "0"){
			//	            	$(self.closeBut).animate({opacity:1},200);
			//	            }
			//	        }
			//		}
			//	});
			//}else{
			//得到当前自己所处的top 并用动画将自己移动到该top处
			$(self.htmlElement).animate(
				{ top: $(window).height() - totalHeight, right: 10 / 14 + "rem" },
				{
					duration: 300,
					easing: "easeInOutExpo",
					step: function () {
						if (self.closeBut) {
							$(self.closeBut).css("top", $(this).position().top + 5);
							$(self.closeBut).css(
								"left",
								$(this).position().left +
									$(this).outerWidth() -
									$(self.closeBut).width() -
									5
							);
						}
					},
					complete: function () {
						if (self.closeBut) {
							$(self.closeBut).css("top", $(this).position().top + 5);
							$(self.closeBut).css(
								"left",
								$(this).position().left +
									$(this).outerWidth() -
									$(self.closeBut).width() -
									5
							);
							if ($(self.closeBut).css("opacity") === "0") {
								$(self.closeBut).animate({ opacity: 1 }, 200);
							}
						}
					},
				}
			);
			//}
		})(this);
	};

	/**检测屏幕的状态 */
	this.detactScreenState = function () {
		if ($(window).height() > $(window).width()) {
			return "V";
		} else {
			return "H";
		}
	};

	//消息的初始位置设置
	this.printSetStartPosition = function (self) {
		//检测到竖屏

		$(this.htmlElement).css(
			"top",
			$(window).height() - $(this.htmlElement).height() - self.option.messagePadding + "px"
		);
		$(this.htmlElement).css(
			"right",
			"-" +
				($(this.htmlElement).width() +
					Number($(this.htmlElement).css("border-left-width").replace("px", "")) +
					Number($(this.htmlElement).css("border-right-width").replace("px", ""))) +
				"px"
		);

		if (this.closeBut) {
			$(this.closeBut).css("opacity", 0);
		}
	};
	//开始消失的计时
	this.printStartTimeOut = function (self) {
		var thisItem = this;
		var that = self;
		//如果永远不消失
		if (self.config.time !== "inf") {
			this.timeOutInterval = setTimeout(function () {
				that.closeItem.call(thisItem, self, thisItem, that);
			}, self.config.time);
		}
	};
	//关闭一个项目
	this.closeItem = function (self, thisItem, that) {
		thisItem.removeFlg = true;

		var elem = thisItem.htmlElement;
		var closeBut = thisItem.closeBut;
		$(closeBut).fadeOut(200, function () {
			$(closeBut).remove();
		});
		//检测到竖屏
		if (self.detactScreenState() === "V") {
			$(elem).animate(
				{ opacity: 0 },
				{
					duration: 400,
					easing: "easeInOutExpo",
					step: function () {},
					complete: function () {
						$(elem).remove();
						if (typeof thisItem.closeCall !== "undefined") {
							thisItem.closeCall();
						}
					},
				}
			);
		} else {
			$(elem).animate(
				{ right: -$(elem).outerWidth() },
				{
					duration: 400,
					easing: "easeInOutExpo",
					step: function () {},
					complete: function () {
						$(elem).remove();
						if (typeof thisItem.closeCall !== "undefined") {
							thisItem.closeCall();
						}
					},
				}
			);
		}

		if (typeof self.logArray !== "undefined" && typeof self.logArray.length !== "undefined") {
			var newArray = [];
			for (var i = 0; i < that.logArray.length; i++) {
				if (that.logArray[i] !== thisItem) {
					newArray.push(that.logArray[i]);
				}
			}
			that.logArray = newArray;
		}
		self.position();
	};
	//窗体改变大小时执行的方法
	this.position = function () {
		for (var i = 0; i < this.logArray.length; i++) {
			this.logArray[i].setPosition();
		}
	};
	//获得元素
	this.createHtmlElements = function () {
		if (this.config.e) {
			return $(
				'<div class="arrow-print-element ' +
					this.config.classAdd +
					'" style=' +
					this.config.style +
					" ></div>"
			).append(this.config.m);
		} else {
			var borderColor = "";
			if (this.config.borderColor != "") {
				borderColor = ";border-color:" + this.config.borderColor;
			}
			var timmerBar = "";
			if (this.config.time !== "inf") {
				timmerBar = $(
					`<div class="arrow-print-item-timer" style="transition-duration:` +
						this.config.time +
						`ms"  ></div>`
				);
				setTimeout(function () {
					timmerBar.addClass("shot");
				}, 100);
			}
			return $(
				`
                <div class="arrow-print-item ` +
					this.config.classAdd +
					`" style="` +
					this.config.style +
					borderColor +
					`" ></div>
            `
			)
				.append(this.config.m)
				.append(timmerBar);
		}
	};
};

let consoleLay = null;

if (isRunningInServer) {
	consoleLay = new _consoleLay({
		parent: {},
	});
} else {
	if (typeof window.__consoleLay__ === "undefined") {
		consoleLay = new _consoleLay({
			parent: {},
		});
		$(window).resize(function () {
			setTimeout(function () {
				consoleLay.position();
			}, 1000);
		});
	} else {
		consoleLay = window.__consoleLay__;
	}
}

export default consoleLay;
