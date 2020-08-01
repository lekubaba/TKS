const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //打包html的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//导出css
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //自动删除输出根目录
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanCSSPlugin = require('less-plugin-clean-css'); //打包css
const config ={
    // mode:'development',
    mode:'production',
    entry:{
        main:'./src/main.js',
        one:'./src/one.js'
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: "js/[name].js",
        // publicPath:"./dist/", //当有cdn的时候，公共路径特别有用
    },
    devServer:{
        contentBase:'./dist',    //服务器启动的目录
        open:true,   //自动打开浏览器
        proxy:{    //设置代理，可用于本地mock数据，本地自己启动另外一个服务
            "/api":{
                target:"http://localhost:8099"
            }
        },
        port:8083, //指定端口号
        hot:true,   //开启HMR(Hot Module Replacement)热模块替换,由于是webpack自带的，所以要引入webpack ，监控并更新js模块的工作vue等框架自己做了，否则需要自己手动监控 
        hotOnly:true,
        // historyApiFallback: true,
        // overlay: true //将错误写在html上
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    //不认识的模块（不是js)的配置
    module: {
        rules: [
            {
                test: /\.vue$/,
                use:{
                    loader: 'vue-loader',
                }
            },
            {
                test: /\.pug$/,
                oneOf: [
                    // 这条规则应用到 Vue 组件内的 `<template lang="pug">`
                    {
                      resourceQuery: /^\?vue/,
                      use: ['pug-plain-loader']
                    },
                    // 这条规则应用到 JavaScript 内的 pug 导入
                    {
                      use: ['raw-loader', 'pug-plain-loader']
                    }
                ]
            },
            // 它会应用到普通的 `.js` 文件
            // 以及 `.vue` 文件中的 `<script>` 块
            {
                test: /\.js$/,
                exclude: file => (/node_modules/.test(file) &&!/\.vue\.js/.test(file)),
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets: ['@babel/preset-env'],
                    }
                    
                }
            },
            {
                test: /\.css$/, 
                use:[ //执行顺序：从下到上，从右到左
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development', 
                        }
                    },
                    // 'style-loader',//放在正确的打包位置
                    // 它会应用到普通的 `.css` 文件
                    // 以及 `.vue` 文件中的 `<style>` 块
                    // 'vue-style-loader',
                    'css-loader' //先识别css并合并为一个css
                ] 
                
            },
            {
                test:/\.less$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',  
                        }
                    },
                    
                    // 'style-loader',//放在正确的打包位置
                    // 'vue-style-loader',
                    'css-loader',//打包合并css
                    // 'less-loader',//处理less，转成css
                    {
                      loader: 'less-loader',
                      options: {
                        lessOptions: {
                          plugins: [
                            new CleanCSSPlugin({ advanced: true }),
                          ],
                        },
                      },
                    },
                    'postcss-loader'//自定增加前缀                    
                ]
            },
            {
                test:/\.scss$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',  
                        }
                    },
                    
                    // 'style-loader',//放在正确的打包位置
                    // 'vue-style-loader',
                    'css-loader',//打包合并css
                    'sass-loader',//处理sass，转成css
                    'postcss-loader'//自定增加前缀
                ]
            },
            {
                test:/\.(jpe?g|png|gif)$/,
                use:[
                    {
                        loader:"url-loader",/*file-loader不会转码，直接复制到指定目录*/
                        options:{
                            name:"[name]-[hash].[ext]",//[]表示占位符（placeholder），name表示源文件的名字，ext是源文件的后缀，还可以连接hash：[name]-[hash].[ext]
                            outputPath:'images/',//#配置输出位置
                            limit:1024,//单位字节，注意：当url-loader处理jpg模块，会判断体积是否在限制范围之内，在limit之内的，就转成base64格式并打包到index.js，否则就不转直接输出到dist
                            // publicPath:"../../images",
                        }
                    },
                ]
            },
        ]
    },
    //配置插件，是个数组，里面的项是插件的实例
    plugins:[
        //执行顺序从上到下
        new CleanWebpackPlugin(),
        //自动生成html，并移到输出目录
        new HtmlWebpackPlugin({
            title:'main页面',  
            filename:'index.html',
            template:"./src/index.html",     //生成html的模板路径
            inject: true,
            chunks:['main'],
        }),
        new HtmlWebpackPlugin({
            title:'one页面',  
            filename:'one.html',
            template:"./src/one.html",     //生成html的模板路径
            inject: true,
            chunks:['one'],
        }),
        new webpack.HotModuleReplacementPlugin(),

        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',        //输出文件名 
            chunkFilename: '[id].css',            //模块名
        }),
        // 请确保引入这个插件来施展魔法
        new VueLoaderPlugin(),

    ],
    // devtool:'inline-source-map',//打包后的文件映射
}



module.exports = config;