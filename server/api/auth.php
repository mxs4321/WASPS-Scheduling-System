<?php
session_start(); // Starting Session
header('Content-Type: application/json');
require_once "../db.class.php";
$db = new DB();

switch ($_SERVER['REQUEST_METHOD']) {
    case "GET":
        if (isset($_SESSION['user'])) {
            echo json_encode($_SESSION['user']);
            http_response_code(200);
            die();
        } else {
            http_response_code(403);
            die();
        }
        break;
    case "POST":
        $postBody = json_decode(file_get_contents('php://input'), true);
        $isPhoneLogin = isset($postBody['phone']) && isset($postBody['password']);
        $isEmailLogin = isset($postBody['email']) && isset($postBody['password']);

        if ($isPhoneLogin) {
            $_SESSION['user'] = $db->user->attemptLogin('phone', $postBody['phone'], $postBody['password']);
        } else if ($isEmailLogin) {
            $_SESSION['user'] = $db->user->attemptLogin('email', $postBody['email'], $postBody['password']);
        }

        if (empty($_SESSION['user'])) {
            http_response_code(401);
            echo json_encode(["err" => "Username or password invalid"]);
            die();
        }

        http_response_code(201);
        echo json_encode($_SESSION['user']);
        die();
        break;
    case "DELETE":
        if (isset($_SESSION['user']) && session_destroy()) // Destroying All Sessions
        {
            http_response_code(202/*deleted*/);
            echo json_encode(["status" => "success"]);
            die();
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Failed to log out"]);
            die();
        }
        break;

    default:
        http_response_code(405);
        die();
        break;
}
