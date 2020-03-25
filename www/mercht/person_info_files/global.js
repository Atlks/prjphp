window.networkType;
// ---------------------------------------------Cookie-----------------------------------------
var cookie = {
	// 用户选择的当前城市
	getCityId : function() {
		if (getCookie('tl_m_cityid') == null || isNaN(getCookie('tl_m_cityid'))) {
			return 0;
		}
		return getCookie('tl_m_cityid');
	},
	// Cookie操作
	get : function(c_name) {
		return jQuery.cookie(c_name);
	},
	getUserId : function() {
		if ($.cookie('tl_m_userid') == null || isNaN($.cookie('tl_m_userid'))) {
			return 0;
		}
		return $.cookie('tl_m_userid');
	},
	getToken : function() {
		var token = $.cookie('tl_m_token');
		if (token == null) {
			return 0;
		}
		return $.cookie('tl_m_token');
	},
	add : function(cookieName, value, time) {

		var cookietime = new Date();
		cookietime.setTime(cookietime.getTime() + time);// coockie保存时间，毫秒
		$.cookie(cookieName, value, {
			expires : cookietime
		});

	},

	remove : function(c_name) {
		jQuery.cookie(c_name, null);
	}
};

jQuery.cookie = function(key, value, options) {
	if (arguments.length > 1 && (value === null || typeof value !== "object")) {
		options = jQuery.extend({}, options);

		if (value === null) {
			options.expires = -1;
		}

		if (typeof options.expires === 'number') {
			var days = options.expires, t = options.expires = new Date();
			t.setDate(t.getDate() + days);
		}

		return (document.cookie = [
				encodeURIComponent(key),
				'=',
				options.raw ? String(value) : encodeURIComponent(String(value)),
				options.expires ? '; expires=' + options.expires.toUTCString()
						: '', options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : '' ].join(''));
	}

	options = value || {};
	var result, decode = options.raw ? function(s) {
		return s;
	} : decodeURIComponent;
	return (result = new RegExp('(?:^|; )' + encodeURIComponent(key)
			+ '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};
// ---------------------------------------------Cookie
// End-----------------------------------------

// ---------------------------------------------格式化方法-----------------------------------------
/*
 * Date.prototype.Format = function (fmt) { var o = { "M+": this.getMonth() + 1,
 * "d+": this.getDate(), "h+": this.getHours(), "m+": this.getMinutes(), "s+":
 * this.getSeconds(), "q+": Math.floor((this.getMonth() + 3) / 3), "S":
 * this.getMilliseconds() }; if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1,
 * (this.getFullYear() + "").substr(4 - RegExp.$1.length)); for (var k in o) if
 * (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1,
 * (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" +
 * o[k]).length))); return fmt; };
 */
// ---------------------------------------------格式化方法结束-----------------------------------------
// ---------------------------------------------参数相关-----------------------------------------
// 获取URL参数
function getQueryString(name, url) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var param = '';
	if(url){
		var temp = url.split('?');
		param = temp[1];
	}else{
		param = window.location.search.substr(1);
	}
	var r = param.match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

function getQueryNumber(name) {
	return parseFloat(getQueryString(name));
}

// 修改参数值
function changeURLPar(url, ref, value) {
	return replaceURLParam(url, ref, value);
	//var str = "";
	//if (url.indexOf('?') != -1)
	//	str = url.substr(url.indexOf('?') + 1);
	//else
	//	return url + "?" + ref + "=" + value;
	//var returnurl = "";
	//var setparam = "";
	//var arr;
	//var modify = "0";
	//if (str.indexOf('&') != -1) {
	//	arr = str.split('&');
	//	for (i in arr) {
	//		if (arr[i].split('=')[0] == ref) {
	//			setparam = value;
	//			modify = "1";
	//		} else {
	//			setparam = arr[i].split('=')[1];
	//		}
	//		returnurl = returnurl + arr[i].split('=')[0] + "=" + setparam + "&";
	//	}
	//	returnurl = returnurl.substr(0, returnurl.length - 1);
	//	if (modify == "0")
	//		if (returnurl == str)
	//			returnurl = returnurl + "&" + ref + "=" + value;
	//} else {
	//	if (str.indexOf('=') != -1) {
	//		arr = str.split('=');
	//		if (arr[0] == ref) {
	//			setparam = value;
	//			modify = "1";
	//		} else {
	//			setparam = arr[1];
	//		}
	//		returnurl = arr[0] + "=" + setparam;
	//		if (modify == "0")
	//			if (returnurl == str)
	//				returnurl = returnurl + "&" + ref + "=" + value;
	//	} else
	//		returnurl = ref + "=" + value;
	//}
	//return url.substr(0, url.indexOf('?')) + "?" + returnurl;
}
/***
 * 替换url中的参数
 */
function replaceURLParam(url, key, value){
	var urlTemp = url.split('?');
	var baseUrl = urlTemp[0];
	var param = {};
	if(urlTemp[1] && urlTemp[1].length > 1){
		var paramTemp = urlTemp[1].split('&');
		for(var i=0; i<paramTemp.length; i++){
			var keyValue = paramTemp[i].split('=');
			param[keyValue[0]] = keyValue[1];
		}
	}
	param[key] = value;
	return baseUrl + '?' + $.param(param);
}

// 删除参数值
function delQueStr(url, ref) {
	var str = "";
	if (url.indexOf('?') != -1) {
		str = url.substr(url.indexOf('?') + 1);
	} else {
		return url;
	}
	var arr = "";
	var returnurl = "";
	// var setparam = "";
	if (str.indexOf('&') != -1) {
		arr = str.split('&');
		for (i in arr) {
			if (arr[i].split('=')[0] != ref) {
				returnurl = returnurl + arr[i].split('=')[0] + "="
						+ arr[i].split('=')[1] + "&";
			}
		}
		return url.substr(0, url.indexOf('?')) + "?"
				+ returnurl.substr(0, returnurl.length - 1);
	} else {
		arr = str.split('=');
		if (arr[0] == ref) {
			return url.substr(0, url.indexOf('?'));
		} else {
			return url;
		}
	}
}

// ---------------------------------------------参数相关结束-----------------------------------------

// 文本框限输入整数
function inputTextMustInt(id) {
	$(id).keydown(
			function() {
				var e = $(this).event || window.event;
				var code = parseInt(e.keyCode);
				if (code >= 96 && code <= 105 || code >= 48 && code <= 57
						|| code == 8) {
					return true;
				} else {
					return false;
				}
			});
}

// ----------------------------------------------弹出框------------------------------
var hideAlert_num = 0;
function alert(content, time) {
	var str = "<div id='alertDiv' class='gray' onclick='hideAlert();$(this).off()'><table width='100%' border='0' cellspacing='0' cellpadding='0'><tr><td valign='middle'><div class='Pop-up pstyle-1'>"
			+ "<div class='Pop-upCon tc'>"
			+ content
			+ "</div></div></td></tr></table></div>";
	if ($("#alertDiv").length > 0) {
		$("#alertDiv").remove();
	}
	$("body").append(str);
	time = time || 2000;
	hideAlert_num = setTimeout(hideAlert, time);
}

function hideAlert() {
	if (hideAlert_num != 0) {
		clearInterval(hideAlert_num);
	}
	$("#alertDiv").animate({
		opacity : 0
	}, 500, function() {
		$("#alertDiv").remove();
	});
}

/** 分页 */
var page = {
	home : function() {
		window.location.href = changeURLPar(window.location.href, 'page', 1);
	},
	next : function(currpage) {
		if (parseFloat(currpage) < 1) {
			currpage = 0;
		}
		window.location.href = changeURLPar(window.location.href, 'page',
				currpage + 1);
	},
	last : function(currpage) {
		if (parseFloat(currpage) < 2) {
			currpage = 2;
		}
		window.location.href = changeURLPar(window.location.href, 'page',
				currpage - 1);
	},
	end : function(page) {
		window.location.href = changeURLPar(window.location.href, 'page', page);
	}
};

/** 百度统计 */
var tongji={
	showlog:false,
	/**页面访问*/
	pageAccess : function(name, value, scope){
		try {
			//_hmt.push(['_setCustomVar', 1, '页面访问', 'C查看职位-名称(id)-用户(id)-来源', 3]);
			if(tongji.showlog){
				console.log('页面访问:'+ name + ' ' + value);
			}
			_hmt.push(['_setCustomVar', 1, name, value + tl_tongji_userinfo, (scope ? scope : 3)]);
		} catch (e) {
			console.log('页面访问,异常');
		}
	},
	/**事件跟踪*/
	eventTrace : function(category, action){
		try {
			//_hmt.push(['_trackEvent', 'C隐藏app下载入口', 'C隐藏app下载入口-用户(id)-来源', 'C隐藏app下载入口-用户(id)-来源-时间']);
			if(tongji.showlog){
				console.log('事件跟踪:'+category + ',' + action);
			}
			_hmt.push(['_trackEvent', category, action + tl_tongji_userinfo,  action + tl_tongji_userinfo + formatTime(new Date().getTime(),'yyyy-MM-dd,HH:mm:ss')]);
		} catch (e) {
			console.log('事件跟踪,异常');
		}
	}	
}

/**联系商家*/
var callCorp = function(param){
	if(param.phone){
		if(param.jobid && param.jobid > 0){
			$.ajax({
				url: basePath + 'job/telInquiry',
				data:{'phone' : param.phone, 'jobid' : param.jobid},
				dataType:'json',
				type:'get',
				cache:false,
				success:function(result){
					//console.log(result);
				}
			});
		}
		if(param.corpid && param.corpid > 0){
			tongji.eventTrace('C联系商家','C联系商家-'+param.corpname+'('+param.corpid+')');
		}			
		window.location.href = "tel:" + param.phone;
	}
}
// /**下拉加载、上拉刷新*/
// var flip ={
// currpage : 1,//当前页
// /** 下拉刷新 （自定义实现此方法） * myScroll.refresh();// 数据加载完成后，调用界面更新方法*/
// pullDownAction:function(){
// //alert("下拉刷新");
// flip.pullUpAction(1);
// myScroll.refresh();
// },
//	
// /** 滚动翻页 （自定义实现此方法） * myScroll.refresh();// 数据加载完成后，调用界面更新方法*/
// pullUpAction:function(currpage){
// //alert("滚动翻页");
// //自定义 数据加载func
// myLoadPageData();
// },
//	
// /** 初始化iScroll控件 */
// loaded:function(){
// pullDownEl = document.getElementById('pullDown');
// pullDownOffset = pullDownEl.offsetHeight;
// pullUpEl = document.getElementById('pullUp');
// pullUpOffset = pullUpEl.offsetHeight;
// myScroll = new iScroll('wrapper', {
// scrollbarClass: 'myScrollbar',
// useTransition: false,/* 是否使用css变换*/
// topOffset: pullDownOffset,
// onRefresh: function() {
// if (pullDownEl.className.match('loading')) {
// pullDownEl.className = '';
// pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
// } else if (pullUpEl.className.match('loading')) {
// pullUpEl.className = '';
// pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
// }
// },
// onScrollMove: function() {
// if (this.y > 5 && !pullDownEl.className.match('flip')) {
// pullDownEl.className = 'flip';
// pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
// this.minScrollY = 0;
// } else if (this.y < 5 && pullDownEl.className.match('flip')) {
// pullDownEl.className = '';
// pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
// this.minScrollY = -pullDownOffset;
// } else if (this.y < (this.maxScrollY - 5) &&
// !pullUpEl.className.match('flip')) {
// pullUpEl.className = 'flip';
// pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
// this.maxScrollY = this.maxScrollY;
// } else if (this.y > (this.maxScrollY + 5) &&
// pullUpEl.className.match('flip')) {
// pullUpEl.className = '';
// pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
// this.maxScrollY = pullUpOffset;
// }
// },
// onScrollEnd: function() {
// if (pullDownEl.className.match('flip')) {
// pullDownEl.className = 'loading';
// pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
// flip.pullDownAction(); // Execute custom function (ajax call?)
// } else if (pullUpEl.className.match('flip')) {
// pullUpEl.className = 'loading';
// pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
// flip.pullUpAction(); // Execute custom function (ajax call?)
// }
// }
// });
// setTimeout(function() {
// document.getElementById('wrapper').style.left = '0';
// }, 800);
// }
// };

/* 加载中的遮罩 */
var mask = {
	html : '<div class="mask"><div></div></div>',
	show : function(obj) {
		if (obj != undefined) {
			$(obj).addClass('disabled');
			$(obj).attr('_onclick', $(obj).attr('onclick'));
			$(obj).removeAttr('onclick');
		}
		//		
		// if($('.mask').size()>0){
		// $('.mask').show();
		// }else{
		// $('body').append(mask.html);
		// }

	},
	hide : function(obj) {
		if (obj != undefined) {
			$(obj).removeClass('disabled');
			$(obj).attr('onclick', $(obj).attr('_onclick'));
			$(obj).removeAttr('_onclick');
		}
		$('.mask').remove();
	}
};

/* 加载中的遮罩 */
var mask_loading = {
	html : '<div class="mask1"><div class="mask1_content" style="position:absolute;top:55%;left:0;right:0;bottom:0;text-align:center;">加载中...</div></div>',
	show : function(content, obj) {
		if (obj != undefined) {
			$(obj).addClass('disabled');
			$(obj).attr('_onclick', $(obj).attr('onclick'));
			$(obj).removeAttr('onclick');
		}
		//		
		if ($('.mask1').size() > 0) {
			if (content != "" && content != undefined) {
				$(".mask1_content").html(content);
			}
			$('.mask1').show();
		} else {
			if (content != "" && content != undefined) {
				mask_loading.html = '<div class="mask1"><div class="mask1_content" style="position:absolute;top:55%;left:0;right:0;bottom:0;text-align:center;">'
						+ content + '</div></div>';
			}
			$('body').append(mask_loading.html);
		}

	},
	hide : function(obj) {
		if (obj != undefined) {
			$(obj).removeClass('disabled');
			$(obj).attr('onclick', $(obj).attr('_onclick'));
			$(obj).removeAttr('_onclick');
		}
		$('.mask1').remove();
	}
};

var loadingToast = {
	show : function(){
		$("#loadingToast").remove();
		var html = '<div id="loadingToast" class="weui_loading_toast"><div class="weui_mask_transparent"></div><div class="weui_toast"><div class="weui_loading"><div class="weui_loading_leaf weui_loading_leaf_0"></div><div class="weui_loading_leaf weui_loading_leaf_1"></div><div class="weui_loading_leaf weui_loading_leaf_2"></div><div class="weui_loading_leaf weui_loading_leaf_3"></div><div class="weui_loading_leaf weui_loading_leaf_4"></div><div class="weui_loading_leaf weui_loading_leaf_5"></div><div class="weui_loading_leaf weui_loading_leaf_6"></div><div class="weui_loading_leaf weui_loading_leaf_7"></div><div class="weui_loading_leaf weui_loading_leaf_8"></div><div class="weui_loading_leaf weui_loading_leaf_9"></div><div class="weui_loading_leaf weui_loading_leaf_10"></div><div class="weui_loading_leaf weui_loading_leaf_11"></div></div><p class="weui_toast_content">数据加载中</p></div></div>';
		$("body").append(html);
	},
	hide : function(){
		$("#loadingToast").remove();
	}
};

var getReferrer = function() {
	var referrer = '';

	try {
		referrer = window.top.document.referrer;
	} catch (e) {
		if (window.parent) {
			try {
				referrer = window.parent.document.referrer;
			} catch (e2) {
				referrer = '';
			}
		}
	}
	if (referrer === '') {
		referrer = document.referrer;
	}
	return referrer;
};

$(function() {
	/* ajax全局配置 */
	$.ajaxSetup({
		type : "GET",
		cache : false,
		beforeSend : function() {
			mask.show();
		},
		complete : function() {
			mask.hide();
		}
	});
});

function closeConfirm() {
	$("#confirm").remove();
	return;
}

function confirm(content, callBack) {
	var str = "<table id='confirm'  width='100%'   cellspacing='0' cellpadding='0' class='tixianmima' style='border:0 auto;display: inner-block;'>"
			+ "<tr> <td align='center' valign='middle'>"
			+ "<div class='box'> <h2 class='tc pb15 pt15 f16' >"
			+ content
			+ "</h2>"
			+ "<div class='mm-btn mt20' id='okDiv'>"
			+ "<a href='javascript:void(0)' onclick='closeConfirm()'>取 消</a>"
			+ "<a href='javascript:void(0)'  id='confirmsure'>确 定</a></div></div></td></tr></table>";
	$("body").append(str);
	$('#confirmsure').on('click', function() {
		$("#confirm").remove();
		callBack();
	});
}

function confirm(content, successCallBack, cancelCallBack) {
	var str = "<table id='confirm'  width='100%'   cellspacing='0' cellpadding='0' class='tixianmima' style='border:0 auto;display: inner-block;'>"
			+ "<tr> <td align='center' valign='middle'>"
			+ "<div class='box'> <h2 class='tc pb15 pt15 f16' >"
			+ content
			+ "</h2>"
			+ "<div class='mm-btn ' id='okDiv'>"
			+ "<a href='javascript:void(0)' id='confirmcancel'>取 消</a>"
			+ "<a href='javascript:void(0)'  id='confirmsure'>确 定</a></div></div></td></tr></table>";
	$("body").append(str);
	$('#confirmsure').on('click', function() {
		$("#confirm").remove();
		successCallBack();
	});
	$('#confirmcancel').on('click', function() {
		$("#confirm").remove();
		if (cancelCallBack) {
			cancelCallBack();
		}
	});
}
/**
 * 
 * @param leftBtn
 *            左侧按钮 （默认为取消）
 * @param rightBtn
 *            右侧按钮 （默认为确定）
 * @param content
 *            主体内容
 * @param successCallBack
 *            （右侧按钮点击事件）
 * @param cancelCallBack
 *            （左侧按钮点击事件）
 */
function confirmDIY(leftBtn, rightBtn, content, successCallBack, cancelCallBack) {
	leftBtn = leftBtn || "取 消";
	rightBtn = rightBtn || "确 定";
	var str = "<table id='confirm'  width='100%'   cellspacing='0' cellpadding='0' class='tixianmima' style='border:0 auto;display: inner-block;'>"
			+ "<tr> <td align='center' valign='middle'>"
			+ "<div class='box'> <h2 class='tc p15 f14' >"
			+ content
			+ "</h2>"
			+ "<div class='mm-btn mt15' id='okDiv'>"
			+ "<a href='javascript:void(0)' id='confirmcancel'>"
			+ leftBtn
			+ "</a>"
			+ "<a href='javascript:void(0)'  id='confirmsure'>"
			+ rightBtn + "</a></div></div></td></tr></table>";
	$("body").append(str);
	$('#confirmsure').on('click', function() {
		$("#confirm").remove();
		successCallBack();
	});
	$('#confirmcancel').on('click', function() {
		$("#confirm").remove();
		if (cancelCallBack) {
			cancelCallBack();
		}
	});
}

/**
 * 
 * @param leftBtn
 *            左侧按钮 （默认为取消）
 * @param rightBtn
 *            右侧按钮 （默认为确定）
 * @param content
 *            主体内容
 * @param successCallBack
 *            （右侧按钮点击事件）
 * @param cancelCallBack
 *            （左侧按钮点击事件）
 */
function confirmDIYForDataBack(leftBtn, rightBtn, content, successCallBack, cancelCallBack, callBackDataId) {
	leftBtn = leftBtn || "取 消";
	rightBtn = rightBtn || "确 定";
	var str = "<table id='confirm'  width='100%'   cellspacing='0' cellpadding='0' class='tixianmima' style='border:0 auto;display: inner-block;'>"
			+ "<tr> <td align='center' valign='middle'>"
			+ "<div class='box'> <h2 class='tc p15 f14' >"
			+ content
			+ "</h2>"
			+ "<div class='mm-btn mt20' id='okDiv'>"
			+ "<a href='javascript:void(0)' id='confirmcancel'>"
			+ leftBtn
			+ "</a>"
			+ "<a href='javascript:void(0)'  id='confirmsure'>"
			+ rightBtn + "</a></div></div></td></tr></table>";
	$("body").append(str);
	$('#confirmsure').on('click', function() {
		var data = $('#'+callBackDataId).val();
		$("#confirm").remove();
		successCallBack(data);
	});
	$('#confirmcancel').on('click', function() {
		var data = $('#'+callBackDataId).val();
		$("#confirm").remove();
		if (cancelCallBack) {
			cancelCallBack(data);
		}
	});
}

function confirmSingleBtn(content, callBack) {
	var str = "<table id='confirm'  width='100%'   cellspacing='0' cellpadding='0' class='tixianmima' style='border:0 auto;display: inner-block;'>"
			+ "<tr> <td align='center' valign='middle'>"
			+ "<div class='box'> <h2 class='tc pb15 pt15 f16' >"
			+ content
			+ "</h2>"
			+ "<div class='mm-btn mt20' id='okDiv'>"
			+ "<a class ='singlebtn' href='javascript:void(0)' id='confirmsure'>确 定</a></div></div></td></tr></table>";
	$("body").append(str);
	$('#confirmsure').on('click', function() {
		$("#confirm").remove();
		callBack();
	});
}

function confirmSingleBtn_Title(title,content,btnText, callBack) {
	btnText = btnText || "确 定";
	var str = "<table id='confirm'  width='100%'   cellspacing='0' cellpadding='0' class='tixianmima' style='border:0 auto;display: inner-block;'>"
			+ "<tr> <td align='center' valign='middle'>"
			+ "<div class='box'> "
			+"<label style='font-size:16px;padding:10px 0 0;display: block;'>"+title+"</label>"
			+"<h2 class='pb15 pt15 f13' style='text-align:left;' >"
			+ content
			+ "</h2>"
			+ "<div class='mm-btn mt15' id='okDiv'>"
			+ "<a class ='singlebtn' href='javascript:void(0)' id='confirmsure'>"+btnText+"</a></div></div></td></tr></table>";
	$("body").append(str);
	$('#confirmsure').on('click', function() {
		$("#confirm").remove();
		callBack();
	});
}

function sendSearch() {
	var searchContent = $("#searchContent").val();// 调用新接口，返回参数是有值的
	/*
	 * var la=$("la");//la var lo=$
	 */

	if (searchContent != "") {
		tongji.eventTrace('C搜索', 'C搜索-内容('+searchContent+')');
		window.location.href = basePath + "job/searchv120?title="
				+ searchContent;
	} else {
		alert("请输入关键字");
	}
}
/**
 * 如果当前定位成功了，则返回正确的距离，如果定位不成功，则返回"-" 距离大于 1000米，则返回 1千米 距离少于1000米，则返回 1000米
 * 结果保留一位小数点
 * 
 * @param lng
 * @param lat
 * @returns {String}
 */
function distance(lng, lat) {
	var ttt = document.createElement("map");
	var map = new BMap.Map(ttt);
	// 读取cookie 的经纬度 然后和传入的参数做对比
	var currentLng = $.cookie("tl_m_queryaround_lo");// 1小时
	var currentLat = $.cookie("tl_m_queryaround_la");// 1小时
	if (null == currentLng || null == currentLat) {
		return "-";
	}
	var pointA = new BMap.Point(currentLng, currentLat); // 创建点坐标A--大渡口区
	var pointB = new BMap.Point(lng, lat); // 创建点坐标B--江北区
	var distance = (map.getDistance(pointA, pointB)).toFixed(1);
	if (distance > 1000) {
		distance = (distance / 1000).toFixed(1);
		return distance + "千米";
	}
	return distance + "米";

}

// ---------formatTime(1396178344662, 'yyyy-MM-dd HH:mm:ss')---------------
var formatTime = function(time, format) {
	var t = new Date(time);
	var tf = function(i) {
		return (i < 10 ? '0' : '') + i
	};
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
		switch (a) {
		case 'yyyy':
			return tf(t.getFullYear());
			break;
		case 'MM':
			return tf(t.getMonth() + 1);
			break;
		case 'mm':
			return tf(t.getMinutes());
			break;
		case 'dd':
			return tf(t.getDate());
			break;
		case 'HH':
			return tf(t.getHours());
			break;
		case 'ss':
			return tf(t.getSeconds());
			break;
		}
		;
	});
}

String.prototype.format = function() {
	var args = arguments;
	return this.replace(/\{(\d+)\}/g, function(m, i) {
		return args[i];
	});
}

function log(msg){
//	var info = '<div style="z-index: 9999;margin-top: 50px;">';
//	for(var i in msg){
//		info += msg[i];
//	}
//	console.log(info);
//	$('body').prepend(info + '<br></div>');	
}

/**
 * 隐藏中间位数为星号
 * 
 * @param prefixNum
 *            前面显示位数
 * @param suffixNum
 *            后面显示位数
 */
function hideByStar(str, prefixNum, suffixNum) {
	if (!prefixNum) {
		prefixNum = 0;
	}
	if (!suffixNum) {
		suffixNum = 0;
	}

	if (!str || (prefixNum == 0 && suffixNum == 0)
			|| str.length < (prefixNum + suffixNum)) {
		return str;
	}

	var len = str.length;
	var prefix = str.substring(0, prefixNum);
	var suffix = str.substring(len - suffixNum, len);
	var diff = len - prefix - suffix;
	while (diff > 0) {
		prefix += "*";
		diff--;
	}

	return prefix + suffix;
}

/**
 * 隐藏下载广告
 */
function hidedownload() {
	$(".download_float").css({
		"display" : "none"
	});
	$(".download_rightnow").css({
		"display" : "none"
	});
	$(".gdzw").css({
		"display" : "none"
	});
}
/**
 * 日历
 */
function GetDateStr(AddDayCount) { 
	var dd = new Date(); 
	dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
	var y = dd.getFullYear(); 
	var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
	var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate(); //获取当前几号，不足10补0
	/*var arrTheDay = new Array();
	arrTheDay[0] = y+"-"+m+"-"+d;
	arrTheDay[1] = d;*/
	return y+"-"+m+"-"+d; //y+"-"+m+"-"+d 
}
//function myCalendar() {}

/**
 * 数组，删除指定元素
*/
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

/**
 * 原生JS addclass
 * by liujh
 */
function hasClass(obj, cls) {  
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
}  
function addClass(obj, cls) {  
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
}  
function removeClass(obj, cls) {  
    if (hasClass(obj, cls)) {  
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
        obj.className = obj.className.replace(reg, ' ');  
    }  
}  
function toggleClass(obj,cls){  
    if(hasClass(obj,cls)){  
        removeClass(obj, cls);  
    }else{  
        addClass(obj, cls);  
    }  
}

function isWeiXin(){ 
	var ua = window.navigator.userAgent.toLowerCase(); 
	if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
		return true; 
	}else{ 
		return false; 
	}
}

