# webpack - js兼容性处理



先看个结果：

在`index.js`文件中加入一些代码

```
const name = "lee";
```

然后构建，可以看到 `bundle.js`中，使用的还是`const`，并没有做相关的兼容性处理；

![](https://i.loli.net/2021/04/03/pW2QVSTMeqwdDIR.png)



所以，我们就要做`js兼容性`的处理。使用的是`babel`，



#### 基础兼容性 - `@babel/preset-env`



**注意：@babel/preset-env只转换基本语法， 如promise就不行。**



安装相关的库

`npm install babel-loader @babel/preset-env @babel/core -D` 



添加loader配置

```
  // 添加js兼容性
  {
    test: /.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      // 预设babel要做哪种兼容，目前使用的是 @babel/preset-env
      presets: ['@babel/preset-env']
    }
  },
```



重新构建后，可以看到 `bundle.js`中，使用的还是`var`声明变量。

![](https://i.loli.net/2021/04/04/T6MKbUJ9IXpNYRh.png)



上面说到`@babel/preset-env`只转换基本语法，`promise`不支持，可以写一段代码验证一下。

```
const promise = new Promise((resolve, reject) => {
  resolve('hello webpack')
})
```



重新构建项目，`Promise`还是存在，从而验证`@babel/preset-env`无法转换`Promise`。

![](https://i.loli.net/2021/04/04/RhmvJPqQaDFLgjO.png)



#### 全部兼容性 - `@babel/polyfill`



安装 `@babel/polyfill`

`npm install @babel/polyfill -D`

安装完成后，只需要在入口文件-`index.js`中，加入一句代码

`import '@babel/polyfill'`

重新构建，可以看到`bundle.js`中已经没有使用到`Promise`， 

**但是发现`bundle.js`所占用的空间变得很大，主要是因为js文件中，包含了所有的兼容性处理导致**

![](https://i.loli.net/2021/04/04/PZsaXRLNul5kCxV.png)

`@babel/polyfill`属于一次性引入，将所有的兼容性全部加入。



#### 按需加载兼容性 - `core-js`

安装core-js

`npm install core-js -D`



配置 `core-js`

```
  // 添加js兼容性
  {
    test: /.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      // 预设babel要做哪种兼容，目前使用的是 @babel/preset-env
      presets: [
        [
          '@babel/preset-env',
          // 按需加载兼容性
          {
            // 按需加载
            useBuiltIns: 'usage',
            // 指定core-js版本
            corejs: {
              version: 3
            },
            // 兼容哪些浏览器
            targets: {
              ie: '9',
              chrome: '50',
              // ...
            }
          }
        ]
      ]
    }
  },
```



**注意：当使用按需加载兼容性，就不能使用 @babel/polyfill ，所以需要把入口文件的全部兼容性代码去掉。**



可以看到，最终打包的`bundle.js`文件的大小减少了。

![](https://i.loli.net/2021/04/04/hq5g4toQRDGTnNx.png)