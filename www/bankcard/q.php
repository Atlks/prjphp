<?php
echo 11;
$mysql_conf = array(
    'host' => '65.49.145.72',
    'db' => 'postgres',
    'db_user' => 'postgres',
    'db_pwd' => 'woaitav1314',
);
$pdo = new PDO("pgsql:host=" . $mysql_conf['host'] . ";port=5432;dbname=" . $mysql_conf['db'], $mysql_conf['db_user'], $mysql_conf['db_pwd']); //创建一个pdo对象
$pdo->exec("set names 'utf8'");
$sql = "select * from user where name = ?";

$sql = " select *  from merchan   ";
$sql = sprintf($sql, $_GET['amt金额']);
$glb['sql_up mer bls'] = $sql;
//$pdo->exec($sql);
$rs=($pdo->query($sql)->fetchAll());
echo json_encode($rs);

