# webpack - 自动清除上一次构建目录文件

`clean-webpack-plugin`作用：每次生成代码之前，先将构建目录清空；



安装

`npm install clean-webpack-plugin -D`



在`webpack-config.js`文件中使用。

```
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

// 插件
plugins: [
  new HtmlWebpackPlugin({
    template: `./src/index.html`
  }),
  new CleanWebpackPlugin(),
]
```



可以在`dist`目录下随便创建一个文件，然后构建。就可以看到，创建的文件会被清掉。



本章结束！