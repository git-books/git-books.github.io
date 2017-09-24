<?php
/**
 * simple entry
 */

class App
{
    public static $own;

    public $handlers = [
        'index' => 'index',
        'updateRepo' => 'update_repo',
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

        $this->action = $act = get_query('act', 'createBook');

        if ($this->action === 'logout') {
            logout();
        }

        if (!$cb = $this->handlers[$act] ?? null) {
            $cb = $this->handlers['index'];
        }

        $this->user = $this->userAuth();
        $cb();
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
}

(new App)->run();

function index()
{
    render_tpl('index', [
        'title' => 'Index',
        'active' => App::$own->action,
        'links' => array_keys(App::$own->handlers),
    ]);
}

function create_book()
{
    render_tpl('create_book', [
        'title' => 'create book',
        'active' => App::$own->action,
        'links' => array_keys(App::$own->handlers),
    ]);
}

function update_repo()
{
    $root = dirname(__DIR__);
    $ouput = shell_exec("cd $root && git checkout . && git pull");
    echo "Update Repo:<br><pre>$ouput</pre>";

    render_tpl('update_repo', [
        'title' => 'update repo',
        'active' => App::$own->action,
        'links' => array_keys(App::$own->handlers),
    ]);
}

/**********************************
 * helper func
 **********************************/


function render_tpl($view, array $data = [])
{
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
