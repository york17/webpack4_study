// 正式环境配置
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 单独压缩css文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// postcss loader 配置提取
const postcssLoaderConfig = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [
      require('postcss-preset-env')()
    ]
  }
}

// 创建css文件loader
const miniCssExtractPluginLoaderConfig = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    // publicPath 这里要特别注意，在插件中 我自定义了目录地址为：css/bundle.css
    // 所以需要设置 publicPath
    // 如果没有设置目录，可以不使用publicPath
    publicPath: '../'
  }
}

// 设置node的当前的环境变量值为 开发环境
// process.env.NODE_ENV = "development";

module.exports = {
  // 入口起点
  entry: './src/js/index.js',
  // 输入
  output: {
    filename: 'js/bundle.js',
    path: __dirname + '/dist'
  },
  // 模式
  mode: 'production',
  module: {
    // rules 里面就是存放loader的地方
    rules: [{
        test: /.css$/,
        use: [
          // "style-loader",
          // js文件中的css，单独创建成css文件
          miniCssExtractPluginLoaderConfig,
          "css-loader",
          postcssLoaderConfig,
        ]
      },
      {
        test: /.less$/,
        use: [
          // "style-loader",
          // js文件中的css，单独创建成css文件
          miniCssExtractPluginLoaderConfig,
          "css-loader",
          postcssLoaderConfig,
          "less-loader"
        ]
      },
      {
        // 处理相关图片资源
        test: /.(jpg|png|gif)$/,
        // 如果只用到一个loader，可以直接这样写
        loader: 'url-loader',
        options: {
          // 图片大小于8Kb，会被转成base64  12Kb以下都是适合的，更大的话就不建议
          limit: 8 * 1024,
          // 关闭url-loader的es6模块
          esModule: false,
          // 给图片重命名，
          name: '[hash:10].[name].[ext]',
          // 输出文件目录
          outputPath: 'imgs'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        // exclude：排除 css,js,html, json, less文件等
        exclude: /\.(css|js|html|json|less|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          // 输出文件目录
          outputPath: 'media'
        }
      },
      // 添加eslint
      {
        // 只检查js文件
        test: /.js$/,
        loader: 'eslint-loader',
        // 表示优先执行
        enforce: 'pre',
        // 只需要检查自己写的代码，不需要检查node_modules
        exclude: /node_modules/,
        options: {
          fix: true,
        }
      },
      // 添加js兼容性
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设babel要做哪种兼容，目前使用的是 @babel/preset-env
          presets: [
            [
              '@babel/preset-env',
              // 按需加载兼容性
              {
                // 按需加载
                useBuiltIns: 'usage',
                // 指定core-js版本
                corejs: {
                  version: 3
                },
                // 兼容哪些浏览器
                targets: {
                  ie: '9',
                  chrome: '50',
                  // ...
                }
              }
            ]
          ]
        }
      },
    ]
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: `./src/index.html`,
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      }
    }),
    new CleanWebpackPlugin(),
    // js文件中的css，单独创建成css文件，所以loader就不能使用 style-loader
    new MiniCssExtractPlugin({
      // 修改目录或者修改文件名
      filename: 'css/bundle.css'
    }),
    // 普通压缩
    // new OptimizeCssAssetsWebpackPlugin(),
    // 使用cssnano配置规则压缩，同时需要在package.json中配置browserslist
    new OptimizeCssAssetsWebpackPlugin({
      cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true //是否将插件信息打印到控制台
    })
  ]
}