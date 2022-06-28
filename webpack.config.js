const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    path: path.join(__dirname, '/dist'), // the bundle output path
    filename: 'bundle.js', // the name of the bundle
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html', // to import index.html file inside index.js
    }),
  ],
  devServer: {
    port: 3030, // you can change the port
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|woff|woff2|eot)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 200000,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      _components: path.resolve(__dirname, 'src', '_components'),
      _theme: path.resolve(__dirname, 'src', '_theme'),
      _types: path.resolve(__dirname, 'src', '_types'),
      _store: path.resolve(__dirname, 'src', '_store'),
      _services: path.resolve(__dirname, 'src', '_services'),
      _global: path.resolve(__dirname, 'src', '_global'),
    },
  },
};
