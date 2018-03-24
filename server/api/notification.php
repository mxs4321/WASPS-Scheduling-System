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
         case "passenger":
         case "driver":
         case "dispatcher":
            echo json_encode($db->notification->getNotificationForUser($_SESSION['user']['id']));
            break;
         case "admin":
            if (isset($_GET['id']))
            {
               echo json_encode($db->notification->getNotification($_GET['id']));
            }
            else if (isset($_GET['page']) && isset($_GET['number_per_page']))
            {
               echo json_encode($db->notification->getNotifications($_GET['page'], $_GET['number_per_page']?:10));
            }
            else
            {
               echo json_encode($db->notification->getNotifications(0, 100));
            }
            break;
         default:
            http_response_code(403);
            echo json_encode(["err" => "Only registered users can access this resource."]);
      }

      break;

   case "POST":
      switch ($_SESSION['user']['role'])
      {
         case "dispatcher":
         case "admin":
            $bodyData = json_decode(file_get_contents('php://input'), true);

            if (isset($bodyData['userID']))
            {
               $type = $bodyData['type'] ?? "";
               $message = $bodyData['message'] ?? "";
               $userID = $bodyData['userID'];

               if ($type != "")    $type = sanitizeAndValidate($type, FILTER_SANITIZE_STRING);
               if ($message != "") $message = sanitizeAndValidate($message, FILTER_SANITIZE_STRING);
               $userID = sanitizeAndValidate($userID, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
               $timestamp = date("Y-m-d H:i:s");

               http_response_code(201);
               echo json_encode($db->notification->insertNotification($type, $message, $userID, $timestamp));
            }
            else
            {
               http_response_code(404);
               echo json_encode(["err" => "Could not create notification"]);
               die();
            }
            break;
         default:
            http_response_code(403);
            echo json_encode(["err" => "Only dispatchers and admins can access this resource."]);
      }

      break;

   case "PUT":
      switch ($_SESSION['user']['role'])
      {
         case "dispatcher":
         case "admin":
            $bodyData = json_decode(file_get_contents('php://input'), true);

            if (isset($_GET['id']))
            {
               $id = $_GET['id'];
               $type = $bodyData['type'] ?? "";
               $message = $bodyData['message'] ?? "";
               $userID = $bodyData['userID'] ?? "";

               $id = sanitizeAndValidate($id, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
               if ($type != "")    $type = sanitizeAndValidate($type, FILTER_SANITIZE_STRING);
               if ($message != "") $message = sanitizeAndValidate($message, FILTER_SANITIZE_STRING);
               if ($userID != "")  $userID = sanitizeAndValidate($userID, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);

               http_response_code(201);
               echo json_encode($db->notification->updateNotification($id, $type, $message, $userID));
            }
            else
            {
               http_response_code(404);
               echo json_encode(["err" => "Could not update notification"]);
               die();
            }

         break;
         default:
            http_response_code(403);
            echo json_encode(["err" => "Only dispatchers and admins can access this resource."]);
      }

      break;

   case "DELETE":
      switch ($_SESSION['user']['role'])
      {
         case "dispatcher":
         case "admin":
            $bodyData = json_decode(file_get_contents('php://input'), true);

            if (isset($_GET['id']))
            {
               $id = $_GET['id'];

               $id = sanitizeAndValidate($id, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);

               http_response_code(201);
               echo json_encode($db->notification->deleteNotification($id));
            }
            else
            {
               http_response_code(404);
               echo json_encode(["err" => "Could not delete notification"]);
               die();
            }

            break;
         default:
            http_response_code(403);
            echo json_encode(["err" => "Only dispatchers and admins can access this resource."]);
      }

      break;
}
