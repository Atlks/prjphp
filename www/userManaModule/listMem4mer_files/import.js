// JavaScript Document
var ImportMap={};

function importx(jsSrc)
{
	if(ImportMap[jsSrc])
		return;
	ImportMap[jsSrc]=1;
	 var oHead = document.getElementsByTagName('HEAD').item(0); 

    var oScript= document.createElement("script"); 

    oScript.type = "text/javascript"; 

    oScript.src=import_base+jsSrc; 

    oHead.appendChild( oScript); 
	
}