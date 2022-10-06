module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    // '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['js', 'json', 'vue'],
  testMatch: ['<rootDir>/spec/*.spec.js']
}
