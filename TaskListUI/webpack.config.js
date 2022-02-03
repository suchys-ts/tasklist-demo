const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const packageJSON = require('./package.json');
const InterpolateHtmlPlugin = require("interpolate-html-plugin");

module.exports = {
   entry: path.join(__dirname, '/src/index.tsx'),
   output: {
       filename: 'build.js',
       path: path.join(__dirname, '/dist')
   },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [
                    // style-loader
                    { loader: 'style-loader' },
                    // css-loader
                    {
                      loader: 'css-loader',
                      // options: {
                      //   modules: true
                      // }
                    },
                    // sass-loader
                    { loader: 'sass-loader' }
                ]
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js'],
    },
    plugins: [
    new HtmlWebpackPlugin({
        title: packageJSON.name
            .split('-')
            .map(name => name.charAt(0).toUpperCase() + name.slice(1))
            .join(' '),
        version: packageJSON.version,
        template: 'public/index.html',
    }),
        new InterpolateHtmlPlugin(HtmlWebpackPlugin, process.env.raw),
    new webpack.DefinePlugin({
        'process.env.PACKAGE_NAME': JSON.stringify(packageJSON.name),
        'process.env.PACKAGE_VERSION': JSON.stringify(packageJSON.version),
    }),
  ],
 };
