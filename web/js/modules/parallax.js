/**
 * Main carousel slider
 */
(function () {
    const parallax = (function () {

        let ticking;

        /**
         * Swiper options
         */
        const options = {
            selector: '.js-parallax'
        };

        const app = {

            init: function () {
                document.querySelectorAll(options.selector).forEach(function (item) {
                    app.updatePosition(item);
                    document.addEventListener('scroll', app.tick)
                })
            },

            tick: function (element) {
                if (ticking) return;
                requestAnimationFrame(app.updatePosition);
                ticking = true;
            },

            /**
             * Fetch paralax base values
             *
             * @param element
             * @returns {{}}
             */
            transformValues: function (element) {
                const transforms = {};
                transforms.rotate = element.getAttribute('data-parallax-rotate');
                transforms.translateX = element.getAttribute('data-parallax-translateX');
                transforms.translateY = element.getAttribute('data-parallax-translateY');
                transforms.translateZ = element.getAttribute('data-parallax-translateZ');
                transforms.scale = element.getAttribute('data-parallax-scale');
                transforms.scaleX = element.getAttribute('data-parallax-scaleX');
                transforms.scaleY = element.getAttribute('data-parallax-scaleY');
                return transforms;
            },

            /**
             * Update elements positions
             *
             * @param element
             */
            updatePosition: function () {
                document.querySelectorAll(options.selector).forEach(function (element) {
                    const transformValues = app.transformValues(element);
                    const transformPrefixes = ["transform", "msTransform", "webkitTransform", "mozTransform", "oTransform"];
                    const transformProperty = getSupportedPropertyName(transformPrefixes);

                    if (transformProperty) {
                        element.style[transformProperty] = "" +
                            "rotate(" + pof(transformValues.rotate) + "deg)" +
                            "translateX(" + pof(transformValues.translateX) + "px)" +
                            "translateY(" + pof(transformValues.translateY) + "px)";
                    }

                });

                ticking = false;
            },
        }

        app.init();

    })();


    // Helpers
    /**
     * Get scroll percentage
     * @returns {number}
     */
    function getScrollPercent() {
        const h = document.documentElement,
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';
        return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
    }

    /**
     * Percentage of value
     *
     * @param value
     * @returns {number}
     */
    function pof(value){
        if (value){
            return value * getScrollPercent() / 100;
        }else{
            return 0;
        }
    }

    /**
     * Check support for css property
     *
     * @param properties
     * @returns {*}
     */
    function getSupportedPropertyName(properties) {
        for (let i = 0; i < properties.length; i++) {
            if (typeof document.body.style[properties[i]] != "undefined") {
                return properties[i];
            }
        }
        return null;
    }
}());