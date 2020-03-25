
<?php

parse_str($_SERVER['QUERY_STRING'], $parr);
print_r($parr);

$json_str = json_encode($parr);


require_once "../conn.php";
$pdo->exec("set names 'utf8'");
 

$sql = " UPDATE merchan   SET  ext_json ='%s'    where uname='" . $_COOKIE['loginacc'] . "'";
$sql = sprintf($sql, $json_str);
$glb['sql_up mer bls'] = $sql;
$pdo->exec($sql);