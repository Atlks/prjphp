var domain2 = "/";
function delLwords(id)
{
        var height = document.body.clientHeight;
        var hh = document.body.clientHeight > (window.screen.availHeight - 125 ) ? "0px" : parseInt(window.screen.availHeight - document.body.clientHeight - 125)+"px";
        document.getElementById("hdiv").style.height = hh;
		openWindow('./DelShopLword.aspx?id='+id, 300, 150, '删除留言');
}
function delMode(id)
{
        var height = document.body.clientHeight;
        var hh = document.body.clientHeight > (window.screen.availHeight - 125 ) ? "0px" : parseInt(window.screen.availHeight - document.body.clientHeight - 125)+"px";
        document.getElementById("hdiv").style.height = hh;
		openWindow('./DelMode.aspx?id='+id, 300, 150, '删除模块');
}
function addMode(id)
{
        window.location.href="CustomModuleAdd.aspx?id="+id;
}
function EditMode(id)
{
		window.location.href="CustomModuleEdit.aspx?modeid="+id;
}
function addModeRight()
{
        var height = document.body.clientHeight;
        var hh = document.body.clientHeight > (window.screen.availHeight - 125 ) ? "0px" : parseInt(window.screen.availHeight - document.body.clientHeight - 125)+"px";
        document.getElementById("hdiv").style.height = hh;
		openWindow('./AddTypeMode.aspx', 440, 290, '分类模块');
}
function addcon(id)
{
        var height = document.body.clientHeight;
        var hh = document.body.clientHeight > (window.screen.availHeight - 125 ) ? "0px" : parseInt(window.screen.availHeight - document.body.clientHeight - 125)+"px";
        document.getElementById("hdiv").style.height = hh;
		openWindow('./AddConsi.aspx?id='+id, 440, 400, '添加商品');
}
function addtab()
{
        var height = document.body.clientHeight;
        var hh = document.body.clientHeight > (window.screen.availHeight - 125 ) ? "0px" : parseInt(window.screen.availHeight - document.body.clientHeight - 125)+"px";
        document.getElementById("hdiv").style.height = hh;
		openWindow('./AddShopTab.aspx', 400, 350, '添加标签');
}
function addFriLink()
{
        var height = document.body.clientHeight;
        var hh = document.body.clientHeight > (window.screen.availHeight - 125 ) ? "0px" : parseInt(window.screen.availHeight - document.body.clientHeight - 125)+"px";
        document.getElementById("hdiv").style.height = hh;
		openWindow('./AddFriLink.aspx', 270, 230, '友情链接设置');
}
function getCookies(name)
{
　　 var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
　　 if(arr != null) return decodeURI(arr[2]); return null;
}
function setCookie(name,value){   
    var Days = 30;   
    var exp  = new Date();   
    exp.setTime(exp.getTime() + Days*24*60*60*1000);   
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();   
}
////写cookie
//function setCookie(name,value,expires){
//var exp=new Date();
//exp.setTime(exp.getTime()+expires*60000);
//document.cookie=name+"="+escape(value)+";expires="+exp.toGMTString();//+";domain=arkoo.com;path=/";
//} 
function getTitle1(){
    setCookie("titles","1");
    document.location.replace(domain2+"Buyer.aspx");
}
function getTitle2(){
    setCookie("titles","2");
    document.location.replace(domain2+"ShopPage.aspx");
}
function shopLeft(){
    var userid = getCookies('UserId');
    var MessCount=getCookies('MessCount');
    if(MessCount==null){
        MessCount=0;
    } 
    var v_html="";
    var titles=getCookies("titles");
    var shopid=getCookies("ShopId");
    var shopyu=getCookies("Shopyu2");

    if(userid!=null&&userid!="null"&&userid!=""){
        if(shopid==null||shopid=="null"||shopid==""||shopid==0){
        v_html ='<div id="left">'
        +'               <div id="menu">'
        +'                    <ul>'
        +'                        <li class="liindex">'
        +'                            <div class="menu-index">'
        +'                                <img src="'+domain2+'images/indexpic.gif" class="menu-pic"><a href="'+domain2+'user/" >我的首页</a></div>'
        +'                        </li>'
        +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
        +'                            <div class="menu04">'
        +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'message/">站内信</a></div>'
        +'                        </li>'
        +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
        +'                            <div class="menu04">'
        +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'Cart.aspx">我的购物车</a></div>'
        +'                        </li>'
        +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
        +'                            <div class="menu04">'
        +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'FavL.aspx?is_cp=1">收藏的商品</a></div>'
        +'                        </li>'
        +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
        +'                            <div class="menu04">'
        +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'FavL.aspx?is_cp=2">收藏的店铺</a></div>'
        +'                        </li>'
        +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
        +'                            <div class="menu04">'
        +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'Buyer.aspx">已买到的商品</a></div>'
        +'                        </li>'
        +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
        +'                            <div class="menu04">'
        +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'EditAddress.aspx">收货地址管理</a></div>'
        +'                        </li>'
        +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
        +'                            <div class="menu04">'
        +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'DetailMoneyUser.aspx">消费信息</a><span class="menu-index-01" id="div_MsgCount"><a href="'+domain2+'UserResult.aspx">充值</a></span></div>'
        +'                        </li>'
        +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
        +'                            <div class="menu04">'
        +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'WithdrawM.aspx">提现设置</a></div>'
        +'                        </li>'
        +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
        +'                            <div class="menu04">'
        +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'Withdrawnote.aspx">提现申请</a></div>'
        +'                        </li>'
        +'                    </ul>'
        +'                </div>'
        +'</div>';
        }else{
        if(titles=="1"||titles==""||titles==null||titles=="null"){
                    v_html ='<div id="left">'
                    +'               <div id="menu">'
                    +'                    <ul>'
                    +'                        <li class="liindex">'
                    +'                            <div class="menu-index">'
                    +'                                <img src="'+domain2+'images/indexpic.gif" class="menu-pic"><a href="'+domain2+'user/" target="_blank">我的首页</a></div>'
                    +'                        </li>'
                    +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu04">'
                    +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'message/">站内信</a></div>'
                    +'                        </li>'
                    +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu04">'
                    +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'Cart.aspx">我的购物车</a></div>'
                    +'                        </li>'
                    +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu04">'
                    +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'FavL.aspx?is_cp=1">收藏的商品</a></div>'
                    +'                        </li>'
                    +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu04">'
                    +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'FavL.aspx?is_cp=2">收藏的店铺</a></div>'
                    +'                        </li>'
                    +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu04">'
                    +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'Buyer.aspx">已买到的商品</a></div>'
                    +'                        </li>'
                    +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu04">'
                    +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'EditAddress.aspx">收货地址管理</a></div>'
                    +'                        </li>'
                    +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu04">'
                    +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'DetailMoneyUser.aspx">消费信息</a><span class="menu-index-01" id="div_MsgCount"><a href="'+domain2+'UserResult.aspx">充值</a></span></div>'
                    +'                        </li>'
                    +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu04">'
                    +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'WithdrawM.aspx">提现设置</a></div>'
                    +'                        </li>'
                    +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu04">'
                    +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'Withdrawnote.aspx">提现申请</a></div>'
                    +'                        </li>'
                    +'                    </ul>'
                    +'                </div>'
                    +'</div>';
        }else{  
                    v_html ='<div id="left">'
                    +'               <div id="menu">'
                    +'                    <ul>'
                    +'                        <li class="liindex">'
                    +'                            <div class="menu-index">'
                    +'                                <img src="'+domain2+'images/indexpic.gif" class="menu-pic"><a href="shop.aspx?id='+shopid+'">店铺首页</a></div>'
                    +'                        </li>'
                    +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu04">'
                    +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'ShopPage.aspx">店铺信息</a><span class="menu-index-01" id="div_MsgCount"><a href="'+domain2+'ShopRealname.aspx">认证</a></span></div>'
                    +'                        </li>'
                    +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu04">'
                    +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'DetailMoney.aspx">保障金明细</a><span class="menu-index-01" id="div_MsgCount"><a href="'+domain2+'UserResult.aspx">充值</a></span></div>'
                    +'                        </li>'
                    +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu04">'
                    +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'Scmay.aspx">商品订单管理</a></div>'
                    +'                        </li>'
                    +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu-index">'
                    +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'add_c1.aspx">商品发布</a></div>'
                    +'                        </li>'
                    +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu04">'
                    +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'ShopShelve.aspx?isle=1">出售中的商品</a></div>'
                    +'                        </li>'
                    +'			              <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu02">'
                    +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a  href="'+domain2+'ShopShelve.aspx?isle=0">仓库中的商品</a></div>'
                    +'                         </li>'
                    +'		                  <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu04">'
                    +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a  href="'+domain2+'Recommend.aspx">商品推荐管理</a></div>'
                    +'                        </li>'
                    +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu04">'
                    +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'Cstype.aspx">商品类别管理</a></div>'
                    +'                        </li>'
                    +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu04">'
                    +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'ShopLword.aspx">买家留言/回复</a></div>'
                    +'                        </li>'
                    +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu04">'
                    +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'SStyleMain.aspx">店铺风格设置</a></div>'
                    +'                        </li>'
                    +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu04">'
                    +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'ShopPreManage.aspx">店铺首页设置</a></div>'
                    +'                        </li>'
                    +'                        <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu04">'
                    +'                                <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a href="'+domain2+'Coupon_s.aspx">优惠券设置</a></div>'
                    +'                        </li>'                    
                    +'				          <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu04">'
                    +'                              <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a  href="'+domain2+'EditShopMgs.aspx">修改店铺资料</a></div>'
                    +'                        </li>' 
                    +'				          <li onmouseover=this.className="menu_onl" onmouseout=this.className="menu_outl">'
                    +'                            <div class="menu04">'
                    +'                              <img src="'+domain2+'images/turnpic.gif" class="menu-pic"><a  href="'+domain2+'Aservice.aspx">售后服务填写</a></div>'
                    +'                        </li>'                     
                    +'                    </ul>'
                    +'                </div>'
                    +'</div>';
            }
        }
    }
	document.writeln(v_html);
	loadMsgCount();
}
function logout2(){
   //document.location.replace(domain2+"Logout.aspx?uu="+escape(location.href));
   document.location.replace(domain2+"Logout.aspx");
}
var Uname = getCookies('Uname');
var shopid=getCookies("ShopId");

