const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const webpack = require('webpack');
const path = require('path');
require('dotenv').config();

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new ModuleFederationPlugin({
      name: 'container',
      filename: 'remoteEntry.js',
      exposes: {
        './CartContext': './src/CartContext',
        './CartProvider': './src/CartContext',
        './SharedCartProvider': './src/SharedCartProvider',
      },
      remotes: {
        products: 'products@http://localhost:3001/remoteEntry.js',
        productDetails: 'productDetails@http://localhost:3002/remoteEntry.js',
        cart: 'cart@http://localhost:3003/remoteEntry.js',
        checkout: 'checkout@http://localhost:3004/remoteEntry.js',
        auth: 'auth@http://localhost:3005/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
        'react-router-dom': { singleton: true, requiredVersion: '^6.22.1' },
        '@mui/material': { singleton: true, requiredVersion: '^5.15.10' },
        '@emotion/react': { singleton: true, requiredVersion: '^11.11.3' },
        '@emotion/styled': { singleton: true, requiredVersion: '^11.11.0' },
        '@react-oauth/google': { singleton: true, requiredVersion: '^0.12.1' },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}; 