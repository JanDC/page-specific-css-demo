(function (window) {
    var menuShape = document.querySelector(".c-menu-bg");
    var menuParallax = document.querySelector(".js-menu-parallax");
    var maxrotate = parseInt(20);
    var prevRotate = rotateValue();

    animate({
        el: menuShape,
        delay: 2000,
        duration: 1400,
        rotate: [15, -15],
        translateX: ["-20%", "-10%"],
        translateY: ["17%", "-17%"],
        scale: [0, 1],
        opacity: [0, 1],
        easing: "easeInOutQuint",
        complete: function(){window.addEventListener('scroll:smoother', function(){scrollMenu(menuParallax)}, false);}
    });

    function rotateValue(){
        return parseInt(maxrotate * getScrollPercent() / 100);
    }

    function scrollMenu(element) {
        console.log(rotateValue());
        animate({
            el: element,
            duration: 0,
            delay: 0,
            rotate: [prevRotate,rotateValue()],
            easing: "easeInOutQuint"
        });
        prevRotate = rotateValue();
    }
}(window));