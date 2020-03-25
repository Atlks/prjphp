<?php



function setTokenVisa_process()
{

    $secret_key = "abcdefgh";

    $token_visa = setTokenVisa();
    $token_json_str = json_encode($token_visa);

    $visaMRZ = openssl_encrypt($token_json_str, 'AES-128-ECB', $secret_key, 0, "");

    // setcookie("logincookie", $visaMRZ, time() + 3600 * 24, "/");
    setcookie("visaMRZ", $visaMRZ, time() + 3600 * 24, "/");
    setcookie("visaHRZ", "", time() + 3600 * 24, "/");
    print_r($token_json_str);

}
function setTokenVisa()
{

    $token_visa['uname用户名'] = $_GET['loginacc'];

    //  $token['Key4svrTickAnyTime'] = "Key4svrTickAnyTimeTb26";
    $token_visa['issue no编码'] = "id"+date('Y-m-d H:i:s');
    $token_visa['category种类type'] = $_GET['usertype'];
    $token_visa['enter_before请于此前进入Util'] = date('Y-m-d H:i:s');
    $token_visa['issue_date_time签发日期时间from'] = date('Y-m-d H:i:s');

    $token_visa['fullname姓名'] = $_GET['loginacc'];
    $token_visa['birth date出生日期'] = 1000;

    $token_visa['entries次数'] = 1000;
    $token_visa['duration of each stay hours after enter进入后可停留  '] = 24;
    $token_visa['issue_at签发地'] = "token visa mang";
    $token_visa['passport证件号码'] = $token_visa['uname用户名'];
    $token_visa['remarks备注'] = "why trip 目的";

    //from jpvisa   exiry date =enter date+dura stay+cache time
    $token_visa['datetime of expiry失效日期时间'] = date("Y-m-d G:H:s", strtotime("+0 days 24 hours 2 seconds"));
    //us visa
    $token_visa['ctrl num控制号'] = 1000;
    //ukvisa shengen
    $token_visa['VALID FOR area'] = 1000;

    $token_visa['ip'] = $_SERVER['REMOTE_ADDR'];
    $token_visa['browser ua'] = $_SERVER['HTTP_USER_AGENT'];

    return $token_visa;
}

function visa_check()
{
  

    $havVisa = openssl_decrypt($_COOKIE['logincookie'], 'AES-128-ECB', $secret_key, 0, "");
    if (!$havVisa) {
        throw new Exception("logincookie decrypt err");
    }

    //chk pspt first


}


// error_reporting(E_ALL ^ E_NOTICE);
// header("Access-Control-Allow-Origin: *");

// //----------------------safe visa mrz
// // $secret_key = "abcdefgh";
// // //echo openssl_encrypt($data, $this->method, $this->secret_key, $this->options, $this->iv);
// // $visaMRZ = openssl_decrypt($_COOKIE['visaMRZ'], 'AES-128-ECB', $secret_key, 0, "");
// // if (!$visaMRZ) {
// //     throw new Exception("visaMRZ decrypt err");
// // }




// $merid = $_COOKIE['merid'];
// $mysql_conf = array(
//     'host' => '65.49.145.72',
//     'db' => 'postgres',
//     'db_user' => 'postgres',
//     'db_pwd' => 'woaitav1314',
// );
// $pdo = new PDO("pgsql:host=" . $mysql_conf['host'] . ";port=5432;dbname=" . $mysql_conf['db'], $mysql_conf['db_user'], $mysql_conf['db_pwd']); //创建一个pdo对象
// $pdo->exec("set names 'utf8'");

// //总订单数
// $sql = "select * from safe_log where app_id=" . $merid;
// $rs = $pdo->query($sql)->fetch();
// echo json_encode($rzt);


