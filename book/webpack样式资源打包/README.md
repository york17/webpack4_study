# webpack样式资源打包	

直接在 webpack初体验 一文中的项目，继续开发。

如果之前有添加了`webpack.config.js`就无需创建，如果没有就创建`webpack.config.js`文件。

其中`webpack.config.js`，指示webpack加载相关配置。由于webpack是基于nodejs平台运行，所以采用的是Commonjs。



### css资源



要打包css样式资源，就会用到 loader。

主要用到下面的loader



- style-loader ：在html中，创建style标签，将js中的样式资源插入style中，然后添加到head中；
- css-loader ： 将css文件变成commonjs模块，加载到js文件中，内容为字符串；



这里先安装 这两个loader `style-loader`,  `css-loader`

`npm install style-loader@^1.1.3 css-loader@^3.4.2 -D`



然后，将loader加入到`webpack.config.js`中，

```javascript
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
      }
    ]
  },
  // 插件
  plugins: []
}
```





其中 rules下，

loader的执行顺序： `从右到左，从下到上执行`;

test表示匹配哪些文件，use表示使用哪些loader。



**不同的文件需要配置不同的loader**；



webpack构建打包，正常情况是ok的。

![image-20210331175128596](/Users/onlyou/Library/Application Support/typora-user-images/image-20210331175128596.png)



构建后的`bundle.js`，可以找到 `index.css`



![image-20210331175255613](https://tva1.sinaimg.cn/large/008eGmZEly1gp38j9e6w7j30t008wjsy.jpg)



运行`dist`目录下的`index.html`, 可以看到，样式已经生效。

![image-20210331175429483](https://tva1.sinaimg.cn/large/008eGmZEly1gp38kvxk6gj30qn0dnwgg.jpg)



### less资源

当我们直接使用 `less`文件的时候，上面的 `style-loader`,  `css-loader` 是不够用的。

创建`index.less`

```css
#title {
  color: green;
  font-size: 30px;
}
```



然后在`index.js`文件中引入，

`import './index.less'`



要想构建less资源，还需要装 `less-loader`，`less`

`npm install less@^3.11.1 less-loader@^5.0.0 -D`



**其中：less-loader是为了将less文件编译成css文件**



然后配置rules



```
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
      }
    ]
```



重新构建后，运行 `index.html`

![image-20210331180847386](https://tva1.sinaimg.cn/large/008eGmZEly1gp38zrat3rj30qo0ea76m.jpg)