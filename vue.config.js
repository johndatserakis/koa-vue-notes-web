// Turn this on and add to plugins to analyze your bundle
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// new BundleAnalyzerPlugin()

module.exports = {
  devServer: {
    clientLogLevel: "info"
  },
  lintOnSave: "error",
  configureWebpack: {
    plugins: []
  },
  productionSourceMap: false // turn off prod sourcemaps
};
