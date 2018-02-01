<?php
header('Content-Type: application/json');

include '../env.php';
require_once "../dao/DriverDAO.class.php";
$driverDAO = new DriverDAO($host, $port, $name, $user, $pass); // From dbinfo.php

switch ($_SERVER['REQUEST_METHOD']) {
   case "GET":
      if (isset($_GET['id']))
      {
         echo json_encode($driverDAO->getDriver($_GET['id']));
      }
      else if (isset($_GET['page']) && isset($_GET['number_per_page']))
      {
         echo json_encode($driverDAO->getDrivers($_GET['page'], $_GET['number_per_page']?:10));
      }
      else
      {
         echo json_encode($driverDAO->getDrivers(0, 100));
      }
      break;

   case "POST":
      // TODO use json to send data in body for post

      $requestBody = file_get_contents('php://input');
      $bodyData = json_decode($requestBody, true);

      print_r($bodyData);

      /*if (isset($_GET['firstName']) && isset($_POST['lastName']) && isset($_POST['phone']) && isset($_POST['email']))
      {
         echo json_encode($driverDAO->insertDriver($_GET['firstName'], $_GET['lastName'], $_GET['phone'], $_GET['email'], $_GET['requestStatus']?:false));
      }
      else
      {
         echo "Insufficient amount of parameters provided";
      }*/

      break;

   case "PUT":
      // TODO use json to send data in body for put

      /*if (isset($_GET['id']))
      {
         echo json_encode($driverDAO->updateDriver($_GET['id'], $_GET['firstName'], $_GET['lastName'], $_GET['phone'], $_GET['email'], $_GET['requestStatus']));
      }
      else
      {
         echo "No driver was specified";
      }*/

      break;

   case "DELETE":
      break;
}
