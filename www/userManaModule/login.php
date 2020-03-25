<?php

// $_GET['pwd'] = '8880';
// $_GET['uname'] = 'uu';
//tisye mng list.php
//error_reporting(E_ALL ^ E_NOTICE);
parse_str($_SERVER['QUERY_STRING'], $parr);
//print_r($parr);
require_once "../conn_pg.php";

require_once "../conn.php";
// print_r("usertype".$_GET['usertype']);
// echo ("usertype"+$_GET['usertype']);
// die();

//safew convert
$amt = (float) $_GET['amt金额'];
$get_loginacc = pg_escape_string($_GET['loginacc']);
$get_loginacc_escape_literal = pg_escape_literal($get_loginacc);

try {

    if ($_GET['usertype'] == 'mer') {
        $sql = "select * from merchan where uname=" . $get_loginacc_escape_literal;
        $GLOBALS['sql'] = $sql;
        // print_r($pdo);
        $sth = $pdo->query($sql);
        //print_r($sth);
        $rows = $sth->fetch();
        //print_r($rows);
        $varss[] = md5($_GET['password']);
        $varss[] = $rows['pwd'];
        if (md5($_GET['password']) != $rows['pwd']) {
            throw new Exception("pwd not match");
        }
        setVisaCookie4login();
        setcookie("merid", $rows['id'], time() + 3600 * 24, "/");
        addLoginLog($pdo,$rows);
        return;

    }
    if ($_GET['usertype'] == 'adm') {

        $sql = "select * from users where uname=" . $get_loginacc_escape_literal;
        $GLOBALS['sql'] = $sql;
        // print_r($pdo);
        $sth = $pdo->query($sql);
        //print_r($sth);
        $rows = $sth->fetch();
        //print_r($rows);
        $varss[] = md5($_GET['password']);
        $varss[] = $rows['pwd'];
        if (md5($_GET['password']) != $rows['pwd']) {
            throw new Exception("pwd not match");
        }
        setVisaCookie4login();
        //  setcookie("loginacc_utype",$_GET['usertype'], time() + 3600 * 24, "/");
        addLoginLog($pdo,$rows);

        return;

    }

} catch (Exception $e) {
    //  print_r($varss);die();
    if ($e->getMessage() == "pwd not match") {
        header("HTTP/1.1 599 pwd not match...");
        return;
    } else {
        header("HTTP/1.1 599 " . $e->getMessage());
        throw $e;
    }

}
function addLoginLog($pdo,$rows)
{
    

    $token_visa['category种类type'] = $_GET['usertype'];

    $token_visa['ip'] = $_SERVER['REMOTE_ADDR'];
    $token_visa['issue_at签发地'] = "地点xxx";

    date_default_timezone_set('Asia/Shanghai');
    $token_visa['issue_date_time签发日期时间from'] = date('Y-m-d H:i:s');
     $token_visa['uname'] =  $_GET['loginacc'];
      $token_visa['uid'] = $rows['id'];
    $visa = json_encode($token_visa);
   


    $sql = "insert INTO safe_log(logdata)values('%s') ";
    $sql = sprintf($sql, $visa);
    print_r($sql);
    $pdo_exe_rzt = $pdo->exec($sql);
    if ($pdo_exe_rzt != 1) {
        throw new Exception("pdo_exe_rzt !=1 ,sql is:" . $sql);

    }

    print_r($pdo_exe_rzt);

}
function setVisaCookie4login()
{
    $secret_key = "abcdefgh";

    $token['Key4svrTickAnyTime'] = "Key4svrTickAnyTimeTb26";
    $token['createTime'] = date('Y-m-d H:i:s');
    $token['loginacc_utype'] = $_GET['usertype'];
    $token['loginacc'] = $_GET['loginacc'];
    $token_json_str = json_encode($token);
    $token_ecr = openssl_encrypt($token_json_str, 'AES-128-ECB', $secret_key, 0, "");

    setcookie("logincookie", $token_ecr, time() + 3600 * 24, "/");
    print_r($token_json_str);
    setcookie("loginacc", $_GET['loginacc'], time() + 3600 * 24, "/");
    setcookie("uname", $_GET['loginacc'], time() + 3600 * 24, "/");

    setcookie("loginacc_utype", $_GET['usertype'], time() + 3600 * 24, "/");
    echo "ok";
    require_once "../safeDept/tokenVisaMan.php";
    require_once "../imgrtOffice/visaMng.php";

    setTokenVisa_process();

}

header("HTTP/1.1 599 not slt usertype..");
throw new Exception("not slt usertype");
// else {
//     //    500 => "HTTP/1.1 500 Internal Server Error",

// }

//echo json_encode($rows);
