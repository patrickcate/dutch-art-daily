// const _ = require('lodash')
// Use a random port number for the mock API by default,
// to support multiple instances of Jest running
// simultaneously, like during pre-commit lint.
// process.env.MOCK_API_PORT = process.env.MOCK_API_PORT || _.random(9000, 9999)

module.exports = {
  testMatch: ['<rootDir>/__tests__/**/*.spec.js'],
  setupFiles: ['<rootDir>/tests/unit/setup'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  watchman: false,
  transform: {
    // process `*.vue` files with `vue-jest`
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest',
    '.+\\.(css|scss|jpe?g|png|gif|webp|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff2?|eot|ttf|otf)$':
      'jest-transform-stub',
  },
  transformIgnorePatterns: ['/node_modules/(?!(dom7|swiper)/).*/'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/$1',
    '^~~/(.*)$': '<rootDir>/$1',
    '^@/(.*)$': '<rootDir>/$1',
    '^@assets/(.*)$': '<rootDir>/assets/$1',
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@layouts/(.*)$': '<rootDir>/layouts/$1',
    '^@pages/(.*)$': '<rootDir>/pages/$1',
    '^@static/(.*)$': '<rootDir>/static/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
    '^@mixins/(.*)$': '<rootDir>/mixins/$1',
    '^@icons/(.*)$': '<rootDir>/assets/images/icons/$1',
    '^@images/(.*)$': '<rootDir>/images/$1',
    '^@photos/(.*)$': '<rootDir>/static/photos/$1',
    '^@fixtures/(.*)$': '<rootDir>/tests/fixtures/$1',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  coverageReporters: ['json', 'lcov', 'clover', 'html', 'text-summary'],
  coverageDirectory: '<rootDir>/_coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/layouts/**/*.vue',
    '<rootDir>/middleware/**/*.js',
    '<rootDir>/pages/**/*.vue',
    '<rootDir>/utils/**/*.js',
    // Exclusions
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/__tests__/**',
    '!**/tests/**',
    '!**/.nuxt/**',
    '!**/_coverage/**',
    '!<rootDir>/mixins/**/*.js',
    '!<rootDir>/store/**/*.js',
    '!<rootDir>/plugins/**/*.js',
    '!<rootDir>/utils/generate-*.js',
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  globals: {
    'vue-jest': {
      // Compilation errors in the <style> tags of Vue components will
      // already result in failing builds, so compiling CSS during unit
      // tests doesn't protect us from anything. It only complicates
      // and slows down our unit tests.
      experimentalCSSCompile: false,
    },
  },
}
