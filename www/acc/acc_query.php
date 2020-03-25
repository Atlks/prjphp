<?php



require_once "../conn.php";


//$pdo = new PDO("pgsql:host=" . $db_cfg['host'] . ";port=5432;dbname=" . $db_cfg['db'], $db_cfg['db_user'], $db_cfg['db_pwd']); //创建一个pdo对象
$sql = "select * from merchan where uname='" . $_COOKIE['loginacc'] . "'";
$GLOBALS['sql']=$sql;
// print_r($pdo);
$sth = $pdo->query($sql);
//print_r($sth);
$rows = $sth->fetch();
echo json_encode($rows);




