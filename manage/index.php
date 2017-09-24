<?php
/**
 * simple entry
 */

$users = [
    'inhere' => 'managebooks',
];
$handlers = [
    'updateRepo' => 'update_repo',
    'createBook' => 'create_book',
];

$action = get_query('act', 'createBook');

if ($action === 'logout') {
    logout();
}

if (!$cb = $handlers[$act] ?? null) {
    $cb = $handlers['createBook'];
}

user_auth();
$cb();

function create_book()
{
   echo 'hello, create_book';
}

function update_repo()
{
    $root = dirname(__DIR__);
    $ouput = shell_exec("cd $root && git checkout . && git pull");
    echo "Update Repo:<br><pre>$ouput</pre>";
}

function user_auth()
{
    $user = $_SERVER['PHP_AUTH_USER'] ?? null;
    $pass = $_SERVER['PHP_AUTH_PW'] ?? null;

    $validated = $user && $pass && isset($users[$user]) && $users[$user] === $pass;

    if (!$validated) {
      header('WWW-Authenticate: Basic realm="My Realm"');
      header('HTTP/1.0 401 Unauthorized');
      exit("Not authorized");
    }
}

function logout()
{
    $_SERVER['PHP_AUTH_USER'] = $_SERVER['PHP_AUTH_PW'] = null;
    header('Location: /');
    exit;
}

function get_query($name, $default = null)
{
    return $_GET[$name] ?? $default;
}

function get_post($name, $default = null)
{
    return $_POST[$name] ?? $default;
}
