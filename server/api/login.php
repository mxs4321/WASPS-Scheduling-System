<?php
session_start(); // Starting Session
header('Content-Type: application/json');
require_once "../db.class.php";
$db = new DB();

if (isset($_SESSION['user'])) {
    echo json_encode($_SESSION['user']);
    die();
}

$_POST = json_decode(file_get_contents('php://input'), true);
$isPhoneLogin = isset($_POST['phone']) && isset($_POST['password']);
$isEmailLogin = isset($_POST['email']) && isset($_POST['password']);

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

http_response_code(201);
echo json_encode($_SESSION['user']);
