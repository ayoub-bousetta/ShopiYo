const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

var ImageminPlugin = require('imagemin-webpack-plugin').default

const devMode = process.env.NODE_ENV !== 'production';
 
module.exports = {
    entry : './src/js/main.js',
    output : {
        filename : 'js/app.bandle.js',
        path : path.resolve(__dirname, 'dist'),
         //You need to add this in reason to work cuz he can't get 
         publicPath:"/dist"
    },
    module : {
        rules : [
            {
                test: /\.s?[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false, sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ],
            },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: "babel-loader"
            // },
         
        ]
    },
    devtool: 'source-map',
 
    optimization: {
        minimize: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
          
            filename: "css/main.css",
            
        }),
         // Use the default settings for everything in /images/*
         new CopyWebpackPlugin([{
            from: './src/imgs',
            to: 'imgs',
          }]),
          new ImageminPlugin({ 
              test: /\.(jpe?g|png|gif)$/i
         })
           
        
    ],
    mode : devMode ? 'development' : 'production'
};