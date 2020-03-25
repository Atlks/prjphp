<?php
$app_id      = 1;
$host        = "host=65.49.145.72";
$port        = "port=5432";
$dbname      = "dbname=postgres";
$credentials = "user=postgres password=woaitav1314";
$merid = $_COOKIE['merid'];


$db = pg_connect( "$host $port $dbname $credentials"  );
if(!$db){
   echo "Error : Unable to open database\n";
} else {
}

date_default_timezone_set('PRC');

$sql = "select amount from order_bill WHERE pay_time is not null and app_id =$merid  and CAST(order_time AS DATE)=DATE '".date("Y-m-d")."'";
$ret = pg_query($db, $sql);

$amount_=0;
while($row = pg_fetch_row($ret)){
       $amount_ = $amount_ + $row[0];
   }
$count = pg_num_rows($ret);

$sql = "select * from order_bill WHERE pay_time is null and app_id=$merid  and CAST(order_time AS DATE)=DATE '".date("Y-m-d")."'" ;
$ret = pg_query($db, $sql);
$notpaycount = pg_num_rows($ret);


$arr = array('pay_count' => $count,'pay_amount'=>$amount_, 'account_amount'=>($amount_- $amount_*0.04),'error_count' => $notpaycount);
echo json_encode($arr);
pg_close($db);
?>
