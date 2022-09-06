const { defineConfig } = require('@vue/cli-service')
const { resolve } = require('path')
const cpns = resolve(__dirname, 'src/components')
const views = resolve(__dirname, 'src/views')

module.exports = defineConfig({
  transpileDependencies: true,
  // 配置开发服务器, 路径别名
  configureWebpack: {
    devServer: {
      open: true,
      port: 8888,
      host: 'localhost'
    },
    resolve: {
      alias: {
        cpns,
        views
      }
    }
  }
})
