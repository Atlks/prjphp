<%@ page language="java" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ include file="/jsp/common/taglibs.jsp"%>
<%
 String roleId = request.getParameter("roleId");
%>
<script type="text/javascript">
var language = $.cookie('language');
var selecctRowInput = ""; // 角色id
var selectRoleUserNode; // node组织机构节点
var select_role_organ_tree;
var select_role_user_datagrid;
var userId='';
var roleId ='';
 var orgId;
    $(function() {
    	//从角色权限树节点获取roleId
    	roleId = $('#roleId').val();
    	 if(roleId!=''){
    		 selecctRowInput = roleId;
    	 }
    	 userId = $.cookie('userId'); 
    });
  //组织机构树
    select_role_organ_tree = $("#select_role_organ_tree").tree({
    	method:'get',
    	line:true,
    	url:hostUrl+'/sysOrg/getOrgPTrees?userId='+userId+"&flag=USER_MANAGER&language="+language,
        onClick:function(node){
        	 search();
        }
    });
  //初始化 设置机构
    function saveRoleUserFun(userIds){
    	 	   $.ajax({
  			 	type: "post",
  			 	 url: hostUrl+"/sysUserRole/saveRoleUser?roleId="+selecctRowInput+"&userIds="+userIds,
  			 	 dataType:"text",
    	 	    success: function(msg){
    			if(msg=='SUCCESS'){
    				
    				select_user_dialog.dialog('destroy');// 关闭选择 dialog
    			
    				searchRoleUserList(_roleId,_roleName);//重新刷新角色用户列表
    				//leftRoleTree();
               		$.messager.alert(getPropertiesValue('prompt'),getPropertiesValue('op_success'),'info');
     		  	}else{
     		  		$.messager.alert(getPropertiesValue('prompt'),getPropertiesValue('op_error'),'info');
     		  	}
    		}
    	});
    }


    select_role_user_datagrid = $('#select_role_user_datagrid').datagrid({
    	url:hostUrl+'/sysUser/getDirSysUser?userId='+userId+'&language='+language,
        method:'get',
        fit:true,
        pagination: true,//底部分页
        pagePosition: 'bottom',//'top','bottom','both'
        fitColumns:true,//自适应列宽
        striped:true,//显示条纹
        pageSize:10,//每页记录数
        singleSelect : false,//单选模式
        rownumbers:true,//显示行数
    	nowrap : false,
    	border : false,
        remoteSort:false,//是否通过远程服务器对数据排序
        sortName:'userId',//默认排序字段
        sortOrder:'asc',//默认排序方式 'desc' 'asc'
        idField : 'userId',
        frozen:true,
        collapsible: true,
        frozenColumns:[[
            {field:'ck',checkbox:true},
            {field:'userId',hidden:true},
            {field:'loginName',title:getPropertiesValue('login_name'),width:80,align:'left',sortable:true},
            {field:'trueName',title:getPropertiesValue('true_name'),width:80,align:'left',sortable:true},
            {field:'sex',title:getPropertiesValue('sex'),width:40,align:'center',sortable:true,formatter:function(value,row,index){
            	if(value == "1"){
            		return '<img src="${ctx}/js/jquery/easyui-1.3.6/themes/icons/extjs_icons/user/user.png" />';
            	}else{
            		return '<img src="${ctx}/js/jquery/easyui-1.3.6/themes/icons/extjs_icons/user/user_female.png" />';
            	}
              }}
        ]],
        columns:[[
            {field:'createTime',title:getPropertiesValue('create_time'),width:120,align:'center',sortable:true,formatter:function(value,row,index){
            	if(value != null){
                	var unixTimestamp = new Date(value).format("yyyy-MM-dd HH:mm");
                	return unixTimestamp.toLocaleString();
            	}
            	return value;
            	}
            },
            {field:'isUse',title:getPropertiesValue('user_state'),align:'center',width:85,sortable:true,formatter:function(value,row,index){
            	if(value == "1"){
            		return '<img  src="${ctx}/js/jquery/easyui-1.3.6/themes/icons/stop.png" />';
            	}else{
            		return '<img  src="${ctx}/js/jquery/easyui-1.3.6/themes/icons/start.png" />';
            	}
			}}
        ]],
        toolbar:[{
        	id:'add',
            text:getPropertiesValue('add_button'),
            iconCls:'icon-add',
            handler:function(){
            	var rows = $('#select_role_user_datagrid').datagrid('getSelections');
            	var userIds = "";
            	for(var i = 0 ; rows.length > i ; i++){
	            	userIds += ","+rows[i].userId; 
            	}
            	saveRoleUserFun(userIds.substr(1));
            }
        }],
        onBeforeLoad :function(){
        },
        onLoadSuccess:function(){
        	
        },
        onRowContextMenu : function(e, rowIndex, rowData) {
        	
        },
        onDblClickRow:function(rowIndex, rowData){

        }
    }).datagrid('showTooltip');
    
	// 刷新角色用戶列表
    function refresh(){
    	user_datagrid.datagrid('load',{roleId:roleId});
	}
    function search(){
        var node = select_role_organ_tree.tree('getSelected');//
        if(node != null){
            orgId = node.id; //搜索 id:主键 即是通过左边组织机构树点击得到搜索结果
        }
        select_role_user_datagrid.datagrid('load',{orgId:orgId,loginName:$("#loginName").val(),userId:userId});
    }
</script>
<div class="easyui-layout" fit="true" style="margin: 0px;border: 0px;overflow: hidden;width:100%;height:100%;">
    <%-- 左边部分 菜单树形 --%>
    <div data-options="region:'west',title:'',split:false,collapsed:false,border:false"style="width: 200px; text-align: left;padding:5px;">
        <ul id="select_role_organ_tree"></ul>
        <input type="hidden" id="roleId"  value="<%=roleId%>"/>
    </div>
    <!-- 中间部分 列表 -->
    <div data-options="region:'center',split:true" style="overflow: hidden;">
        <div id="select_role_user_datagrid"></div>
        
    </div>
    
</div>