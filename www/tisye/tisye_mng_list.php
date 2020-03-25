<?php
//tisye mng list.php
error_reporting(E_ALL^E_NOTICE);
parse_str( $_SERVER[ 'QUERY_STRING' ],$parr);
//print_r($parr);

$mysql_conf = array(
  'host'    => '65.49.145.72', 
  'db'      => 'postgres', 
  'db_user' => 'postgres', 
  'db_pwd'  => 'woaitav1314', 
  );
$pdo = new PDO("pgsql:host=" . $mysql_conf['host'] . ";port=5432;dbname=" . $mysql_conf['db'], $mysql_conf['db_user'], $mysql_conf['db_pwd']);//创建一个pdo对象
$pdo->exec("set names 'utf8'");
$sql = "select * from tisye提现表 where 1=1";


$sth = $pdo->query($sql);
$rows = $sth->fetchAll();
 
echo json_encode($rows);

?>