import { generateRoutes } from './utils/generate-routes'
const imageminMozjpeg = require('imagemin-mozjpeg')
const path = require('path')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const pkg = require('./package')

module.exports = {
  mode: 'universal',
  debug: process.dev !== true,
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    title: 'Dutch Art Daily',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: 'transparent' },

  /*
   ** Sitemap module configuration
   ** (https://www.npmjs.com/package/@nuxtjs/sitemap)
   */
  sitemap: {
    hostname: 'https://www.dutchartdaily.com',
    defaults: {
      changefreq: 'monthly',
      priority: 1,
      lastmod: new Date(),
      lastmodrealtime: true,
    },
  },

  /*
   ** Global CSS
   */
  css: ['@/assets/scss/global.scss'],

  router: {
    // middleware: 'current-page',
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/current-page.js', mode: 'client' },
    { src: '@/plugins/vue-screen.client.js', mode: 'client' },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      'nuxt-imagemin',
      {
        plugins: [imageminMozjpeg({})],
      },
    ],
    '@nuxtjs/sitemap',
  ],

  /*
   ** Nuxt hooks.
   */
  hooks: {
    ready(nuxt) {
      // console.log('Nuxt is Ready')
    },
    build: {
      before(nuxt, buildOptions) {},
      done(nuxt) {},
    },
  },

  /*
   ** Generate configuration
   */
  generate: {
    routes: generateRoutes(),
  },

  /*
   ** Build configuration
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
    /*
     ** You can extend webpack config here
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
