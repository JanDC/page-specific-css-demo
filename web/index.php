<?php

use PageSpecificCss\Twig\Extension;
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

$app['twig'] = $app->share($app->extend('twig', function (Twig_Environment $twig, $app) {
    $twig->addExtension(new Extension(__DIR__. '/css/main.css'));
    return $twig;
}
));

$app->register(new TwigWrapperProvider('twig', [new CriticalCssProcessor()]));

$app['debug'] = $debug;

$app->get('/', function () use ($app, $cacheTtl) {
    return Response::create($app['twig']->render('index.twig'));
});

$app->get('/critical', function () use ($app,$cacheTtl) {
    return Response::create($app['twigwrapper']->render('critical.twig'));
});

$app->get('/reference', function () use ($app,$cacheTtl) {
    return Response::create($app['twig']->render('reference.twig'));
});

$app->run();