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

$isPhoneLogin = !empty($_POST['phone']) && !empty($_POST['password']);
$isEmailLogin = !empty($_POST['email']) && !empty($_POST['password']);

if ($isPhoneLogin) {
    $_SESSION['user'] = $db->user->attemptLogin('phone', $_POST['phone'], $_POST['password']);
} else if($isEmailLogin) {
    $_SESSION['user'] = $db->user->attemptLogin('email', $_POST['email'], $_POST['password']);
}

if (empty($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(["err" => "Username or password invalid"]);
    die();
}

echo json_encode($_SESSION['user']);
