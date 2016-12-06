/**
 * Main carousel slider
 */
(function ($) {
    window.parallax = function () {

        let ticking;
        let instance = 0;
        let params = [];

        /**
         * Swiper options
         */
        const options = {
            selector: '.js-parallax'
        };

        const app = {

            init: function () {
                document.querySelectorAll(options.selector).forEach(function (item) {
                    item.setAttribute('data-parallax-instance', instance);
                    item.classList.add('is-parallaxing');

                    params.push({});

                    app.updatePosition(item);
                    document.addEventListener('scroll', function () {
                        app.tick(item);
                    });
                    instance++;
                })
            },

            getParams: function (id) {
                return params[id];
            },

            destroy: function () {
                document.removeEventListener('scroll', app.tick);
                return 'removed parallax';
            },

            tick: function (element) {
                if (ticking) return;
                window.requestAnimationFrame(function () {
                    app.updatePosition(element)
                });
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
            updatePosition: function (item) {
                const instance = item.getAttribute('data-parallax-instance');
                let localParams = app.getParams(instance);
                const transformValues = app.transformValues(item);
                const transformPrefixes = ["transform", "msTransform", "webkitTransform", "mozTransform", "oTransform"];
                const transformProperty = getSupportedPropertyName(transformPrefixes);

                if (transformProperty) {

                    localParams.rotate = pof(transformValues.rotate);
                    localParams.translateX = pof(transformValues.translateX);
                    localParams.translateY = pof(transformValues.translateX);

                    item.style[transformProperty] = "" +
                        "rotate(" + (pof(transformValues.rotate) - 15) + "deg)" +
                        "translateX(" + (pof(transformValues.translateX) - 10) + "%)" +
                        "translateY(" + (pof(transformValues.translateY) - 17) + "%)";
                }

                ticking = false;
            },
        }

        app.init();

        return app;

    };

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
    function pof(value) {
        if (value) {
            return value * getScrollPercent() / 100;
        } else {
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

}(jQuery));