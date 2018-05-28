'use strict';

const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development', //编译模式
    entry:{//入口文件
        pagea:'./client/pagea/index.js', 
        pageb:['babel-polyfill' , './client/pageb/index.js']
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
            test: /\.s?[ac]ss$/,//postcss-loader 依赖 postcss-config.js
            use: [MiniCssExtractPlugin.loader,'css-loader','postcss-loader','sass-loader'] 
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
    watch: false,
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
        new CleanWebpackPlugin([
            path.resolve(__dirname , './static'),
            path.resolve(__dirname , './server/views')
        ]),
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
                },
                'tui-chart': {
                    test: /[\\/]node_modules[\\/]tui-chart[\\/]/,
                    priority: -20,
                    name: 'tui-chart'
                }
            }
        }),
        new HtmlWebpackPlugin({
            filename: './../../server/views/pagea.html',
            chunks:['vue','tui-chart','pagea'],
            template: path.resolve(__dirname , './client/template.html')
        }),
        new HtmlWebpackPlugin({
            filename: './../../server/views/pageb.html',
            chunks:['vue','pageb'],
            template: path.resolve(__dirname , './client/template.html')
        }),
        new MiniCssExtractPlugin({ //提取为外部css代码
            filename:'[name].css?v=[contenthash]'
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};