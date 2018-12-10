/*
DECLARE require() FUNCTIONS FOR DEPENDENCIES/LIBRARIES
*/
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let entry = {
    index: './src/scripts/index.js'
}

let output = {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
}

let loaders = {
    rules: [{
            test: /\.(html)$/,
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            }]
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        },
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: require.resolve('jquery'),
            use: [{
                loader: 'expose-loader',
                options: 'jQuery'
            }, {
                loader: 'expose-loader',
                options: '$'
            }]
        },

    ]

}

let resolve = {
    modules: ['node_modules'],
    extensions: ['.js', '.json'],
    mainFields: ['loader', 'main']
}

let optimization = {
    minimizer: [new UglifyJsPlugin()]
}

let plugins = [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    }),
    new HtmlWebpackPlugin({
        title: 'Darin Buzon',
        template: './src/index.html',
        minify: true
    }),
    new ExtractTextPlugin('style.css'),
    new CleanWebpackPlugin(['dist'])
]

let node = {
    fs: 'empty',
    net: 'empty'
};

/*
LIST THE ABOVE MODULES SO WEBPACK CAN BEGIN BUNDLING 
*/
module.exports = {
    entry: entry,
    output: output,
    module: loaders,
    resolveLoader: resolve,
    optimization: optimization,
    plugins: plugins,
    node: node,
    devtool: 'source-map'
}