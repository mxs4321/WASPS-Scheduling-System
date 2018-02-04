<?php
session_start(); // Starting Session
header('Content-Type: application/json');

include './env.php';
require_once "./model/db.class.php";
$db = new DB($host, $port, $name, $user, $pass); // From dbinfo.php

if ($_SESSION['user']) {
    echo json_encode($_SESSION['user']);
    die();
}

$_POST = json_decode(file_get_contents('php://input'), true);
if (empty($_POST['email']) || empty($_POST['password'])) {
    http_response_code(401);
    echo json_encode(["err" => "Username or password invalid"]);
    die();
}

$_SESSION['user'] = $db->attemptLogin($_POST['email'], $_POST['password']);

if (empty($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(["err" => "Username or password invalid"]);
    die();
}

echo json_encode($_SESSION['user']);
