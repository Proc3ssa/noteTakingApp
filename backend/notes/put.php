<?php
require_once __DIR__ . '/../db.php';


$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['id'], $data['title'], $data['content'], $data['createdAt'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$sql = "REPLACE INTO notes (id, title, content, tag, isArchived, createdAt) 
        VALUES (:id, :title, :content, :tag, :isArchived, :createdAt)";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':id' => $data['id'],
    ':title' => $data['title'],
    ':content' => $data['content'],
    ':tag' => $data['tag'] ?? null,
    ':isArchived' => $data['isArchived'] ? 1 : 0,
    ':createdAt' => date('Y-m-d H:i:s', strtotime($data['createdAt']))
]);

echo json_encode(['message' => 'Note saved']);
