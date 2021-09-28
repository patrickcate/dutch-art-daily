import { generateRoutes } from './utils/generate-routes'
const path = require('path')
const imageminMozjpeg = require('imagemin-mozjpeg')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

module.exports = {
  target: 'static',
  debug: process.dev !== true,

  /**
   * Headers metatags for all pages.
   */
  head: {
    htmlAttrs: {
      lang: 'en-US',
    },
    title: 'Dutch Art Daily',
    meta: [
      { hid: 'charset', charset: 'utf-8' },
      {
        hid: 'mobile-web-app-capable',
        name: 'mobile-web-app-capable',
        content: 'yes',
      },
      {
        hid: 'apple-mobile-web-app-title',
        name: 'apple-mobile-web-app-title',
        content: 'DutchArtDaily',
      },
      {
        hid: 'theme-color',
        name: 'theme-color',
        content: '#1a3f68',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /**
   * Customize the progress-bar color
   */
  loading: { color: '#ffb600' },

  /**
   * Sitemap module configuration
   * (https://www.npmjs.com/package/@nuxtjs/sitemap)
   */
  sitemap: {
    hostname: 'https://dutchartdaily.com',
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date(),
      lastmodrealtime: true,
    },
  },

  /**
   * PWA options
   * (https://pwa.nuxtjs.org)
   */
  pwa: {
    icon: {
      source: './assets/images/logos/touch-icon.png',
    },
    manifest: {
      name: 'Dutch Art Daily',
      short_name: 'DutchArtDaily',
      theme_color: '#1a3f68',
      background_color: '#ffffff',
      orientation: 'portrait-primary',
      lang: 'en-US',
      categories: ['education', 'photo'],
    },
  },

  /**
   * Global CSS
   */
  css: ['@/assets/scss/global.scss'],

  router: {},

  /**
   *  Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/current-page.js', mode: 'client' },
    { src: '@/plugins/global-components.js' },
  ],

  buildModules: [
    'nuxt-babel',
    [
      'nuxt-imagemin',
      {
        plugins: [imageminMozjpeg({})],
      },
    ],
    '@nuxtjs/sitemap',
    '@nuxtjs/pwa',
  ],

  /**
   * Nuxt.js modules
   */
  modules: ['vue-screen/nuxt'],

  screen: {
    min: '320px',
    xxs: '360px',
    xs: '400px',
    sm: '600px',
    md: '700px',
    lg: '960px',
    xl: '1280px',
    breakpointsOrder: ['min', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl'],
  },
  /**
   * Nuxt hooks.
   */
  // hooks: {
  //   ready(nuxt) {
  //     console.log('Nuxt is Ready')
  //   },
  //   build: {
  //     before(nuxt, buildOptions) {},
  //     done(nuxt) {},
  //   },
  // },

  /**
   * Generate configuration
   */
  generate: {
    routes: generateRoutes(),
    fallback: true,
  },

  /**
   * Build configuration
   */
  build: {
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 },
            },
          ],
        ]
      },
    },
    extractCSS: process.env.NODE_ENV === 'production',
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(css|scss|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },

    plugins: [
      new SpriteLoaderPlugin({
        spriteAttrs: {
          version: '1.1',
        },
      }),
    ],
    loaders: {
      imgUrl: {
        limit: 500,
      },
    },
    postcss: {
      // Add plugin names as key and arguments as value
      // Install them before as dependencies with npm or yarn
      plugins: {
        // Disable a plugin by passing false as value
        'postcss-easing-gradients': {},
      },
    },
    transpile: ['dom7', 'ssr-window', 'swiper', 'vue-screen'],

    /**
     * You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        // ESLint loader.
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }

      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }

      // Excludes /assets/svg from url-loader
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
      svgRule.test = /\.(png|jpe?g|gif|webp)$/

      // Once url-loader doesn't deal anymore
      // with svg files we can make svg-sprite-loader
      // and svgo-loader to deal with them.
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: 'icons-[hash:7].svg',
            },
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [{ removeViewbox: false }],
            },
          },
        ],
      })

      // Define custom Webpack path aliases.
      const projectSrc = process.cwd()
      const pathAliases = [
        {
          alias: '@assets',
          path: 'assets',
        },
        {
          alias: '@components',
          path: 'components',
        },
        {
          alias: '@static',
          path: 'static',
        },
        {
          alias: '@theme',
          path: 'assets/scss/_partials/1-tools/_import.scss',
        },
        {
          alias: '@utils',
          path: 'utils',
        },
        {
          alias: '@mixins',
          path: 'mixins',
        },
        {
          alias: '@icons',
          path: 'assets/images/icons',
        },
        {
          alias: '@images',
          path: 'assets/images',
        },
        {
          alias: '@photos',
          path: 'static/photos',
        },
      ]

      config.resolve.alias['@src'] = path.join(projectSrc)

      // Loop through custom aliases and register them with Webpack.
      pathAliases.forEach(item => {
        config.resolve.alias[item.alias] = path.join(projectSrc, item.path)
      })
    },
  },
}
