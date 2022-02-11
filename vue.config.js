process.env.NODE_ENV === 'production'
module.exports = {
  // options...
  publicPath: process.env.NODE_ENV === 'production'? '/istevue/': '/',
  // publicPath: '', // web.zdc.com.tr icin
  // devServer: {
  //     proxy: 'https://gunkaysanalmarket.zdc.com.tr/fonksiyon.php',
  // }
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  pwa: {
    // runtimeCompiler: true,
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js"
    }
  }
}
