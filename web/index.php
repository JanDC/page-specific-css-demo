<?php

use Silex\Application;

$loader = include __DIR__ . '/../vendor/autoload.php';

$app = new Application();
$app['debug'] = true;

$app->get('/', function () use ($app) {
    return $app['twig']->render('index.twig');
});

$app->get('/critical', function () use ($app) {
    return $app['twig']->render('critical.twig');
});

$app->get('/reference', function () use ($app) {
    return $app['twig']->render('reference.twig');
});

$app->run();