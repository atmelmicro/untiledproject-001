module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'eslint:recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {}
}
