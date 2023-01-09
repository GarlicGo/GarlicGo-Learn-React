const path = require("path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

// 获取cross-env定义的环境变量
const isProduction = process.env.NODE_ENV === "production";
const STATIC_FILE_NAME = 'fe_static';

// 返回处理样式loader函数
const getStyleLoaders = (pre) => {
  return [
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
    "css-loader",
    {
      // 处理css兼容性问题
      // 配合package.json中browserslist来指定兼容性
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"],
        },
      },
    },
    pre && {
      loader: pre,
    },
  ].filter(Boolean);
};

module.exports = {
  entry: "./src/index.tsx",
  output: {
    publicPath: '/',
    path: isProduction ? path.resolve(__dirname, "./dist") : undefined,
    filename: isProduction
      ? `${STATIC_FILE_NAME}/js/[name].[contenthash:10].js`
      : `${STATIC_FILE_NAME}/js/[name].js`,
    chunkFilename: isProduction
      ? `${STATIC_FILE_NAME}/js/[name].[contenthash:10].chunk.js`
      : `${STATIC_FILE_NAME}/js/[name].chunk.js`,
    assetModuleFilename: `${STATIC_FILE_NAME}/media/[hash:10][ext][query]`,
    clean: true,
  },
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        use: getStyleLoaders(),
      },
      {
        test: /\.less$/,
        use: getStyleLoaders("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders("sass-loader"),
      },
      {
        test: /\.styl$/,
        use: getStyleLoaders("stylus-loader"),
      },
      // 处理图片
      {
        test: /\.(jpe?g|png|gif|webp|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      // 处理其他资源
      {
        test: /\.(woff2?|ttf)$/,
        type: "asset/resource",
      },
      // 处理js
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "./src"),
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          plugins: [
            !isProduction && "react-refresh/babel", // 激活js的HMR
          ].filter(Boolean),
        },
      },
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        use: {
          loader: "babel-loader",
          options: {
            // 预设执行顺序由右往左,所以先处理ts,再处理jsx
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  // 处理html
  plugins: [
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, "./src"),
      exclude: "node_modules",
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        "./node_modules/.cache/.eslintcache"
      ),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
    isProduction &&
      new MiniCssExtractPlugin({
        filename: `${STATIC_FILE_NAME}/css/[name].[contenthash:10].css`,
        chunkFilename: `${STATIC_FILE_NAME}/css/[name].[contenthash:10].chunk.css`,
      }),
    isProduction &&
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "./public"),
            to: path.resolve(__dirname, "./dist"),
            globOptions: {
              // 忽略index.html文件
              ignore: ["**/index.html"],
            },
          },
        ],
      }),
    !isProduction && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? "source-map" : "cheap-module-source-map",
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        // react react-dom react-router-dom 一起打包成一个js文件
        react: {
          test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
          name: "chunk-react",
          priority: 40,
        },
        // antd 单独打包
        antd: {
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          name: "chunk-antd",
          priority: 30,
        },
        // 剩下node_modules单独打包
        libs: {
          test: /[\\/]node_modules[\\/]/,
          name: "chunk-libs",
          priority: 20,
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}.js`,
    },
    // 是否需要进行压缩
    minimize: isProduction,
    minimizer: [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()],
  },
  // webpack解析模块加载选项
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    // 自动补全文件扩展名
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  devServer: {
    host: "localhost",
    port: 3001,
    open: true,
    // 开启HMR
    hot: true,
    // 解决前端路由刷新404问题
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://120.46.187.218:8081",
        changeOrigin: true,
      },
    },
  },
  // 关闭性能分析，提升打包速度
  performance: false,
};
