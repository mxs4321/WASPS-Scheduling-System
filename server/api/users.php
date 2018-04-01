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
        switch($_SESSION['user']['role'])
        {
           case "admin":
              $bodyData = json_decode(file_get_contents('php://input'), true);
              if (isset($bodyData['role']))
              {
                 postUser($bodyData, $bodyData['role']);
              }
              else
              {
                 postUser($bodyData);
              }
              break;
           default:
              $bodyData = json_decode(file_get_contents('php://input'), true);
              postUser($bodyData);
        }

        break;

    case "PUT":
       switch ($_SESSION['user']['role'])
       {
          case "passenger":
          case "driver":
             $bodyData = json_decode(file_get_contents('php://input'), true);
             putUser($_SESSION['user']['id'], $bodyData);
             break;
          case "admin":
             $bodyData = json_decode(file_get_contents('php://input'), true);
             if (isset($_GET['id']))
             {
                putUser($_GET['id'], $bodyData, $bodyData['role'] ?? "");
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
             echo json_encode(["err" => "Only registered users can access this resource."]);
       }

        break;

    case "DELETE":
       switch ($_SESSION['user']['role'])
       {
          case "passenger":
          case "driver":
             http_response_code(200);
             echo json_encode($db->user->deleteUser($_SESSION['user']['id']));
             break;
          case "admin":
             if (isset($_GET['id']))
             {
                $id = $_GET['id'];

                $id = sanitizeAndValidate($id, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);

                http_response_code(200);
                echo json_encode($db->user->deleteUser($id));
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
             echo json_encode(["err" => "Only registered users can access this resource."]);
       }

       break;
}

function postUser($bodyData, $role = "passenger")
{
   global $db;

   if (isset($bodyData['password'])  && isset($bodyData['firstName'])
      && isset($bodyData['lastName']) && isset($bodyData['phone']) && isset($bodyData['email']))
   {
      $password = $bodyData['password'];
      $firstName = $bodyData['firstName'];
      $lastName = $bodyData['lastName'];
      $phone = $bodyData['phone'];
      $email = $bodyData['email'];

      echo json_encode($db->user->insertUser($password, $role, $firstName, $lastName, $phone, $email));
      http_response_code(201);
   }
   else
   {
      http_response_code(400);
      echo json_encode(["err" => "Invalid arguments"]);
      die();
   }
}

function putUser($userID, $bodyData, $role = "")
{
   global $db;

   $password = $bodyData['password'] ?? "";
   $firstName = $bodyData['firstName'] ?? "";
   $lastName = $bodyData['lastName'] ?? "";
   $phone = $bodyData['phone'] ?? "";
   $email = $bodyData['email'] ?? "";

   $password = sanitizeAndValidate($password, FILTER_SANITIZE_STRING);
   if ($role != "")       $role = sanitizeAndValidate($role, FILTER_SANITIZE_STRING);
   if ($firstName != "")  $firstName = sanitizeAndValidate($firstName, FILTER_SANITIZE_STRING);
   if ($phone != "")      $phone = sanitizeAndValidate($phone, FILTER_SANITIZE_STRING);
   if ($email!= "")       $email = sanitizeAndValidate($email, FILTER_SANITIZE_EMAIL, FILTER_VALIDATE_EMAIL);

   http_response_code(200);
   echo json_encode($db->user->updateUser($userID, $password, $role, $firstName, $lastName, $phone, $email, ""));
}