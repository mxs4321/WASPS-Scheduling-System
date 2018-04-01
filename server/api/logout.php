<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405/*Method not allowed*/);
    die();
}
if (session_destroy()) // Destroying All Sessions
{
    http_response_code(202/*deleted*/);
    echo json_encode(["status" => "success"]);
    die();
}