function myShare(){
	if(isWeiXin()){
		$('.tip').toggle();	
	}else{
		alert("请关注探鹿公众号[vtanlu]分享。", 3000);
	}
}
//扫描二维码
function scan2code() {
	if(!isWeiXin()){
		alert("请使用微信浏览器访问");
		return false;
	}
	wx.scanQRCode({
		needResult : 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
		scanType : [ "qrCode", "barCode" ], // 可以指定扫二维码还是一维码，默认二者都有
		success : function(res) {
			var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
			try{
				if(checkURL(result)){//二维码扫描
					//现场点名
					if(result.search("rollcall/querybycode") > -1){
						var code = getQueryString('code',result);
						rollcall.querybycode(code);
					}else{
						window.location.href = result ;
					}
				}else{
					//兼容旧版本
					var obj = JSON.parse(result);
					var sign = obj.sign;
					if (sign != "tanlu") {
						alert("请用'探鹿'扫描");						
					}else{
						var qrcidetype = obj.qrcodetype;
						 
						if (qrcidetype == "1") {// ,跳到确认签到确认页面，
							var data = obj.data;
							var jobId = data.job;
							// alert("jobId="+jobId);
							var href= basePath + "job/checkininfo?jobid=" + jobId;
							setTimeout(function(){
								window.location.href =href ;
							}, 500);
							// 跳转到确认签到页面，
						} else if (qrcidetype == "2") {// 商家关注
							var corpid = obj.corpid;
							var url = basePath + "corp/detail?corpid=" + corpid;
							setTimeout(function(){
								window.location.href = url;
							}, 500);
						}
					}
				}
			}catch (e) {
				//window.location.href = res.resultStr;
				log(e);
			}
		},
		error:function(res){
			log(res);
		}	
	});
}

