var user = {};
/* 登录 */
user.login = function(obj, callback) {
	if ($('#userNameText').val() == "") {
		alert("请输入手机号或用户名");
		return false;
	} else if ($('#passwordText').val() == "") {
		alert("密码不能为空");
		return false;
	}
	mask.show(obj);
	$.ajax({
		url : basePath + 'user/submit_login',
		data : {
			'uname' : $('#userNameText').val(),
			'pw' : $('#passwordText').val(),
			'_timestamp' : new Date().getTime()
		},
		dataType : 'json',
		type : 'get',
		success : function(result) {
			mask.hide(obj);
			if (result.status == 0) {
				if(callback && callback != ''){
					window.location.href = callback;
				}else if (result.url != 'undefined' && result.url != undefined && result.url != '') {
					window.location.href = result.url;
				} else {
					window.location.href = basePath + 'user/usercenter';
				}
			} else if(result.status == -50){
				$("#userNameText1").val(result.username);
				$("#phoneText1").val(result.phone);
				$("#passwordText1").val($('#passwordText').val());
				
				$("#toverifyphone").submit();
			}else {
				alert(result.msg);
			}
		}
	});
};

user.loginValidate = function(obj) {
	mask.show(obj);
	$.ajax({
		url : basePath + 'user/verifyphone',
		data : {
			'uname' : $('#userNameText').val(),
			'pw' : $('#passwordText').val(),
			'phone' : $('#phoneText').val(),
			'code' : $('#identifyingCodeText').val(),
			'_timestamp' : new Date().getTime()
		},
		dataType : 'json',
		type : 'post',
		success : function(result) {
			mask.hide(obj);
			if (result.status == 0) {
				if(result.url){
					window.location.href = result.url;
				}else{
					window.location.href = basePath+'user/center';
				}
			} else if(result.status == -10){
				alert(result.msg);
			}else {
				alert(result.msg);
				setTimeout(function(){
					window.location.href = basePath+'user/login';
				}, 1500);
			}
		}
	});
};

user.code = {
	codeTime : 60,/* 重发短信 时间 */
	/* 发送验证码 */
	sendcode : function(phone, btype) {
		function regcode() {
			// window.location.href = basePath + "user/regcode";
			user.code.interval();
		}
		code.send(phone, btype, regcode);
	},
	/* 重发验证码 */
	resend : function(phone, btype) {
		function reInterval() {
			user.code.interval();
			$('#reSendButton').hide();
			$('#countdownSpan').show();
		}
		code.send(phone, btype, reInterval);
	},
	/* 重发短信倒计时 */
	interval : function() {
		var countVal = user.code.codeTime;
		$('#countdownLabel').html(countVal);
		$('#countdownSpan').show();
		$('#sendButton').hide();
		function startCountdown() {
			if (countVal > 1) {
				countVal--;
				$('#countdownLabel').html(countVal);
			} else {
				clearInterval(interval);
				$('#reSendButton').show();
				$('#countdownSpan').hide();
				$('#sendButton').hide();
			}
		}

		interval = setInterval(startCountdown, 1010);
	}
};

