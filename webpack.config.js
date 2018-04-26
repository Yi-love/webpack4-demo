'use strict';

const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * [generateLoaders 生成loader]
 * @param  {[type]} loader        [description]
 * @return {[type]}               [description]
 */
function generateLoaders (loader , development) {
    let loaders = [
        MiniCssExtractPlugin.loader ,
        {
            loader: 'css-loader',
            options: {
                minimize: development ? false : true,
                sourceMap: development ? true : false
            }
        }
    ];
    if ( !development ){
        loaders.push({
            loader: 'postcss-loader',
            options: {
                plugins: [
                    require('autoprefixer')('last 2 versions')
                ]
            }
        });
    }
    //加载css-loader之前的前置loader ,例如：sass-loader,less-loader
    if ( loader && loader !== 'css' ) {
        let loaderOptions = loader === 'sass' ? { indentedSyntax: true } : {};
        loader = loader === 'scss' ? 'sass' : loader;
        loaders.push({
            loader: loader + '-loader',
            options: Object.assign({}, loaderOptions, { sourceMap: development ? true : false})
        });
    }
    //提取为外部引入的css文件
    return loaders;
}
/**
 * [getLoaders 返回loaders数组]
 * @param  {[type]} array [description]
 * @return {[type]}       [description]
 */
function getLoaders(array ,development){
    array = Array.isArray(array) ? array : ['css'];
    let loaders = [];
    for( let i = 0 ; i < array.length ; i++ ){
        loaders.push({
            test: new RegExp('\\.' + array[i] + '$'),
            use: generateLoaders(array[i] , development)
        });
    }
    return loaders;
}

module.exports = {
    mode: 'production',
    entry:{
        index:'./client/index.js',
        test:'./client/test.js'
    },
    resolve:{
        extensions: ['.js','.json','.css' ,'.less' ,'.sass','.scss']
    },
    module:{
        rules:[
        {
            test:/\.js$/,
            exclude: /node_modules/,
            loader:'babel-loader' //js编译 依赖.babelrc
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader'
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader'
        }]
        .concat(getLoaders(['css','less','scss','sass'] , true))
    },
    watch: true,
    watchOptions: { //不监听目录
        ignored: [/node_modules/ , '/static/']
    },
    output:{
        filename:'[name].js?v=[hash]',
        path:path.resolve(__dirname , './static/dist'),
        publicPath:'./dist/'
    },
    devtool: '#source-map',
    plugins:[
        new CleanWebpackPlugin([path.resolve(__dirname , './static')]),
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
            filename: './../index.html',
            chunks: ['vue','tui-chart','index'],
            template: path.resolve(__dirname , './client/index.html')
        }),
        new HtmlWebpackPlugin({
            filename: './../test.html',
            chunks: ['vue','test'],
            template: path.resolve(__dirname , './client/test.html')
        }),
        new MiniCssExtractPlugin({ //提取css公共代码
            filename:'[name].css?v=[contenthash]'
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};