function checkURL(URL){
	var str=URL;
	var Expression=/^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
	var objExp=new RegExp(Expression);
	if(objExp.test(str)==true){
		return true;
	}else{
		return false;
	}
} 

$(function() {
	$(document).ready(function() {
		// app访问去除底部
		var url = window.location.search;
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for (i = 0; i < strs.length; i++) {
				var params = strs[i].split("=");
				if (params[0] == "source" && params[1] == "app") {
					if ($(".download_float")) {
						$(".download_float").hide();
						$(".download_float").next().hide().next().hide();
					}
				}
			}
		}
	});
})

//重写ajax方法
$(function($){
   //备份jquery的ajax方法
   var _ajax=$.ajax;

   //重写jquery的ajax方法     
   $.ajax=function(opt){
       //备份opt中error和success方法     
       var fn = {
           error:function(XMLHttpRequest, textStatus, errorThrown){},  
           success:function(data, textStatus){} 
       }
       if(opt.error){     
           fn.error=opt.error;
       }
       if(opt.success){
          fn.success=opt.success;
       }

       //扩展增强处理     
       var _opt = $.extend(opt,{
           error:function(XMLHttpRequest, textStatus, errorThrown){
               fn.error(XMLHttpRequest, textStatus, errorThrown);
           },
           success:function(data, textStatus){
               //成功回调方法增强处理
               if(data && data.status==601){//需要设置登录密码
            	   window.location.href=data.url;
               }else{
            	   fn.success(data, textStatus);
               }
           }
       });
       _ajax(_opt);
   };     
})