/* 注册 */
user.reg = function(obj) {
	var $username = $('#userNameText');
	var $phone = $('#phoneNumberText');
	var $pw = $('#passwordText');
	var $code = $('#identifyingCodeText');
	var $code = $('#identifyingCodeText');
	var $weixinid = $('#weixinid');
	if ($username.val() == "") {
		alert("真实姓名不能为空");
		$username.focus();
		return false;
	}else if ($phone.val() == "") {
		alert("手机号不能为空");
		$phone.focus();
		return false;
	} else if($phone.val().length!=11){
		alert("手机号格式不正确");
		$phone.focus();
		return false;
	}else if ($code.val() == "") {
		alert("验证码不能为空");
		$code.focus();
		return false;
	}else if ($pw.val() == "") {
		alert("密码不能为空");
		$pw.focus();
		return false;
	} 
	
	mask.show(obj);
	$.ajax({
		url : basePath + 'user/submit_reg',
		data : {
			'username' : $username.val(),
			'phone' : $phone.val(),
			'pw' : $pw.val(),
			'code' : $code.val(),
			'weixinid':$weixinid.val(),
			'_timestamp' : new Date().getTime()
		},
		dataType : 'json',
		type : 'get',
		success : function(result) {
			mask.hide(obj);
			alert(result.msg);
			if (result.status == 0) {
				tongji.eventTrace('C注册', 'C注册-'+ $phone.val() + '-' + result.userid);
				setTimeout(function(){
					if (result.url != 'undefined' && result.url != undefined && result.url != '') {
						window.location.href = result.url;
					} else {
						window.location.href = basePath + 'user/usercenter';
					}
				}, 1500);
			}
		}
	});
};
user.attention = {
	/*
	 * operate : function(corpid) { var classes = $("#attention").attr("class");
	 * if (classes.indexOf("addB") > -1) {// 关注 this.followcorp(corpid); } else
	 * {// 取消关注 this.unfollowcorp(corpid); } },
	 */
	lastTime:"",
	followcorp : function(corpid, corpname) {
//		if(!this.lastTime){
//			this.lastTime = new Date().getTime();
//		}else{
//			var currentTime = new Date().getTime();
//			if(currentTime-this.lastTime<1000){
//				return;
//			}else{
//				this.lastTime=currentTime;
//			}
//		}
		if($('#followButton') != undefined){
			mask.show($('#followButton'));
		}
		$.ajax({
			url : basePath + 'user/followcorp',
			data : {
				'corpid' : corpid				
			},
			dataType : 'json',
			type : 'get',
			cache: false,
			success : function(result) {
				if (result.status == 0) {
					$("#followButton").hide();
					$("#hasfollow").show(50);
					$("#hasfollow1").show(50);
					$("#followButton1").hide();
					tongji.eventTrace('C关注','C关注-'+corpname+'('+corpid+')');
				} else if (result.status == 501) {
					window.location.href = basePath + "user/login";
				} else {
					alert(result.msg);
				}
				if($('#followButton') != undefined){
					mask.hide($('#followButton'));
				}
			}
		});
	},
	unfollowcorp : function(corpid, corpname) {
//		if(!this.lastTime){
//			this.lastTime = new Date().getTime();
//		}else{
//			var currentTime = new Date().getTime();
//			if(currentTime-this.lastTime<1000){
//				return;
//			}else{
//				this.lastTime=currentTime;
//			}
//		}
		if($('#hasfollow') != undefined){
			mask.show($('#hasfollow'));
		}
		$.ajax({
			url : basePath + 'user/unfollowcorp',
			data : {
				'corpid' : corpid				
			},
			dataType : 'json',
			type : 'get',
			cache: false,
			success : function(result) {				
				if (result.status == 0) {
					$("#hasfollow").hide();
					$("#followButton").show(50);
					$("#hasfollow1").hide();
					$("#followButton1").show(50);
					tongji.eventTrace('C取消关注','C取消关注-'+corpname+'('+corpid+')');
				} else if (result.status == 501) {
					window.location.href = basePath + "user/login";
				} else {
					alert(result.msg);
				}
				if($('#hasfollow') != undefined){
					mask.hide($('#hasfollow'));
				}
			}
		});
	}
};
user.resetPw = function() {	
	var $phone = $('#phoneNumberText');
	var $pw = $('#passwordText');
	var $pwConfirm = $('#passwordTextConfirm');
	var $code = $('#identifyingCodeText');
	if ($phone.val() == "") {
		alert("手机号不能为空");
		$phone.focus();
		return false;
	} else if ($pw.val() == "") {
		alert("密码不能为空");
		$pw.focus();
		return false;
	} else if ($code.val() == "") {
		alert("验证码不能为空");
		$code.focus();
		return false;
	} else if ($pwConfirm.val() == "") {
		alert("确认密码不能为空");
		$pwConfim.focus();
		return false;
	} else if ($pw.val() != $pwConfirm.val()) {
		alert("密码和确认密码不同");
		$pwConfim.focus();
		return false;
	}
	
	$("#btnReset").addClass("disabled");
	$("#btnReset").attr("onclick","");
	
	$.ajax({
		url : basePath + 'user/submit_resetpw',
		data : {
			'phone' : $phone.val(),
			'newpw' : $pw.val(),
			'pwconfirm' : $pwConfirm.val(),
			'code' : $code.val(),
			'_timestamp' : new Date().getTime()
		},
		dataType : 'json',
		type : 'get',
		success : function(result) {
			$("#btnReset").removeClass("disabled");
			$("#btnReset").attr("onclick","user.resetPw()");
			alert(result.msg);
			if (result.status == 0) {
				setTimeout(function() {
					window.location.href = basePath + 'user/login';
				}, 2000);
			}
		}
	});
};

