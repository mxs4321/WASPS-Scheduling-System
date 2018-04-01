<?php
session_start();
header('Content-Type: application/json');
include '../sanitizationValidation.php';
require_once "../db.class.php";
$db = new DB();

switch ($_SERVER['REQUEST_METHOD']) {
   case "GET":
      switch ($_SESSION['user']['role'])
      {
         case "passenger":
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
         case "passenger":
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
               http_response_code(400);
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
         case "passenger":
            putVolunteerRequest($_SESSION['user']['id']);
            break;
         case "admin":
            putVolunteerRequest();
            break;
         default:
            http_response_code(403);
            echo json_encode(["err" => "Only users and admins can access this resource."]);
      }

      break;

   case "DELETE":
      switch ($_SESSION['user']['role'])
      {
         case "passenger":
            deleteVolunteerRequest($_SESSION['user']['id']);
            break;
         case "admin":
            deleteVolunteerRequest($_GET['id']);
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

// No real use for now, just here in case volunteerReq. will ever have data that needs updated
function putVolunteerRequest($userID = "")
{
   global $db;

   //$bodyData = json_decode(file_get_contents('php://input'), true);

   if (isset($_GET['id']))
   {
      $id = $_GET['id'];

      $id = sanitizeAndValidate($id, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
      $userID = sanitizeAndValidate($userID, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);

      http_response_code(201);
      echo json_encode($db->volunteerRequest->updateVolunteerRequest($id, "", $userID));
   }
   else
   {
      http_response_code(400);
      echo json_encode(["err" => "Invalid arguments"]);
      die();
   }
}

function deleteVolunteerRequest($userID = "")
{
   global $db;

   if (isset($_GET['id']))
   {
      $id = $_GET['id'];

      $id = sanitizeAndValidate($id, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);

      http_response_code(201);
      echo json_encode($db->volunteerRequest->deleteVolunteerRequest($id, $userID));
   }
   else
   {
      http_response_code(400);
      echo json_encode(["err" => "Invalid arguments"]);
      die();
   }


}