<?php
header('Content-Type: application/json; charset=utf-8');

//подключение к БД
$host = 'localhost'; $db = 'your_db_name'; $user = 'your_db_user'; $pass = 'your_db_password';
$charset = 'utf8mb4';
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC];
try { $pdo = new PDO($dsn, $user, $pass, $options); } catch (PDOException $e) { echo json_encode(['success' => false]); exit; }

$data = json_decode(file_get_contents('php://input'), true);
$login = $data['login'] ?? '';
$oldPassword = $data['oldPassword'] ?? '';

if (!$login || !$oldPassword) {
    echo json_encode(['success' => false]);
    exit;
}

$stmt = $pdo->prepare("SELECT password FROM users WHERE login = ?");
$stmt->execute([$login]);
$user = $stmt->fetch();

if (!$user || !password_verify($oldPassword, $user['password'])) {
    echo json_encode(['success' => false]);
    exit;
}

echo json_encode(['success' => true]);
?>