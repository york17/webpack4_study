# webpack - externals

> 想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，那就可以通过配置externals。



externals作用：

- 将不怎么需要更新的第三方库脱离webpack打包，不被打入bundle中，从而减少打包时间；
- 不影响第三方库的使用；



就以之前装过的`lodash`为例：在`src/js/index.js`文件中加入

`import _ from 'lodash'`

**注意：webpack.config.js中需要注释掉`optimization`配置**



当不配置`externals`时候，构建项目， `lodash`被打包进入bundle。

![](https://i.loli.net/2021/04/08/qtfvXbu2j9P6ZNw.png)



在`webpack.config.js`添加`externals`，

```
  externals: {
    // 拒绝lodash打包
    lodash: '_', 
  }
```

重新构建项目，可以发现，`lodash`没有被打包进去。

![image-20210408163156455](https://tva1.sinaimg.cn/large/008eGmZEly1gpcf5gvw3wj30iy05tdgv.jpg)



所以我们需要在使用`lodash`的话，可以使用cdn的方式，可以在`index.html`加入cdn地址

`<script src="https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.js"></script>`

打包后，在`dist`的`index.html`文件中可以看到也加入了cdn。



解释一下：externals中的`lodash: '_'`，表示什么意思。

可以理解为 `import _ from 'lodash'`。



本章结束！



****

