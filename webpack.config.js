'use strict';
/*global __dirname */
const path = require('path');
const webpack = require('webpack');

const { VueLoaderPlugin } = require('vue-loader');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlInjectPlugin = require('html-inject-plugin');

module.exports = {
    mode: 'development', //编译模式
    entry:{//入口文件
        pagea: ['core-js' ,'./client/entries/pagea.js'],
        pageb: ['core-js' ,'./client/entries/pageb.js']
    },
    resolve:{
        extensions: ['.js' , '.json'], //import引入时，无需写扩展名的文件
        alias: {
            'vue$': 'vue/dist/vue.esm.js' //完整版本的vue
        }
    },
    module:{
        rules:[{
            test:/\.js$/,
            exclude: /node_modules/,
            loader:'babel-loader', //js编译
            options: {
                presets: [['@babel/preset-env', {
                    useBuiltIns: 'entry',
                    corejs: 3
                }]],
                plugins: [require('@babel/plugin-transform-runtime')]
            }
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
            resourceQuery: /blockType=i18n/,
            loader: '@kazupon/vue-i18n-loader'
        },
        {
            test:/\.html?$/,
            loader: 'html-loader'
        },
        {
            test: /\.s?[ac]ss$/,//postcss-loader 依赖 postcss-config.js
            use: [MiniCssExtractPlugin.loader,'css-loader','postcss-loader','sass-loader'] 
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options:{
                limit:8192,
                useRelativePath:false,
                publicPath: '/dist/',
                name:'images/[name]-[hash:8].[ext]'
            }
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
        filename:'[name].js?v=[hash]',
        path:path.resolve(__dirname , './static/dist'),
        publicPath:'/dist/'
    },
    devtool: 'source-map',
    plugins:[
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                path.resolve(__dirname , './static/dist'),
                path.resolve(__dirname , './server/views')
            ]
        }),
        new VueLoaderPlugin(),
        new webpack.optimize.SplitChunksPlugin({
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '-',
            name: true,
            cacheGroups: {
                vue: {
                    test: /[\\/]node_modules[\\/]vue[\\/]/,
                    priority: -10,
                    name: 'vue'
                }
            }
        }),
        new HtmlInjectPlugin({
            filename: './../../server/views/pagea.html',
            chunks:['vue','pagea'],
            template: path.resolve(__dirname , './client/views/pagea.html')
        }),
        new HtmlInjectPlugin({
            filename: './../../server/views/pageb.html',
            chunks:['vue','pageb'],
            template: path.resolve(__dirname , './client/views/pageb.html')
        }),
        new MiniCssExtractPlugin({ //提取为外部css代码
            filename:'[name].css?v=[contenthash]'
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};