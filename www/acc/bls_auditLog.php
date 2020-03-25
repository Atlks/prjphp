<?php

function queryBls($mer_id)
{
    global $pdo;
    $sql = "select * from merchan WHERE   id='%s' ";
    $sql = sprintf($sql, $mer_id);
    $rsMer = $pdo->query($sql)->fetch();
    return $rsMer;
}
