# webpack - optimization详细配置



- optimization 下的 splitChunks 配置内容

  ```
    splitChunks: {
      chunks: 'all'
      // 默认值，可以不写~
      minSize: 30 * 1024, // 分割的chunk最小为30kb
      maxSize: 0, // 最大没有限制
      minChunks: 1, // 要提取的chunk最少被引用1次
      maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量
      maxInitialRequests: 3, // 入口js文件最大并行请求数量
      automaticNameDelimiter: '~', // 名称连接符
      name: true, // 可以使用命名规则
      cacheGroups: {
        // 分割chunk的组
        // node_modules文件会被打包到 vendors 组的chunk中。--> vendors~xxx.js
        // 满足上面的公共规则，如：大小超过30kb，至少被引用一次。
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 优先级
          priority: -10
        },
        default: {
          // 要提取的chunk最少被引用2次
          minChunks: 2,
          // 优先级
          priority: -20,
          // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
          reuseExistingChunk: true
        } 
      }
    },
  ```

  

- runtimeChunk： 将当前模块的记录其他模块的hash单独打包为一个文件 runtime；

  ```
     runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`
      },
  ```

  runtimeChunk可以下面的这种问题，

  index.js文件中import other_entrance.js，当 other_entrance.js 文件修改了（index.js文件没有做任何修改），但是两个文件都被重新打包了。

  - 其中需要将`mode：设置为production`；
  - `output的chunkFilename设置为 'js/[name]_[contenthash:10]_chunk.js'`;
  - 不要设置runtimeChunk；

  

  构建项目

  `npm run dev-detail`

  

  ![](https://i.loli.net/2021/04/09/FHXhI6yrMjU3AvL.png)

  

  在`main.7aaa60d28b.js`中可以看到，使用了`1_19cc04eb11_chunk.js`,如果我们现在修改了`other_entrance.js`，然后重新打包，会看到，之前`main.7aaa60d28b.js`会被覆盖。

  ![image-20210409171623887](https://tva1.sinaimg.cn/large/008eGmZEly1gpdm20tzpwj309l03nt8r.jpg)



​	

接下来，加上 runtimeChunk 配置，就可以看到当构建后的目录多了runtime文件;

![](https://i.loli.net/2021/04/09/ZWfcFPDmIQXaSnk.jpg)



当再次修改`other_entrance.js`文件，再次打包，可以看到，main文件没有改变，改变的是runtime文件：

![](https://i.loli.net/2021/04/09/qmcgHWwvnBs1FAG.png)





- minimizer：配置的压缩，需要安装terser-webpack-plugin

  `npm install terser-webpack-plugin@^4.2.3 -D`

  ```
  minimizer: [
    // 配置生产环境的压缩方案：js和css
    new TerserWebpackPlugin({
      // 开启缓存
      cache: true,
      // 开启多进程打包
      parallel: true,
      // 启动source-map
      sourceMap: true
    })
  ]
  ```

  



整个配置文件内容：

```
// webpack.detail.js

const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin')


module.exports = {
  entry: './src/js/index.js',
  // entry: ['./src/js/index.js', './src/js/other_entrance.js'],
  // entry: {
  //   main: './src/js/index.js',
  //   other: './src/js/other_entrance.js'
  // },
  output: {
    // 输出文件的名称， 目录+文件名
    filename: 'js/[name].[contenthash:10].js',
    // 输出文件的目录，所有资源输出的公共目录
    path: path.resolve(__dirname, 'dist'),
    // 所有资源引入公共路径前缀
    publicPath: '/',
    // 非入口chunk的名称
    chunkFilename: 'js/[name]_[contenthash:10]_chunk.js',
    // 向外暴露一个全局变量，变量名为 [name]的值，
    // library: '[name]',
  },
  module: {
    rules: [
      // loader的配置
      {
        test: /\.css$/,
        // 多个loader用use
        use: ['style-loader', 'css-loader']
      },
      // {
      //   test: /\.js$/,
      //   // 排除node_modules下的js文件
      //   exclude: /node_modules/,
      //   // 只检查 src 下的js文件
      //   include: path.resolve(__dirname, 'src'),
      //   // 优先执行
      //   enforce: 'pre',
      //   // 单个loader用loader
      //   loader: 'eslint-loader',
      //   options: {
      //     fix: true,
      //   }
      // },
      {
        // 以下配置只会生效一个
        oneOf: []
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./src/index.html`,
    }),
    new CleanWebpackPlugin(),
  ],
  mode: 'production',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', 'json', 'vue'],
    modules: ['node_modules']
  },
  devServer: {
    // 运行代码的目录
    contentBase: path.resolve(__dirname, 'dist'),
    // 监视 contentBase 目录下的所有文件，一旦文件变化就会 reload
    watchContentBase: true,
    watchOptions: {
      // 忽略文件
      ignored: /node_modules/
    },
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 5000,
    // 域名
    host: 'localhost',
    // 自动打开浏览器
    open: true,
    // 开启HMR功能
    hot: true,
    // 不要显示启动服务器日志信息
    clientLogLevel: 'none',
    // 控制台除了一些基本启动信息以外，其他内容都不要显示
    quiet: true,
    // 如果出错了，不要全屏提示~
    overlay: false,
    // 服务器代理 --> 解决开发环境跨域问题
    proxy: {
      // 一旦devServer(5000)服务器接受到 /api/xxx 的请求，就会把请求转发到另外一个服务器(3000)
      '/api': {
        target: 'http://localhost:3000',
        // 发送请求时，请求路径重写：将 /api/xxx --> /xxx （去掉/api）
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
      // 默认值，可以不写~
      /* minSize: 30 * 1024, // 分割的chunk最小为30kb
      maxSize: 0, // 最大没有限制
      minChunks: 1, // 要提取的chunk最少被引用1次
      maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量
      maxInitialRequests: 3, // 入口js文件最大并行请求数量
      automaticNameDelimiter: '~', // 名称连接符
      name: true, // 可以使用命名规则
      cacheGroups: {
        // 分割chunk的组
        // node_modules文件会被打包到 vendors 组的chunk中。--> vendors~xxx.js
        // 满足上面的公共规则，如：大小超过30kb，至少被引用一次。
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 优先级
          priority: -10
        },
        default: {
          // 要提取的chunk最少被引用2次
          minChunks: 2,
          // 优先级
          priority: -20,
          // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
          reuseExistingChunk: true
        } 
      }*/
    },
    // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
    // 解决：修改a文件导致b文件的contenthash变化
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    },
    minimizer: [ 
      // 配置生产环境的压缩方案：js和css
      new TerserWebpackPlugin({
        // 开启缓存
        cache: true,
        // 开启多进程打包
        parallel: true,
        // 启动source-map
        sourceMap: true
      })
    ]
  }
}
```



本章结束！