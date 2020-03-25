<?php
//feo tswegai  and changlog4safelog

//safe_feotsweegai_check
function safe_bls_feotsweegai_check($bls, $rmz)
{
    $bls_encry = json_decode($rmz)->bls;
    try {
        $r = rawData_chk_mrz_sign($bls, $bls_encry, $rmz);

        safeCheckLog_save($r);

    } catch (Exception $E) {
        safeCheckLog_save($E);

    }

}

function rawData_chk_mrz_sign($rawData, $data_encry, $dbginfo)
{
    $chklog['chk_evt'] = 'bef_tisye';
    $chklog['mrz'] = $dbginfo;
    $secret_key_cash = 'cashMrzKey';
    $mrz_rawData_decry = openssl_decrypt($data_encry, 'AES-128-ECB', $secret_key_cash, 0, "");
//  $mrz_obj = json_decode($mrz_rawData_decry);
    //  $chklog['mrz_decry_obj'] = $mrz_obj;
    $chklog['mrz_rawData_decry'] = $mrz_rawData_decry;

    $chklog['rawDataFrmdb_available_balance'] = $rawData;
    if ($rawData != $mrz_rawData_decry) {

        $chklog['chk_rzt'] = 'fail';
        throw new Exception($chklog);

    }
    $chklog['chk_rzt'] = 'ok';

    //   save_feotsweegai_check_log($rzt_jsonstr);
    return $chklog;

}

function save_bls_changeMrZ($pdo){

//feo tswaigei set mrz (bls)
$secret_key_cash = 'cashMrzKey';
$bls_enc = openssl_encrypt($rs_one_mer_aft['available_balance'], 'AES-128-ECB', $secret_key_cash, 0, "");
$mrz_json['bls'] = $bls_enc;
$mrz_json['bls_4human'] = $rs_one_mer_aft['available_balance'];
$mrz_jsonstr = json_encode($mrz_json);
$sql = " UPDATE merchan   SET  mrz='%s'  where uname= " . $cookie_loginacc_escape_literal;
$sql = sprintf($sql, $mrz_jsonstr);
$pdo->exec($sql);


}

function safeCheckLog_save($chklog)
{
    $rzt_jsonstr = json_encode($chklog);

    $sql = "insert INTO safe_log(logdata)values('%s') ";
    $sql = sprintf($sql, $rzt_jsonstr);
    print_r($sql);
    global $pdo;
    $pdo_exe_rzt = $pdo->exec($sql);

    // print_r($rzt);

}
