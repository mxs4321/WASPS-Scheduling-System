<?php
session_start(); // Starting Session
header('Content-Type: application/json');

include '../env.php';
require_once "../db.class.php";
require_once "../twilio.php";
$db = new DB($host, $port, $name, $user, $pass); // From dbinfo.php
$twilio = new TextDriver;

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
        $_POST = json_decode(file_get_contents('php://input'), true);

        if (empty($_POST['passengerID']) || empty($_POST['apptStart']) || empty($_POST['apptEnd'])
            || empty($_POST['pickupTime']) || empty($_POST['pickupStreetAddress'])
            || empty($_POST['pickupCity']) || empty($_POST['apptStreetAddress']) || empty($_POST['apptCity'])
        ) {
            http_response_code(400/*Bad Request*/);
            echo json_encode(["err" => "Could not create ride"]);
            die();
        }

        $status = isset($_POST['driverID']) ? "Pending" : "Unverified";
        $created = date("Y-m-d H:i:s");
        $modified = date("Y-m-d H:i:s");

        http_response_code(201/*created*/);
        echo json_encode($db->ride->insertRide(
            $_POST['passengerID'], $_POST['apptStart'], $_POST['apptEnd'], $_POST['pickupTime'], $_POST['wheelchairVan'],
            $status, $_POST['pickupStreetAddress'], $_POST['pickupCity'], $_POST['apptStreetAddress'], $_POST['apptCity'],
            $created, $modified
        ));
        
        if isset($_POST['driverID'])
        {
            $pickupData = explode(" ", $_POST['pickupTime']);
            $pickupDate = explode("-", $pickupData[0]);
            $driverContactInfo = $db->user->findById($_POST['driverID'])->getDriverContactInfo();
            $driverPhone = $driverContactInfo['phone'];    
            $driverFirstName = $driverContactInfo['firstName'];
            $driverLastName = $driverContactInfo['lastName'];
            $message = $driverFirstName . ' ' . $driverLastName . ', you are assigned to drive on ' . $pickupDate[1] . '-' . $pickupDate[2] . '-' . $pickupDate[0] . '. To accept this ride, reply with ACCEPT. If you do not accept this ride, reply with DECLINE.';

            $twilio->sendMessage($message,$driverPhone);
        }
        break;

    case "PUT":
        $requestBody = file_get_contents('php://input');
        $bodyData = json_decode($requestBody, true);

        if (isset($bodyData['id']))
        {
           $id = $bodyData['id'];
           $passengerID = $bodyData['passengerID'] ?? "";
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

           if ($passengerID != "") $passengerID = sanitizeAndValidate($passengerID, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
           if ($driverID != "") $driverID = sanitizeAndValidate($driverID, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
           if ($apptStart != "") $apptStart = sanitizeAndValidate($apptStart, FILTER_SANITIZE_STRING);
           if ($apptEnd != "") $apptEnd = sanitizeAndValidate($apptEnd, FILTER_SANITIZE_STRING);
           if ($numMiles != "") $numMiles = sanitizeAndValidate($numMiles, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_VALIDATE_FLOAT);
           if ($totalMinutes != "") $totalMinutes = sanitizeAndValidate($totalMinutes, FILTER_SANITIZE_NUMBER_INT, FILTER_VALIDATE_INT);
           if ($pickupTime != "") $pickupTime = sanitizeAndValidate($pickupTime, FILTER_SANITIZE_STRING);
           if ($wheelchairVan != "") $wheelchairVan = sanitizeAndValidate($wheelchairVan, -1, FILTER_VALIDATE_BOOLEAN);
           if ($status != "") $status = sanitizeAndValidate($status, FILTER_SANITIZE_STRING);
           if ($pickupStreetAddress != "") $pickupStreetAddress = sanitizeAndValidate($pickupStreetAddress, FILTER_SANITIZE_STRING);
           if ($pickupCity != "") $pickupCity = sanitizeAndValidate($pickupCity, FILTER_SANITIZE_STRING);
           if ($apptStreetAddress != "") $apptStreetAddress = sanitizeAndValidate($apptStreetAddress, FILTER_SANITIZE_STRING);
           if ($apptCity != "") $apptCity = sanitizeAndValidate($apptCity, FILTER_SANITIZE_STRING);
           if ($created != "") $created = sanitizeAndValidate($created, FILTER_SANITIZE_STRING);

           http_response_code(201);
           echo json_encode($db->ride->updateRide($id, $passengerID, $driverID, $apptStart, $apptEnd, $numMiles, $totalMinutes,
              $pickupTime, $wheelchairVan, $status, $pickupStreetAddress, $pickupCity, $apptStreetAddress, $apptCity, $created, $modified));
           if ($status == "Scheduled")
           {
              $pickupData = explode(" ", $pickupTime);
              $pickupDate = explode("-", $pickupData[0]);
              $driverContactInfo = $db->user->findById($driverID)->getDriverContactInfo();
              $driverPhone = $driverContactInfo['phone'];    
              $driverFirstName = $driverContactInfo['firstName'];
              $driverLastName = $driverContactInfo['lastName'];
              $message = $driverFirstName . ' ' . $driverLastName . ', you are assigned to drive on ' . $pickupDate[1] . '-' . $pickupDate[2] . '-' . $pickupDate[0] . '. To accept this ride, reply with ACCEPT. If you do not accept this ride, reply with DECLINE.';

              $twilio->sendMessage($message,$driverPhone);
           }
        }
        else
        {
           http_response_code(404);
           echo json_encode(["err" => "Could not update ride"]);
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
          echo json_encode($db->ride->deleteRide($id));
       }
       else
       {
          http_response_code(404);
          echo json_encode(["err" => "Could not delete ride"]);
          die();
       }

       break;
}
