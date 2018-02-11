<?php
header('Content-Type: application/json');

include '../env.php';
include '../sanitizationValidation.php';
require_once "../db.class.php";
$db = new DB($host, $port, $name, $user, $pass); // From dbinfo.php

switch ($_SERVER['REQUEST_METHOD']) {
   case "GET":
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

   case "POST":
      $requestBody = file_get_contents('php://input');
      $bodyData = json_decode($requestBody, true);

      //print_r($bodyData);

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

   case "PUT":
      $requestBody = file_get_contents('php://input');
      $bodyData = json_decode($requestBody, true);

      //print_r($bodyData);

      if (isset($bodyData['id']))
      {
         $id = $bodyData['id'];
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

   case "DELETE":
      $requestBody = file_get_contents('php://input');
      $bodyData = json_decode($requestBody, true);

      if (isset($bodyData['id']))
      {
         $id = $bodyData['id'];

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
}
