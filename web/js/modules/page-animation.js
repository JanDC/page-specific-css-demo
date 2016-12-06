(function (window) {
    const menuItem = document.querySelectorAll(".c-menu li a");
    const menuShape = document.querySelector(".c-menu-bg");

    menuItem.forEach(function(item){
        item.addEventListener('click', function (e) {
            e.preventDefault();

            console.log(menuShape.getBoundingClientRect().height);

            const params = parallax.getParams(0);
            console.log(params);
        })
    })


}(window));