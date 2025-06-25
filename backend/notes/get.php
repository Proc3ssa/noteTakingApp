<?php
require_once __DIR__ . '/../auth/middleware.php';
header('Content-Type: application/json');

authenticateToken(); // 🔒 Protect this route

require_once __DIR__ . '/../db.php';

$stmt = $pdo->query("SELECT * FROM notes ORDER BY createdAt DESC");
$notes = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($notes);
