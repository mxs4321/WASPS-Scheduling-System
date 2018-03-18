<?php
session_start(); // Starting Session
header('Content-Type: application/json');

include '../env.php';
include '../sanitizationValidation.php';
require_once "../db.class.php";
$db = new DB($host, $port, $name, $user, $pass); // From dbinfo.php

switch ($_SERVER['REQUEST_METHOD']) {
   case "GET":
      switch ($_SESSION['user']['role'])
      {
         case "driver":
            echo json_encode($db->availabilityExclusion->getAvailabilityExclusionForDriver($_SESSION['user']['id']));
            break;
         case "dispatcher":
         case "admin":
            if (isset($_GET['page']) && isset($_GET['number_per_page']))
            {
               echo json_encode($db->availabilityExclusion->getAvailabilityExclusions($_GET['page'], $_GET['number_per_page']?:10));
            }
            else
            {
               echo json_encode($db->availabilityExclusion->getAvailabilityExclusions(0, 100));
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
            postDriverAvailabilityExclusion($_SESSION['user']['id'], $bodyData);
            break;
         case "admin":
            $bodyData = json_decode(file_get_contents('php://input'), true);
            if (isset($bodyData['driverID']))
            {
               postDriverAvailabilityExclusion($bodyData['driverID'], $bodyData);
            }
            else
            {
               http_response_code(404);
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
            putDriverAvailabilityExclusion($_SESSION['user']['id'], $bodyData);
            break;
         case "admin":
            $bodyData = json_decode(file_get_contents('php://input'), true);
            putDriverAvailabilityExclusion($bodyData['driverID'] ?? "", $bodyData);
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
            deleteDriverAvailabilityExclusion($_SESSION['user']['id']);
            break;
         case "admin":
            deleteDriverAvailabilityExclusion();
            break;
         default:
            http_response_code(403);
            echo json_encode(["err" => "Only drivers and admins can access this resource."]);
      }
      break;
}

function postDriverAvailabilityExclusion($driverID, $bodyData)
{
   global $db;

   if (isset($bodyData['start']) && isset($bodyData['end']))
   {
      $startTime = $bodyData['start'];
      $endTime = $bodyData['end'];

      $startTime = sanitizeAndValidate($startTime, FILTER_SANITIZE_STRING);
      $endTime = sanitizeAndValidate($endTime, FILTER_SANITIZE_STRING);
      $driverID = sanitizeAndValidate($driverID, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);

      http_response_code(201);
      echo json_encode($db->availabilityExclusion->insertAvailabilityExclusion($startTime, $endTime, $driverID));
   }
   else
   {
      http_response_code(404);
      echo json_encode(["err" => "Invalid arguments"]);
      die();
   }
}

function putDriverAvailabilityExclusion($driverID, $bodyData)
{
   global $db;

   if (isset($bodyData['id']))
   {
      $id = $bodyData['id'];
      $startTime = $bodyData['start'] ?? "";
      $endTime = $bodyData['end'] ?? "";

      $id = sanitizeAndValidate($id, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
      $startTime = sanitizeAndValidate($startTime, FILTER_SANITIZE_STRING);
      $endTime = sanitizeAndValidate($endTime, FILTER_SANITIZE_STRING);
      $driverID = sanitizeAndValidate($driverID, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);

      http_response_code(201);
      echo json_encode($db->availabilityExclusion->updateAvailabilityExclusion($id, $startTime, $endTime, $driverID));
   }
   else
   {
      http_response_code(404);
      echo json_encode(["err" => "Invalid arguments"]);
      die();
   }
}

function deleteDriverAvailabilityExclusion($driverID = "")
{
   global $db;

   $bodyData = json_decode(file_get_contents('php://input'), true);

   if (isset($bodyData['id']))
   {
      $id = $bodyData['id'];

      $id = sanitizeAndValidate($id, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);

      http_response_code(201);
      echo json_encode($db->availabilityExclusion->deleteAvailabilityExclusion($id, $driverID));
   }
   else
   {
      http_response_code(404);
      echo json_encode(["err" => "Invalid arguments"]);
      die();
   }
}