<?php
session_start();

//Инициализация сессии
if (!isset($_SESSION['secret_number'])) {
    $_SESSION['secret_number'] = rand(1, 100);
    $_SESSION['history'] = [];
}

//Обработка POST-запросов
$message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    
    if ($action === 'guess') {
        $userGuess = (int)($_POST['guess'] ?? 0);
        $secret = $_SESSION['secret_number'];
        
        if ($userGuess === $secret) {
            $message = "Поздравляем! Вы угадали число $secret!";
            $_SESSION['history'] = []; //сброс истории
            $_SESSION['secret_number'] = rand(1, 100); //новое число
        } else {
            $hint = $userGuess < $secret ? "Больше" : "Меньше";
            $_SESSION['history'][] = [
                'guess' => $userGuess,
                'hint' => $hint
            ];
        }
    } elseif ($action === 'give_up') {
        $message = "Вы сдались. Загаданное число было: " . $_SESSION['secret_number'] . " . Попробуйте снова!";
        $_SESSION['history'] = [];
        $_SESSION['secret_number'] = rand(1, 100);
    }
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Угадай число</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main class="game-container">
        <h1>Угадай число от 1 до 100</h1>
        
        <?php if ($message): ?>
            <div class="message"><?= htmlspecialchars($message) ?></div>
        <?php endif; ?>

        <form method="POST" class="game-form">
            <input type="number" name="guess" min="1" max="100" placeholder="Введите число" required>
            <button type="submit" name="action" value="guess">Попробовать угадать</button>
            <button type="submit" name="action" value="give_up" class="btn-surrender">Сдаться</button>
        </form>

        <?php if (!empty($_SESSION['history'])): ?>
            <table class="history-table">
                <thead>
                    <tr>
                        <th>Ваше число</th>
                        <th>Подсказка</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($_SESSION['history'] as $row): ?>
                        <tr>
                            <td><?= htmlspecialchars($row['guess']) ?></td>
                            <td><?= htmlspecialchars($row['hint']) ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </main>
</body>
</html>