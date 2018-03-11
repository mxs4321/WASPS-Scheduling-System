<?php
header('Content-Type: application/json');

include '../env.php';
include '../sanitizationValidation.php';
require_once "../db.class.php";
$db = new DB($host, $port, $name, $user, $pass); // From dbinfo.php

switch ($_SERVER['REQUEST_METHOD']) {
   case "GET":
      switch ($_SESSION['user']['role'])
      {
         case "user":
            echo json_encode($db->volunteerRequest->getVolunteerRequestForUser($_SESSION['user']['id']));
            break;
         case "admin":
            if (isset($_GET['page']) && isset($_GET['number_per_page']))
            {
               echo json_encode($db->volunteerRequest->getVolunteerRequests($_GET['page'], $_GET['number_per_page']?:10));
            }
            else
            {
               echo json_encode($db->volunteerRequest->getVolunteerRequests(0, 100));
            }
            break;
         default:
            http_response_code(403);
            echo json_encode(["err" => "Only users and admins can access this resource."]);
      }

      break;

   case "POST":
      switch ($_SESSION['user']['role'])
      {
         case "user":
            postVolunteerRequest($_SESSION['user']['id']);
            break;
         case "admin":
            $bodyData = json_decode(file_get_contents('php://input'), true);
            if (isset($bodyData['userID']))
            {
               postVolunteerRequest($bodyData['userID']);
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
            echo json_encode(["err" => "Only users and admins can access this resource."]);
      }

      break;

   case "PUT":
      switch ($_SESSION['user']['role'])
      {
         case "user":
            $bodyData = json_decode(file_get_contents('php://input'), true);
            putVolunteerRequest($_SESSION['user']['id'], $bodyData);
            break;
         case "admin":
            $bodyData = json_decode(file_get_contents('php://input'), true);
            putVolunteerRequest($bodyData['userID'], $bodyData);
            break;
         default:
            http_response_code(403);
            echo json_encode(["err" => "Only users and admins can access this resource."]);
      }

      break;

   case "DELETE":
      switch ($_SESSION['user']['role'])
      {
         case "user":
            deleteVolunteerRequest($_SESSION['user']['id']);
            break;
         case "admin":
            deleteVolunteerRequest();
            break;
         default:
            http_response_code(403);
            echo json_encode(["err" => "Only users and admins can access this resource."]);
      }

      break;
}

function postVolunteerRequest($userID)
{
   global $db;

   $timestamp = date("Y-m-d H:i:s");
   $userID = sanitizeAndValidate($userID, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);

   http_response_code(201);
   echo json_encode($db->volunteerRequest->insertVolunteerRequest($timestamp, $userID));
}

function putVolunteerRequest($userID, $bodyData)
{
   global $db;

   if (isset($bodyData['id']))
   {
      $id = $bodyData['id'];

      $id = sanitizeAndValidate($id, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
      $userID = sanitizeAndValidate($userID, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);

      http_response_code(201);
      echo json_encode($db->volunteerRequest->updateVolunteerRequest($id, "", $userID));
   }
   else
   {
      http_response_code(404);
      echo json_encode(["err" => "Invalid arguments"]);
      die();
   }
}

function deleteVolunteerRequest($userID = "")
{
   global $db;

   $bodyData = json_decode(file_get_contents('php://input'), true);

   if (isset($bodyData['id']))
   {
      $id = $bodyData['id'];

      $id = sanitizeAndValidate($id, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);

      http_response_code(201);
      echo json_encode($db->volunteerRequest->deleteVolunteerRequest($id, $userID));
   }
   else
   {
      http_response_code(404);
      echo json_encode(["err" => "Invalid arguments"]);
      die();
   }


}