<?php
require_once '../db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'], $data['username'], $data['email'], $data['password'], $data['token'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing fields']);
    exit;
}

$sql = "REPLACE INTO users (id, username, email, password, token) 
        VALUES (:id, :username, :email, :password, :token)";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':id' => $data['id'],
    ':username' => $data['username'],
    ':email' => $data['email'],
    ':password' => password_hash($data['password'], PASSWORD_DEFAULT),
    ':token' => $data['token']
]);

echo json_encode(['message' => 'User saved']);
