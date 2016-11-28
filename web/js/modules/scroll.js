(function (global) {
    'use strict';
    // (C) Andrea Giammarchi @WebReflection
    // https://gist.github.com/WebReflection/ea3e833b4de07d877479
    var
        tick = false,
        rAF = global.requestAnimationFrame ||
            global.webkitRequestAnimationFrame ||
            global.mozRequestAnimationFrame ||
            global.msRequestAnimationFrame ||
            global.oRequestAnimationFrame ||
            function (cb) {
                setTimeout(cb, 1000 / 60);
            },
        CE = global.CustomEvent ||
            function (type) {
                var e = document.createEvent('Event');
                e.initEvent(type, true, true);
                return e;
            }
        ;

    function lessGreedyScroll() {
        if (!tick) {
            tick = !tick;
            requestAnimationFrame(scroll);
        }
    }

    function scroll() {
        window.dispatchEvent(new CE('scroll:smoother'));
        tick = !tick;
    }

    global.addEventListener('mousewheel', lessGreedyScroll, true);
    global.addEventListener('scroll', lessGreedyScroll, true);

}(window));

/**
 * Get scroll percentage
 * @returns {number}
 */
function getScrollPercent() {
    var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
}