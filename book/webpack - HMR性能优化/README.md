# webpack - HMR性能优化

> HMR : hot module replacement（模块热更新）

作用：当一个模块发生，只会重新打包发生变化的模块，而不是打包所有模块。极大提升构建速度。

**目前是在开发环境下，所以配置了`package.json中的scripts`专门启动开发服务器，注意我们使用的是webpack.dev.config.js**

```
"dev-serve": "webpack-dev-server --config webpack.dev.config.js"
```



具体看下具体场景：

先启动项目

`npm run dev-serve`	

### 修改CSS文件（不使用HMR）

修改`src/css/index.less`的`box1`的宽度为`200px`，可以看到，只修改了css文件，但是会导致重新开始执行。



### 修改js文件（不使用HMR）

创建`hmr.js`文件

```javascript
export function hmr() {
    console.log('hello hmr');
}
```

在入口文件引入，之后，修改`hmr.js`内容，也会导致重新开始执行。



### 修改html文件（不使用HMR）

修改`index.html`的title内容，也会导致重新开始执行。不过这个也正常，因为通常我们只会有一个`html文件`。



上面几种情况结论为：

- 修改其中一个文件，也会导致整个项目重新构建，后续如果有十分多的模块，如果单单只修改了一个模块，就要将所有模块也进行构建，十分浪费时间；
- 需要一个工具，只会重新打包发生变化的模块；

HMR 就是专门做这种事情，只需要在`devServer`中加入`hot`即可。

```
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // 采用gzip压缩
    compress: true,
    port: 8000,
    // 自动打开默认浏览器
    open: true,
    // 开始HMR功能
    hot: true,
  }
```

**注意：修改了devServer，需要重新  npm run dev-serve**,

### 修改CSS文件（打开HMR）

修改`src/css/index.less`的`box1`的宽度为`200px`，

![](https://i.loli.net/2021/04/05/5oVpIr9xHitATUh.png)

可以看到 苹果图片 宽度改变，其他模块没有全部构建。

### 修改js文件（打开HMR）

修改`hmr.js`文件，所有模块还是全部构建。

### 修改html文件（打开HMR）

一定会所有模块全部构建。



结论：

- 样式文件：可以使用HMR功能，主要是因为`style-loader`内部已经实现，所以在开发环境，我们都使用`style-loader`;
- js文件：默认不能使用HMR功能；
- html文件：默认不能使用HMR功能，也无需用到HMR功能；



### js文件使用HMR功能

想要在js文件使用HMR功能，需要用到以下代码：

**注意：只要HMR对js文件的处理，只能处理非入口js文件的其他文件**

```
// 通过判断 module.hot ，看是否有开启HMR功能
if (module.hot) {
  module.hot.accept('./hmr.js', function(){
    // 一旦当hmr.js文件发生变化，会执行这里的回调函数
    // 其他的模块不会重新打包构建
    hmr();
  })
}
```

尝试修改`hmr.js`文件中的内容，会发现，并不会全部模块重新打包构建。

可以看到控制台，只有构建`hmr.js`文件。

![](https://i.loli.net/2021/04/05/NG7K9ThpHubyq5w.png)



本章结束！