<?php
session_start();
if (session_destroy()) // Destroying All Sessions
{
    http_response_code(200);
    echo json_encode(["status" => "success"]);
    die();
}
?>