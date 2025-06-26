<?php
require_once __DIR__ . '/../db.php';

$input = json_decode(file_get_contents('php://input'), true);

$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

if (!$email || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Email and password are required']);
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    echo json_encode([
        'id' => $user['id'],
        'username' => $user['username'],
        'email' => $user['email'],
        'token' => $user['token']
    ]);
} else {
    http_response_code(401);
    echo json_encode(['error' => 'Invalid email or password']);
}
