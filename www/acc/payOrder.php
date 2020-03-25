<?php
error_reporting(E_ALL ^ E_NOTICE);

header("Access-Control-Allow-Origin: *");
$merid=(int)$_COOKIE['merid'];
require_once "../conn.php";
$pdo->exec("set names 'utf8'");

//总订单数
$sql = "select count(*) as cnt,sum(amount) as  sum_amt_总金额 from order_bill where   order_time>=current_date and app_id=".$merid;
//print_r($sql);
$rs = $pdo->query($sql)->fetch();
$rzt['allOrderCnt总订单数']=$rs['cnt'];
$rzt['sum_amt_总金额']=$rs['sum_amt_总金额'];


//not pay order cnt
$sql = "select count(*) cnt from order_bill WHERE   order_time>=current_date and  pay_time is null and   app_id=".$merid;
$rs = $pdo->query($sql)->fetch();
$rzt['noPayOrderCnt今日未付订单'] = $rs['cnt'];
$rzt['noPayOrderRs'] = $rs;

//all_income_money
//select sum(amount) sum_amt_alreadyPay from pay
$sql = "select sum(amount) sum_amt_alreadyPay,count(*) as cnt_alreadyPay from order_bill WHERE   order_time>=current_date and  pay_time is not null and   app_id=" . $merid;
$rs = $pdo->query($sql)->fetch(); 
//print_r($rs);
$rzt['sum_amt_alreadyPay_实付金额'] = $rs['sum_amt_alreadypay'];
$rzt['alraedypay_rs']=$rs;
$dbg['sum_amt_alreadyPay_实付金额']=$sql;
//print_r($dbg);



echo json_encode($rzt);