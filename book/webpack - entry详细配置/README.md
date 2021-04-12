# webpack - entry详细配置

> 记录entry入口的几种形式



### 字符串

```
module.exports = {
  entry: './src/js/index.js',
};
```

其中上面的代码是下面的简写

```
module.exports = {
  entry: {
    main: './src/js/index.js'
  }
};
```



其中`main: './src/js/index.js'`，这句话表明，入口为`index.js`文件，当构建打包后chunk的名称默认为`main`；

- 单入口；
- 输出一个bundle文件；



### 数组

```
module.exports = {
  entry: ['./src/js/index.js', './src/js/other_entrance.js'],
};
```



- 多入口；
- 所有入口文件最终只会形成一个chunk, 输出出去只有一个bundle文件；
- 如果想让`html`文件可以有HMR的功能，可以在`entry`后面加上`html`文件的路径；



### 对象

```
module.exports = {
  entry: {
    main: './src/js/index.js',
    other: './src/js/other_entrance.js'
  },
};
```



- 多入口；
- 有几个入口文件就形成几个chunk，输出几个bundle文件；



```
//webpack.detail.js 文件

const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
  // entry: './src/js/index.js',
  // entry: ['./src/js/index.js', './src/js/other_entrance.js'],
  entry: {
    main: './src/js/index.js',
    other: './src/js/other_entrance.js'
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: []
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  mode: 'development',
}
```



本章结束！