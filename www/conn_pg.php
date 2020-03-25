<?php

$host = "host=pgm-j6c4r878wvy3680zfo.pg.rds.aliyuncs.com";
$port = "port=1433";
$dbname = "dbname=postgres";
$credentials = "user=postgres password=woaitav1314!";
$db = pg_connect("$host $port $dbname $credentials");
if (!$db) {
    echo "Error : Unable to open database\n";
} else {
}
