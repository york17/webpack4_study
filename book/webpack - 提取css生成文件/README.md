# webpack - 提取css生成文件

使用插件 `MiniCssExtractPlugin`



`MiniCssExtractPlugin`作用：为每个引入 CSS 的 JS 文件创建一个 CSS 文件；



之前项目中，css的内容都是被写入到js文件中，这章要把之前写入到js文件中的css，单独创建成css文件。



安装插件

`npm install mini-css-extract-plugin@^0.9.0 -D`



配置插件，由于之前css是写入到js文件中，此功能是由`style-loader`，所以这章将不使用`style-loader`，替换成`MiniCssExtractPlugin`的loader。



并且在plugins中配置该插件。



```
  //loader
  {
    test: /.css$/,
    use: [
      // "style-loader",
      // js文件中的css，单独创建成css文件
      MiniCssExtractPlugin.loader,
      "css-loader"
    ]
  },
  
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: `./src/index.html`
    }),
    new CleanWebpackPlugin(),
    // js文件中的css，单独创建成css文件，所以loader就不能使用 style-loader
    new MiniCssExtractPlugin(),
  ],
```



构建项目，可以看到在`dist`目录下生产`main.css`文件

![](https://i.loli.net/2021/04/03/XNL2AxMbIzjecVD.png)



这个`main.css`文件会将所有写入到js文件中的css，全部写入。

如果需要修改目录或者修改文件名，只需要加入`filename`属性即可。

```
new MiniCssExtractPlugin({
  // 修改目录或者修改文件名
  filename: 'css/bundle.css'
}),
```



重新构建，可以看到构建目录为

![](https://i.loli.net/2021/04/03/c2QsS3xFB5PXyUO.png)



运行`dist下的index.html`可以正常运行即可。



**但是很可惜，没有正常运行。**

因为在css中的图片，找不到，所以无法加载。找到原因是，**图片的路径错误**

![](https://i.loli.net/2021/04/04/h2p8Sxz5qW4rCdT.png)



这是因为我们在使用MiniCSSExtractPlugin的时候，把打包好的文件放到一个新的文件夹中。新建了一个css文件夹，所以才会多了一级目录。



解决办法也很简单，查阅官网，配置MiniCSSExtractPlugin.loader的publicPath即可。

```
// 创建css文件loader
const miniCssExtractPluginLoaderConfig = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    // publicPath 这里要特别注意，在插件中 我自定义了目录地址为：css/bundle.css
    // 所以需要设置 publicPath
    // 如果没有设置目录，可以不使用publicPath
    publicPath: '../'
  }
}
```



重新构建项目，OK！



**注意：此插件既要配置loader，也要配置plugins**



本章结束！



