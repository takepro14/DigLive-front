export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'DigLive',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' },
    ],
    script: [
      { src: 'https://www.youtube.com/iframe_api', defer: true }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/auth' },
    { src: '~/plugins/axios' },
    { src: '~/plugins/moment' },
    { src: '~/plugins/my-inject' },
    { src: '~/plugins/nuxt-client-init' },
    { src: '~/plugins/vue-tags-input.js', ssr: false },
    { src: '~/plugins/vue-infinite-loading.js', ssr: false },
    { src: '~/plugins/lodash.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  components: {
    dirs: [
      '~/components/atoms',
      '~/components/molecules',
      '~/components/organisms',
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // Doc: https://vuetifyjs.com/ja/getting-started/installation/#nuxt-3067306e30a430f330b930c830fc30eb
    '@nuxtjs/vuetify',
    '@nuxtjs/moment'
  ],

  moment: {
    locales: ['ja']
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // Doc: https://www.npmjs.com/package/nuxt-i18n
    'nuxt-i18n',
    'nuxt-webfontloader'
  ],
  webfontloader: {
    google: {
      families: ['Audiowide']
    },
  },

  // Doc: https://nuxtjs.org/ja/docs/configuration-glossary/configuration-runtime-config#publicruntimeconfig
  publicRuntimeConfig: {
    appName: process.env.APP_NAME
  },

  router: {
    middleware: ['silent-refresh-token']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // 発行するAPIリクエストのベースURL(baseURL + /api/v1/...)
    baseURL: process.env.API_URL,
    // クロスドメインで認証情報を共有する
    credentials: true
  },

  i18n: {
    locales: ['ja', 'en'],
    defaultLocale: 'ja',
    // Doc: https://kazupon.github.io/vue-i18n/api/#properties
    // no_prefix => ルート名に__jaを追加しない
    strategy: 'no_prefix',
    vueI18n: {
      fallbackLocale: 'ja',
      // // i18nの警告を完全に表示しない
      // silentTranslationWarn: true,
      silentFallbackWarn: true,
      messages: {
        ja: require('./locales/ja.json'),
        en: require('./locales/en.json')
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  vuetify: {
    // Custom CSS: https://vuetifyjs.com/ja/features/sass-variables/#nuxt-3067306e30a430f330b930c830fc30eb
    // customVariables: ['~/assets/sass/variables.scss'],
    // treeShake: true,
    theme: {
      themes: {
        light: {
          header: "4D4C7D",
          subheader: "827397",
          button: "F57C00",
          primary: '4080BE',
          info: '4FC1E9',
          success: '44D69E',
          warning: 'FEB65E',
          error: 'FB8678',
          genre: 'E8EAF6',
          tag: 'FFF8E1',
          loader: 'E0E0E0',
          slider: 'FFFF00'
        }
      }
    }
  },
}
