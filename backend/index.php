<?php
header("Content-Type: application/json");

$uri = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

switch ($uri[1]) {
    case 'notes':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            require 'notes/get.php';
        } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
            require 'notes/put.php';
        }
        break;

    case 'users':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            require 'users/register.php';
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(["message" => "Route not found"]);
}
