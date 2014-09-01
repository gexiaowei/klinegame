var dataForWeixin = {
	appId: "",
	MsgImg: "http://www.xixistar.com/mobile/images/icon.png",
	TLImg: "http://www.xixistar.com/mobile/images/icon.png",
	url: "http://www.xixistar.com/mobile/html/game_kline_index.html",
	title: "遨游股海，搜寻财富",
	desc: "快点来试试吧，在60天的时间里赚更多的MONEY",
	fakeid: "",
	callback: function () {}
};

function setShareInfo() {
	var onBridgeReady = function () {
		//发送给朋友
		WeixinJSBridge.on('menu:share:appmessage', function (argv) {
			WeixinJSBridge.invoke('sendAppMessage', {
				"appid": dataForWeixin.appId,
				"img_url": dataForWeixin.MsgImg,
				"img_width": "120",
				"img_height": "120",
				"link": dataForWeixin.url,
				"desc": dataForWeixin.desc,
				"title": dataForWeixin.title
			}, function (res) {
				(dataForWeixin.callback)();
			});
		});
		//发送到朋友圈
		WeixinJSBridge.on('menu:share:timeline', function (argv) {
			(dataForWeixin.callback)();
			WeixinJSBridge.invoke('shareTimeline', {
				"img_url": dataForWeixin.TLImg,
				"img_width": "120",
				"img_height": "120",
				"link": dataForWeixin.url,
				"desc": dataForWeixin.desc,
				"title": dataForWeixin.title
			}, function (res) {});
		});
		//分享到微博
		WeixinJSBridge.on('menu:share:weibo', function (argv) {
			WeixinJSBridge.invoke('shareWeibo', {
				"content": dataForWeixin.title,
				"url": dataForWeixin.url
			}, function (res) {
				(dataForWeixin.callback)();
			});
		});
		//分享到facebook
		WeixinJSBridge.on('menu:share:facebook', function (argv) {
			(dataForWeixin.callback)();
			WeixinJSBridge.invoke('shareFB', {
				"img_url": dataForWeixin.TLImg,
				"img_width": "120",
				"img_height": "120",
				"link": dataForWeixin.url,
				"desc": dataForWeixin.desc,
				"title": dataForWeixin.title
			}, function (res) {});
		});
	};
	if (document.addEventListener) {
		document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	} else if (document.attachEvent) {
		document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
		document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	}
};

setShareInfo();
