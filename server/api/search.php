<?php
header('Content-Type: application/json');

include '../env.php';
require_once "../db.class.php";
$db = new DB($host, $port, $name, $user, $pass); // From dbinfo.php

switch ($_SERVER['REQUEST_METHOD'])
{
   case "GET":
      if (isset($_GET['dayOfTheWeek']) && isset($_GET['timeOfDayStart']) && isset($_GET['timeOfDayEnd'])
         && isset($_GET['datetimeStart']) && isset($_GET['datetimeEnd']))
      {
         echo json_encode($db->user->findAvailableDrivers($_GET['dayOfTheWeek'], $_GET['timeOfDayStart'],
            $_GET['timeOfDayStart'], $_GET['datetimeStart'], $_GET['datetimeEnd']));
      }

      break;
}