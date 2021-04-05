const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const path = require('path');

module.exports = {
  // 入口起点，这里要根据目录结构来设置
  entry: './src/js/index.js',
  // 输入
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  // 模式
  mode: 'development',
  module: {
    // rules 里面就是存放loader的地方
    rules: [
      {
        test: /.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /.less$/,
        use: [
          "style-loader",
          "css-loader",
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
          name: '[hash:10].name.[ext]',
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
          name: '[hash:10].[ext]'
        }
      },
    ]
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: `./src/index.html`
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // 采用gzip压缩
    compress: true,
    port: 8000,
    // 自动打开默认浏览器
    open: true,
    // 开始HMR功能
    hot: true,
  },
  devtool: 'cheap-source-map',
}