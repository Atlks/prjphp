<?php
//echo 11;
require_once "../conn.php";
$pdo->exec("set names 'utf8'");
$sql = "select * from user where name = ?";

$sql = " select *  from merchan  where uname= '".$_COOKIE['loginacc'] . "'";

//$sql = sprintf($sql, $_GET['amt金额']);
$glb['sql_up mer bls'] = $sql;
//$pdo->exec($sql);
$rs = ($pdo->query($sql)->fetch());
echo json_encode($rs);
