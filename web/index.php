<?php


use PageSpecificCss\Twig\Extension;
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

$fs_prefix = file_get_contents('gs://page-specific-css-demo/web/index.php') ? 'gs://page-specific-css-demo' : '';

$app->register(new HttpCacheServiceProvider(), array(
    'http_cache.cache_dir' => $fs_prefix . '/cache/http_cache',
));

$app->register(new TwigServiceProvider(), [
    'twig.path' => [__DIR__ . '/views', __DIR__ . '/node_modules'],
    'twig.options' => [
        'debug' => $debug,
        'cache' => $fs_prefix . __DIR__ . 'cache/twig_cache'
    ]
]);

$app->register(new TwigWrapperProvider('twig', [new CriticalCssProcessor()]));

$app->extend('twig', function (Twig_Environment $twig, $app) {
    $twig->addExtension(new Extension(__DIR__ . '/css/main.css'));
    return $twig;
});


$app['debug'] = $debug;

$app->get('/', function () use ($app, $cacheTtl) {
    return Response::create($app['twig']->render('index.twig'))->setTtl($cacheTtl);
});

$app->get('/critical', function () use ($app, $cacheTtl) {
    return Response::create($app['twigwrapper']->render('critical.twig'))->setTtl($cacheTtl);
});

$app->get('/reference', function () use ($app, $cacheTtl) {
    return Response::create($app['twig']->render('reference.twig'))->setTtl($cacheTtl);
});

$app['http_cache']->run();