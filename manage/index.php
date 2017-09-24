<?php
/**
 * simple entry
 */

class App
{
    public static $own;

    public $handlers = [
        'index' => 'index',
        'checkRepo' => 'check_repo',
        'createBook' => 'create_book',
    ];

    private $basePath;

    public $config = [
        'users' => null,
    ];

    public $action;

    public $user;

    public function __construct()
    {
        self::$own = $this;
    }

    public function loadConfig()
    {
        $this->basePath = dirname(__DIR__);
        $file = $this->basePath . '/.local';

        if (!is_file($file)) {
            self::stop('No auth data source config.');
        }

        $this->config = parse_ini_file($file, true);

        if (empty($this->config['users'])) {
            self::stop('No auth data source.');
        }
    }

    public function run()
    {
        $this->loadConfig();

        $this->action = $act = get_query('act', 'index');

        if ($this->action === 'logout') {
            $this->logout();
        }

        if (!$cb = $this->handlers[$act] ?? null) {
            $cb = $this->handlers['index'];
        }

        $msg = 0;

        try {
            $this->user = $this->userAuth();
            $cb();
        } catch (\Throwable $e) {
            $msg = $e->getMessage();
        }

        self::stop();
    }

    public static function stop($msg=0)
    {
        exit($msg);
    }

    public function userAuth()
    {
        $users = $this->config['users'];
        $user = $_SERVER['PHP_AUTH_USER'] ?? null;
        $pass = $_SERVER['PHP_AUTH_PW'] ?? null;

        $validated = $user && $pass && isset($users[$user]) && $users[$user] === $pass;

        if (!$validated) {
          header('WWW-Authenticate: Basic realm="My Realm"');
          header('HTTP/1.0 401 Unauthorized');
          self::stop("Not authorized");
        }

        return [
            'user' => $user,
            'pass' => $pass,
        ];
    }

    public function logout()
    {
        $_SERVER['PHP_AUTH_USER'] = $_SERVER['PHP_AUTH_PW'] = null;
        header('Location: /');
        self::stop();
    }

    public function getBasePath()
    {
        return $this->basePath;
    }
}

(new App)->run();

function index()
{
    $data = [
        'title' => 'create book',
        'action' => App::$own->action,
        'error' => '',
    ];

    render_tpl('index', $data);
}

function create_book()
{
    $isPost = false;
    $data = [
        'title' => 'create book',
        'action' => App::$own->action,
        'error' => '',
    ];

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $isPost = true;
        $data['folder'] = trim(get_post('folder'));
        $data['config'] = trim(get_post('config'));

        if (!$data['folder'] || !$data['config']) {
            $data['error'] = 'the book folder name and config cannot be empty!';
        } else {
            $booksConfig = file_get_contents(App::$own->getBasePath() . '/books.js');
        }

    } else {
        $data['folder'] = '';
        $data['config'] = file_get_contents(__DIR__ . '/config.exam.js');
    }

    $data['isPost'] = $isPost;

    render_tpl('create_book', $data);
}

function check_repo()
{
    $data = [
        'title' => 'check repo',
        'action' => App::$own->action,
        'error' => '',
        'commands' => ['log', 'status', 'pull'],
    ];
    $root = App::$own->getBasePath();
    $cmd = $data['cmd'] = get_query('cmd', 'status');

    switch ($cmd) {
        case 'log':
            $output = shell_exec("cd $root && git log -3");
            break;

        case 'status':
            $output = shell_exec("cd $root && git status");
            break;

        case 'pull':
            $output = shell_exec("cd $root && git checkout . && git pull");
            break;

        default:
            $output = 'Invalid command ' . $cmd;
            break;
    }

    $data['output'] = $output;

    render_tpl('check_repo', $data);
}

/**********************************
 * helper func
 **********************************/


function render_tpl($view, array $data = [])
{
    $viewFile = __DIR__ . '/views/' . $view . '.tpl';

    if (!is_file($viewFile)) {
        throw new \InvalidArgumentException("The view [$view] file is not eixsts");
    }

    header('Content-Type: text/html; charset=UTF-8');
    extract($data, EXTR_OVERWRITE);

    ob_start();
    include __DIR__ . '/views/_layout.tpl';
    $res = ob_get_clean();

    ob_start();
    include __DIR__ . '/views/' . $view . '.tpl';
    $content = ob_get_clean();

    echo str_replace('{_CONTENT_}', $content, $res);
}

function get_query($name, $default = null)
{
    return $_GET[$name] ?? $default;
}

function get_post($name, $default = null)
{
    return $_POST[$name] ?? $default;
}
