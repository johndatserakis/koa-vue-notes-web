// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// new BundleAnalyzerPlugin()

module.exports = {
    lintOnSave: 'error',
    configureWebpack: {
        plugins: []
    },
    productionSourceMap: false // turn off prod sourcemaps
}