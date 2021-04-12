# webpack五个核心概念

### 入口起点（entry points）

在webpack配置中，可以定义有多种方式的 ```entry``` 属性 。

会有单个入口 以及 多个入口。

目前只考虑单个入口，后续有用到多个入口在补充。



**webpack.config.js**

单个入口简单用法：

```javascript
module.exports = {
  entry: './path/to/my/entry/file.js'
};
```

上面是下面的简写：

```javascript
module.exports = {
  entry: {
    main: './path/to/my/entry/file.js'
  }
};
```





### 输出（output）

配置 `output` 选项可以控制 webpack 如何向硬盘写入编译文件。

在 webpack 中配置 `output` 属性的最低要求是，将它的值设置为一个对象，包括以下属性：

- `filename` 用于输出文件的文件名。

- `path`用于存放输出文件的路径

```javascript
module.exports = {
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  }
};
```

此配置将一个单独的 `bundle.js` 文件输出到 `dist` 目录中。



### 模式（mode）

提供 `mode` 配置选项，告知 webpack 使用相应环境的内置优化。

对应的值有：`none`*,* `development` *或* `production`*（默认）*



| **选项**    | **描述**                                                     |
| :---------- | ------------------------------------------------------------ |
| development | 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `development`。启用 `NamedChunksPlugin` 和 `NamedModulesPlugin`。 |
| production  | 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `production`。启用 `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` 和 `TerserPlugin`。 |
| none        | 退出任何默认优化选项                                         |



只需在配置对象中提供 `mode` 选项：

```javascript
module.exports = {
  mode: 'production'
};
```

或者从 [CLI](https://v4.webpack.docschina.org/api/cli/) 参数中传递：

```bash
webpack --mode=production
```



### 加载器（loader）

loader 用于对模块的源代码进行转换。loader 可以使你在 `import` 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。



loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript 或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 `import` CSS文件！



```js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' }
    ]
  }
};
```



具体使用loader 后面会记录；



### 插件（plugin）

插件目的在于解决 loader 无法实现的**其他事**。



具体使用loader 后面会记录；



下面是简单的webpack.config.js文件内容，由于webpack使用的是Commonjs，所以需要用 module.exports；

```javascript
module.exports = {
  // 入口起点
  entry: './index.js',
  // 输入
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  // 模式
  mode: 'development',
  module: {
    // rules 里面就是存放loader的地方
    rules: []
  },
  // 插件
  plugins: []
}
```



其中安装了 webpack 和 webpack-cli

`npm install webpack@^4.0.0 webpack-cli@^3.3.10 -D`

然后 执行 webpack，

就会输出文件到dist下。



![78F0DAF2-0112-4352-AFE7-07079D1FE6B6](https://tva1.sinaimg.cn/large/008eGmZEly1gp31sgitdmj308a05yglr.jpg)





