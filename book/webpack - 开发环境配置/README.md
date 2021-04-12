# webpack - 开发环境配置

直接将之前的`webpack.config.js`文件，整理到另外一个文件`webpack.dev.config.js` 。这个文件为开发环境配置。



直接贴`webpack.dev.config.js`代码

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const path = require('path');

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
  }
}
```



顺便整理一下目录。



整理目录前：

![image-20210402114520590](https://tva1.sinaimg.cn/large/008eGmZEly1gp595eb43lj30c20dqab1.jpg)



整理目录后：

![image-20210402114731811](https://tva1.sinaimg.cn/large/008eGmZEly1gp597o3b2kj30bv0fhq46.jpg)



整理使用到的路径文件，重新构建后的`dist`目录，其中并没有css目录，是因为css全部都在`bundle.js`内。具体的功能是`css-loader `来处理。后续会将css文件也使用文件的方式进行输出。



![image-20210402145215938](https://tva1.sinaimg.cn/large/008eGmZEly1gp5ejvmktlj30bn07hq3b.jpg)



最终的`webpack.config.js`文件内容。

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const path = require('path');

module.exports = {
  // 入口起点
  entry: './src/js/index.js',
  // 输入
  output: {
    filename: 'js/bundle.js',
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
  }
}
```



本章结束！

