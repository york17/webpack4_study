# webpack - css兼容性处理



本章主要用：

- postcss-loader：转换CSS的工具；
- postcss-preset-env：帮助postcss找到browserslist（一般在package.json下），通过配置加载指定的css兼容样式；



安装：

`npm install postcss-loader@^3.0.0 postcss-preset-env@^6.7.0 -D`



然后在`webpack.config.js`中配置

```
// postcss loader 配置提取
const postcssLoaderConfig = {
  loader: 'postcss-loader',
  options:{
    ident: 'postcss',
    plugins: () => [
      require('postcss-preset-env')()
    ]
  }
}
```



另外， 在`package.json`中添加`browserslist`为：

```
  "browserslist": {
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],

    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ]
  }
```



其中：

- development ：表示开发环境下，`last 1 chrome version`表示支持最新的chrom版本 ，其余类似；
- production：表示生产环境，**默认是生产环境**，`>0.2%`表示可以支持大于市场98.8%的浏览器；`not dead`不支持已经死掉的浏览器；`not op_mini all`不支持所有的opera-mini的所有浏览器；



在`src/css/index.css`文件中，添加一个`display:flex;`属性

```
#box {
  display: flex;
}
```



构建项目，可以看到`dist/css/bunlde.css`文件中，自动多了`webkit-flex`

![](https://i.loli.net/2021/04/03/SZ3kmAhU7vJx9fL.png)



**browserslist 默认是生产环境，如果要测试测试环境**



可以通过在`webpack.config.js`中加入

`process.env.NODE_ENV = "development";`



可以直接尝试下，看还会不会有`webkit-flex`。。。



本章结束！