<?php
//dep
//safe_feotsweegai_check
function safe_feotsweegai_check($bls,$rmz)
{
    $bls_encry=json_decode($rmz) ->bls;
bls_chk_mrz_sign($bls,$bls_encry ,$rmz);
}

function bls_chk_mrz_sign($bls,$bls_encry ,$dbginfo)
{
$chklog['chk_evt'] = 'bef_tisye';
$chklog['mrz'] = $dbginfo;
$secret_key_cash = 'cashMrzKey';
$mrz_bls_decry = openssl_decrypt($bls_encry, 'AES-128-ECB', $secret_key_cash, 0, "");
//  $mrz_obj = json_decode($mrz_bls_decry);
//  $chklog['mrz_decry_obj'] = $mrz_obj;
$chklog['mrz_bls_decry'] = $mrz_bls_decry;

$chklog['blsFrmdb_available_balance'] = $bls;
if ($bls != $mrz_bls_decry) {

    $chklog['chk_rzt'] = 'fail';
    $rzt_jsonstr = json_encode($chklog);
    save_feotsweegai_check_log($rzt_jsonstr);
    // throw new Exception("bls feo tswegai chek fail.." . $rzt_jsonstr);

} else //chek pass
{
    $chklog['chk_rzt'] = 'ok';
    $rzt_jsonstr = json_encode($chklog);
    save_feotsweegai_check_log($rzt_jsonstr);

}

}



function save_feotsweegai_check_log($rzt_jsonstr)
{
    $sql = "insert INTO safe_log(logdata)values('%s') ";
    $sql = sprintf($sql, $rzt_jsonstr);
   // print_r($sql);
    global $pdo;
    $pdo_exe_rzt = $pdo->exec($sql);

    // print_r($rzt);

}
