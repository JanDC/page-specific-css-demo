<?php

use Silex\Application;
use Silex\Provider\HttpCacheServiceProvider;
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
        'cache' => __DIR__ . '/../cache/twig_cache/',
    ]
]);
$app->register(new TwigWrapperProvider('twig', [new CriticalCssProcessor()]));

$app->register(new HttpCacheServiceProvider(), array(
    'http_cache.cache_dir' => __DIR__ . '/../cache/http_cache/',
));

$app['debug'] = $debug;

$app->get('/', function () use ($app, $cacheTtl) {
    return Response::create($app['twig']->render('index.twig'))->setTtl($cacheTtl);
});

$app->get('/critical', function () use ($app,$cacheTtl) {
    return Response::create($app['twig']->render('critical.twig'))->setTtl($cacheTtl);
});

$app->get('/reference', function () use ($app,$cacheTtl) {
    return Response::create($app['twig']->render('reference.twig'))->setTtl($cacheTtl);
});

$app['http_cache']->run();