function indexhead(){
    var right_html="";
    if(Uname == null || Uname=="null" || Uname == ""){
        right_html+='<div class="reg">'
        right_html+='<a href="'+domain2+'register.aspx">注册</a></div>'
        right_html+='<div class="login">'
        right_html+='<a href="'+domain2+'Login.aspx">登陆</a>&nbsp;&nbsp;</div>'
        right_html+='<div class="ass">'
        right_html+='<a href="'+domain2+'Advertiser.aspx">商家入驻</a></div>';
    }else{
        right_html+='<div class="onlogin">'
        right_html+='<div style="float:left;color:white">Hi，<a href="'+domain2+'user/" target="_blank">'+Uname+'</a></div>&nbsp;<a href="javascript:logout2();">[退出]</a>&nbsp;&nbsp;<a href="'+domain2+'Cart.aspx">购物车</a>&nbsp;&nbsp;<a href="'+domain2+'FavL.aspx">收藏夹</a>&nbsp;&nbsp;<a href="'+domain2+'user/" onclick="getTitle1();">个人中心</a>'
        if(shopid!=null&&shopid!="null"&&shopid!=""&&shopid!=0){
            right_html+='&nbsp;&nbsp;<a href="#" onclick="getTitle2();">店铺管理</a></div>' 
            right_html+='</div>'
        }else{
            right_html+='</div>'
            right_html+='<div class="ass">'
            right_html+='<a href="'+domain2+'Advertiser.aspx">商家入驻</a></div>';
        } 
    }
    document.writeln(right_html);
}
function createXMLHttpRequest() {
    //判断浏览器是否支持ActiveX控件
    if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }
}
function doRequest2(url) {
    //调用方法，返回地址
    createXMLHttpRequest();		
    var queryString = url;
    xhr.onreadystatechange = handleStateChange2;//当XMLHttpRequest的readyState属性改变的时候
    xhr.open("POST", queryString, true);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;");
    xhr.setRequestHeader ("Cache-Control","no-cache");
    //xhr.setRequestHeader( 'If-Modified-Since', 'Thu, 06 Apr 2006 01:00:00 GMT' );
    xhr.send(queryString);
}
function handleStateChange2() {

    if(xhr.readyState == 4) {   
        if(xhr.status == 200) {
            parseResults2();
        }
        if(xhr.status == 12030 || xhr.status == 12031){  
         // alert(xhr.status);
        }
    }
}
function parseResults2() {	  
    if(document.getElementById("div_MsgCount") == undefined){
        return false;
        }
    var div_MsgCount = document.getElementById("div_MsgCount");
    var count = parseInt(xhr.responseText);
    if(count > 0)
        div_MsgCount.innerHTML = '<a href="'+domain2+'new/" style="color:red">消息('+count+')</a>';
    else
        div_MsgCount.innerHTML = '<a href="'+domain2+'new/">消息(0)</a>';
}

function loadMsgCount(){
//    try{
//        doRequest2(domain2+'new/GetCount.aspx');
//    }catch(e){
//    }
}

function search2(){
    var texts=document.getElementById("searchct").value;
    var select_v=document.getElementById("seselect2").value;
    window.location=domain2+'list.aspx?tid='+select_v+'&titlec='+texts;
}