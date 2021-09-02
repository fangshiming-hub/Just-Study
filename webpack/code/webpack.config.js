const webpack = require("webpack");
// node核心模块
const path = require("path");
// html模板插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 自动清理插件 不是默认导出,需要解构导出
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 将多个css合并成一个css,以外联的形式关联到html
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    mode: "development",
    // 入口配置, 对不支持的api做兼容
    entry: ["@babel/polyfill","./src/index.js"],
    // 出口配置
    output: {
        filename: "[name].[hash:8].js",
        path: path.resolve(__dirname, "dist"),
        environment: {
            arrowFunction: false
        }
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "src")
        },
        port: 3000,
        hot: true,
        open: true
    },
    module:{
        rules: [
            {
                test: /.css$/,
                // 这个loader会将所有的css文件都合并在一个css文件中
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
            },
            {
                test: /.less$/,
                use: ["style-loader", "css-loader", "postcss-loader","less-loader"]
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 1024,
                            fallback: {
                                loader: "file-loader",
                                options: {
                                    name: "img/[name].[hash:8].[ext]"
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                },
                exclude: /node_modules/
                
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader",
                    options: {
                        // sources: true, 
                        esModule: false //不设置图片加载显示不出来
                    }
                }
            }
        ]
    },
    // 插件配置
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].css",
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // 选项配置
            template: "./src/index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}