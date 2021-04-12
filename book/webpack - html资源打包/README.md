# webpack - html资源打包

项目继续使用之前的。

之前还未使用过`plugin`, 这次终于要用上了，🐻

- loader：1、下载（install）2、配置loader
- plugin： 1、下载（install）2、引入  3、使用



本次要用到的插件是 `html-webpack-plugin`，

`html-webpack-plugin`自动为你生成一个HTML文件，自动引入webpack打包输出的所有资源。



直接在项目中install

`npm install html-webpack-plugin@^3.2.0 -D`



然后在 `webpack.config.js`  中直接顶部引入

`const HtmlWebpackPlugin = require('html-webpack-plugin')`

在`plugins`中初始化

```
  plugins: [
    new HtmlWebpackPlugin(),
  ]
```



直接构建 `npm run build` ，可以看到在 `dist`目录下会出现 `index.html`, 并在内容自动引入了构建后的js文件；

![image-20210401110441970](https://tva1.sinaimg.cn/large/008eGmZEly1gp42csg4y2j30ld072mxx.jpg)





如果，需要指定生成的`html`文件的模板，可以在`new HtmlWebpackPlugin()`加入`template`属性。

```
  plugins: [
    new HtmlWebpackPlugin({
      template: `./src/index.html`
    }),
  ]
```



然后在构建，就可以看到构建后的`index.html`复制了一份你指定的`template`，然后在引入打包后的资源；



![image-20210401111351870](https://tva1.sinaimg.cn/large/008eGmZEly1gp42mc6rerj30mz09rmyo.jpg)



本章结束！