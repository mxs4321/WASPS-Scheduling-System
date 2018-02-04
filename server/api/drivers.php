<?php
header('Content-Type: application/json');

include '../env.php';
include '../sanitizationValidation.php';
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
      $requestBody = file_get_contents('php://input');
      $bodyData = json_decode($requestBody, true);

      //print_r($bodyData);

      if (isset($bodyData['firstName']) && isset($bodyData['lastName']) && (isset($bodyData['phone'])) && isset($bodyData['email']))
      {
         $firstName = $bodyData['firstName'];
         $lastName = $bodyData['lastName'];
         $phone = $bodyData['phone'];
         $email = $bodyData['email'];
         $requestStatus = $bodyData['requestStatus'] ?? false;

         $firstName = sanitizeAndValidate($firstName, FILTER_SANITIZE_STRING);
         $lastName = sanitizeAndValidate($lastName, FILTER_SANITIZE_STRING);
         $phone = sanitizeAndValidate($phone, FILTER_SANITIZE_STRING);
         $email = sanitizeAndValidate($email, FILTER_SANITIZE_EMAIL, FILTER_VALIDATE_EMAIL);
         $requestBody = sanitizeAndValidate($requestBody, FILTER_SANITIZE_STRING, FILTER_VALIDATE_BOOLEAN);

         echo json_encode($driverDAO->insertDriver($firstName, $lastName, $phone, $email, $requestStatus));
      }
      else
      {
         echo json_encode("Insufficient amount of parameters provided");
      }

      break;

   case "PUT":
      $requestBody = file_get_contents('php://input');
      $bodyData = json_decode($requestBody, true);

      //print_r($bodyData);

      if (isset($bodyData['id']))
      {
         $id = $bodyData['id'];
         $firstName = $bodyData['firstName'] ?? "";
         $lastName = $bodyData['lastName'] ?? "";
         $phone = $bodyData['phone'] ?? "";
         $email = $bodyData['email'] ?? "";
         $requestStatus = $bodyData['requestStatus'] ?? ""; //Must be empty string so that it wouldn't update to either true or false

         $id = sanitizeAndValidate($id, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
         $firstName = sanitizeAndValidate($firstName, FILTER_SANITIZE_STRING);
         $lastName = sanitizeAndValidate($lastName, FILTER_SANITIZE_STRING);
         $phone = sanitizeAndValidate($phone, FILTER_SANITIZE_STRING);
         $email = sanitizeAndValidate($email, FILTER_SANITIZE_EMAIL, FILTER_VALIDATE_EMAIL);
         $requestBody = sanitizeAndValidate($requestBody, FILTER_SANITIZE_STRING, FILTER_VALIDATE_BOOLEAN);

         echo json_encode($driverDAO->updateDriver($id, $firstName, $lastName, $phone, $email, $requestBody));
      }
      else
      {
         echo json_encode("No driver was specified");
      }

      break;

   case "DELETE":
      $requestBody = file_get_contents('php://input');
      $bodyData = json_decode($requestBody, true);

      if (isset($bodyData['id']))
      {
         $id = $bodyData['id'];

         $id = sanitizeAndValidate($id, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);

         echo json_encode($driverDAO->deleteDriver($id));
      }
      else
      {
         echo json_encode("No driver was specified");
      }

      break;
}
