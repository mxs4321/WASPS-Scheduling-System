<?php
header('Content-Type: application/json');

include '../env.php';
require_once "../db.class.php";
$db = new DB($host, $port, $name, $user, $pass); // From dbinfo.php

switch ($_SERVER['REQUEST_METHOD']) {
    case "GET":
       switch ($_SESSION['user']['role'])
       {
          case "user":
          case "driver":
            echo json_encode($db->user->findById($_SESSION['user']['id']));
             break;
          case "dispatcher":
          case "admin":
             if (isset($_GET['id'])) {
                echo json_encode($db->user->findById($_GET['id']));
             } else if (isset($_GET['name'])) {
                echo json_encode($db->user->findByName($_GET['name']));
             } else {
                echo json_encode($db->user->getUsers($_GET['page']??0, $_GET['number_per_page']??10));
             }
             break;
          default:
             http_response_code(403);
             echo json_encode(["err" => "Only registered users can access this resource."]);
       }

       break;

    case "POST":
        $requestBody = file_get_contents('php://input');
        $bodyData = json_decode($requestBody, true);

        if (isset($bodyData['password'])  && isset($bodyData['firstName'])
           && isset($bodyData['lastName']) && isset($bodyData['phone']) && isset($bodyData['email']))
        {
           $password = $bodyData['password'];
           $role = "passenger";
           $firstName = $bodyData['firstName'];
           $lastName = $bodyData['lastName'];
           $phone = $bodyData['phone'];
           $email = $bodyData['email'];
           $wantsSMS = $bodyData['wantsSMS'] ?? true;
           $wantsEmail = $bodyData['wantsEmail'] ?? true;

           echo json_encode($db->user->insertUser($password, $role, $firstName, $lastName, $phone, $email, $wantsSMS, $wantsEmail));
           http_response_code(201);
        }
        else
        {
           http_response_code(404);
           echo json_encode(["err" => "Could not create user"]);
           die();
        }

        break;

    case "PUT":
       switch ($_SESSION['user']['role'])
       {
          case "user":
          case "driver":
             $bodyData = json_decode(file_get_contents('php://input'), true);
             putUser($_SESSION['user']['id'], $bodyData);
             break;
          case "admin":
             $bodyData = json_decode(file_get_contents('php://input'), true);
             if (isset($bodyData['id']))
             {
                putUser($bodyData['id'], $bodyData, $bodyData['role'] ?? "");
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
             echo json_encode(["err" => "Only registered users can access this resource."]);
       }



        break;

    case "DELETE":
       switch ($_SESSION['user']['role'])
       {
          case "user":
          case "driver":
             http_response_code(201);
             echo json_encode($db->user->deleteUser($_SESSION['user']['id']));
             break;
          case "admin":
             $bodyData = json_decode(file_get_contents('php://input'), true);

             if (isset($bodyData['id']))
             {
                $id = $bodyData['id'];

                $id = sanitizeAndValidate($id, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);

                http_response_code(201);
                echo json_encode($db->user->deleteUser($id));
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
             echo json_encode(["err" => "Only registered users can access this resource."]);
       }

       break;
}

function putUser($userID, $bodyData, $role = "")
{
   global $db;

   $password = $bodyData['password'] ?? "";
   $firstName = $bodyData['firstName'] ?? "";
   $lastName = $bodyData['lastName'] ?? "";
   $phone = $bodyData['phone'] ?? "";
   $email = $bodyData['email'] ?? "";
   $lastLogin = $bodyData['lastLogin'] ?? "";
   $wantsSMS = $bodyData['wantsSMS'] ?? true;
   $wantsEmail = $bodyData['wantsEmail'] ?? true;

   $password = sanitizeAndValidate($password, FILTER_SANITIZE_STRING);
   if ($role != "")       $role = sanitizeAndValidate($role, FILTER_SANITIZE_STRING);
   if ($firstName != "")  $firstName = sanitizeAndValidate($firstName, FILTER_SANITIZE_STRING);
   if ($lastLogin != "")  $lastLogin = sanitizeAndValidate($lastLogin, FILTER_SANITIZE_STRING);
   if ($phone != "")      $phone = sanitizeAndValidate($phone, FILTER_SANITIZE_STRING);
   if ($email!= "")       $email = sanitizeAndValidate($email, FILTER_SANITIZE_EMAIL, FILTER_VALIDATE_EMAIL);
   if ($wantsSMS != true) $wantsSMS = sanitizeAndValidate($wantsSMS, -1, FILTER_VALIDATE_BOOLEAN);
   if ($wantsEmail != "") $wantsEmail = sanitizeAndValidate($wantsEmail, -1, FILTER_VALIDATE_BOOLEAN);

   http_response_code(201);
   echo json_encode($db->user->updateUser($userID, $password, $role, $firstName, $lastName, $phone, $email, "",
      $lastLogin, $wantsSMS, $wantsEmail));
}