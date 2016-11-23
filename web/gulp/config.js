/**
 * Config file
 */
var path = './';
var styleguidePath = path + 'styleguide/';
var domain = 'replaceme.dev';

module.exports = {

  /**
   * Scss settings
   */
  scss: {
    src: path + 'src/main.scss',
    glob: path + 'src/**/*.scss',
    settings: {
      outputStyle: 'expanded'
    },
    dest: path + 'css/',
    prefix: [
      'last 2 version',
      '> 1%',
      'ie 8',
      'ie 9',
      'ios 6',
      'android 4'
    ],
    lint: {
      "rules": {
        "block-no-empty": true,
        "color-no-invalid-hex": true,
        "declaration-colon-space-after": "always",
        "declaration-colon-space-before": "never",
        "function-comma-space-after": "always",
        "function-url-quotes": "always",
        "media-feature-colon-space-after": "always",
        "media-feature-colon-space-before": "never",
        "media-feature-name-no-vendor-prefix": true,
        "max-empty-lines": 2,
        "number-leading-zero": "never",
        "number-no-trailing-zeros": true,
        "property-no-vendor-prefix": true,
        "declaration-block-no-duplicate-properties": true,
        "block-no-single-line": true,
        "declaration-block-no-shorthand-property-overrides": true,
        "selector-list-comma-newline-after": "always-multi-line",
        "selector-no-id": true,
        "string-quotes": "double",
        "value-no-vendor-prefix": true,
        "function-linear-gradient-no-nonstandard-direction": true,
        "selector-no-universal": true,
        "indentation": 2,
        "max-nesting-depth": [2, {"ignore": ["at-rules-without-declaration-blocks"]}]
      }
    }
  },

  /**
   * SVG settings
   */
  svg: {
    svgsprite: {
      src: path + 'images/src/svg/sprite/**/*.svg',
      dest: path + 'images/dest/svg/sprite/',
      settings: {
        shape: {
          spacing: {
            padding: 0
          },
          dest: 'individual'
        },
        mode: {
          view: {
            bust: false,
            render: {
              scss: true
            }
          },
          symbol: true
        }
      }
    },
    src: path + 'images/src/svg/**/*.svg'
  },

  /**
   * BrowserSync settings
   */
  browsersync: {
    proxy: domain,
    notify: false
  },

  /**
   * Styleguide settings
   */
  styleguide: {
    path: styleguidePath,
    files: [styleguidePath + '**/*.html', styleguidePath + '**/*.liquid', '!' + styleguidePath + '_site/**/*'],
    dest: styleguidePath + 'css/',
    jekyllDest: styleguidePath + '_site/css/',
    scss: {
      src: styleguidePath + 'src/**/*.scss',
      settings: {
        outputStyle: 'compressed'
      },
      dest: styleguidePath + 'css/'
    }
  }
};
