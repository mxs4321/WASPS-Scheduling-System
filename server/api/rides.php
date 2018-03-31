<?php
session_start(); // Starting Session
header('Content-Type: application/json');
include '../sanitizationValidation.php';
include '../env.php';
require_once "../db.class.php";

$db = new DB($host, $port, $name, $user, $pass); // From dbinfo.php

switch ($_SERVER['REQUEST_METHOD']) {
    case "GET":
        switch ($_SESSION['user']['role']) {
            case "admin":
            case "dispatcher":
                echo json_encode($db->ride->getRides($_GET['page'] ?? 0, $_GET['number_per_page'] ?? 10, $_GET['populate'] ?? false));
                break;
            case 'driver':
                echo json_encode($db->ride->getRidesByDriverID($_SESSION['user']['id'], $_GET['page'] ?? 0, $_GET['number_per_page'] ?? 10, $_GET['populate'] ?? false));
                break;
            case 'passenger':
                echo json_encode($db->ride->getRidesByPassengerID($_SESSION['user']['id'], $_GET['page'] ?? 0, $_GET['number_per_page'] ?? 10, $_GET['populate'] ?? false));
                break;
            default:
                http_response_code(403/*Forbidden*/);
                echo json_encode(["err" => "Could get requested resource"]);
                break;
        }
        break;

    case "POST":
        switch ($_SESSION['user']['role']) {
            case "passenger":
                postRide($_SESSION['user']['id']);
                break;
            case "dispatcher":
            case "admin":
                $bodyData = json_decode(file_get_contents('php://input'), true);
                if (isset($bodyData['passengerID'])) {
                    postRide($bodyData['passengerID']);
                } else {
                    http_response_code(403);
                    echo json_encode(["err" => "Could get requested resource"]);
                }
                break;
            default:
                http_response_code(403);
                echo json_encode(["err" => "Could get requested resource"]);
        }
        break;

    case "PUT":
        switch ($_SESSION['user']['role']) {
            case "passenger":
                putRide($_SESSION['user']['id']);
                break;
            case "driver": 
                acceptOrDeclineRide();
                break;
            case "dispatcher":
            case "admin":
                putRide();
                break;
            default:
                http_response_code(403);
                echo json_encode(["err" => "Could get requested resource"]);
        }
        break;

    case "DELETE":
        switch ($_SESSION['user']['role']) {
            case "passenger":
                deleteRide($_SESSION['user']['id']);
                break;
            case "dispatcher":
            case "admin":
                deleteRide();
                break;
            default:
                http_response_code(403);
                echo json_encode(["err" => "Could get requested resource"]);
        }
        break;
}

function acceptOrDeclineRide()
{
    global $db;

    if (!isset($_GET['id'])) {
        http_response_code(400);
        echo json_encode(["err" => "Could not update ride"]);
        die();
    }

    $ride = $db->ride->findById($_GET['id']);
    if ($ride['driverID'] !== $_SESSION['user']['id']) {
        http_response_code(403);
        echo json_encode(["err" => "Could not update ride"]);
        die();
    }

    $bodyData = json_decode(file_get_contents('php://input'), true);

    if ($bodyData['status'] === "Unverified") {
        echo json_encode($db->ride->updateRide($_GET['id'], "", "-1", "", "", "", "",
            "", "", $bodyData['status'], "", "", "", "", "", ""));
    } else if ($bodyData['status'] === "Scheduled") {
        echo json_encode($db->ride->updateRide($_GET['id'], "", "", "", "", "", "",
            "", "", $bodyData['status'], "", "", "", "", "", ""));
    }
}

