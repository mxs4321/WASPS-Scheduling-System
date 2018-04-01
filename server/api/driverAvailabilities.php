<?php
session_start(); // Starting Session
header('Content-Type: application/json');

include '../sanitizationValidation.php';
require_once "../db.class.php";
$db = new DB();

switch ($_SERVER['REQUEST_METHOD']) {
    case "GET":
        switch ($_SESSION['user']['role']) {
            case 'driver':
                  echo json_encode($db->availability->getAvailabilityForDriver($_SESSION['user']['id']));
                break;
            case "dispatcher":
            case "admin":
                if (isset($_GET['start']) && isset($_GET['end'])) {
                    echo json_encode($db->availability->findAvailableDrivers($_GET['start'], $_GET['end']));
                } else {
                  http_response_code(400);
                  echo json_encode(["err" => "Invalid Arguments"]);  
                }
                break;
            default:
                http_response_code(403);
                echo json_encode(["err" => "Only drivers, dispatchers and admins can access this resource."]);
        }
        break;

    case "POST":
        switch ($_SESSION['user']['role'])
        {
           case "driver":
              $bodyData = json_decode(file_get_contents('php://input'), true);
              postDriverAvailability($_SESSION['user']['id'], $bodyData);
              break;
           case "admin":
              $bodyData = json_decode(file_get_contents('php://input'), true);
              if (isset($bodyData['driverID'])){
                  postDriverAvailability($bodyData['driverID'], $bodyData);
              }
              else
              {
                 http_response_code(400);
                 echo json_encode(["err" => "Invalid arguments"]);
                 die();
              }
              break;
           default:
              http_response_code(403);
              echo json_encode(["err" => "Only drivers and admins can access this resource."]);
        }

        break;

    case "PUT":
       switch ($_SESSION['user']['role'])
       {
          case "driver":
             $bodyData = json_decode(file_get_contents('php://input'), true);
             putDriverAvailability($_SESSION['user']['id'], $bodyData);
             break;
          case "admin":
             $bodyData = json_decode(file_get_contents('php://input'), true);
             putDriverAvailability($bodyData['driverID'] ?? "", $bodyData);
             break;
          default:
             http_response_code(403);
             echo json_encode(["err" => "Only drivers and admins can access this resource."]);
       }
       break;

    case "DELETE":
       switch ($_SESSION['user']['role'])
       {
          case "driver":
             deleteDriverAvailability($_SESSION['user']['id']);
             break;
          case "admin":
             deleteDriverAvailability();
             break;
          default:
             http_response_code(403);
             echo json_encode(["err" => "Only drivers and admins can access this resource."]);
       }
       break;
}

function postDriverAvailability($driverID, $bodyData)
{
   global $db;

   if (isset($bodyData['start']) && isset($bodyData['end']) && (isset($bodyData['days']))) {
      $startTime = $bodyData['start'];
      $endTime = $bodyData['end'];
      $days = $bodyData['days'];

      $startTime = sanitizeAndValidate($startTime, FILTER_SANITIZE_STRING);
      $endTime = sanitizeAndValidate($endTime, FILTER_SANITIZE_STRING);
      $days = sanitizeAndValidate($days, FILTER_SANITIZE_STRING);
      $driverID = sanitizeAndValidate($driverID, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);

      http_response_code(201);
      echo json_encode($db->availability->insertAvailability($startTime, $endTime, $days, $driverID));
   } else {
      http_response_code(400);
      echo json_encode(["err" => "Invalid arguments"]);
      die();
   }
}

function putDriverAvailability($driverID, $bodyData)
{
   global $db;

   if (isset($_GET['id']))
   {
      $id = $_GET['id'];
      $startTime = $bodyData['start'] ?? "";
      $endTime = $bodyData['end'] ?? "";
      $days = $bodyData['days'] ?? "";

      $id = sanitizeAndValidate($id, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
      $startTime = sanitizeAndValidate($startTime, FILTER_SANITIZE_STRING);
      $endTime = sanitizeAndValidate($endTime, FILTER_SANITIZE_STRING);
      $days = sanitizeAndValidate($days, FILTER_SANITIZE_STRING);
      $driverID = sanitizeAndValidate($driverID, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);

      http_response_code(200);
      echo json_encode($db->availability->updateAvailability($id, $startTime, $endTime, $days, $driverID));
   } else {
      http_response_code(400);
      echo json_encode(["err" => "Invalid arguments"]);
      die();
   }
}

function deleteDriverAvailability($driverID = "")
{
   global $db;

   if (isset($_GET['id']))
   {
      $id = $_GET['id'];

      $id = sanitizeAndValidate($id, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);

      http_response_code(200);
      echo json_encode($db->availability->deleteAvailability($id, $driverID));
   }
   else
   {
      http_response_code(400);
      echo json_encode(["err" => "Invalid arguments"]);
      die();
   }
}