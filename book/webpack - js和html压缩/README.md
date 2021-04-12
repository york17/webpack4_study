# webpack - js和html压缩

- js压缩

只需要将`webpack.config.js`中的mode改成`production`生产环境即可自动压缩js。

- html压缩

  使用的是之前的`html-webpack-plugin`

  增加一些配置项

  ```
  new HtmlWebpackPlugin({
    template: `./src/index.html`,
    minify: {
      // 移除空格
      collapseWhitespace: true,
      // 移除注释
      removeComments: true,
    }
  }),
  ```

  添加`minify`指定规则即可。



本章结束！

