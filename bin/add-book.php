<?php

global $argv;

$baseDir = dirname(__DIR__);
$name = $argv[1] ?? read_line('Please input book name to display(eg beego-doc): ');

if (!$name) {
    write_error('The book display name cannot be empty!');
}

$dir = $argv[2] ?? read_line('Please input book dir(eg my-book): ');

if (!$dir) {
    write_error('The book save dir name cannot be empty!');
}

write_msg('Save dir: ' . $baseDir . '/books/' . $dir);

$des = read_line('Please input book description message: ' . PHP_EOL);
$category = read_line('Please input book category(eg php): ');
$tags = read_line('Please input book tags(eg php,framework): ');


$book = [
    'name' => $name,
    'url' => '/books/' . $dir . '/',
    'description' => trim($des),
    'category' => $category,
    'tags' => $tags ? explode(',', $tags) : []
];

write_msg(
    "---------------------------- Book Info ----------------------------\n" .
    json_encode($book, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) .
    "\n-------------------------------------------------------------------"
);

$input = read_line('Now, will add book. Continue?[y|n] ');

if (!$input || false === stripos($input, 'y')) {
    write_msg('Bye!', true);
}

$jsonFile = $baseDir . '/books.json';
$data = json_decode(file_get_contents($jsonFile));
$data[] = $book;

if (file_put_contents($jsonFile, json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE))) {
    write_msg('OK, add new book successful!', true);
}

/**
 * helper func
 */

function read_line(string $ask) {
    echo $ask;

    return trim(fgets(\STDIN));
}

function write_msg(string $msg, bool $exit = false) {
    fwrite(STDOUT, $msg . PHP_EOL);

    if ($exit) {
        exit;
    }
}

function write_error(string $msg, bool $exit = true) {
    fwrite(STDERR, '[ERROR] ' . $msg);

    if ($exit) {
        exit -2;
    }
}
