const path = require('path')

function resolvePath(path) {
  return path.resolve(__dirname, path)
}

module.exports = {
  resolve: {
    alias: {
      '@': resolvePath('./src'),
      '@views': resolvePath('./src/views'),
      '@store': resolvePath('./src/store'),
      '@routes': resolvePath('./src/routes'),
      '@network': resolvePath('./src/network'),
      '@components': resolvePath('./src/components')
    }
  },
  devServer: {
    proxy: {

    }
  }
}