user.changeRegPhone = function() {	
	var $cashpw = $('#cashpw');
	var $phone = $('#newPhoneText');
	var $code = $('#identifyingCodeText');
	if ($phone.val() == "") {
		alert("手机号不能为空");
		$phone.focus();
		return false;
	} else if ($code.val() == "") {
		alert("验证码不能为空");
		$code.focus();
		return false;
	}
	
	$("#btnReg").addClass("disabled");
	$("#btnReg").attr("onclick","");
	
	$.ajax({
		url : basePath + 'user/changeRegPhone',
		data : {
			'cashpw' : $cashpw.val(),
			'newphone' : $phone.val(),
			'code' : $code.val(),
			'_timestamp' : new Date().getTime()
		},
		dataType : 'json',
		type : 'post',
		success : function(result) {
			$("#btnReg").removeClass("disabled");
			$("#btnReg").attr("onclick","user.changeRegPhone()");
			alert(result.msg);
			if (result.status == 0) {
				setTimeout(function() {
					window.location.href = basePath + 'user/usercenter';
				}, 2000);
			}
		}
	});
};

user.info = {
	//所在城市
	submitCity : function() {
		var cityId = $("#city").attr('data-cityid');
		var districtid = $("#district").attr('data-districtid');
		if (!cityid > 0) {
			alert("请选择所在城市");
			return false;
		}
		//		if (!districtid > 0) {
		//			alert("请选择所在行政区");
		//			return false;
		//		}	
		user.info._ajax_submit({'cityId' : cityId/*, 'districtId' : districtid*/});	
	},
	//学校
	submitSchool : function() {
		var cityId = $("#cityid").val();
		var schoolid = $("#school").attr('data-schoolid');		
		if (!schoolid > 0) {
			alert("请选择学校");
			return false;
		}
		user.info._ajax_submit({'cityId' : cityId, 'schoolId' : schoolid});	
	},
	//专业
	submitMajor : function() {
		var major = $.trim($("#major").val());
		if (major == '') {
			alert("请输入专业");
			return false;
		}else if (major.length > 10) {
			alert("专业名称不能超过10字，请简化");
			return;
		}
		user.info._ajax_submit({'major' : major});
	},
	//姓名
	submitUserName : function() {
		var userName = $.trim($("#userName").val());
		if (userName == '') {
			alert("请输入姓名");
			return false;
		}else{
			var reg = "^[\u4e00-\u9fa5_a-zA-Z]{2,10}$";
			if (userName.match(reg) == null) {
				alert("姓名只能输入中文、字母且长度为2-10");
				return;
			}
		}
		user.info._ajax_submit({'userName' : userName});
	},
	//身高
	submitHeight : function() {
		var height = $.trim($("#height").val());
		if (height == '') {
			alert("请输入身高");
			return false;
		}else if(!$.isNumeric(height)){
			alert("请输入数字");
		}
		user.info._ajax_submit({'userHeight' : height});
	},
	//生日
	submitBirthday : function() {
		var appDate = $.trim($("#appDate").val());
		if (appDate == '') {
			alert("请输入出生日期");
			return false;
		}
		user.info._ajax_submit({'birthDay' : appDate});
	},
	//自我评价(标签)
	submitEvaluate : function() {
		var evallute = '';
		$('.self_evaluate_label ul li').each(function(i,n){
			if(evallute != ''){
				evallute += '#';
			}
			evallute += $(n).attr('data-name');
		});
		
		if (evallute == '') {
			alert("请选择便签");
			return false;
		}
		user.info._ajax_submit({'selfEvaluation' : evallute});
	},
	//自我评价(文字)
	submitUserDescription : function() {
		var userdescription = $.trim($("#userdescription").val());
		if (userdescription == '') {
			alert("请输入评价");
			return false;
		}
		user.info._ajax_submit({'userdescription' : userdescription});
	},
	//入学时间
	submitAdmissionTime : function() {
		var appDate = $.trim($("#appDate").val());
		if (appDate == '') {
			alert("请输入入学时间");
			return false;
		}
		user.info._ajax_submit({'admissionDate' : appDate});
	},
	//地址
	submitResideaddress : function() {
		var cityId = $("#cityid").val();
		var resideaddress = $.trim($("#resideaddress").val());
		if (resideaddress == '') {
			alert("请输入住址");
			return false;
		}
		user.info._ajax_submit({'cityId' : cityId, 'resideaddress' : resideaddress,});
	},
	updateInfo : function(param, callback){
		$.ajax({
			url : basePath + "user/updateUserInfo",
			type : "GET",
			data : param,
			dataType : 'json',
			success : function(result) {
				console.log(result);
				if(callback){
					callback(result);
				}
			}
		});
	},
	_ajax_submit : function(param){
		mask_loading.show();
		$.ajax({
			url : basePath + "user/updateUserInfo",
			type : "GET",
			data : param,
			dataType : 'json',
			success : function(result) {
				mask_loading.hide();
				if (result.status == 0) {
					alert(result.msg);
					setTimeout(function() {
						if(param.schoolId || param.resideaddress){
							window.location.href= basePath + 'user/editresume';
						}else{
							//myhistory.back();
						}
					}, 1500);		
				}else{
					alert(result.msg);
				}
			},
			error : function(){
				mask_loading.hide();
				alert("网络异常，请重试。");
			} 
		});
	}
}

