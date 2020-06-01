module.exports = {
  transform: {
    // ..
    '^.+\\.jsx?$': 'babel-jest',
    "^.+\\.vue$": "vue-jest"
  },
  transformIgnorePatterns: ["/node_modules/(?!(bootstrap-vue)/)"],
  // ..
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   "**/*.{js,vue}",
  //   "!**/node_modules/**",
  //   "!**/vendor/**",
  //   "!**/coverage/**",
  //   "!**/*.config.*",
  //   "!src/main.js"
  // ]
}
