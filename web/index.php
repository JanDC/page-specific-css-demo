<?php

use CriticalCssProcessor\CriticalCssProcessor;
use CSSFromHTMLExtractor\Twig\Extension;
use Silex\Application;
use Silex\Provider\HttpCacheServiceProvider;
use Silex\Provider\TwigServiceProvider;
use Symfony\Component\HttpFoundation\Response;
use TwigWrapperProvider\TwigWrapperProvider;

$loader = include __DIR__ . '/../vendor/autoload.php';

$app = new Application();

$debug = true;
$cacheTtl = 24 * 3600;

$app->register(new TwigServiceProvider(), [
    'twig.path' => [__DIR__ . '/views', __DIR__],
    'twig.options' => [
        'debug' => $debug,
        'cache' => __DIR__ . '/../cache/twig_cache'
    ]
]);

$app->register(new HttpCacheServiceProvider(), ['http_cache.cache_dir' => __DIR__ . '/../cache/http_cache']);

$app->register(new TwigWrapperProvider('twig', [new CriticalCssProcessor()]));

$app->extend('twig', function (Twig_Environment $twig, $app) {
    $twig->addExtension(new Extension());
    return $twig;
});


$app['debug'] = $debug;

$app->get('/', function () use ($twigWrapper, $cacheTtl) {
    return Response::create($twigWrapper->render('index.twig'))->setTtl($cacheTtl);
});
$app->get('/without', function () use ($twigWrapper, $cacheTtl) {
    return Response::create($twigWrapper->render('without.twig'))->setTtl($cacheTtl);
});
$app->get('/with', function () use ($twigWrapper, $cacheTtl) {
    return Response::create($twigWrapper->render('with.twig'))->setTtl($cacheTtl);
});

if ($debug) {
    $app->run();
}

$app['http_cache']->run();
