<?php

use Silex\Application;
use Silex\Provider\TwigServiceProvider;
use Symfony\Component\HttpFoundation\Response;
use TwigWrapperProvider\Processors\CriticalCssProcessor;
use TwigWrapperProvider\TwigWrapperProvider;

$loader = include __DIR__ . '/../vendor/autoload.php';

$app = new Application();

$debug = true;
$cacheTtl = 3600;

$app->register(new TwigServiceProvider(), [
    'twig.path' => __DIR__ . '/views',
    'twig.options' => [
        'debug' => $debug,
    ]
]);
$app->register(new TwigWrapperProvider('twig', [new CriticalCssProcessor()]));

$app['debug'] = $debug;

$app->get('/', function () use ($app, $cacheTtl) {
    return Response::create($app['twig']->render('index.twig'));
});

$app->get('/critical', function () use ($app,$cacheTtl) {
    return Response::create($app['twig']->render('critical.twig'));
});

$app->get('/reference', function () use ($app,$cacheTtl) {
    return Response::create($app['twig']->render('reference.twig'));
});

$app->run();