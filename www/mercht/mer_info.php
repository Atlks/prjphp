
<?php

// $_GET['pwd'] = '8880';
// $_GET['uname'] = 'uu';
//tisye mng list.php
error_reporting(E_ALL ^ E_NOTICE);
parse_str($_SERVER['QUERY_STRING'], $parr);
//print_r($parr);
$loginacc=$_COOKIE["loginacc"];

require_once "../conn.php";
//$pdo->exec("set names 'utf8'");
$sql = "select * from merchan where uname=?";
$PDOStatement1 = $pdo->prepare($sql);
$rzt_bool = $PDOStatement1->execute(array($_COOKIE['loginacc']));
$rzt = $PDOStatement1->fetch();

//print_r($sql);
 
 echo   json_encode($rzt);

//echo json_encode($rows);
