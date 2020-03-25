<?php
ini_set('date.timezone', 'Asia/Shanghai');

//tisye mng list.php
error_reporting(E_ALL ^ E_NOTICE);

$data = "aaaaccc";
$secret_key = "abcdefgh";
//echo openssl_encrypt($data, $this->method, $this->secret_key, $this->options, $this->iv);

$logincookie = openssl_decrypt($_COOKIE['logincookie'], 'AES-128-ECB', $secret_key, 0, "");
if (!$logincookie) {
    throw new Exception("logincookie decrypt err");
}

parse_str($_SERVER['QUERY_STRING'], $parr);
//print_r($parr);

require_once "../conn.php";

$pdo->exec("set names 'utf8'");

$cur_loginacc = $_COOKIE['loginacc'];

$lmt = $_GET['limit'];
$offset = ($_GET['page'] - 1) * $lmt;



// use by mer ,must filter by login acc
// $sql = <<<EOF
// select * from tisye提现表 where uname='$cur_loginacc' ;
// EOF;
// $count = count($pdo->query($sql)->fetchAll());
$sql=file_get_contents ("rechg_grp_sqlTmplt.sql");
if(!$_GET['date'])
    $_GET['date']=date("Y-m-d");
$sql =   sprintf($sql, $_GET['date']);
///print_r($sql);


$glb['sql'] = $sql;
//print_r($glb);
$sth = $pdo->query($sql);
$rows = $sth->fetchAll();
$count = count($rows);
$rzt['data'] = $rows;
$rzt['code'] = 0;
$rzt['count'] = $count;
echo json_encode($rzt);
