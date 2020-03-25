<?php
// visaHistory.php
$merid = $_COOKIE['merid'];


require_once "../conn.php";
$pdo->exec("set names 'utf8'");

// $sql = "select * from safe_log where logdata::json->>'uname'='%s' order by id desc"; // where app_id=" . $merid;
// $sql_dbg = sprintf($sql, $_COOKIE['loginacc']);
// print_r($sql_dbg);


//总订单数   $_GET['loginacc']
$sql = "select * from safe_log where logdata::json->>'uname'=? order by id desc";
$PDOStatement1=$pdo->prepare($sql);
$rzt_bool=$PDOStatement1->execute(array($_COOKIE['loginacc']));
$rzt = $PDOStatement1->fetch();

 



//$rzt = $pdo->query($sql)->fetch();
echo json_encode($rzt);

 

