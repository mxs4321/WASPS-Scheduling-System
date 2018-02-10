<?php
header('Content-Type: application/json');

include '../env.php';
require_once "../db.class.php";
$db = new DB($host, $port, $name, $user, $pass); // From dbinfo.php

switch ($_SERVER['REQUEST_METHOD']) {
    case "GET":
        if ($_GET['id']) {
            echo json_encode($db->ride->findById($_GET['id']));
        } else {
            echo json_encode($db->ride->getPage($_GET['page'], $_GET['number_per_page'] ?: 10));
        }
        break;

    case "POST":
        $_POST = json_decode(file_get_contents('php://input'), true);

        if (empty($_POST['userID']) || empty($_POST['apptStart']) || empty($_POST['apptEnd'])
            || empty($_POST['pickupTime']) || empty($_POST['pickupStreetAddress'])
            || empty($_POST['pickupCity']) || empty($_POST['apptStreetAddress']) || empty($_POST['apptCity'])
        ) {
            http_response_code(400/*Bad Request*/);
            echo json_encode(["err" => "Could not create user"]);
            die();
        }

        http_response_code(201/*created*/);
        echo json_encode($db->ride->create(
            $_POST['userID'], $_POST['apptStart'], $_POST['apptEnd'], $_POST['pickupTime'], $_POST['wheelchairVan'],
            $_POST['pickupStreetAddress'], $_POST['pickupCity'], $_POST['apptStreetAddress'], $_POST['apptCity']
        ));
        break;

    case "PUT":
        break;

    case "DELETE":
        break;
}
