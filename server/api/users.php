<?php
header('Content-Type: application/json');

include '../env.php';
require_once "../model/db.class.php";
$db = new DB($host, $port, $name, $user, $pass); // From dbinfo.php

switch ($_SERVER['REQUEST_METHOD']) {
    case "GET":
        if ($_GET['id']) {
            echo json_encode($db->getUser($_GET['id']));
        } else {
            echo json_encode($db->getUsers($_GET['page'], $_GET['number_per_page']?:10));
        }
        break;

    case "POST":
        echo json_encode($db->getUsers($_GET['page'], $_GET['number_per_page']?:10));
        break;

    case "PUT":
        break;

    case "DELETE":
        break;
}
