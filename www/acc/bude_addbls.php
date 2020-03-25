<?php
//order_id=201912191855502562528714
//$_GET['order_id']='201912191855502562528714';
error_reporting(E_ALL ^ E_NOTICE);

header("Access-Control-Allow-Origin: *");

require_once "../conn.php";
//$sql = "select * from user where name = ?";

//sprintf("%s love %s.", "a","b");
// use exec() because no results are returned

// // update order_bill set pay_time=null where id=201912210211195189181134
// SELECT b.*,m."feilv手续费率"
//     FROM public.order_bill b
//     left join merchan m on b.app_id=m.id

//php unit test
 // $_GET['order_id'] = '20200115test';
$sql = "select b.*,m.feilv手续费率 from order_bill b left join merchan m on b.app_id=m.id WHERE   pay_time is null and  order_id='%s' ";
$sql = sprintf($sql, $_GET['order_id']);
$glb['query order sql'] = $sql;
//print_r($sql);
$rs = $pdo->query($sql)->fetch();
//print_r($rs);
if (!$rs) {
    echo "cant find,maybe already bude..";
    return;
    die();
}

$mer_id = $rs['app_id'];
$amount = $rs['amount'];

$sql = "select * from merchan WHERE   id='%s' ";
$sql = sprintf($sql, $mer_id);
$rsMer = $pdo->query($sql)->fetch();

try {

    $pdo->beginTransaction();
    $sql = "update order_bill  set  pay_time=now(),bude='y'  where pay_time is null and order_id='%s' "; // .;
    $sql = sprintf($sql, $_GET['order_id']);
    $pdo->exec($sql);
    $glb['up_order_sql'] = $sql;
    //print_r($sql);

    //$add_amt=（float）($_GET['amt'])*0.96;
    $add_amt = (float) ($rs['amount']) * (1 - $rs['feilv手续费率']);
    $sql3 = "update merchan  set account_balance=account_balance+%f,available_balance=available_balance+%f where id=%d "; // .;
    $sql3 = sprintf($sql3, $add_amt, $add_amt, $mer_id); // $_GET['uname']);
    $pdo->exec($sql3);
    $glb['up mer bls sql'] = $sql3;
    //print_r($_GET);
    $glb['rs amount'] = $rs['amount'];
    $glb['add_amt'] = $add_amt;


    //audit aft  bls
    require_once "bls_auditLog.php";
    $rs_bls_aft = queryBls($mer_id);

    $sqlLog = "insert into safe_log(logdata)values('%s')";
    $logd['act'] = 'bude';
    $logd['mer'] = $rsMer;
    $logd['order'] = $rs;
    $logd['add_amt'] = $add_amt;
    $logd['mer_bls_after'] = $rs_bls_aft;
    $logd_jsonencode = json_encode($logd);
    $sqlLog = sprintf($sqlLog, $logd_jsonencode); //
    $pdo->exec($sqlLog);

    $glb['logd'] = $logd;

  //  print_r($glb);
    //print_r($pdo);
    $pdo->commit();
    echo "ok";
} catch (Exception $e) {
    $pdo->rollBack();
    echo "Failed: " . $e->getMessage();
    return;
}
