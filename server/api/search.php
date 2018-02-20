<?php
header('Content-Type: application/json');

include '../env.php';
require_once "../db.class.php";
$db = new DB($host, $port, $name, $user, $pass); // From dbinfo.php

switch ($_SERVER['REQUEST_METHOD'])
{
   case "GET":
      break;
}