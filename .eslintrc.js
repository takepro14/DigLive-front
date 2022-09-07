module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    // //の連続行を許容
    "spaced-comment": ["error", "always", { "exceptions": ["/"] }],
    // Component name "xxx" should always be multi-word
    'vue/multi-word-component-names': 0,
  }
}
