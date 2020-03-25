// JavaScript Document

function str_repeat(string,repeat)

{
	s="";
	for(i=0;i<repeat;i++)
	{
		s+=string;
	}
	return s;
}
STR_PAD_LEFT="left";
function str_pad(string,length,pad_string,pad_type)
{
	var rept=length-string.length;
	var pads=str_repeat(pad_string,rept);
	return pads+string;
	
}
String.prototype.startWith = function(compareStr){
return this.indexOf(compareStr) == 0;
}
function start_with(string,substrx)
{
	return string.indexOf(substrx) == 0; 
	
}