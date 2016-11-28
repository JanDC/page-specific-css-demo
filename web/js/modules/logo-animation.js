(function () {

    var center = function (element) {
        var values = {};
        var body = document.querySelector("body");
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        values.vertical = h / 2 - element.getBoundingClientRect().top - element.clientHeight / 2;
        values.horizontal = w / 2 - element.getBoundingClientRect().left - element.clientWidth / 2;

        return values;
    }

    var logo = document.querySelector(".c-logo");
    var all = document.querySelectorAll(".c-logo > span");
    var offsets = center(logo);
    logo.style.transform = "translate(" + offsets.horizontal + "px, " + offsets.vertical + "px)";

    animate({
        el: logo,
        delay: 1000,
        duration: 2500,
        translateX: [offsets.horizontal, 0],
        translateY: [offsets.vertical, 0],
        easing: "easeInOutQuint"
    });

    for (var i = 0, max = all.length; i < max; i++) {
        animate({
            el: all[i],
            delay: 50 * i,
            duration: 1400,
            opacity: [0, 1],
            rotateX: [-100, 0],
            scale: [0, 1],
            translateX: [i * 60, 0],
            easing: "easeInOutQuint 700"
        });
    }

    var exited = false;

    logo.addEventListener('mouseout', function () {
        exited = true;
    });

    logo.addEventListener('mouseover', function () {
        if (exited) {
            for (var i = 0, max = all.length; i < max; i++) {
                animate({
                    el: all[i],
                    delay: 50 * i,
                    duration: 200,
                    opacity: [0.6, 1],
                    easing: "easeInOutQuint 700"
                });
            }
        }
        exited = false;
    })
}(window));