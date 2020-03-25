<?php
//tisye mng list.php
error_reporting(E_ALL ^ E_NOTICE);
parse_str($_SERVER['QUERY_STRING'], $parr);
//print_r($parr);

require_once "../conn.php";

$pdo->exec("set names 'utf8'");
 
//use by adm,must not filt any
$cur_loginacc=$_COOKIE['loginacc'];
$sql =<<<EOF
select * from tisye提现表 where 1=1 order by id desc limit 200;
EOF;

$glb['sql']=$sql;
//print_r($glb);
$sth = $pdo->query($sql);
$rows = $sth->fetchAll();

echo json_encode($rows);

