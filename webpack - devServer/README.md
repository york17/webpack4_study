# webpack - devServer

devServer 自动创建服务器，用来自动化编译、自动浏览器、自动刷新浏览器等。

避免每次修改代码都重新构建。

- 特点：只会在内存编译打包，不会有任何输出；
- 启动devServer需要使用到，`webpack-dev-server`;



安装 `webpack-dev-server`

`npm install webpack-dev-server -D`



在`webpack.config.js`中配置devServer，它不属于之前说的五个核心，

```
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // 采用gzip压缩
    compress: true,
    port: 8000,
  }
```

- contentBase - 告诉服务器内容的来源。仅在需要提供静态文件时才进行配置;
- compress - 为每个静态文件开启gzip压缩；
- port - 侦听指定端口号；



启动`webpack-dev-server`使用命令`npx webpack-dev-server`



可以看到控制台，有相关输出，可以直接再来浏览器中访问 http://localhost:8000/



接下里当我们修改文件的时候，只要保存，devServer就会重新编译，并且浏览器会自动刷新。



如果要自动打开浏览器，可以在加入一个属性。



```
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // 采用gzip压缩
    compress: true,
    port: 8000,
    // 自动打开默认浏览器
    open: true,
  }
```



本章结束！