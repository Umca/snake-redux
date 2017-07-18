const webpack = require('webpack');
const path = require('path');
const outputPath = path.resolve(__dirname, './dist');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = {
    entry:{
        app:[
            path.resolve(__dirname, './src/index.js')
        ]
    },
    output:{
        path: outputPath,
        filename:'[name].js'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:'babel-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use:[
                    'style-loader',
                    'css-loader',
                    'scss-loader'
                ]
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg)$/,
                include: path.resolve(__dirname, './src/assets/'),
                use: 'url-loader?limit=1000&name=assets/[name]-[hash].[ext]'
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/assets/index.html'),
            filename:'index.html',
            path: outputPath
        }),
        new webpack.NamedModulesPlugin,
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        contentBase: path.resolve(__dirname, './dist'),
        port: 8089,
        historyApiFallback: true,
        hot: true,
    },
    devtool:"source-map"
}

module.exports = webpackConfig;