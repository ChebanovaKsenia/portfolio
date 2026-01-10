<?php
header("Content-Type: application/json; charset=utf-8");

$input = json_decode(file_get_contents('php://input'), true);
$login = trim($input['login'] ?? '');
$quote = trim($input['quote'] ?? '');
$mood = trim($input['mood'] ?? '');
$phone = trim($input['phone'] ?? '');

if (!$login) {
    http_response_code(400);
    echo json_encode(['error' => 'Логин обязателен']);
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

//находим пользователя по login и обновляем !!его!! данные
foreach ($users as &$user) {
    if ($user['login'] === $login) {
        // Обновляем только если поле не пустое
        if ($quote !== '') {
            $user['quote'] = '«' . $quote . '»';
        }
        if ($mood !== '') {
            $user['mood'] = $mood;
        }
        if ($phone !== '') {
            $user['phone'] = $phone;
        }
        $userFound = true;
        break; //выйти после нахождения
    }
}

if (!$userFound) {
    http_response_code(404);
    echo json_encode(['error' => 'Пользователь не найден']);
    exit;
}

// Перезаписываем ВЕСЬ файл
file_put_contents($dataFile, json_encode($users, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
echo json_encode(['success' => true]);
?>