var logoAnimation = (function () {
    var all = document.querySelectorAll(".c-logo > span");

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

    var logo = document.querySelector(".c-logo");
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
            exited = false;
        }
    })
})();