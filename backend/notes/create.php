<?php
require_once __DIR__ . '/../db.php';
header('Content-Type: application/json');

// Parse JSON body
$body = json_decode(file_get_contents('php://input'), true);

// Validate input
if (
    !isset($body['title']) ||
    !isset($body['content']) ||
    !isset($body['isArchived']) ||
    !isset($body['createdAt'])
) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

// Optional tag
$tag = $body['tag'] ?? null;

// Prepare insert query
$stmt = $pdo->prepare("
    INSERT INTO notes (id, title, content, isArchived, tag, createdAt)
    VALUES (NULL, :title, :content, :isArchived, :tag, :createdAt)
");

$stmt->execute([
    ':title' => $body['title'],
    ':content' => $body['content'],
    ':isArchived' => (int) $body['isArchived'],
    ':tag' => $tag,
    ':createdAt' => $body['createdAt']
]);

// Get the ID of the newly created note
$noteId = $pdo->lastInsertId();

// Return the new note's ID
echo json_encode(['id' => $noteId, 'message' => 'Note created successfully', 'success' => true]);