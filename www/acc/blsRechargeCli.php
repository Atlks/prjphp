<?php
 
$cookie_loginacc_escape_literal = "'mer'";
$uid = 8;
$amt = 9999+3000;


require_once "../conn.php";

try{
        $pdo->beginTransaction();
        $sql = " UPDATE merchan   SET  available_balance = available_balance+%f,account_balance=account_balance+%f   where  id=%d and uname= " . $cookie_loginacc_escape_literal;
        $sql = sprintf($sql, $amt, $amt, $uid);
        $glb['sql_up mer bls'] = $sql;
        $pdo->exec($sql);


        $sql = "select * from merchan where id=%d and uname =" . $cookie_loginacc_escape_literal;
        $sql = sprintf($sql, $uid);
        print_r($sql);
        $rs_one_mer = $pdo->query($sql)->fetch();
        $bls = $rs_one_mer['available_balance'];

        //feo tswaigei
        $secret_key_cash = 'cashMrzKey';
        $bls_enc = openssl_encrypt($bls, 'AES-128-ECB', $secret_key_cash, 0, "");
        $mrz_json['bls_4human'] = $bls;
        $mrz_json['bls'] = $bls_enc;
        $mrz_jsonstr = json_encode($mrz_json);
        $sql = " UPDATE merchan   SET  mrz='%s'  where  id=%d and uname= " . $cookie_loginacc_escape_literal;
        $sql = sprintf($sql, $mrz_jsonstr, $uid);
        $rzt = $pdo->exec($sql);

        echo $rzt;
        $pdo->commit();
} catch (Exception $e) {
    $pdo->rollBack();
    echo "Failed: " . $e->getMessage();
    return;
}