const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 入口起点
  entry: './src/index.js',
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
      }
    ]
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: `./src/index.html`
    }),
  ]
}