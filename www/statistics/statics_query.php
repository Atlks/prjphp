<?php


require_once "../conn.php";
// $sql = "select sum(account_balance)  from merchan  ";
// $GLOBALS['sql']=$sql;
// // print_r($pdo);
// $sth = $pdo->query($sql);
// //print_r($sth);
// $rows = $sth->fetch();
// $rzt['bls_total']=$rows[0];


$sql = "select count(*) tisye_count, sum(amt金额) tisye_total  from tisye提现表 where uname='%s'  ";
$sql = sprintf($sql,   $_COOKIE['loginacc']  );
$rows2 = $pdo->query($sql)->fetch();
//$rzt['tisye_total']=$rows2[0];

echo json_encode($rows2);
