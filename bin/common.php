<?php

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
