# webpack - code split

> 把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。
>
> 代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。



代码分割有可以通过以下几种方式处理：



### 多入口

在`src/js`下创建`other_entrance.js`文件，

然后在`webpack.config.js`文件中，修改`entry`的值。

```
  // 入口起点，单入口
  // entry: './src/js/index.js',
  // 多入口
  entry: {
    main: './src/js/index.js',
    test: './src/js/other_entrance.js',
  },
```

执行`npm run build`后，发现构建报错了。

![](https://i.loli.net/2021/04/07/62LKVHWcaPp7Q81.png)



报错的原因为：多个入口文件转为输出文件的名称都叫做  `bundle.js`，查看代码

```
  output: {
    filename: 'js/bundle.js',
    path: __dirname + '/dist'
  },
```

发现，`output`的filename没有做区分，故在`output`中修改一下输出的的文件名，以及添加hash值。

```
  output: {
    filename: 'js/[name].[contenthash:10].js',
    path: __dirname + '/dist'
  },
```

重新执行`npm run build`后，可以正常构建，构建目录下，可以看到有两个`js文件`。

![](https://i.loli.net/2021/04/07/AdjkbSO6Qe1K9Bl.png)



**注意：这里的[name]指的是entry的key，而不是源文件名称**



### webpack.config.js添加optimization配置



##### 单入口

我们这里引入`lodash`的包，先安装一下`npm install lodash`，然后在`src/js/index.js`中使用lodash

```
import _ from 'lodash'
console.log(_);
```

直接构建后，看到`main.xxxx.js`文件的大小很大，说明是将`lodash`的代码也输出在`main.xxxx.js`中。

![](https://i.loli.net/2021/04/07/ikvEh5zn18ewcCj.png)



现在在`webpack.config.js`中，加入以下配置：

```
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
```

重新构建后，可以看到`lodash`被单独打包成立一个文件；

![](https://i.loli.net/2021/04/07/FvaLBWKxqwf2nQE.png)



##### 多入口

先将`entry`改为多入口，然后引入`jquery.js（直接从网上下载下来）`，然后分别在`src/js`中的`index.js`和`other_entrance.js`加入以下代码：

```
import $ from './jquery'
console.log($);
```

然后重新构建，可以看到将`jquery.js`单独作为一个chunk输出。



![](https://i.loli.net/2021/04/07/yJHUeODrFIxsWdq.png)



所以，加入`optimization`的配置的作用是：

- 将用到node_modules的库，单独打包成一个chunk；
- 当有多个入口的时候，会分析是否存在公共文件，如果存在，那么会单独打包成一个chunk(公共文件不能太小);



**单入口只能做到上面的第一点，多入口两点都可以满足。**



### 通过js代码分包

`webpack.config.js`中的`entry`为单入口。

在`src/js/index.js`文件中加入

```
// 将other_entrance.js 单独成一个chunk
import('./other_entrance').then(res => {
  console.log('other_entrance.js 文件加载成功', res);
}).catch(err => {
  console.log('other_entrance.js 文件加载失败', err);
})
```

然后重新构建，如下图，文件`other_entrance.js`就被单独打包了。

![](https://i.loli.net/2021/04/07/pgTLIbXCj5oG6Mr.png)



运行构建后的`index.html`

![](https://i.loli.net/2021/04/07/txq1GlkJiNQTRbU.png)

​	

我们也可以修改打包后的文件名称，在`import`中通过备注`webpackChunkName`即可。

`import(/* webpackChunkName: 'test' */'./other_entrance')`



结论：

​	**通过`import`动态导入语法，能将某个文件单独打包；**



本章结束！