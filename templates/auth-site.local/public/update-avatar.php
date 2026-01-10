<?php
header("Content-Type: application/json; charset=utf-8");

$input = json_decode(file_get_contents('php://input'), true);
$login = trim($input['login'] ?? '');
$avatar = trim($input['avatar'] ?? '');

if (!$login || !$avatar) {
    http_response_code(400);
    echo json_encode(['error' => 'Данные неполны']);
    exit;
}

$dataFile = __DIR__ . '/users.json';
if (!file_exists($dataFile)) {
    http_response_code(404);
    echo json_encode(['error' => 'Пользователи не найдены']);
    exit;
}

$users = json_decode(file_get_contents($dataFile), true);
$userFound = false;

foreach ($users as &$user) {
    if ($user['login'] === $login) {
        $user['avatar'] = $avatar; // сохраняем base64 напрямую
        $userFound = true;
        break; // ОБЯЗАТЕЛЬНО выйти!
    }
}

if (!$userFound) {
    http_response_code(404);
    echo json_encode(['error' => 'Пользователь не найден']);
    exit;
}

file_put_contents($dataFile, json_encode($users, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
echo json_encode(['success' => true]);
?>