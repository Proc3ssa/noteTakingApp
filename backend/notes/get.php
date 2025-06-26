<?php
require_once __DIR__ . '/../db.php';

$tag = isset($_GET['tag']) ? $_GET['tag'] : 'All';
$searchTerm = isset($_GET['searchTerm']) ? $_GET['searchTerm'] : '';

$sql = "SELECT * FROM notes";
$where = [];
if ($tag !== 'All') {
    $where[] = "tag = :tag";
}
if ($searchTerm !== '') {
    $where[] = "(title LIKE :searchTerm OR content LIKE :searchTerm)";
}

if (!empty($where)) {
    $sql .= " WHERE " . implode(' AND ', $where);
}
$sql .= " ORDER BY createdAt DESC";

$stmt = $pdo->prepare($sql);
if ($tag !== 'All') {
    $stmt->bindValue(':tag', $tag);
}
if ($searchTerm !== '') {
    $stmt->bindValue(':searchTerm', '%' . $searchTerm . '%');
}
$stmt->execute();
$notes = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($notes);
