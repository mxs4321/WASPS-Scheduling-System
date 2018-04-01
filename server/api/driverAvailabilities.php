<?php
session_start(); // Starting Session
header('Content-Type: application/json');
include '../sanitizationValidation.php';
require_once "../db.class.php";
$db = new DB();
$user = $_SESSION['user'];

switch ($_SERVER['REQUEST_METHOD']) {
    case "GET":
        switch ($user['role']) {
            case 'driver':
                echo json_encode($db->availability->getAvailabilityForDriver($user['id']));
                http_response_code(200);
                die();
                break;
            case "dispatcher":
            case "admin":
                if (isset($_GET['start']) && isset($_GET['end'])) {
                    echo json_encode($db->availability->findAvailableDrivers($_GET['start'], $_GET['end']));
                    http_response_code(200);
                    die();
                } else if (isset($_GET['driverID'])) {
                    echo json_encode($db->availability->getAvailabilityForDriver($_GET['driverID']));
                    http_response_code(200);
                    die();
                } else {
                    echo json_encode(["err" => "Invalid Arguments"]);
                    http_response_code(400);
                    die();
                }
                break;
            default:
                echo json_encode(["err" => "Only drivers, dispatchers and admins can access this resource."]);
                http_response_code(403);
                die();
        }
        break;

    case "POST":
        $bodyData = json_decode(file_get_contents('php://input'), true);
        switch ($user['role']) {
            case "driver":
                echo json_encode(postDriverAvailability($user['id'], $bodyData));
                http_response_code(201);
                die();
                break;
            case "admin":
                if (isset($_GET['driverID'])) {
                    echo json_encode(postDriverAvailability($_GET['driverID'], $bodyData));
                    http_response_code(201);
                    die();
                } else {
                    echo json_encode(["err" => "Invalid arguments"]);
                    http_response_code(400);
                    die();
                }
                break;
            default:
                echo json_encode(["err" => "Only drivers, dispatchers  and admins can access this resource."]);
                http_response_code(403);
                die();
        }

        break;

    case "PUT":
        $bodyData = json_decode(file_get_contents('php://input'), true);
        switch ($user['role']) {
            case "driver":
                $availability = $db->availability->getAvailability($_GET['id']);
                if ($availability['driverID'] === $user['id']) {
                    echo json_encode(putDriverAvailability($bodyData));
                    http_response_code(201);
                    die();
                } else {
                    http_response_code(403);
                    echo json_encode(["err" => "Driver can only update own availability"]);
                    die();
                }
                break;
            case "admin":
                echo json_encode(putDriverAvailability($bodyData));
                http_response_code(201);
                die();
                break;
            default:
                http_response_code(403);
                echo json_encode(["err" => "Only drivers, dispatchers  and admins can access this resource."]);
                die();
        }
        break;

    case "DELETE":
        switch ($user['role']) {
            case "driver":
                $availability = $db->availability->getAvailability($_GET['id']);
                if ($availability['driverID'] === $user['id']) {
                    echo json_encode(deleteDriverAvailability($_GET['id']));
                    http_response_code(202);
                    die();
                } else {
                    http_response_code(403);
                    echo json_encode(["err" => "Driver can only update own availability"]);
                    die();
                }
                break;
            case "admin":
                echo json_encode(deleteDriverAvailability($_GET['id']));
                http_response_code(202);
                die();
                break;
            default:
                http_response_code(403);
                echo json_encode(["err" => "Only drivers, dispatchers  and admins can access this resource."]);
                die();
        }
        break;

    default:
        http_response_code(405);
        die();
}

function postDriverAvailability($driverID, $bodyData)
{
    global $db;

    if (isset($bodyData['start']) && isset($bodyData['end']) && (isset($bodyData['days']))) {
        $startTime = sanitizeAndValidate($bodyData['start'], FILTER_SANITIZE_STRING);
        $endTime = sanitizeAndValidate($bodyData['end'], FILTER_SANITIZE_STRING);
        $days = sanitizeAndValidate($bodyData['days'], FILTER_SANITIZE_STRING);
        $driverID = sanitizeAndValidate($driverID, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
        return $db->availability->insertAvailability($startTime, $endTime, $days, $driverID);
    } else {
        http_response_code(400);
        echo json_encode(["err" => "Invalid arguments"]);
        die();
    }
}

function putDriverAvailability($bodyData)
{
    global $db;

    if (isset($_GET['id'])) {
        $id = sanitizeAndValidate($_GET['id'], FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
        $startTime = sanitizeAndValidate($bodyData['start'] ?? "", FILTER_SANITIZE_STRING);
        $endTime = sanitizeAndValidate($bodyData['end'] ?? "", FILTER_SANITIZE_STRING);
        $days = sanitizeAndValidate($bodyData['days'] ?? "", FILTER_SANITIZE_STRING);
        return $db->availability->updateAvailability($id, $startTime, $endTime, $days);
    } else {
        http_response_code(400);
        echo json_encode(["err" => "Invalid arguments"]);
        die();
    }
}

function deleteDriverAvailability($id)
{
    global $db;

    if (isset($id)) {
        $id = sanitizeAndValidate($id, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
        return $db->availability->deleteAvailability($id);
    } else {
        http_response_code(400);
        echo json_encode(["err" => "Invalid arguments"]);
        die();
    }
}
