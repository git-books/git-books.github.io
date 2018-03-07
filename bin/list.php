<?php

require __DIR__ . '/common.php';

$baseDir = dirname(__DIR__);
$jsonFile = $baseDir . '/books.json';
$data = json_decode(file_get_contents($jsonFile), true);
$total = count($data);

echo "Books(total $total): \n";

foreach ($data as $book) {
    echo '- ' . $book['name'] . PHP_EOL;
}

exit;
