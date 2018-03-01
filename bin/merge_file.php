<?php

global $argv;

unset($argv[0]);

if (!$argv) {
    exit("please input want to merged files\n");
}

$basePath = dirname(__DIR__) . '/';
