<?php
require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/preload.php';

$settings = require __DIR__ . '/settings.php';
$app = new \Slim\App($settings);

require __DIR__ . '/dependencies.php';
require __DIR__ . '/middleware.php';
require __DIR__ . '/routes.php';

$app->run();
