<?php
require_once '../db.php';

$stmt = $pdo->query("SELECT * FROM notes ORDER BY createdAt DESC");
$notes = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($notes);
