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
         echo json_encode($db->volunteerRequest->getVolunteerRequest($_GET['id']));
      }
      else if (isset($_GET['page']) && isset($_GET['number_per_page']))
      {
         echo json_encode($db->volunteerRequest->getVolunteerRequests($_GET['page'], $_GET['number_per_page']?:10));
      }
      else
      {
         echo json_encode($db->volunteerRequest->getVolunteerRequests(0, 100));
      }
      break;

   case "POST":
      $requestBody = file_get_contents('php://input');
      $bodyData = json_decode($requestBody, true);

      //print_r($bodyData);

      if (isset($bodyData['userID']))
      {
         $userID = $bodyData['userID'];

         $timestamp = date("Y-m-d H:i:s");
         $userID = sanitizeAndValidate($userID, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);

         http_response_code(201);
         echo json_encode($db->volunteerRequest->insertVolunteerRequest($timestamp, $userID));
      }
      else
      {
         http_response_code(404);
         echo json_encode(["err" => "Could not create volunteer request"]);
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
         $userID = $bodyData['userID'] ?? "";

         $id = sanitizeAndValidate($id, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
         $userID = sanitizeAndValidate($userID, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);

         http_response_code(201);
         echo json_encode($db->volunteerRequest->updateVolunteerRequest($id, "", $userID));
      }
      else
      {
         http_response_code(404);
         echo json_encode(["err" => "Could not update volunteer request"]);
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
         echo json_encode($db->volunteerRequest->deleteVolunteerRequest($id));
      }
      else
      {
         http_response_code(404);
         echo json_encode(["err" => "Could not delete volunteer request"]);
         die();
      }

      break;
}
