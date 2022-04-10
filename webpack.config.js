const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    index : path.join(__dirname, "/src/lottery/index.js"),
    list : path.join(__dirname, "/src/lottery/list.js"),
    draft: path.join(__dirname, "/src/lottery/draft.js")
  },
  output: {
    path: path.join(__dirname, "/dist"),
    // filename: "lottery.js"
    filename: './js/[name].js'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: 'url-loader', // 将之前的 file-loader 换成了 url-loader
          options: {
            name: 'img/[name]_[hash:6].[ext]'
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin("zhijin"),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/src/index.html"),
      chunks:['index'],
      filename: "./index.html",
      minify: {
        // 移除空属性
        removeEmptyAttributes: true,
        // 压缩css
        minifyCSS: true,
        // 压缩JS
        minifyJS: true,
        // 移除空格
        collapseWhitespace: true
      },      
      hash: true,
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/src/list.html"),
      chunks:['list'],
      filename: "./list.html",
      minify: {
        // 移除空属性
        removeEmptyAttributes: true,
        // 压缩css
        minifyCSS: true,
        // 压缩JS
        minifyJS: true,
        // 移除空格
        collapseWhitespace: true
      },      
      hash: true,
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/src/draft.html"),
      chunks:['draft'],
      filename: "./draft.html",
      minify: {
        // 移除空属性
        removeEmptyAttributes: true,
        // 压缩css
        minifyCSS: true,
        // 压缩JS
        minifyJS: true,
        // 移除空格
        collapseWhitespace: true
      },      
      hash: true,
      inject: true
    }),
    new CopyWebpackPlugin([
      {
        from: "./src/css",
        to: "./css"
      },
      {
        from: "./src/data",
        to: "./data"
      },
      {
        from: "./src/img",
        to: "./img"
      },
      {
        from: "./src/lib",
        to: "./lib"
      }
    ])
  ]
};
