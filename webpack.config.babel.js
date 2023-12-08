import path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import CssMinimizerPlugin from "css-minimizer-webpack-plugin"
import webpack from "webpack"
import Dotenv from "dotenv-webpack"

export default (env, argv) => {
    let mode = env.PRODUCTION == "0" ? "development" : "production"
    let isDev = mode == "development"

    console.log("Project is running:", mode, "isDEV:", isDev)
    console.log("API is at: " + env.APIURL)
    console.log("KNET URL: " + env.KNET_REDIRECT_URL)

    return {
        entry: "./src/app.tsx",
        output: {
            path: path.join(__dirname, "build"),
            filename: "bundled.js",
            publicPath: "/",
        },
        resolve: {
            modules: [
                path.resolve(__dirname, "../node_modules"),
                path.resolve(__dirname, "src"),
                path.resolve(__dirname, "node_modules"),
            ],
            extensions: [".ts", ".css", ".js", ".jsx", ".ts", ".tsx"],
        },
        devServer: {
            compress: true,
            port: env.PORT || 5000,
            hot: true,
            inline: true,
            host: "0.0.0.0",
            disableHostCheck: true,
            watchContentBase: true,
            publicPath: "/",
            contentBase: "./build/",
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                },
                {
                    test: /\.css/,
                    include: [
                        path.resolve(__dirname, "../node_modules"),
                        path.resolve(__dirname, "src"),
                        path.resolve(__dirname, "node_modules"),
                    ],
                    use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
                },
            ],
        },
        optimization: {
            minimizer: [!isDev && new CssMinimizerPlugin()].filter(Boolean),
            minimize: !isDev,
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "bundle.css",
            }),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                filename: "index.html",
                minify: {
                    collapseWhitespace: !isDev,
                },
            }),
            new webpack.DefinePlugin({
              
                "process.env.API": JSON.stringify(env.APIURL ?? "http://localhost:8081"),
               
            }),
            new Dotenv(),
        ],
        devtool: isDev ? "eval-source-map" : undefined,
        mode: mode,
    }
}
