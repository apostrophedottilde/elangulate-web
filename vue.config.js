const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    publicPath: '',
    devServer: {
        public: '0.0.0.0:8080'
    },
    configureWebpack: {
        plugins: [
            new CopyPlugin([
              { from: './C', to: '.' },
            ]),
          ],
    }
}