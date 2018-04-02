<?php
session_start();
header('Content-Type: application/json');
include '../sanitizationValidation.php';
require_once "../db.class.php";
$db = new DB();
$user = $_SESSION['user'];

switch ($_SERVER['REQUEST_METHOD']) {
    case "GET":
        $page = $_GET['page'] ?? 0;
        $numberPerPage = $_GET['number_per_page'] ?? 10;
        $populate = $_GET['populate'] ?? false;
        switch ($user['role']) {
            case "admin":
            case "dispatcher":
                echo json_encode($db->ride->getRides($page, $numberPerPage, $populate));
                http_response_code(200);
                break;
            case 'driver':
                echo json_encode($db->ride->getRidesByDriverID($user['id'], $page, $numberPerPage, $populate));
                http_response_code(200);
                break;
            case 'passenger':
                echo json_encode($db->ride->getRidesByPassengerID($user['id'], $page, $numberPerPage, $populate));
                http_response_code(200);
                break;
            default:
                echo json_encode(["err" => "Could get requested resource"]);
                http_response_code(403/*Forbidden*/);
                break;
        }
        break;

    case "POST":
        switch ($user['role']) {
            case "passenger":
                $ride = postRide($user['id']);
                echo json_encode($ride);
                http_response_code(201);
                break;
            case "dispatcher":
            case "admin":
                $bodyData = json_decode(file_get_contents('php://input'), true);
                if (isset($bodyData['passengerID'])) {
                    $ride = postRide($bodyData['passengerID']);
                    echo json_encode($ride);
                    http_response_code(201);
                } else {
                    echo json_encode(["err" => "Could get requested resource"]);
                    http_response_code(403);
                }
                break;
            default:
                echo json_encode(["err" => "Could get requested resource"]);
                http_response_code(403);
        }
        break;

    case "PUT":
        switch ($user['role']) {
            case "passenger":
                echo json_encode(putRide($user['id']));
                http_response_code(201);
                break;
            case "driver":
                echo json_encode(acceptOrDeclineRide());
                http_response_code(201);
                break;
            case "dispatcher":
            case "admin":
                echo json_encode(putRide());
                http_response_code(201);
                break;
            default:
                echo json_encode(["err" => "Could get requested resource"]);
                http_response_code(403);
        }
        break;

    case "DELETE":
        switch ($user['role']) {
            case "passenger":
                deleteRide($user['id']);
                break;
            case "dispatcher":
            case "admin":
                deleteRide();
                break;
            default:
                echo json_encode(["err" => "Could get requested resource"]);
                http_response_code(403);
        }
        break;
}

function acceptOrDeclineRide()
{
    global $db, $user;

    if (!isset($_GET['id'])) {
        echo json_encode(["err" => "Could not update ride"]);
        http_response_code(400);
        die();
    }

    $ride = $db->ride->findById($_GET['id']);
    if ($ride['driverID'] !== $user['id']) {
        echo json_encode(["err" => "Could not update ride"]);
        http_response_code(403);
        die();
    }

    $bodyData = json_decode(file_get_contents('php://input'), true);

    if ($bodyData['status'] === "Unverified") {
        return $db->ride->updateRide($_GET['id'], "", "-1", "", "", "", "",
            "", "", $bodyData['status'], "", "", "", "", "", "");
    } else if ($bodyData['status'] === "Scheduled") {
        return $db->ride->updateRide($_GET['id'], "", "", "", "", "", "",
            "", "", $bodyData['status'], "", "", "", "", "", "");
    }
}

function postRide($passengerID)
{
    global $db;
    global $user;

    $bodyData = json_decode(file_get_contents('php://input'), true);

    if (empty($bodyData['apptStart']) || empty($bodyData['apptEnd'])
        || empty($bodyData['pickupTime']) || empty($bodyData['pickupStreetAddress'])
        || empty($bodyData['pickupCity']) || empty($bodyData['apptStreetAddress']) || empty($bodyData['apptCity'])
    ) {
        echo json_encode(["err" => "Could not create ride"]);
        http_response_code(400);
        die();
    }

    $driverID = null;
    $status = "Unverified";

    if ($user['role'] != "passenger")
    {
       if (isset($bodyData['driverID']))
       {
          $driverID = $bodyData['driverID'];
          $status = "Pending";
       }
    }

    if ($driverID != null) {
        $driverID = sanitizeAndValidate($bodyData['driverID'], FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
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

    // Maybe Useful
    // http://php.net/manual/en/datetime.diff.php
    // $date1 = new DateTime("now");
    // $date2 = new DateTime("+3 days");
    // $interval = $date1->diff($date2);

    // $appointmentDatetime = date_create_from_format('Y-m-d H:i:s', $apptStart);
    // //TODO validate time

    // if ($appointmentDatetime->getTimestamp() - time() < 259200) {
    //     //TODO check if timezones are messing it up or not with time() function
    //     http_response_code(400);
    //     echo json_encode(["err" => "Cannot schedule rides within 72h of the appointment"]);
    //     die();
    // }

    return $db->ride->insertRide(
        $passengerID, $apptStart, $apptEnd, $pickupTime, $wheelchairVan, $status,
        $pickupStreetAddress, $pickupCity, $apptStreetAddress, $apptCity, $driverID
    );
}

function putRide($passengerID = "")
{
    global $db;
    global $user;

   $bodyData = json_decode(file_get_contents('php://input'), true);

    if ($user['role'] == "passenger" && (isset($bodyData['driverID']) || $bodyData['status'] != "Canceled"))
    {
       echo json_encode(["err" => "Could not update ride"]);
       http_response_code(400);
       die();
    }

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

        return $db->ride->updateRide($id, $passengerID, $driverID, $apptStart, $apptEnd, $numMiles, $totalMinutes,
        $pickupTime, $wheelchairVan, $status, $pickupStreetAddress, $pickupCity, $apptStreetAddress, $apptCity);
    } else {
        http_response_code(404);
        echo json_encode(["err" => "Could not update ride"]);
        die();
    }
}

function deleteRide($userID = "")
{
    global $db;

    if (isset($_GET['id'])) {
        $id = sanitizeAndValidate($_GET['id'], FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
        http_response_code(201);
        echo json_encode($db->ride->deleteRide($id, $userID));
    } else {
        http_response_code(404);
        echo json_encode(["err" => "Could not delete ride"]);
        die();
    }
}
