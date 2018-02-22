<?php
session_start(); // Starting Session
header('Content-Type: application/json');

include '../env.php';
include '../sanitizationValidation.php';
require_once "../db.class.php";
$db = new DB($host, $port, $name, $user, $pass); // From dbinfo.php

switch ($_SERVER['REQUEST_METHOD']) {
    case "GET":
        switch ($_SESSION['user']['role']) {
            case 'driver':
                  echo json_encode($db->availability->getAvailabilityForDriver($_SESSION['user']['id']));
                break;
            case "dispatcher":
            case "admin":
                if (isset($_GET['dayOfTheWeek']) && isset($_GET['timeOfDayStart']) && isset($_GET['timeOfDayEnd'])
                    && isset($_GET['datetimeStart']) && isset($_GET['datetimeEnd'])) {
                    echo json_encode($db->availability->findAvailableDrivers($_GET['dayOfTheWeek'], $_GET['timeOfDayStart'],
                        $_GET['timeOfDayStart'], $_GET['datetimeStart'], $_GET['datetimeEnd']));
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
        $requestBody = file_get_contents('php://input');
        $bodyData = json_decode($requestBody, true);

        if (isset($bodyData['start']) && isset($bodyData['end']) && (isset($bodyData['days'])) && isset($bodyData['driverID'])) {
            $startTime = $bodyData['start'];
            $endTime = $bodyData['end'];
            $days = $bodyData['days'];
            $driverID = $bodyData['driverID'];

            $startTime = sanitizeAndValidate($startTime, FILTER_SANITIZE_STRING);
            $endTime = sanitizeAndValidate($endTime, FILTER_SANITIZE_STRING);
            $days = sanitizeAndValidate($days, FILTER_SANITIZE_STRING);
            $driverID = sanitizeAndValidate($driverID, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);

            http_response_code(201);
            echo json_encode($db->availability->insertAvailability($startTime, $endTime, $days, $driverID));
        } else {
            http_response_code(400);
            echo json_encode(["err" => "Could not create driver schedule"]);
            die();
        }

        break;

    case "PUT":
        $requestBody = file_get_contents('php://input');
        $bodyData = json_decode($requestBody, true);

        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $startTime = $bodyData['start'] ?? "";
            $endTime = $bodyData['end'] ?? "";
            $days = $bodyData['days'] ?? "";
            $driverID = $bodyData['driverID'] ?? "";

            $id = sanitizeAndValidate($id, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
            $startTime = sanitizeAndValidate($startTime, FILTER_SANITIZE_STRING);
            $endTime = sanitizeAndValidate($endTime, FILTER_SANITIZE_STRING);
            $days = sanitizeAndValidate($days, FILTER_SANITIZE_STRING);
            $driverID = sanitizeAndValidate($driverID, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);

            http_response_code(200);
            echo json_encode($db->availability->updateAvailability($id, $startTime, $endTime, $days, $driverID));
        } else {
            http_response_code(400);
            echo json_encode(["err" => "Could not update driver schedule"]);
            die();
        }

        break;

    case "DELETE":
        if (isset($_GET['id'])) {
            $id = $_GET['id'];

            $id = sanitizeAndValidate($id, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);

            http_response_code(200);
            echo json_encode($db->availability->deleteAvailability($id));
        } else {
            http_response_code(400);
            echo json_encode(["err" => "Could not delete driver schedule"]);
            die();
        }

        break;
}
