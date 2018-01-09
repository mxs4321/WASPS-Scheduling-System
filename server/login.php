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

if (empty($_POST['email']) || empty($_POST['password'])) {
    echo "Username or Password is invalid";
    die();
}

$_SESSION['user'] = $db->attemptLogin($_POST['email'], $_POST['password']);

echo json_encode($_SESSION['user']);
