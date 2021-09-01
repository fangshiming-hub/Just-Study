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
    // 入口配置
    entry: "./src/index.js",
    // 出口配置
    output: {
        filename: "[name].[hash:8].js",
        path: path.resolve(__dirname, "dist")
    },
    module:{
        rules: [
            {
                test: /.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
            },
            {
                test: /.less$/,
                use: ["style-loader", "css-loader", "postcss-loader","less-loader"]
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
        })
    ]
}