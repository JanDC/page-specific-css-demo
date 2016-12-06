(function (window) {
    var menuShape = document.querySelector(".c-menu-bg");

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
        complete: function(){
            parallax();
        }
    });

}(window));