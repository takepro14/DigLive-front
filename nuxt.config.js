export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'MENs UP',
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
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  // front/plugins配下の.jsが読み込まれる
  plugins: [
    'plugins/auth',
    'plugins/axios',
    'plugins/my-inject',
    'plugins/nuxt-client-init'
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
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // Doc: https://www.npmjs.com/package/nuxt-i18n
    'nuxt-i18n'
  ],

  // front/.env読み込み
  publicRuntimeConfig: {
    appName: process.env.APP_NAME
  },

  router: {
    middleware: ['silent-refresh-token']
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // 環境変数API_URLでbaseURLは上書きされるので設定しても意味ない
    // baseURL ... サーバ=>クライアントのURL  browserBaseURL ... クライアント=>サーバのURL
    // baseURL: '/',
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

  // 追加
  vuetify: {
    // Doc: https://vuetifyjs.com/ja/features/sass-variables/#nuxt-3067306e30a430f330b930c830fc30eb
    // カスタムCSSのファイルパス
    customVariables: ['~/assets/sass/variables.scss'],
    // カスタムCSS有効化フラグ
    treeShake: true,
    theme: {
      themes: {
        light: {
          primary: '4080BE',
          info: '4FC1E9',
          success: '44D69E',
          warning: 'FEB65E',
          error: 'FB8678',
          background: 'cyan lighten-5'
          // background: 'f6f6f4'
        }
      }
    }
  },
}
