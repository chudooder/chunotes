const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path')

const reactConfig = {
  entry: './src/index.tsx',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist', 'public')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    // new CopyPlugin({
    //   patterns: [
    //     { from: "static" }
    //   ]
    // })
  ]
};

const serverConfig = {
  entry: './server/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  externals: [nodeExternals()]
}

module.exports = [reactConfig, serverConfig]