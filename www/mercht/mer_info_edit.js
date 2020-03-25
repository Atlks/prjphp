
$(function () {
	// do something
	console.log("js do logding.................")
	$.getJSON("mer_info.php?id=", function (result, status) {

		console.log("mer_info.php ajax ret:" + result);
		$("#id").val(result.id);
		$("#mername").val(result.mername); $("#merkey").val(result.merchan_key);

		$("#demo").val(result.demo);
		//	VueObj1.$data.list_data1=result;
		//	alert("Data: " + data + "nStatus: " + status);
	});
});

