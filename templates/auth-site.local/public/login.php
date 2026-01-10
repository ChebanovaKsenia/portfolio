<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://auth-site.local");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$input = json_decode(file_get_contents('php://input'), true);
$login = trim($input['login'] ?? '');
$identifier = trim($input['identifier'] ?? ''); // email или телефон
$password = $input['password'] ?? '';

if (!$login || !$identifier || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Все поля обязательны']);
    exit;
}

$dataFile = __DIR__ . '/users.json';
if (!file_exists($dataFile)) {
    http_response_code(401);
    echo json_encode(['error' => 'Неверные данные']);
    exit;
}

$users = json_decode(file_get_contents($dataFile), true);
$user = null;

//ищем пользователя по login + (email ИЛИ phone)
foreach ($users as $u) {
    if (
        $u['login'] === $login &&
        ($u['email'] === $identifier || $u['phone'] === $identifier)
    ) {
        $user = $u;
        break;
    }
}

if (!$user || !password_verify($password, $user['password'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Неверные данные']);
    exit;
}

//отдаём ТОЛЬКО его данные: avatar, quote, mood
echo json_encode([
    'success' => true,
    'user' => [
        'login' => $user['login'],
        'email' => $user['email'],
        'phone' => $user['phone'],
        'avatar' => $user['avatar'],
        'quote' => $user['quote'],
        'mood' => $user['mood'],
        'registered_at' => $user['registered_at']
    ]
]);
?>