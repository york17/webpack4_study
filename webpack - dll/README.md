# webpack - dll



项目中，要引入许多的第三方模块。这些第三方模块在打包的时候会被打包进最后生成的文件之中。

导致最后生成的文件过大的同时也增加了打包的时间。



如果这些第三方模块能只打包一次，之后就直接使用这些打包好的模块；

当使用第三方库的时候，直接从从我们预先打包出的文件中去寻找即可。



### 单独打包第三方模块

由于需要单独打包第三方模块，所以需要一个创建独立的Webpack配置文件`webpack.dll.js`。

```
const webpack = require('webpack');
const {resolve} = require('path');

module.exports = {
  entry: {
    vendors: ['lodash']
  },
  output: {
    path: resolve(__dirname, 'dll'),
    filename: '[name].dll.js',
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: resolve(__dirname, 'dll/manifest.json')
    })
  ],
  mode: 'production'
}
```



该文件主要作用

- `lodash`则打包进`vendors.dll.js`里面；
- `plugins`内使用了一个`DLLPlugin`，这个插件会在`path`字段所给出的路径生成一个`manifest.json`。这个`json`文件包含了`import`或`require`请求到模块ID的映射。这个文件在正式打包项目代码的时候会用到。



先运行此文件试试：

在`package.json`文件中添加`scripts` - `    "dev-dll": "webpack --config webpack.dll.js"`，

然后执`npm run dev-dll`

![](https://i.loli.net/2021/04/08/6qrwEaQshVf45Yj.png)



### 正式打包项目



在打包前，我们需要使用到`webpack的DllReferencePlugin`，这个plugin的作用主要是：

**告诉webpack哪些库不参与打包。**



另外，我们还需要在打包的时候，将之前打包好的库，一起打包出去，并且在html中自动引入，

`npm install add-asset-html-webpack-plugin -D`



然后配置`webpack.config.js`文件的plugins中

```
    // dll
    // 告诉webpack哪些库不参与打包
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dll/manifest.json')
    }),
    // 之前打包好的库，一起打包出去，并且在html中自动引入
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, 'dll/vendors.dll.js')
    }),
```



构建项目



![image-20210408173118423](https://tva1.sinaimg.cn/large/008eGmZEly1gpcgv8g1nej30cu055dg4.jpg)

![](https://i.loli.net/2021/04/08/vm4qY2XlQwgzofa.png)



后面，构建项目的时候就不需要在打包`lodash`的包了。



本章结束！