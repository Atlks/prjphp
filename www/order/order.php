<?php
header("Content-type:text/html;charset=utf-8");

$name = $_COOKIE['loginacc_utype'];
$merid = $_COOKIE['merid'];
$page = ($_GET["page"] - 1) * 10;
$limit = $_GET["limit"] * 1;
$filter = false;

if (isset($_GET["filter"])) {
    $filter = true;
}

require_once "../conn_pg.php";

$sql = "select feilv手续费率 from merchan WHERE id=$merid ";
$ret = pg_query($db, $sql);
$row=pg_fetch_array($ret);
$bank_charge = $row[0];

if ($filter) {
    $sql = "select * from order_bill WHERE pay_time is not null and app_id=$merid";
} else {
    $sql = "select * from order_bill WHERE  app_id=$merid";
}
$a = array();
$ret = pg_query($db, $sql);
$count = pg_num_rows($ret);
if ($filter) {
    $sql = "select * from order_bill WHERE pay_time is not null and app_id=$merid ORDER BY id DESC limit $limit OFFSET $page";
} else {
    $sql = "select * from order_bill WHERE  app_id =$merid  ORDER BY id  DESC limit $limit OFFSET $page";
}
$ret = pg_query($db, $sql);
while ($row = pg_fetch_row($ret)) {
    $phptime = strtotime($row[7]);
    $time_ = date("y-m-d H:i:m", $phptime);

    $rate = $row[6] * $bank_charge;
    $actualamount = $row[6] - $rate;

    if ($row[8] == null) {
	$opvalue ='';
	if($name == 'adm'){
		$opvalue=  '<button onclick="getHttp(\''.$row[1].'\')" value="'.$row[1].'"  type="button">补单操作</button>';
	
	}

        array_push($a, array('op'=>$opvalue,'mer_trade_id'=>$row[10], 'bankname' => $row[3], 'successdate' => '---', 'status' => '<span style="color: #f67d06;"> 未处理', 'key' => $row[0], 'ddlx' => '收款', 'out_trade_id' => $row[1], 'memberid' => $row[2], 'amount' => number_format($row[6], 4), 'applydate' => $time_, 'rate' => number_format($rate, 4), 'actualamount' => number_format($actualamount, 4)));

    } else {
        $payphptime = strtotime($row[8]);
        $paytime_ = date("y-m-d H:i:m", $payphptime);
        array_push($a, array('bankname' => $row[3],'mer_trade_id'=>$row[10], 'successdate' => $paytime_, 'status' => ' 成功,已返回', 'key' => $row[0], 'ddlx' => '收款', 'out_trade_id' => $row[1], 'memberid' => $row[2], 'amount' => number_format($row[6], 4), 'applydate' => $time_, 'rate' => number_format($rate, 4), 'actualamount' => number_format($actualamount, 4)));

    }

}
pg_close($db);

$arr = array('code' => 0, 'count' => $count, 'msg' => '', 'data' => $a);
echo json_encode($arr);
?>
