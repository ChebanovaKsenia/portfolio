<?php
header("Content-Type: application/json; charset=utf-8");

//получаем данные
$input = json_decode(file_get_contents('php://input'), true);
$login = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$password = $input['password'] ?? '';

// Валидация
if (strlen($login) < 8) {
    http_response_code(400);
    echo json_encode(['error' => 'Логин должен быть не менее 8 символов']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Неверный email']);
    exit;
}
if (!$phone) {
    http_response_code(400);
    echo json_encode(['error' => 'Требуется номер телефона']);
    exit;
}
if (!$password || strlen($password) < 5) {
    http_response_code(400);
    echo json_encode(['error' => 'Пароль слишком короткий']);
    exit;
}

// Путь к файлу
$dataFile = __DIR__ . '/users.json';

//читаем существующих пользователей
$users = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : [];

//проверяем уникальность login и email
foreach ($users as $user) {
    if ($user['login'] === $login || $user['email'] === $email) {
        http_response_code(409);
        echo json_encode(['error' => 'Пользователь уже существует']);
        exit;
    }
}

//создаём нового пользователя с дефолтными данными
$newUser = [
    'id' => uniqid(),
    'login' => $login,
    'email' => $email,
    'phone' => $phone,
    'password' => password_hash($password, PASSWORD_DEFAULT),
    'avatar' => '/pictures/user.png',          // дефолтная аватарка
    'quote' => '«Пока нет цитаты»',            // дефолтная цитата
    'mood' => 'Нейтральное',                   // дефолтное настроение
    'registered_at' => date('Y-m-d H:i:s')
];

//добавляем в массив
$users[] = $newUser;

//сохраняем обратно в файл
file_put_contents($dataFile, json_encode($users, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

echo json_encode(['success' => true]);
?>