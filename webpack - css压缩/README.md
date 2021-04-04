# webpack - css压缩

> optimize-css-assets-webpack-plugin 单独压缩css文件



安装

`npm install optimize-css-assets-webpack-plugin@^5.0.3 -D`



### 普通压缩

直接在`webpack.config.js`中引入插件，并且配置即可。



```
// 单独压缩css文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

  // 插件
  plugins: [
    new OptimizeCssAssetsWebpackPlugin(),
  ],
```



重新构建项目，可以看到`dist/css/bundle.css`文件内容被压缩成了一行。



### 使用cssnano配置规则压缩

需要安装

```
npm install cssnano -D
```



```
    // 使用cssnano配置规则压缩
    new OptimizeCssAssetsWebpackPlugin({
      cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true //是否将插件信息打印到控制台
    })
```

重新构建项目，即可。



**注意：此插件压缩的对象是由`mini-css-extract-plugin`插件输出的css文件,而不是css源文件**



相关参数：

| **参数**                        | **类型** | 默认值   | 描述                                                         |
| ------------------------------- | -------- | -------- | ------------------------------------------------------------ |
| assetNameRegExp(可选)           | RegExp   | /.css$/g | 此插件压缩的对象是由`mini-css-extract-plugin`插件输出的css文件,而不是css源文件 |
| cssProcessor(可选)              | Function | cssnano  | 压缩css的处理器,一个`函数`,接收`CSS模块和options参数`并返回一个`promise对象` |
| cssProcessorOptions(可选)       | Object   | {}       | 传递给cssProcessor的配置对象                                 |
| cssProcessorPluginOptions(可选) | Object   | {}       | 传递给cssProcessor的插件配置对象                             |
| canPrint(可选)                  | Boolean  | true     | 配置插件是否可以将消息打印到控制台                           |



本章结束！