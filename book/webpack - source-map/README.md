# webpack - source-map

> source-map 是一种提供源代码到构建后代码的映射技术，即构建后代码出错了，可以通过映射，追踪到源代码的错误。

目前还是在`webpack.dev.config.js`文件中修改， 添加`devtool`属性值为`source-map`。

`devtool`属性主要作用为：是否生成，以及如何生成 source map；

```
  devtool: 'source-map',
```

在`package.json`文件中添加一个新的执行脚本

`    "dev-build": "webpack --config webpack.dev.config.js",`

然后运行脚本，直接构建。

`npm run dev-build`

可以看到，生成了`bundle.js.map`文件

![](https://i.loli.net/2021/04/05/S9Ryi1IokvjZMNY.png)



具体的对应`devtool`的属性值有很多

- none

- 这是一个组合，可以自由组合

  [inline-|hidden-|eval-] [nosources-] [cheap-[module-]] source-map

具体`devtool`的所有组合，详见[webpack-configuration-devtool](https://v4.webpack.docschina.org/configuration/devtool/)

下面将通过代码的方式，来验证部分组合。

代码部分直接在`index.js`中，添加一个错误：`console.log(add(1, 2))();`，其中`console.log`返回的是`undefined`，不能直接在调用，故会报错。

- none

  不生成 source map；

  

- source-map

  外部，会生成`.map`文件；

  提供错误代码准确信息和源代码的错误位置；

  ![](https://i.loli.net/2021/04/05/gTRc7i91hLvPr8J.png)

  ![image-20210405152745296](/Users/lee/Library/Application Support/typora-user-images/image-20210405152745296.png)

- inline-source-map

  内联，不会生成`.map`文件，直接将 source-map 写入到输出的js文件中，只生成一个source-map；

  提供错误代码准确信息和源代码的错误位置，与`source-map`一致；

  

- hidden-source-map

  外部，会生成`.map`文件；

  提供错误信息，但是错误位置是构建后的，所以无法追踪到源代码；

  

  ![](https://i.loli.net/2021/04/05/qARXvPV9Hzd8Zxa.png)

  ![](https://i.loli.net/2021/04/05/6MaYoVGb479JPyA.png)

- eval-source-map

  内联，不会生成`.map`文件，每个文件都会生成对应的source-map，并且都在eval中；

  提供错误代码准确信息和源代码的错误位置，与`source-map`一致，**只是提示文件的名称后面会有相关hash值**；

  

  ![](https://i.loli.net/2021/04/05/X9xZ1CAjStrDEnq.png)

  ![image-20210405153501785](/Users/lee/Library/Application Support/typora-user-images/image-20210405153501785.png)

- nosources-source-map

  外部，会生成`.map`文件；

  提供错误代码准确信息，**但是没有任何源码代码信息**；

  ![image-20210405153803249](/Users/lee/Library/Application Support/typora-user-images/image-20210405153803249.png)

  从控制台点击`index.js`，跳转后，会发现看不到`index.js`文件的内容；

  ![](https://i.loli.net/2021/04/05/uE8t6n5SdAORCfQ.png)

- cheap-source-map

  外部，会生成`.map`文件；

  提供错误代码准确信息和源代码的错误位置，**但是只可以精确当行**；

  ![](https://i.loli.net/2021/04/05/MGeo4l7nNrOVI9q.png)

- cheap-module-source-map

  外部，会生成`.map`文件；

  提供错误代码准确信息和源代码的错误位置；

  另外module会将loader的source-map也加入；

  

具体所有的组合，可以详见[webpack-configuration-devtool](https://v4.webpack.docschina.org/configuration/devtool/)，这边直接放个截图。

![image-20210405223306396](/Users/lee/Library/Application Support/typora-user-images/image-20210405223306396.png)



其中不同环境，要求的内容不同。

- 开发环境：速度快，调试友好；

  其中速度快，从快到慢为：`eval>inline>cheap>...`；

  调试友好，有几种：`source-map,cheap-source-map,cheap-module-source-map`；

  推荐使用`eval-source-map`，具体可以参考：[对于开发环境设置](https://v4.webpack.docschina.org/configuration/devtool/#%E5%AF%B9%E4%BA%8E%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83)

  

- 生产环境：源代码需要隐藏

  不应将 source map 文件部署到 web 服务器。而是只将其用于错误报告工具；

  推荐直接使用`none，nosources-source-map，hidden-source-map，`具体可以参考：[对于生产环境设置](https://v4.webpack.docschina.org/configuration/devtool/#%E5%AF%B9%E4%BA%8E%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83)

  

本章结束！