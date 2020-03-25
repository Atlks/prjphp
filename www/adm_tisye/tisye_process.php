<?php
error_reporting(E_ALL ^ E_NOTICE);

require_once "../conn.php";

$pdo->exec("set names 'utf8'");
//$sql = "select * from user where name = ?";

//sprintf("%s love %s.", "a","b");
// use exec() because no results are returned

$sql = "update tisye提现表  set stat状态='%s' where id=%s "; // .;
$sql = sprintf($sql, ($_GET['stat']),$_GET['id']);

//print_r($_GET);

print_r($sql);
//print_r($pdo);
//try{

$pdo->exec($sql);
echo " successfully";
