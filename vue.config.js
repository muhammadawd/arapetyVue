/*=========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------

==========================================================================================*/


module.exports = {
  publicPath: '/~approctest/arapety/front/',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
}

