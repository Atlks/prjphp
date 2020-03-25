<?php
error_reporting(E_ALL^E_NOTICE);
parse_str( $_SERVER[ 'QUERY_STRING' ],$parr);print_r($parr);

  $json_str=json_encode($parr);
file_put_contents("C:\\data\\tisyi\\".time(), $json_str);
 print ('ok');
// echo "Hello world!<br>";
$aa=333;

$mysql_conf = array(
  'host'    => '127.0.0.1:3306', 
  'db'      => 'roncoo_mini_pay_demo', 
  'db_user' => 'root', 
  'db_pwd'  => 'xxxxxxx', 
  );
$pdo = new PDO("mysql:host=" . $mysql_conf['host'] . ";dbname=" . $mysql_conf['db'], $mysql_conf['db_user'], $mysql_conf['db_pwd']);//创建一个pdo对象
$pdo->exec("set names 'utf8'");
$sql = "select * from user where name = ?";

//sprintf("%s love %s.", "a","b");
// use exec() because no results are returned
//$sql = "INSERT INTO tisye提现表 (org开户机构, acc账户, name名字,amt金额)
VALUES ('%s', '%s', '%s','%s')";
print_r($_GET);
$sql=sprintf($sql,$_GET['org开户机构'],$_GET['acc'],$_GET['name'],$_GET['amt金额']);
print_r($sql);
 print_r( $pdo);
//try{
  $pdo->exec($sql);
  echo "New record created successfully";

// }
// catch(PDOException $e)
//     {
//     echo $sql . "<br>" . $e->getMessage();
//     }

?>