<?php
header('Content-Type: application/json');

include '../env.php';
require_once "../db.class.php";
$db = new DB($host, $port, $name, $user, $pass); // From dbinfo.php

switch ($_SERVER['REQUEST_METHOD']) {
    case "GET":
        if ($_GET['id']) {
            echo json_encode($db->user->findById($_GET['id']));
        } else if ($_GET['name']) {
            echo json_encode($db->user->findByName($_GET['name']));
        } else {
            echo json_encode($db->user->getPage($_GET['page'], $_GET['number_per_page']?:10));
        }
        break;

    case "POST":
        break;

    case "PUT":
        break;

    case "DELETE":
        break;
}
