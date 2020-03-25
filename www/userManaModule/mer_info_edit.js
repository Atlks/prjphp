
 


importx("com.attilax/dataService/dataServiceV2q329.js");
importx("com.attilax/web/dslUtil.js");
importx("com.attilax/core/jqUtil.js");
importx("com.attilax/core/ex.js");
importx("com.attilax/core/core.js");
importx("com.attilax/text/str.js");
importx("com.attilax/web/urlUtil.js");

//com.attilax/text/str.js
importx("com.attilax/jsbridge/jsb_v10q55.js");
importx("com.attilax/dataService/dataServiceV5q55.js");
importx("com.attilax/io/uploadV3.js");
importx("com.attilax/ui/AForm.js");
var uploadSrv;
function page_load()
{
	var orm=new atiOrm();
		orm.formid="formx";
	//	alert();
		var sql="select * from  wxb_customer  where customer_id=$uid$";	 
		orm.obj=encodeURIComponent(sql);   //操作对象名称,这里是sql，也可以是表名，查询操作作默认此处是sql,如果更新操作默认此处是表名
	//	orm.objtype="sql"; def  is sql  if query
		orm.query("",function(data)
		{
			var  jo=str2json(data);
			jo=jo[0];
			var aform=new AForm();
			aform.bind(jo);	
				  
			//  aform.base="../";
			//  if(jo.thumb)
			//	  $("#headImage").attr("src","../"+jo.thumb);
			
		}); 
	

var saveDir="00upQ4";
saveDir=encodeURIComponent(saveDir);
uploadSrv=new  AtiUploadV3("#userHeadImage");
uploadSrv.up_url=$approot+"/upServlet?savepath="+saveDir;
 
uploadSrv.upload_finish_handler=function(data){
	data=data.trim();
	console.log("upload_finish_handler:"+ data);
	console.log("上传结束返回结果:"+data);
	$("#thumb").val(data);
	var url=getPicSrc4createObjectURL("userHeadImage");
	console.log(url);
	$("#headImage").attr("src",url);
};


}

/*window.alert=function(msg)
{
console.log(msg);	
}*/

 function btn_click()
 {
	 
		var orm=new atiOrm();
		orm.formid="formx";
		orm.obj="wxb_customer";
 
		orm.merge(); 
 }
