'use strict';

const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', //编译模式
    entry:{
        index:'./client/app.js' //入口文件
    },
    resolve:{
        extensions: ['.js', '.vue', '.json'], //import引入时，无需写扩展名的文件
        alias: {
            'vue$': 'vue/dist/vue.esm.js' //完整版本的vue
        }
    },
    module:{
        rules:[
        {
            test:/\.js$/,
            exclude: /node_modules/,
            loader:'babel-loader' //js编译 依赖.babelrc
        },
        {
            test:/\.vue$/,
            include: [path.join(__dirname, './client/')],
            loader: 'vue-loader',
            options: {
                extractCSS: true
            }
        },
        {
            test: /\.s?[ac]ss$/,
            use: ['style-loader','css-loader','postcss-loader','sass-loader'] //postcss-loader 依赖 postcss-config.js
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader'
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader'
        }]
    },
    watch: true,
    watchOptions: { //不监听目录
        ignored: [/node_modules/ , '/static/']
    },
    output:{
        filename:'js/[name].js?v=[hash]',
        path:path.resolve(__dirname , './static/dist'),
        publicPath:'/dist/'
    },
    devtool: '#source-map',
    plugins:[
        new CleanWebpackPlugin([path.resolve(__dirname , './static')]),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: './../../server/views/index.html',
            template: path.resolve(__dirname , './client/template.html')
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};
