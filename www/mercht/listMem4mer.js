// JavaScript Document


 
//importx("com.atilax.frmwk/jquery-1.8.3.min.js");

importx("com.attilax/templete/jquery.tmpl.js");

importx("com.attilax/dataService/dataServiceV2q329.js");
importx("com.attilax/web/req.js");
importx("com.attilax/web/dslUtil.js");
importx("com.attilax/core/jqUtil.js");
importx("com.attilax/core/ex.js");
importx("com.attilax/core/core.js");
importx("com.attilax/text/str.js");
importx("com.attilax/web/urlUtil.js");
importx("com.attilax/ui/Table.js");



//com.attilax/text/str.js
importx("com.attilax/jsbridge/jsb_v7q329.js");
importx("com.attilax/dataService/dataServiceV3q41.js");
importx("com.attilax/order/orderService.js");

  window.onerror=function(errorMessage, scriptURI, lineNumber, columnNumber, error)
  { 
 
	  //ip6  cp hto only 4g param   ma zuihou yig...first param is object
	//  alert( JSON.stringify(arguments));
	//  alert(error);
	 //	 alert( JSON.stringify(errorMessage));
	try{
	 var errmsg=JSON.stringify(arguments);
	 console.log(errmsg);
	 errmsg=encodeURIComponent(errmsg);
	  var  mp="$method=com.attilax.log.FileLogService.log&$callback=page_load_callback&$mod=userMod&$tabletype=view&$table=orderView&$view_store_path=com/attilax/order&$op=insert&param="+errmsg;
		 //	alert("get post mp:"+mp);
	 
////	HRE.exe(mp,function(data)
////		{
//			console.log(data);
//		}
//	);	
	}catch(e)
	
	{  // trycatch  beir recyele err.
	    console.log(e);	
	}
	 
 
  }
  
  function opBtnDislayStat(data)
  {
	  if(data==1)
	return  "none";    //hide
	if(data==0)
	return  "none"; 
	 
	return  "xx";   //show
  }
  
  function showStat(data)
  {
	if(data==1)
	return  "已接受";  
	if(data==0)
	return  "已拒绝"; 
	 
	return  ""; 
  }
  

function  bindDataQ41(json_arr)
{
	 $("#table1_tmpl tr").eq(0).nextAll().remove();  
	json_arr=str2json(json_arr);
	var tmplxx=　$("#table1_tmpl");
     tmplxx.tmpl(json_arr).appendTo('#sample-table-1');	
  

      $(".table1 tr").eq(1).hide();
	// 　$("#table1_tmpl").hide();
	
}

function page_load()
{
	var tb1 =new TableV1();
	
	var ds=new dataServiceV3(); ds.formid="formx"; //alert(); 
	var s="select * from `order` where	art_id="+UrlParm.parm('art_id') +" and stat is null order by oid desc"; 
	s=encodeURIComponent(s); 
	ds.query("$tb="+s+"&$tbtype=sq&$trigg er000=com.attilax.dataService.meta_data_pars_from_txt_trigger&$trigtime=after&order_i d=$uuid"+"&user_id=$uid&$member_id=$uid",bindDataQ41);
	
}
