<?php
$container = $app->getContainer();

$container['renderer'] = function($c) {
    $settings = $c->get('settings')['renderer'];
    return new Slim\Views\PhpRenderer($settings['template_path']);
};

$container['logger'] = function($c) {
    $settings = $c->get('settings')['logger'];
    $logger = new Monolog\Logger($settings['name']);
    $logger->pushProcessor(new Monolog\Processor\UidProcessor());
    $logger->pushHandler(new Monolog\Handler\StreamHandler($settings['path'], $settings['level']));
    return $logger;
};

$container['session'] = function($c) {
    $settings = $c->get('settings')['session'];
    return new Moz\Session($settings);
};

$container['user'] = function($c) {
    if ($c->session->has('userId')) {
        $user = Moz\UserQuery::create()->findPK($c->session->userId);
        return new WebUser($user, $c->session);
    }
    return new WebUser(new Moz\User(), $c->session);
};
