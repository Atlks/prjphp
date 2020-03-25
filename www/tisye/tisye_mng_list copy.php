<?php

parse_str($_SERVER['QUERY_STRING'], $parr);
//print_r($parr);

//$json_str=json_encode($parr);

//readfile
$fs = scandir("C:\\data\\tisyi");
//print_r($fs);
//print_r ("------------------------") ;
$jsonn_arr = "[";
foreach ($fs as $f) {
    if ($f == '.' || $f == '..') {
        continue;
    }

    $cur_f = "C:\\data\\tisyi\\" . $f;

    // print_r("++++");
    $txt = file_get_contents($cur_f);
    //print_r( $txt);
    // print_r("@@@".$txt."####");
    // print_r( "\r\n");
    // die();
    if ($jsonn_arr == "[") {
        $jsonn_arr = $jsonn_arr . $txt . "\r\n";
    } else {
        $jsonn_arr = $jsonn_arr . "," . $txt . "\r\n";
    }

    //   print_r($jsonn_arr);
    //  print_r( "\r\n");
}
$jsonn_arr = $jsonn_arr . "]";
//  print_r( $jsonn_arr);
echo $jsonn_arr;
$aa = 333;