function postRide($passengerID)
{
    global $db;

    $bodyData = json_decode(file_get_contents('php://input'), true);

    if (empty($bodyData['apptStart']) || empty($bodyData['apptEnd'])
        || empty($bodyData['pickupTime']) || empty($bodyData['pickupStreetAddress'])
        || empty($bodyData['pickupCity']) || empty($bodyData['apptStreetAddress']) || empty($bodyData['apptCity'])
    ) {
        http_response_code(400);
        echo json_encode(["err" => "Could not create ride"]);
        die();
    }

    $passengerID = sanitizeAndValidate($passengerID, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
    $apptStart = sanitizeAndValidate($bodyData['apptStart'], FILTER_SANITIZE_STRING);
    $apptEnd = sanitizeAndValidate($bodyData['apptEnd'], FILTER_SANITIZE_STRING);
    $pickupTime = sanitizeAndValidate($bodyData['pickupTime'], FILTER_SANITIZE_STRING);
    $wheelchairVan = sanitizeAndValidate($bodyData['wheelchairVan'], -1, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
    $pickupStreetAddress = sanitizeAndValidate($bodyData['pickupStreetAddress'], FILTER_SANITIZE_STRING);
    $pickupCity = sanitizeAndValidate($bodyData['pickupCity'], FILTER_SANITIZE_STRING);
    $apptStreetAddress = sanitizeAndValidate($bodyData['apptStreetAddress'], FILTER_SANITIZE_STRING);
    $apptCity = sanitizeAndValidate($bodyData['apptCity'], FILTER_SANITIZE_STRING);

    // $appointmentDatetime = date_create_from_format('Y-m-d H:i:s', $apptStart);
    // //TODO validate time

    // if ($appointmentDatetime->getTimestamp() - time() < 259200) {
    //     //TODO check if timezones are messing it up or not with time() function
    //     http_response_code(400);
    //     echo json_encode(["err" => "Cannot schedule rides within 72h of the appointment"]);
    //     die();
    // }

    $status = isset($bodyData['driverID']) ? "Pending" : "Unverified";
    $created = date("Y-m-d H:i:s");
    $modified = date("Y-m-d H:i:s");

    http_response_code(201);
    echo json_encode($db->ride->insertRide(
        $passengerID, $apptStart, $apptEnd, $pickupTime, $wheelchairVan,
        $status, $pickupStreetAddress, $pickupCity, $apptStreetAddress, $apptCity,
        $created, $modified
    ));
}

function putRide($passengerID = "")
{
    global $db;

    $bodyData = json_decode(file_get_contents('php://input'), true);

    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        if ($passengerID == "") {
            $passengerID = $bodyData['passengerID'] ?? "";
        }

        $driverID = $bodyData['driverID'] ?? "";
        $apptStart = $bodyData['apptStart'] ?? "";
        $apptEnd = $bodyData['apptEnd'] ?? "";
        $numMiles = $bodyData['numMiles'] ?? "";
        $totalMinutes = $bodyData['totalMinutes'] ?? "";
        $pickupTime = $bodyData['pickupTime'] ?? "";
        $wheelchairVan = $bodyData['wheelchairVan'] ?? "";
        $status = $bodyData['status'] ?? "";
        $pickupStreetAddress = $bodyData['pickupStreetAddress'] ?? "";
        $pickupCity = $bodyData['pickupCity'] ?? "";
        $apptStreetAddress = $bodyData['apptStreetAddress'] ?? "";
        $apptCity = $bodyData['apptCity'] ?? "";
        $created = $bodyData['created'] ?? "";
        $modified = date("Y-m-d H:i:s");

        if ($passengerID != "") {
            $passengerID = sanitizeAndValidate($passengerID, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
        }

        if ($driverID != "") {
            $driverID = sanitizeAndValidate($driverID, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
        }

        if ($apptStart != "") {
            $apptStart = sanitizeAndValidate($apptStart, FILTER_SANITIZE_STRING);
        }

        if ($apptEnd != "") {
            $apptEnd = sanitizeAndValidate($apptEnd, FILTER_SANITIZE_STRING);
        }

        if ($numMiles != "") {
            $numMiles = sanitizeAndValidate($numMiles, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_VALIDATE_FLOAT);
        }

        if ($totalMinutes != "") {
            $totalMinutes = sanitizeAndValidate($totalMinutes, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
        }

        if ($pickupTime != "") {
            $pickupTime = sanitizeAndValidate($pickupTime, FILTER_SANITIZE_STRING);
        }

        if ($wheelchairVan != "") {
            $wheelchairVan = sanitizeAndValidate($wheelchairVan, -1, FILTER_VALIDATE_BOOLEAN);
        }

        if ($status != "") {
            $status = sanitizeAndValidate($status, FILTER_SANITIZE_STRING);
        }

        if ($pickupStreetAddress != "") {
            $pickupStreetAddress = sanitizeAndValidate($pickupStreetAddress, FILTER_SANITIZE_STRING);
        }

        if ($pickupCity != "") {
            $pickupCity = sanitizeAndValidate($pickupCity, FILTER_SANITIZE_STRING);
        }

        if ($apptStreetAddress != "") {
            $apptStreetAddress = sanitizeAndValidate($apptStreetAddress, FILTER_SANITIZE_STRING);
        }

        if ($apptCity != "") {
            $apptCity = sanitizeAndValidate($apptCity, FILTER_SANITIZE_STRING);
        }

        if ($created != "") {
            $created = sanitizeAndValidate($created, FILTER_SANITIZE_STRING);
        }

        if ($apptStart != "") {
            $appointmentDatetime = date_create_from_format('Y-m-d H:i:s', $apptStart);
            //TODO validate time

            if ($appointmentDatetime->getTimestamp() - time() < 259200) {
                //TODO check if timezones are messing it up or not with time() function
                http_response_code(400);
                echo json_encode(["err" => "Cannot schedule rides within 72h of the appointment"]);
                die();
            }
        }

        http_response_code(201);
        echo json_encode($db->ride->updateRide($id, $passengerID, $driverID, $apptStart, $apptEnd, $numMiles, $totalMinutes,
            $pickupTime, $wheelchairVan, $status, $pickupStreetAddress, $pickupCity, $apptStreetAddress, $apptCity, $created, $modified));
    } else {
        http_response_code(404);
        echo json_encode(["err" => "Could not update ride"]);
        die();
    }
}

function deleteRide($userID = "")
{
    global $db;

    //$bodyData = json_decode(file_get_contents('php://input'), true);

    if (isset($_GET['id'])) {
        $id = $_GET['id'];

        $id = sanitizeAndValidate($id, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);

        http_response_code(201);
        echo json_encode($db->ride->deleteRide($id, $userID));
    } else {
        http_response_code(404);
        echo json_encode(["err" => "Could not delete ride"]);
        die();
    }
}
