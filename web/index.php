<?php

use Silex\Application;
use Silex\Provider\HttpCacheServiceProvider;
use Silex\Provider\TwigServiceProvider;
use TwigWrapperProvider\Processors\CriticalCssProcessor;
use TwigWrapperProvider\TwigWrapperProvider;

$loader = include __DIR__ . '/../vendor/autoload.php';

$app = new Application();

$debug=true;

$app->register(new TwigServiceProvider(), [
    'twig.path' => __DIR__.'/views',
    'twig.options' => [
        'debug'=> $debug,
        'cache' => __DIR__.'/../cache/twig_cache/',
    ]
]);
$app->register(new TwigWrapperProvider('twig', [new CriticalCssProcessor()]));

$app->register(new HttpCacheServiceProvider(), array(
    'http_cache.cache_dir' => __DIR__.'/../cache/http_cache/',
));

$app['debug'] = $debug;

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