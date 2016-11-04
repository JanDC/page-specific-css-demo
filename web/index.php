<?php

use Silex\Application;

$loader = include __DIR__ . '../vendor/autoload.php';

$app = new Application();


$app->get('/', function () use ($app) {
    return 'index';
});

$app->get('/critical', function () use ($app) {
    return 'processed';
});

$app->get('/reference', function () use ($app) {
    return 'reference';
});

$app->run();