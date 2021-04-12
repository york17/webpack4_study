# webpack - 图片资源打包

继续使用之前的项目。

其中`src`中的`index.html`，`index.less`重写



其中在`index.less`会引入两张图片

一张 ios.jpg ：大小  **3** kb

一张android.jpg： 大小**14** kb

大小是有不作用的。



```css
index.less

#box1 {
  width: 100px;
  height: 100px;
  background-image: url('./imgs/ios.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

#box2 {
  width: 200px;
  height: 200px;
  background-image: url('./imgs/android.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
```



```
index.html 的 body

<body>
  <h1 id="title">Hello Webpack</h1>
  <div id="box1"></div>
  <div id="box2"></div>
</body>
```



在 `index.js`中引入 `index.less`，接着直接构建后，会 图片无法解析 报错。



![image-20210401152124064](https://tva1.sinaimg.cn/large/008eGmZEly1gp49rw0irqj30r807xq4d.jpg)



### url-loader 和 file-loader

那要构建图片，可以使用`url-loader`，那`url-loader`有什么作用呢？那就还需要说到另外一个loader - `file-loader`。

- url-loader

  如果页面图片较多，发送很多http请求，会降低页面性能，url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURl，大于limit的还会使用file-loader进行copy；

  

- file-loader

  把指定的资源文件拷贝到构建的目录中，并且修改打包后的图片的路径，再根据配置修改我们引用的路径进行引入；



### url-loader 和 file-loader联系

	- url-loader依赖于file-loader，安装url-loader的同时，也需要安装file-loader；
	- url-loader工作分两种情况：1.文件大小小于limit参数，url-loader将会把文件转为DataURL；2.文件大小大于limit，url-loader会调用file-loader进行处理；



我们这一章 直接用 `url-loader` 来打包图片资源。

其中`url-loader`的属性有：

![url-loader](https://tva1.sinaimg.cn/large/008eGmZEly1gp4aagik07j30hy03vgnb.jpg)

目前我们只用到 limit。



### 使用 url-loader 

安装

`npm install url-loader@^3.0.0 file-loader@^5.0.2 -D`



`webpack.config.js`中加入`url-loader`

```
{
  // 处理相关图片资源
  test: /.(jpg|png|gif)$/,
  // 如果只用到一个loader，可以直接这样写
  loader: 'url-loader',
  options: {
    // 图片大小于8Kb，会被转成base64  12Kb以下都是适合的，更大的话就不建议
    limit: 8 * 1024
  }
}
```



直接构建可以得到：

![image-20210401155241092](https://tva1.sinaimg.cn/large/008eGmZEly1gp4aofd3d5j30l3096mza.jpg)

可以看到只生成了一张jpg文件（之前的android.jpg），另外的（ios.jpg）以base64存在。



![image-20210401155520037](https://tva1.sinaimg.cn/large/008eGmZEly1gp4ar6sz1sj313d0eh41m.jpg)



### html文件中引入的图片

如果是在html文件中，引入图片，如果直接使用`url-loader`，是不可以的。

直接在`index.html`加入一张图片

`  <img src="./imgs/android.jpg" alt="">`

然后构建后的`dist/index.html`中的img还是原来的，没有变化。



**结论：url-loader处理不了html中的img图片**



那就需要另外loader  `html-loader`。

它将 HTML 导出为字符串。当编译器要求时，HTML 被最小化，可以处理html文件中的img，从而被url-loader进行处理。



安装：

`npm install html-loader@^0.55 -D`

将loader加入`webpack.config.js`

```
{
  test: /\.html$/,
  loader: 'html-loader'
},
```

重新构建后，查看`dist/index.html`会发现：

![image-20210401161117251](https://tva1.sinaimg.cn/large/008eGmZEly1gp4b7s5p05j30ka04k0th.jpg)



出现这个问题的原因是：

**`url-loader`默认是使用es6模块解析，`html-loader`使用的是commonjs，所以当url-loader解析的时候，会出错；**

解决方案：**关闭**`url-loader`的es6模块，使用commonjs解析。



```
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
  }
},
```



重新构建，可以看到`dist/index.html`中正常引入

![image-20210401161616787](https://tva1.sinaimg.cn/large/008eGmZEly1gp4bcz8bhyj30is041aav.jpg)



运行 `dist/index.html` 可以正常运行，OK！



本章结束！