var isSend = false;

var code = {
	/* 发验证码 */
	send : function(phone, otype, callback) {
		var imgCode = $("#imgCode");
		var code;
		if (phone == "") {
			alert('手机号不能为空');
			return false;
		}
		/*
		 * else
		 * if(!phone.match(/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/)){
		 * alert('手机号格式不正确'); return false; }
		 */

		else if (phone.length != 11) {
			alert('手机号格式不正确');
			return false;
		}
		
		if(imgCode&&imgCode.val()!=undefined){
			if(imgCode.val()==""){
				alert('请填写图片验证码');
				return false;
			}else {
				code = imgCode.val().replace(/^\s+|\s+$/g,"");//去除两头空格
				if(code.length>4){
					alert('图片验证码错误');
					user.changeImgCode();
					return false;
				}
			}
		}
		
		if (isSend == true) {
			return;
		}
		isSend = true;
		mask.show($('#sendButton'));
		$.ajax({
			url : basePath + 'user/sendcode',
			data : {
				'phone' : phone,
				'otype' : otype,
				'imgCode':imgCode&&imgCode.val()&&code,
				'imgKey':imgCode&&imgCode.val()&&$("#imgKey").val(),
				'_timestamp' : new Date().getTime()
			},
			dataType : 'json',
			type : 'get',
			success : function(result) {
				mask.hide($('#sendButton'));
				isSend = false;
				if(result.status == -5){
					//验证码发送失败,页面将自动刷新,请重试
					confirmSingleBtn(result.msg, function(){
						window.location.reload();
				    });					
				}else{
					alert(result.msg);
					if(result.status == -4){
						//图片验证码错误
						user.changeImgCode();
					}else if (result.status == 0) {
						if (callback != null) {
							callback();
						}
					}
				}
			}

		});
		isSend = false;

	}
};
// 我的工作
user.myjob = {
	unapply : function(optype, resumeid) {
		var title = "";
	    if(optype==1)
	    	title = "取消报名";
	    else if(optype==2)
	    	title = "拒绝签约";
	    else if(optype==3)
	    	title = "解约";
	    confirm('确定'+title+'吗?',function(){
	    	$.ajax({
				url : basePath + "user/unapply",
				type : "GET",
				data : {					
					'resumeid' : resumeid,
					'otype' : optype,
					'_timestamp' : new Date().getTime()
				},
				dataType : "json",
				success : function(result) {
					alert(result.msg);
					var title = "";
					if (result.status == 0) {
						
//						if (optype == 1) {
//							$("#unapply" + resumeid).css("display", "none");
//							title = "用户取消";
//                        }else if (optype == 2) {
//							$("#sign" + resumeid).css("display", "none");
//							$("#refuse" + resumeid).css("display", "none");
//                            title = "用户拒绝";
//                        } else if (optype == 3) {
//							$("#break" + resumeid).css("display", "none");
//							title = "用户解约";
//						}
//						$("#apply" + resumeid).css("display", "inline-block");
//						$("#title" + resumeid).empty();
//						$("#title" + resumeid).text(title);
						setInterval(function(){
							window.location.reload();
						}, 1500);
					}
				}
	    	}
	    	);
		});
	     
	},
	pass:function(resumeid){
		$.ajax({
			url : basePath + "user/sign",
			type : "GET",
			data : {					
				'resumeid' : resumeid,
				'_timestamp' : new Date().getTime()
			},
			dataType : "json",
			success : function(result) {
				alert(result.msg);
				if (result.status == 0) {
					$("#break" + resumeid).css("display", "inline-block");
					$("#comment" + resumeid).css("display", "inline-block");
					$("#sign" + resumeid).css("display", "none");
					$("#refuse" + resumeid).css("display", "none");
					$("#title" + resumeid).empty();
					$("#title" + resumeid).text("已签约");
				}
			}
    	}
    	);
	},	
	send : function() {
		var jobresumeid = $("#jobresumeid").val();
		var tradeno = $("#tradeno").val();
		var content = $("#content").val();
		var starlevel = $("#starlevel").val();
		if (starlevel == 0) {
			alert("请进行星级评分");
			return;
		}
		$(".aBg").addClass("active");
		$.ajax({
			url : basePath + "comment/evaluateCorp",
			type : "POST",
			data : {
				"jobresumeid" : jobresumeid,
				"content" : content,
				"starlevel" : starlevel,
				"payrollno" : tradeno,
				'_timestamp' : new Date().getTime()
			},
			dataType : "json",
			success : function(result) {
				$(".aBg").removeClass("active");
				alert(result.msg);
				if(result.status==0){
					setTimeout(function() {
						window.location.href = basePath + 'user/querybyuser';
					}, 2000);
				}
			}
		});
	}
};
user.password = {
	change : function() {
		var newpw = $("#newpw").val();
		var oldpw = $("#oldpw").val();
		var pwconfirm = $("#pwconfirm").val();
		if (newpw == "" || oldpw == "" || pwconfirm == "") {
			alert("密码不能为空");
			return false;
		} else if (newpw != pwconfirm) {
			alert("两次密码输入不相同");
			return false;
		}else if(oldpw == newpw){
			alert("输入的新密码与原密码相同，请输入新的密码");
			return false;
		}
		var param = {
			'newpw' : newpw,
			'oldpw' : oldpw,
			'pwconfirm' : pwconfirm
		};
		$.ajax({
			url : basePath + "user/changepw",
			type : "GET",
			data : {
				'param' : JSON.stringify(param),
				'_timestamp' : new Date().getTime()
			},
			dataType : "json",
			success : function(result) {
				alert(result.msg);
				$("#newpw").val("");
				$("#oldpw").val("");
				$("#pwconfirm").val("");
				if (result.status == 0) {
					setTimeout(function() {
						window.location.href = basePath + 'user/login';
					}, 2000);
				}
			}
		});

	}
};
user.resume = {
	changecity : function() {
		var cityid = document.all['city'].value;
		if(cityid==0){
			$("#schools").empty();
			$("#schools").val("");
			$("#schools").html("");
			$("#schools").append("<option value='0' >未选择</option>");
			return false;
		}
	    var _url = basePath + "user/getschools";
		var param = {
			'cityid' : cityid,
		};
		$.ajax({
					url : _url,
					type : "GET",
					data : {
						"data" : JSON.stringify(param)
					},
					dataType : "json",
					success : function(result) {
						var schools = result.schools;
						var _schools = "<option value='0' >未选择</option>";
						for (j in schools) {
							if (sid != null && sid == schools[j].id)
								select = "selected";
							else
								select = "";
							if (schools[j].id != null || schools[j].id != '') {
								_schools += "<option value='" + schools[j].id
										+ "' " + select + " >"
										+ schools[j].name + "</option>";
							}
						}
						$("#schools").empty();
						$("#schools").val("");
						$("#schools").html("");
						$("#schools").append(_schools);
					}

				});

	},
	edit : function() {
		name = $("#name").val();
		sex = $("#sex").val();
		phone = $("#phone").val();
		sid = $("#schools").val();
		mname = $("#mname").val();
		description = $("#description").val();
		if (name == "" || phone == "") {
			alert("姓名不能为空");
			return;
		}
		var reg = "^[\u4e00-\u9fa5_a-zA-Z]{2,10}$";
		if (name.match(reg) == null) {
			alert("姓名只能输入中文、字母且长度为2-10");
			return;
		}
		if (mname != "" && mname.length > 10) {
			alert("专业名称不能超过10字，请简化");
			return;
		}
		if (description != "" && description.length > 200) {
			alert("自我描述不超过200字");
			return;
		}
		$(".aBg").addClass("active");
		var param = {
			'name' : name,
			'sex' : sex,
			'phone' : phone,
			'sid' : sid,
			'mname' : mname,
			'description' : description
		};
		$.ajax({
			url : basePath + "user/editmyresume",
			type : "GET",
			data : {
				'data' : JSON.stringify(param),
				'_timestamp' : new Date().getTime()
			},
			dataType : "json",
			success : function(result) {
				$(".aBg").removeClass("active");
				alert(result.msg);
				if (result.status == 0) {
					setTimeout(function() {
						myhistory.back();
					}, 2000);

				}
			}
		});
	}
	
};
user.message = {
	edit : function(id, targeturl, target) {

		$.ajax({
			url : basePath + "user/readmsg",
			type : "GET",
			data : {
				'mid' : id,
				'_timestamp' : new Date().getTime()
			},
			dataType : "json",
			success : function(result) {
				if (result.status == 0) {
					// alert(result.msg);
					// window.location.reload();

				} else {
					// alert(result.msg);
				}

				if (targeturl != '') {
					location.href = basePath + targeturl;
				}

			}
		});

		$(target).find("#noread").remove();

		// 跳转过去目标的地址

	},
	loadMore : function() {
		var page = parseInt($("#nowPage").val())+1;
		$.ajax({
			url : basePath + "user/mymsgjson",
			type : "GET",
			data : {
				page : page
			},
			dataType : "json",
			success : function(result) {
				if (result.status == 0) {
					var len 		= result.list.length,
						insertHtml 	= '',
						readState 	= '';
					if(len <= 0){
						$("#nowPage").val(page - 1);
						$(".loadMoreJob").html("暂无消息");
						return;
					}
					for(var i=0; i<len; i++){
						if(result.list[i].state === "未读"){
							readState = '<i id="noread"></i>';
						}
						var onClick="tongji.eventTrace('C提醒消息详情', 'C提醒消息详情-"+result.list[i].type+"("+result.list[i].id+")');";
							onClick+="user.message.edit('"+result.list[i].id+"',"+result.list[i].targetUrl+",this)";
	insertHtml += '<li class="mb15">'+
			           '<a href="javascript:void(0)" onclick="'+onClick+'">'+  
			           		readState+
						   '<h3><span class="time">'+result.list[i].time+'</span>'+result.list[i].type+'</h3>'+
						   '<p class="link-grey333">'+result.list[i].content+'</p>'+
					   '</a></li>';
					}
					$("#messageList").append(insertHtml);
					$("#nowPage").val(page);
				} 
			},
			error: function(xhr, type){
                alert('Ajax error!');
                // 即使加载出错，也得重置
            }
		});
	}
};
user.score = {
	comment : function(id) {
		for (var i = 1; i < 6; i++) {
			if (i < id + 1)
				$("#star" + i).attr("src",
						basePath + "resource/images/m/star2.png");
			else
				$("#star" + i).attr("src",
						basePath + "resource/images/m/star1.png");

		}
		$("#starlevel").val(id);

	}
};

