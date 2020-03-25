<?php
error_reporting(E_ALL ^ E_NOTICE);

//chk visa
require_once "../imgrtOffice/visaMng.php";

$secret_key = "abcdefgh";
//echo openssl_encrypt($data, $this->method, $this->secret_key, $this->options, $this->iv);
$logincookie = openssl_decrypt($_COOKIE['logincookie'], 'AES-128-ECB', $secret_key, 0, "");
if (!$logincookie) {
    throw new Exception("logincookie decrypt err");
}
$mrzObj = json_decode($logincookie);
//print_r($mrzObj);
if ($_COOKIE['loginacc'] != $mrzObj->loginacc) {
// $mrzObj['loginacc']) {
    throw new Exception("uname chk err");
}
//chk visa end

try {
    parse_str($_SERVER['QUERY_STRING'], $parr);
//    print_r($parr);

    $json_str = json_encode($parr);
    file_put_contents("C:\\data\\tisyi\\" . time(), $json_str);
    //print('ok');
    // echo "Hello world!<br>";
    $aa = 333;
} catch (Exception $e) {

}

require_once "../conn.php";


$pdo->exec("set names 'utf8'");

//safew convert


require_once "../conn_pg.php";

$amt = (float) $_GET['amt金额'];
$cookie_loginacc = pg_escape_string($_COOKIE['loginacc']);
$cookie_loginacc_escape_literal = pg_escape_literal($cookie_loginacc);

//safe chk feochwegai bls==decode(bls)
//safe log for  safe bef bls log
$sql_query_bls = "select * from merchan where uname =" . $cookie_loginacc_escape_literal;
//print_r($sql);
$rs_one_mer = ($pdo->query($sql_query_bls)->fetch());
$safeLog['bef_bls'] = $rs_one_mer['available_balance'];
require_once "../acc/blsMng.php";

safe_feotsweegai_check( $rs_one_mer['available_balance'], $rs_one_mer['mrz']); //chk bls


try {



   //check tisye mima

    $pdo->beginTransaction();
    $sql = "select * from merchan where uname =?";
    $PDOStatement1 = $pdo->prepare($sql);
    $rzt_bool = $PDOStatement1->execute(array($_COOKIE['loginacc']));
    $rzt = $PDOStatement1->fetch();
    $tisye_pwd_ori=openssl_decrypt($rzt['tisye_pwd'], 'AES-128-ECB', "txmmKey2020", 0, "");

    if( $tisye_pwd_ori!=$_GET['tisyePwd'])
    {
      

        throw new Exception("提现密码不对。。");
        http_response_code(500);

        return;

    }



   


    //update bls

    $sql = " UPDATE merchan   SET  available_balance = available_balance-%f,account_balance=account_balance-%f   where uname= " . $cookie_loginacc_escape_literal;
    $sql = sprintf($sql, $amt, $amt);
    $glb['sql_up mer bls'] = $sql;
    $pdo->exec($sql);

    //safe log ,get bls aft for safe log
    $rs_one_mer_aft = ($pdo->query($sql_query_bls)->fetch());
    $safeLog['amt金额'] = $amt;
    $safeLog['aft_bls'] = $rs_one_mer_aft['available_balance'];
    $safelog_json = json_encode($safeLog);
    //feo tswaigei set mrz (bls)
    $secret_key_cash = 'cashMrzKey';
    $bls_enc = openssl_encrypt($rs_one_mer_aft['available_balance'], 'AES-128-ECB', $secret_key_cash, 0, "");
    $mrz_json['bls'] = $bls_enc;
    $mrz_json['bls_4human'] = $rs_one_mer_aft['available_balance'];
    $mrz_jsonstr = json_encode($mrz_json);
    $sql = " UPDATE merchan   SET  mrz='%s'  where uname= " . $cookie_loginacc_escape_literal;
    $sql = sprintf($sql, $mrz_jsonstr);
    $pdo->exec($sql);

    //insert
    // $sql = "xxINSERT INTO tisye提现表 (org开户机构, acc账户, name名字,amt金额,uname,stat状态,safe_log)VALUES ('%s', '%s', '%s',%f,%s,'%s','%s') ";
    // print_r($_GET);
    // $sql = sprintf($sql, pg_escape_string($_GET['org开户机构']) . "(" . pg_escape_string($_GET['brach网点名称']) . ")", pg_escape_string($_GET['acc']), pg_escape_string($_GET['name']), $amt, $cookie_loginacc_escape_literal,, $safelog_json);
    // print_r($sql);
    // print_r($pdo);
    //  $pdo->exec($sql);

    //problm,cant ue cn param,beir err..
    $sql_tisye = "INSERT INTO tisye提现表 (org开户机构, acc账户, name名字,amt金额,uname,stat状态,safe_log,mrz)VALUES (:org,:acc,:name,:amt,:uname, '申请提现','%s',:mrz) ";
    $sql_tisye = sprintf($sql_tisye, $safelog_json, $mrz_jsonstr);
    $PDOStatement1 = $pdo->prepare($sql_tisye);
    $rzt_bool = $PDOStatement1->execute(array(':mrz' => $mrz_jsonstr, ':acc' => $_GET['acc'], ':name' => $_GET['name'], ':amt' => $amt, ':uname' => $_COOKIE['loginacc'], ':org' => $_GET['org开户机构'] . "(" . pg_escape_string($_GET['brach网点名称']) . ")"));
    //$rzt = $PDOStatement1->execute();
    $dbg['tisye_sql'] = $sql_tisye;
    $dbg['tisye_inset_rzt'] = $rzt;
    // print_r($dbg);
    //  print_r( $dbg['tisye_sql']);
    $pdo->commit();

} catch (Exception $e) {
    $pdo->rollBack();
    http_response_code(500);

    echo "Failed: " . $e->getMessage();
    return;
}

//echo "New record created successfully";
//print_r($glb);

// }
// catch(PDOException $e)
//     {
//     echo $sql . "<br>" . $e->getMessage();
//     }