//刷新图片验证码
user.changeImgCode = function(){
	$("#imgcode").attr("src",basePath+"user/createCode?imgKey="+$("#imgKey").val()+"&t="+new Date().getTime());
}

// 注册按钮toggle，由选择协议控制
var regToggleFlag = false;
user.regToggle = function() {
	regToggleFlag = !regToggleFlag;
	if (regToggleFlag) {
		$('#btnReg').hide();
		$('#disBtnReg').show();
	} else {
		$('#disBtnReg').hide();
		$('#btnReg').show();
	}
};

user.getDistrict = function(cityid, callBack){
	$.ajax({
		url : basePath + "dict/getDistricts",
		type : "GET",
		data : {
			'cityid' : cityid,			
		},
		dataType : "json",
		success : function(result) {
			callBack(result.districts);
		}
	});
}

var networkTypeFlag;

$(function(){
	$('#headImage').click(function(e){
		getNetworkType();
		var networkType = window.localStorage.getItem("networkType");
		if(networkType && networkType!="wifi" && !networkTypeFlag){
        	confirm("系统检测到您正在使用数据网络,上传图片可能产生流量费用，是否继续？",function(){
        		$('#userHeadImage').click();
        	});
        	networkTypeFlag = true;
        }else{
        	$('#userHeadImage').click();
        }
	});
	
	function getNetworkType(){
		wx.getNetworkType({
			success: function (res) {
				window.localStorage.setItem("networkType",res.networkType);
				//window.networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
			}
		});
	}
	
	//图片上传
	$(document).on('change',"#userHeadImage",function(e){
		var element = e.target;
		var files = element.files;
		if(files){
			var file = files[0];
			if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name)) {  
	            alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
	            return false;  
	        }
			if(file.size>10*1024*1024){
				 alert("图片不能大于10M");
		         return false; 
			}

			mask_loading.show("提交中");
			$.ajaxFileUpload({
			    url:basePath+'user/uploadheadimage',//处理图片地址
			    secureuri :false,
				dataType:'application/json',
			    fileElementId :"userHeadImage",//file控件id
			    success : function (data){
			    	mask_loading.hide();
			        var result = eval('(' + data + ')'); 
			        if(result.status==0){
			        	$('#headImage').attr('src',result.imageUrl);
				    }else{
				    	alert(result.msg);
				    }
			    },
			    error: function(e){
			        alert(e);
			    }
			});
	    }
	});
})
